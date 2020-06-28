
function reducer(state, action) {
  switch (action.type) {
    case 'open':
      return { ...state, isOpen: true }
    case 'close':
      return { ...state, isOpen: false }
    case 'toggle':
      return { ...state, isOpen: state.isOpen ? false : true }
  }
}

export default function useDropdown(instance) {

  instance.hooks.reducers = instance.hooks.reducers ? [...instance.hooks.reducers, reducer] : [reducer];

  instance.hooks.useInstance = instance.hooks.useInstance ? [...instance.hooks.useInstance, useInstance] : [useInstance];
}

function useInstance(instance) {

  const toggle = () => {
    instance.dispatch({
      type: 'toggle'
    })
    instance.isOpen = !instance.state.isOpen;
  }

  instance.open = () => {
    instance.dispatch({
      type: 'open'
    })
    instance.isOpen = true;
  }

  instance.close = () => {
    instance.dispatch({
      type: 'close'
    })
    instance.isOpen = false;
  }

  const getOptions = instance.getOptions;

  instance.getOptions = () => {
    return getOptions().map(optionInstance => {
      const optionProps = optionInstance.getOptionProps();
      optionInstance.getOptionProps = () => {
        let option = optionInstance.option
        return {
          key: `${instance.props.getOptionValue ? instance.props.getOptionValue(option) : option.value}`,
          role: 'option',
          onClick: () => {
            if (instance.props.closeOnSelect) {
              optionProps.onClick();
              instance.close();
            } else {
              optionProps.onClick();
            }
          }
        }
      }
      return optionInstance;
    });
  }

  instance.getButtonProps = () => ({
    onClick: () => {
      toggle();
    }
  });;

  const getRootProps = () => {
    return {
      tabIndex: 1,
      onBlur: e => {
        if (instance.state?.isOpen && e.relatedTarget === null) {
          instance.close();
        }
      }
    }
  }

  if (instance.hooks.getRootProps) {
    instance.hooks.getRootProps.push(getRootProps)
  } else {
    instance.hooks.getRootProps = [getRootProps];
  }

  const getInputProps = () => {
    let name;
    if (instance.state?.value && !Array.isArray(instance.state.value)) {
      name = instance.props.getOptionName ? instance.props.getOptionName(instance.state.value) : instance.state.value.name;
    } else {
      name = instance.state?.filter ? instance.state?.filter : '';
    }
    return {
      value: name,
      onFocus: () => {
        instance.open();
      }
    }
  }

  if (instance.hooks.getInputProps) {
    instance.hooks.getInputProps.push(getInputProps)
  } else {
    instance.hooks.getInputProps = [getInputProps];
  }
}
