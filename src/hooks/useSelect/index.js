import React, { useState, useEffect, useRef } from 'react';


export function useGetLatest(obj) {
  const ref = React.useRef()
  ref.current = obj

  return React.useCallback(() => ref.current, [])
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

  getInstance().props = props;

  const getOptions = (options) => {
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

  const [selected, setSelected] = useState(initialValue);
  const [optionList, setOptionList] = useState(getOptions(options));

  getInstance().value = selected;
  getInstance().options = optionList;

  getInstance().selectOption = (option) => {
    let optionValue = getOptionValue ? getOptionValue(option) : (option).value;
    if (selected === optionValue) {
      return;
    }
    setSelected(optionValue);
    if (onChange) {
      onChange(optionValue);
    }
  }

  getInstance().getRootProps = () => ({ role: 'combobox' });

  getInstance().getListProps = () => ({ role: 'listbox' });

  // useEffect(() => setOptionList(getOptions(options)), []);

  getInstance().hooks = hooks.slice();

  hooks.forEach((hook) => hook(getInstance()));

  return getInstance();
}