import React from 'react';
import { useSelect } from './hooks/useSelect';
import useDropdown, { UseDropdownInstance } from './hooks/useSelect/useDropdown';

export default function DropdownSelect() {

  const {
    getSelectedValue,
    getSelectedOption,
    isOpen,
    close,
    getOptions,
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
    onChange: (value) => window.alert(value)
  }, useDropdown) as UseDropdownInstance;

  return (
    <div {...getRootProps()} className='select'>
      <h2>Dropdown Selection</h2>
      <span>Choose option: {getSelectedOption()?.name} <button {...getButtonProps()}>Open</button></span>
      <ul {...getListProps()} style={isOpen ? { display: "block" } : { display: "none" }}>
        {
          getOptions().map(optionInstance => {
            const value = getSelectedValue()
            if (value === optionInstance.option.value) {
              return <li {...optionInstance.getOptionProps()}><span style={{ backgroundColor: 'lightblue' }}>{optionInstance.option.name}</span></li>
            } else {
              return <li {...optionInstance.getOptionProps()}><span>{optionInstance.option.name}</span></li>
            }
          })
        }
      </ul>
    </div>
  );
}
