import React from 'react';
import SimpleSelect from './SimpleSelect';
import MultipleSelect from './MultipleSelect';
import FilterSelect from './FilterSelect';
import DropdownSelect from './DropdownSelect';
import DualSelect from './DualSelect';
import FilterDualSelect from './FilterDualSelect';
import ComboBox from './ComboBox';
import ComboBoxCustomFilter from './ComboBoxCustomFilter';

function App() {

  return (
    <>
      <SimpleSelect />
      <MultipleSelect />
      <FilterSelect />
      <DropdownSelect />
      <DualSelect />
      <FilterDualSelect />
      <ComboBox />
      <ComboBoxCustomFilter />
    </>
  );
}

export default App;
