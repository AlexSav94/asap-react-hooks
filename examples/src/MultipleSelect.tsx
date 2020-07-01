import React from 'react';
import { useSelect, useMultiple } from 'asap-react-hooks';

export default function MultipleSelect() {

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
  }, useMultiple
  );

  return (
    <div {...getRootProps()} className='select'>
      <h2>Multiple Selection</h2>
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
