import React, { useEffect } from 'react';
import { useGetLatest } from '.';

function reducer(state, action) {
  switch (action.type) {
    case 'open':
      return { ...state, isOpen: true }
    case 'close':
      return { ...state, isOpen: false }
    case 'toggle':
      return { ...state, isOpen: state.isOpen ? false : true }
  }
}

export default function useDropdown(instance) {

  const getInstance = useGetLatest(instance);

  getInstance().hooks.reducers = getInstance().hooks.reducers ? [...getInstance().hooks.reducers, reducer] : [reducer];

  const toggle = () => {
    getInstance().dispatch({
      type: 'toggle'
    })
    getInstance().isOpen = !getInstance().state.isOpen;
  }

  getInstance().getButtonProps = () => ({
    onClick: () => {
      toggle();
    }
  });

  getInstance().open = () => {
    getInstance().dispatch({
      type: 'open'
    })
    getInstance().isOpen = true;
  }

  getInstance().close = () => {
    getInstance().dispatch({
      type: 'close'
    })
    getInstance().isOpen = false;
  }

  const getOptions = getInstance().getOptions;

  getInstance().getOptions = () => {
    return getOptions().map(optionInstance => {
      const optionProps = optionInstance.getOptionProps();
      optionInstance.getOptionProps = () => {
        let option = optionInstance.option
        return {
          key: `${getInstance().props.getOptionValue ? getInstance().props.getOptionValue(option) : option.value}`,
          role: 'option',
          onClick: () => {
            if (getInstance().props.closeOnSelect) {
              optionProps.onClick();
              getInstance().close();
            } else {
              optionProps.onClick();
            }
          }
        }
      }
      return optionInstance;
    });
  }
}
