import { UseSelectInstance } from ".";

export function useMultiple(instance: UseSelectInstance) {

  instance.hooks.useInstance = instance.hooks.useInstance ? [...instance.hooks.useInstance, useInstance] : [useInstance];

}

function useInstance(instance: UseSelectInstance) {

  const getSelectedOption = (): Array<any>  => {
    const {
      state
    } = instance;

    if (state?.value) {
      return state.value
    } else {
      return [];
    }
  };

  const getValue = (): Array<any> => {
    const {
      state,
      props
    } = instance;

    if (state?.value) {
      return state.value.map((option: any) => {
        if (props.getOptionValue) {
          return props.getOptionValue(option)
        } else {
          return option.value;
        }
      })
    } else {
      return [];
    }
  }

  instance.selectOption = (value) => {

    const {
      dispatch,
      props
    } = instance;

    if (Array.isArray(value)) {
      if (dispatch) dispatch({ type: 'select', value: [...value] });
    } else if (value) {
      let newSelected;
      let optionValue = props.getOptionValue ? props.getOptionValue(value) : (value).value;
      let values = getValue();
      let options = getSelectedOption();
      if (values && values.includes(optionValue)) {
        newSelected = options.slice();
        newSelected.splice(values.indexOf(optionValue), 1);
      } else {
        if (options) {
          newSelected = [...options, value]
        } else {
          newSelected = [value];
        }
      }
      if (dispatch) dispatch({ type: 'select', value: newSelected });
      if (props.onChange) {
        props.onChange(newSelected.map((option: any) => {
          if (props.getOptionValue) {
            return props.getOptionValue(option)
          } else {
            return option.value
          }
        }));
      } else {
        if (dispatch) dispatch({ type: 'select', value: [] });
        if (instance.props.onChange) {
          instance.props.onChange([]);
        }
      }
    }

  }

  instance.getSelectedValue = () => getValue();

  instance.getSelectedOption = () => getSelectedOption();
}