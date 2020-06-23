import React, { useRef, useReducer } from 'react';


export function useGetLatest(obj) {
  const ref = React.useRef()
  ref.current = obj

  return React.useCallback(() => ref.current, [])
}

function useSelectReducer(state, action) {
  switch (action.type) {
    case 'select':
      return {...state, value: action.value};
  }
}  

const defaultProps = {
  initialValue: undefined,
  options: [],
  closeOnSelect: true
}

export const useSelect = (props, ...hooks) => {

  const {
    initialValue,
    options,
    getOptionValue,
    onChange
  } = props;

  const instanceRef = useRef({});
  const getInstance = useGetLatest(instanceRef.current);

  getInstance().props = {
    ...defaultProps,
    ...props
  };

  getInstance().hooks = hooks;

  //allow hooks to register itselfs ASAP
  getInstance().hooks.forEach((hook) => hook(getInstance()));

  getInstance().getOptions = () => {
    return options.map(option => {
      return {
        option,
        getOptionProps: () => ({
          key: `${getOptionValue ? getOptionValue(option) : (option).value}`,
          role: 'option',
          onClick: () => {
            getInstance().selectOption(option);
          }
        })
      }
    })
  }

  getInstance().selectOption = (option) => {
    let currentValue = state.value ? (getOptionValue ? getOptionValue(state.value) : state.value.value) : undefined;
    let optionValue = getOptionValue ? getOptionValue(option) : (option).value;
    if (currentValue === optionValue) {
      return;
    }
    dispatch({type: 'select', value: option});
    if (onChange) {
      onChange(optionValue);
    }
  }

  getInstance().getRootProps = () => ({ role: 'combobox' });

  getInstance().getListProps = () => ({ role: 'listbox' });

  const reducer = (state, action) => {
    if (!action.type) {
      throw new Error('Invalid Action')
    }
    console.log(state, action)
    return [
      useSelectReducer,
      ...getInstance().hooks.reducers ? getInstance().hooks.reducers : []
    ].reduce(
      (s, handler) => handler(s, action, state, getInstance()) || s,
      state
    )
  }

  const [state, dispatch] = useReducer(reducer, {value: initialValue});

  console.log(state)

  Object.assign(getInstance(), {state, dispatch});

  getInstance().selectedValue = state.value ? (getOptionValue ? getOptionValue(state.value) : state.value.value) : undefined;

  getInstance().selectedOption = state.value;

  //allow hooks to update the final state of useSelect instance
  getInstance().hooks.forEach((hook) => hook(getInstance()));

  return getInstance();
}