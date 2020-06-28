import React from 'react';
import { useSelect } from './hooks/useSelect';

export default function SimpleSelect() {

  const {
    getSelectedValue,
    getOptions,
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
  }
  );

  return (
    <div {...getRootProps()}  className='select'>
      <h2>Simple Selection</h2>
      <ul {...getListProps()}>
        {
          getOptions().map(optionInstance => {
            if (getSelectedValue() === optionInstance.option.value) {
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
