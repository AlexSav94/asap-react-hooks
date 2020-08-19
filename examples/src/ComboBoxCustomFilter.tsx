import React, { useState, useEffect } from 'react';
import { useSelect, useDropdown, UseDropdownInstance } from 'asap-react-hooks';

function getFilteredOptions(filter: string) {
  const options = [
    { name: 'test', value: 123 },
    { name: 'test2', value: 121 },
    { name: 'test3', value: 122 },
    { name: 'test4', value: 124 },
  ]
  
  return new Promise<Array<any>>(resolve => setTimeout(() => resolve(options.filter(option => option.name.startsWith(filter))), 500));
}

export default function ComboBoxCustomFilter() {

  const [filter, setFilter] = useState('');
  const [options, setOptions] = useState<Array<any>>([]);

  const {
    getSelectedValue,
    getLabel,
    isOpen,
    open,
    selectOption,
    getOptions,
    getToggleProps,
    getRootProps,
    getListProps
  } = useSelect({
    options: options,
    onChange: (value) => window.alert(value)
  }, useDropdown) as UseDropdownInstance;

  const selectedValue = getSelectedValue();
  const label = getLabel();

  useEffect(() => {
    getFilteredOptions(filter).then(options => {
      setOptions(options)
    })
  }, [filter])

  useEffect(() => {
    if (label) {
      setFilter('');
    }
  }, [label])


  return (
    <div className='select'>
      <h2>ComboBox</h2>
      <b>with delayed custom filter e.g. network request</b>
      <div {...getRootProps()}>
        <input type='text' onFocus={open} onChange={e => {
          selectOption(undefined);
          setFilter(e.target.value)
        }} value={label ? label : filter}/><button {...getToggleProps()}>&darr;</button>
        <ul {...getListProps()} style={isOpen ? { display: "block" } : { display: "none" }}>
          {
            getOptions().map(optionInstance => {
              if (selectedValue === optionInstance.option.value) {
                return <li {...optionInstance.getOptionProps()}><span style={{ backgroundColor: 'lightblue' }}>{optionInstance.option.name}</span></li>
              } else {
                return <li {...optionInstance.getOptionProps()}><span>{optionInstance.option.name}</span></li>
              }
            })
          }
        </ul>
      </div>
    </div>
  );
}
