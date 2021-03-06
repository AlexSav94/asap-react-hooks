import React from 'react';
import { useSelect, useFilter, useMultiple, UseFilterInstance } from 'asap-react-hooks';

export default function FilterSelect() {

  const {
    getSelectedValue,
    getOptions,
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
  }, useFilter, useMultiple, 
  ) as UseFilterInstance;

  return (
    <div {...getRootProps()} className='select'>
      <h2>Filter Selection</h2>
      <input type='text' {...getInputProps()}/>
      <ul {...getListProps()}>
        {
          getOptions().map(optionInstance => {
            const value = getSelectedValue();
            if (value && value.includes(optionInstance.option.value)) {
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
