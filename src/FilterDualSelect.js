import React, { useEffect } from 'react';
import { useSelect } from './hooks/useSelect';
import useMultiple from './hooks/useSelect/useMultiple';
import useDual from './hooks/useSelect/useDual';
import useFilter from './hooks/useSelect/useFilter';

export default function FilterDualSelect() {

  const {
    getOptions,
    getSelectedOptions,
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
  }, useMultiple, useDual, useFilter
  );

  return (
    <div {...getRootProps()} className='select'>
      <h2>Filter Dual Selection</h2>
      <input type='text' {...getInputProps()}/>
      <ul {...getListProps()}>
        {
          getOptions().map(optionInstance => {
            return <li {...optionInstance.getOptionProps()}><span>{optionInstance.option.label}</span></li>
          })
        }
      </ul>
      <span>Selected:</span>
      <ul {...getListProps()}>
        {
          getSelectedOptions().map(optionInstance => {
            return <li {...optionInstance.getOptionProps()}><span>{optionInstance.option.label}</span></li>
          })
        }
      </ul>
    </div>
  );
}
