import React, { useState, useLayoutEffect, useEffect } from "react";
import { useSelect, useDropdown, UseDropdownInstance } from "asap-react-hooks";
export interface SimpleOptionProps 
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: any;
  onClick?: () => void;
}

export const SelectOption: React.FC<SimpleOptionProps> = ({
  children,
  value,
  checked,
  onClick
}) => {
  return (
    <label 
    style={{ padding: "5px" }}>
      {children}
      <input 
      type="checkbox" 
      value={value} 
      checked={checked} 
      onClick={onClick}
      readOnly />
    </label>
  );
};

export interface SelectProps {
  id?: string;
  name?: string;
  setFieldValue?: (name: string, value?: any) => void;
  onChange?: (value?: any, event?: React.ChangeEvent<any>) => void;
}

export const Select: React.FC<SelectProps> = ({
  id,
  children,
  name = "",
  setFieldValue
}) => {
  const [options, setOptions] = useState<Array<any>>([]);

  useLayoutEffect(() => {
    const options = React.Children.map(children, (element) => {
      if (!React.isValidElement(element)) {
        throw new Error("Children are not valid React elements");
      }
      const { props, type } = element;
      if (
        typeof type === "function" &&
        (type as Function).name === "SelectOption"
      ) {
        return {
          name: props?.children,
          value: props?.value,
        };
      } else {
        throw new Error("Children are not SelectOption elements");
      }
    });
    if (options) {
      setOptions(options);
    }
  }, []);

  const {
    getSelectedValue,
    isOpen,
    getOptions,
    getLabel,
    getToggleProps,
    getRootProps,
    getListProps,
  } = useSelect(
    {
      options,
      onChange: (value) => {
        if (setFieldValue) setFieldValue(name, value);
      },
    },
    useDropdown
  ) as UseDropdownInstance;


  return (
    <div {...getRootProps()} className="select" style={{ padding: "5px" }}>
      <span {...getToggleProps()}>Choose option: {getLabel()}</span>
      <div
        {...getListProps()}
        style={
          isOpen
            ? { display: "flex", flexDirection: "column" }
            : { display: "none" }
        }
      >
        {React.Children.map(children, (element, index) => {
          if (!React.isValidElement(element)) {
            return null;
          }
          const options = getOptions();
          return React.cloneElement(element, {
            value: options[index]?.option.value,
            checked: options[index]?.option.value === getSelectedValue(),
            onClick: options[index]?.getOptionProps().onClick,
            key: options[index]?.getOptionProps().key,
          });
        })}
      </div>
    </div>
  );
};
