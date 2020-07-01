import React from 'react';
import { useSelect, useMultiple, useDual, UseDualInstance } from 'asap-react-hooks';

export default function DualSelect() {

  const {
    getOptions,
    getSelectedOptions,
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
  }, useMultiple, useDual
  ) as UseDualInstance;

  return (
    <div {...getRootProps()} className='select'>
      <h2>Dual Selection</h2>
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
