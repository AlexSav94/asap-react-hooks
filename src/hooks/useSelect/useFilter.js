import React, { useState, useEffect } from 'react';
import { useGetLatest, loopPropGetters } from '.';

function reducer(state, action) {
  switch (action.type) {
    case 'filter':
      return {
        ...state,
        filter: action.filter
      }
    case 'select':
      return {
        ...state,
        filter: undefined
      }
  }
}

export default function useFilter(instance) {

  const getInstance = useGetLatest(instance);

  getInstance().hooks.reducers = getInstance().hooks.reducers ? [...getInstance().hooks.reducers, reducer] : [reducer];

  getInstance().hooks.useInstance = getInstance().hooks.useInstance ? [...getInstance().hooks.useInstance, useInstance] : [useInstance];
}

function useInstance(instance) {

  const getInstance = useGetLatest(instance);

  const getOptions = getInstance().getOptions;

  getInstance().getInputProps = () => {

    const inputProps = getInstance().hooks.getInputProps ? loopPropGetters(getInstance().hooks.getInputProps) : {};

    return {
      'aria-autocomplete': 'list',
      autoComplete: 'off',
      onChange: (e) => {
        if (getInstance().props.invalidateOnFilter) {
          getInstance().selectOption(undefined);
        }
        getInstance().dispatch({
          type: 'filter',
          filter: e.target.value
        })
      },
      ...inputProps
    }
  }

  getInstance().getOptions = () => {
    if (getInstance().state.filter) {
      return getOptions().filter(optionInstance => getInstance().props.getOptionName ?
        getInstance().props.getOptionName(optionInstance.option) : optionInstance.option.name.startsWith(getInstance().state.filter))
    } else {
      return getOptions();
    }
  }
}