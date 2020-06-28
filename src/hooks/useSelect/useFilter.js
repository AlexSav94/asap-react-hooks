import React, { useState, useEffect } from 'react';
import { loopPropGetters } from '.';

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

  instance.hooks.reducers = instance.hooks.reducers ? [...instance.hooks.reducers, reducer] : [reducer];

  instance.hooks.useInstance = instance.hooks.useInstance ? [...instance.hooks.useInstance, useInstance] : [useInstance];
}

function useInstance(instance) {

  const getOptions = instance.getOptions;

  instance.getInputProps = () => {

    const inputProps = instance.hooks.getInputProps ? loopPropGetters(instance.hooks.getInputProps) : {};

    return {
      'aria-autocomplete': 'list',
      autoComplete: 'off',
      onChange: (e) => {
        if (instance.props.invalidateOnFilter) {
          instance.selectOption(undefined);
        }
        instance.dispatch({
          type: 'filter',
          filter: e.target.value
        })
      },
      ...inputProps
    }
  }

  instance.getOptions = () => {
    if (instance.state.filter) {
      return getOptions().filter(optionInstance => instance.props.getOptionName ?
        instance.props.getOptionName(optionInstance.option) : optionInstance.option.name.startsWith(instance.state.filter))
    } else {
      return getOptions();
    }
  }
}