import React, { useState, useEffect } from 'react';
import { useGetLatest} from '.';

export function useMultiple(instance) {

  const getInstance = useGetLatest(instance);

  const getOptions = (options) => {
    return options.map((option) => {
      return {
        option,
        getOptionProps: () => ({
          key: `${getInstance().props.getOptionValue ? getInstance().props.getOptionValue(option) : option.value}`,
          role: 'option',
          onClick: () => {
            selectOption(option);
          }
        })
      }
    })
  }

  const [selected, setSelected] = useState(getInstance().props.initialValue ? getInstance().props.initialValue : [])
  const [optionList, setOptionList] = useState(getOptions(getInstance().props.options));

  console.log(selected)

  const selectOption = (option) => {
    if (option) {
      let newSelected;
      let optionValue = getInstance().props.getOptionValue ? getInstance().props.getOptionValue(option) : (option).value;
      if (selected.includes(optionValue)) {
        newSelected = selected.slice();
        newSelected.splice(newSelected.indexOf(optionValue));
      } else {
        newSelected = [...selected, optionValue];
      }
      setSelected(newSelected);
      if (getInstance().props.onChange) {
        getInstance().props.onChange(newSelected);
      }
    } else {
      setSelected([]);
      if (getInstance().props.onChange) {
        getInstance().props.onChange([]);
      }
    }
  }

  getInstance().selectOption = (options) => {
    if (options) {
      setSelected([...options]);
    } else {
      setSelected([]);
      if (getInstance().props.onChange) {
        getInstance().props.onChange([]);
      }
    }
  }
  getInstance().value = selected;
  getInstance().options = optionList;
} 