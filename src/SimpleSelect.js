import React from 'react';
import { useSelect } from './hooks/useSelect';

export default function SimpleSelect() {

  const {
    selectedValue,
    getOptions,
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
  }
  );

  return (
    <div {...getRootProps()}  className='select'>
      <h2>Simple Selection</h2>
      <ul {...getListProps()}>
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
