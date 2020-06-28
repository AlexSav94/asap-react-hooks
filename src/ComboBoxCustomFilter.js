import React, { useState, useEffect } from 'react';
import { useSelect } from './hooks/useSelect';
import useDropdown from './hooks/useSelect/useDropdown';
import useFilter from './hooks/useSelect/useFilter';

function getFilteredOptions(filter) {
  const options = [
    { name: 'test', value: 123 },
    { name: 'test2', value: 121 },
    { name: 'test3', value: 122 },
    { name: 'test4', value: 124 },
  ]
  return new Promise(resolve => setTimeout(() => resolve(options.filter(option => option.name.startsWith(filter))), 500));
}

export default function ComboBoxCustomFilter() {

  const [filter, setFilter] = useState('');
  const [options, setOptions] = useState([]);

  const {
    getSelectedValue,
    getSelectedOption,
    isOpen,
    open,
    close,
    selectOption,
    getOptions,
    getButtonProps,
    getRootProps,
    getListProps
  } = useSelect({
    options: options,
    onChange: (value) => window.alert(value)
  }, useDropdown);

  const selectedValue = getSelectedValue();
  const selectedOption = getSelectedOption();

  useEffect(() => {
    getFilteredOptions(filter).then(options => setOptions(options))
  }, [filter])

  useEffect(() => {
    if (selectedOption) {
      setFilter('');
    }
  }, [selectedOption])

  return (
    <div className='select'>
      <h2>ComboBox</h2>
      <h5>with delayed custom filter e.g. network request</h5>
      <div {...getRootProps()}>
        <input type='text' onFocus={open} onChange={e => {
          selectOption(undefined);
          setFilter(e.target.value)
        }} value={selectedOption ? selectedOption.name : filter}/><button {...getButtonProps()}>&darr;</button>
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