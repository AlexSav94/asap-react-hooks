import React from 'react';
import { useSelect } from 'asap-react-hooks';

export default function SimpleSelect() {

  
  const getOptionName = (option: any) => option?.label;
  const getOptionValue = (option: any) => option?.number;

  const {
    getSelectedValue,
    getOptions,
    getRootProps,
    getListProps
  } = useSelect({
    options: [
      { label: 'test', number: 123 },
      { label: 'test2', number: 121 },
      { label: 'test3', number: 122 },
      { label: 'test4', number: 124 },
    ],
    getOptionName,
    getOptionValue,
    onChange: (value) => window.alert(value)
  });

  return (
    <div {...getRootProps()}  className='select'>
      <h2>Simple Selection</h2>
      <ul {...getListProps()}>
        {
          getOptions().map(optionInstance => {
            if (getSelectedValue() === getOptionValue(optionInstance.option)) {
              return <li {...optionInstance.getOptionProps()}><span style={{ backgroundColor: 'lightblue' }}>{getOptionName(optionInstance.option)}</span></li>
            } else {
              return <li {...optionInstance.getOptionProps()}><span>{getOptionName(optionInstance.option)}</span></li>
            }
          })
        }
      </ul>
    </div>
  );
}
