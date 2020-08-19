import React from "react";
import SimpleSelect from "./SimpleSelect";
import MultipleSelect from "./MultipleSelect";
import FilterSelect from "./FilterSelect";
import DropdownSelect from "./DropdownSelect";
import DualSelect from "./DualSelect";
import FilterDualSelect from "./FilterDualSelect";
import ComboBox from "./ComboBox";
import ComboBoxCustomFilter from "./ComboBoxCustomFilter";
import { Select, SelectOption } from "./Select";

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
      <Select>
        <SelectOption value="123">test</SelectOption>
        <SelectOption value="121">test2</SelectOption>
        <SelectOption value="122">test3</SelectOption>
      </Select>
    </>
  );
}

export default App;
