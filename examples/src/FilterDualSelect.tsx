import React from 'react';
import { useSelect, useMultiple, useDual, useFilter, UseDropdownInstance, UseFilterInstance, UseDualInstance } from 'asap-react-hooks';

export default function FilterDualSelect() {

  const {
    getOptions,
    getSelectedOptions,
    getInputProps,
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
  }, useMultiple, useDual, useFilter
  ) as UseDropdownInstance & UseFilterInstance & UseDualInstance;

  return (
    <div {...getRootProps()} className='select'>
      <h2>Filter Dual Selection</h2>
      <input type='text' {...getInputProps()}/>
      <ul {...getListProps()}>
        {
          getOptions().map(optionInstance => {
            return <li {...optionInstance.getOptionProps()}><span>{optionInstance.option.name}</span></li>
          })
        }
      </ul>
      <span>Selected:</span>
      <ul {...getListProps()}>
        {
          getSelectedOptions().map(optionInstance => {
            return <li {...optionInstance.getOptionProps()}><span>{optionInstance.option.name}</span></li>
          })
        }
      </ul>
    </div>
  );
}
