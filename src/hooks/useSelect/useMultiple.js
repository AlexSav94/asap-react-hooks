import React, { useState, useEffect } from 'react';
import { useGetLatest } from '.';

export default function useMultiple(instance) {

  const getInstance = useGetLatest(instance);

  getInstance().hooks.useInstance = getInstance().hooks.useInstance ? [...getInstance().hooks.useInstance, useInstance] : [useInstance];

}

function useInstance(instance) {

  const getInstance = useGetLatest(instance);

  const {
    state,
    dispatch,
    props
  } = getInstance();

  getInstance().selectOption = (value) => {
    if (Array.isArray(value)) {
      dispatch({ type: 'select', value: [...value] });
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
      dispatch({ type: 'select', value: newSelected });
      if (props.onChange) {
        props.onChange(props.getOptionValue ? newSelected.map(option => props.getOptionValue(option)) : newSelected.map(option => option.value));
      }
    } else {
      dispatch({ type: 'select', value: [] });
      if (getInstance().props.onChange) {
        getInstance().props.onChange([]);
      }
    }
  }

  const getSelectedOption = () => {
    if (state?.value) {
      return state.value
    } else {
      return [];
    }
  };

  const getValue = () => {
    if (state?.value) {
      if (props.getOptionValue) {
        return state.value.map(option => props.getOptionValue(option))
      } else {
        return state.value.map(option => option.value)
      }
    } else {
      return [];
    }
  }

  getInstance().selectedValue = getValue();

  getInstance().selectedOption = getSelectedOption();

}