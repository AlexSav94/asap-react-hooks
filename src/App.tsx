import React from 'react';
import { useSelect } from './hooks/useSelect';

function App() {

  const {
    selectedOption,
    options,
    getRootProps,
    getListProps
  } = useSelect<number>({
    options: [
      {label: 'test', value: 123}, 
      {label: 'test2', value: 121}, 
      {label: 'test3', value: 122}, 
      {label: 'test4', value: 124}, 
  ],
    onChange: (value: number) => window.alert(value)
  });

  return (
    <div {...getRootProps()}>
      <ul {...getListProps()}>
        {
          options.map(optionInstance => {
            if (selectedOption === optionInstance.option.value) {
              return <li {...optionInstance.getOptionProps()}><span style={{backgroundColor: 'lightblue'}}>{optionInstance.option.label}</span></li>
            } else {
              return <li {...optionInstance.getOptionProps()}><span>{optionInstance.option.label}</span></li>
            }
          })
        }
      </ul>
    </div>
  );
}

export default App;
