import React from 'react';
import { useSelect } from './hooks/useSelect';
import useDropdown from './hooks/useSelect/useDropdown';

export default function DropdownSelect() {

  const {
    selectedValue,
    selectedOption,
    isOpen,
    close,
    getOptions,
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
    onChange: (value) => window.alert(value)
  }, useDropdown);

  return (
    <div {...getRootProps()} className='select'>
      <h2>Dropdown Selection</h2>
      <span>Choose option: {selectedOption?.label} <button {...getButtonProps()}>Open</button></span>
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
  );
}
