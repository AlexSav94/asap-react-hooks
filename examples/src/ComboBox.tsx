import React, { useRef } from 'react';
import { useSelect, useDropdown, useFilter, UseDropdownInstance, UseFilterInstance } from 'asap-react-hooks';

export default function ComboBox() {

  const {
    getSelectedValue,
    getSelectedOption,
    isOpen,
    getOptions,
    getInputProps,
    getButtonProps,
    getRootProps,
    getListProps
  } = useSelect({
    options: [
      { name: 'test', value: 123 },
      { name: 'test2', value: 121 },
      { name: 'test3', value: 122 },
      { name: 'test4', value: 124 },
    ],
    onChange: (value) => window.alert(value),
    invalidateOnFilter: true
  }, useDropdown, useFilter) as UseDropdownInstance & UseFilterInstance;

  const selectedValue = getSelectedValue();
  const selectedOption = getSelectedOption();

  return (
    <div className='select'>
      <h2>ComboBox</h2>
      <div {...getRootProps()}>
        <input type='text' value={selectedOption?.name} {...getInputProps()} /><button {...getButtonProps()}>&darr;</button>
        <ul {...getListProps()} style={isOpen ? { display: "block" } : { display: "none" }}>
          {
            getOptions().map(optionInstance => {
              if (selectedValue === optionInstance.option.value) {
                return <li {...optionInstance.getOptionProps()}><span style={{ backgroundColor: 'lightblue' }}>{optionInstance.option.name}</span></li>
              } else {
                return <li {...optionInstance.getOptionProps()}><span>{optionInstance.option.name}</span></li>
              }
            })
          }
        </ul>
      </div>
    </div>
  );
}
