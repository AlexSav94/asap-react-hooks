import React, { useEffect } from 'react';
import { useSelect } from './hooks/useSelect';
import useMultiple from './hooks/useSelect/useMultiple';
import useFilter from './hooks/useSelect/useFilter';

export default function FilterSelect() {

  const {
    selectedValue,
    getOptions,
    getInputProps,
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
  }, useFilter, useMultiple, 
  );

  return (
    <div {...getRootProps()} className='select'>
      <h2>Filter Selection</h2>
      <input type='text' {...getInputProps()}/>
      <ul {...getListProps()}>
        {
          getOptions().map(optionInstance => {
            if (selectedValue && selectedValue.includes(optionInstance.option.value)) {
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
