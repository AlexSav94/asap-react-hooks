import React, { useState, useEffect } from 'react';
import { useGetLatest, OptionInstanceProps, Option} from '.';




export function useMultiple(instance: any) {

  const getInstance = useGetLatest(instance);

  const getOptions = (options: Array<any>): Array<OptionInstanceProps> => {
    return options.map((option: any) => {
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

  const [selected, setSelected] = useState<Array<any>>(getInstance().props.initialValue ? getInstance().props.initialValue : [])
  const [optionList, setOptionList] = useState(getOptions(getInstance().props.options));

  console.log(selected)

  const selectOption = (option: any) => {
    if (option) {
      let newSelected;
      let optionValue = getInstance().props.getOptionValue ? getInstance().props.getOptionValue(option) : (option as Option<any>).value;
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

  getInstance().selectOption = (options: Array<any> | undefined) => {
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