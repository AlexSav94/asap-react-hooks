import React, { useState, useEffect, useRef } from 'react';

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
  value?: V;
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

export function useGetLatest(obj: any): any {
  const ref = React.useRef()
  ref.current = obj

  return React.useCallback(() => ref.current, [])
}

export const useSelect = <V, T = any>(props: SelectProps<V, T>, ...hooks: any[]): UseSelectInstanceProps<V, T> => {
  const {
    initialValue,
    options,
    getOptionValue,
    onChange
  } = props;

  const instanceRef = useRef({});
  const getInstance = useGetLatest(instanceRef.current);

  getInstance().props = props;

  const getOptions = (options: Array<T | Option<V>>): Array<OptionInstanceProps> => {
    return options.map((option: T | Option<V>) => {
      return {
        option,
        getOptionProps: () => ({
          key: `${getOptionValue ? getOptionValue(option as T) : (option as unknown as Option<V>).value}`,
          role: 'option',
          onClick: () => {
            getInstance().selectOption(option);
          }
        })
      }
    })
  }

  const [selected, setSelected] = useState(initialValue);
  const [optionList, setOptionList] = useState(getOptions(options));

  getInstance().value = selected;
  getInstance().options = optionList;

  getInstance().selectOption = (option: T | undefined) => {
    let optionValue = getOptionValue ? getOptionValue(option as T) : (option as unknown as Option<V>).value;
    if (selected === optionValue) {
      return;
    }
    setSelected(optionValue);
    if (onChange) {
      onChange(optionValue);
    }
  }

  getInstance().getRootProps = (): RootInstanceProps => ({ role: 'combobox' });

  getInstance().getListProps = (): ListInstanceProps => ({ role: 'listbox' });

  // useEffect(() => setOptionList(getOptions(options)), []);

  getInstance().hooks = hooks.slice();

  hooks.forEach((hook: any) => hook(getInstance()));

  return getInstance();
}