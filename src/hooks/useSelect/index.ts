import React, { useState, useEffect } from 'react';

export interface Option<V> {
  name: string;
  value: V;
}

export interface OptionProps {
  key: string;
  role: string;
  onClick: () => void;
}

export interface OptionInstanceProps<T = any> {
  option: T;
  getOptionProps: () => OptionProps;
}

export interface RootInstanceProps {
  role: string;
}

export interface ListInstanceProps {
  role: string;
}

export interface UseSelectInstanceProps<V, T = any> {
  selectedOption?: V;
  options: Array<OptionInstanceProps<T>>
  selectOption: (option: T | undefined) => void;
  getRootProps: () => RootInstanceProps;
  getListProps: () => ListInstanceProps;
}

export interface SelectProps<V, T = any> {
  initialValue?: V;
  options: Array<T | Option<V>>;
  getOptionValue?: (option: T) => V;
  onChange?: (value: V) => any;
}


export const useSelect = <V, T = any>(props: SelectProps<V, T>): UseSelectInstanceProps<V, T> => {
  const {
    initialValue,
    options,
    getOptionValue,
    onChange
  } = props;

  const getOptions = (options: Array<T | Option<V>>): Array<OptionInstanceProps> => {
    return options.map((option: T | Option<V>) => {
      let optionValue: V;
      if (getOptionValue) {
        optionValue = getOptionValue(option as T);
      } else {
        optionValue = (option as unknown as Option<V>).value;
      }
      return {
        option,
        getOptionProps: () => ({
          key: `${optionValue}`,
          role: 'option',
          onClick: () => {
            if (selected === optionValue) {
              return;
            }
            setSelected(optionValue)
            if (onChange) {
              onChange(optionValue);
            }
          }
        })
      }
    })
  }

  const selectOption = (option: T | undefined) => {
    setSelected(getOptionValue ? getOptionValue(option as T) : (option as unknown as Option<V>).value);
    if (onChange) {
      onChange(getOptionValue ? getOptionValue(option as T) : (option as unknown as Option<V>).value);
    }
  }

  const getRootProps = (): RootInstanceProps => ({ role: 'combobox' });

  const getListProps = (): ListInstanceProps => ({ role: 'listbox' });

  const [selected, setSelected] = useState(initialValue);
  const [optionList, setOptionList] = useState(getOptions(options));

  useEffect(() => setOptionList(getOptions(options)), []);

  return ({
    selectedOption: selected,
    options: optionList,
    selectOption,
    getRootProps,
    getListProps
  });
}