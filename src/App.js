import React, { useEffect } from 'react';
import { useSelect } from './hooks/useSelect';
import { useMultiple } from './hooks/useSelect/useMultiple';

function App() {

  const {
    value,
    options,
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
    , useMultiple
  );

  return (
    <div {...getRootProps()}>
      <ul {...getListProps()}>
        {
          options.map(optionInstance => {
            if (value === optionInstance.option.value) {
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

export default App;
