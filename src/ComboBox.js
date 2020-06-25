import React, { useRef } from 'react';
import { useSelect } from './hooks/useSelect';
import useDropdown from './hooks/useSelect/useDropdown';
import useFilter from './hooks/useSelect/useFilter';

export default function ComboBox() {

  const {
    selectedValue,
    selectedOption,
    isOpen,
    open,
    close,
    getOptions,
    getInputProps,
    getButtonProps,
    getRootProps,
    getListProps
  } = useSelect({
    options: [
      { label: 'test', value: 123 },
      { label: 'test2', value: 121 },
      { label: 'test3', value: 122 },
      { label: 'test4', value: 124 },
    ],
    onChange: (value) => window.alert(value),
    invalidateOnFilter: true
  }, useDropdown, useFilter);

  return (
    <div className='select'>
      <h2>ComboBox</h2>
      <div {...getRootProps()}>
        <input type='text' value={selectedOption?.label} {...getInputProps()}/><button {...getButtonProps()}>&darr;</button>
        <ul {...getListProps()} style={isOpen ? { display: "block" } : { display: "none" }}>
          {
            getOptions().map(optionInstance => {
              if (selectedValue === optionInstance.option.value) {
                return <li {...optionInstance.getOptionProps()}><span style={{ backgroundColor: 'lightblue' }}>{optionInstance.option.label}</span></li>
              } else {
                return <li {...optionInstance.getOptionProps()}><span>{optionInstance.option.label}</span></li>
              }
            })
          }
        </ul>
      </div>
    </div>
  );
}
