import React, { useState, useEffect } from 'react';
import { useGetLatest } from '.';

function reducer(state, action) {
  switch(action.type) {
    case 'filter': 
      return {
        ...state,
        filter: action.filter
      }
  }
}

export default function useFilter(instance) {

  const getInstance = useGetLatest(instance);

  getInstance().hooks.reducers = getInstance().hooks.reducers ? [...getInstance().hooks.reducers, reducer] : [reducer];

  const getOptions = getInstance().getOptions;
  
  getInstance().getInputProps = () => ({
    'aria-autocomplete': 'list',
    autoComplete: 'off',
    onChange: (e) => {
      getInstance().dispatch({
        type: 'filter',
        filter: e.target.value
      })
    }
  })

  getInstance().getOptions = () => {
    if (getInstance().state.filter) {
      return getOptions().filter(option => option.option.label.startsWith(getInstance().state.filter))
    } else {
      return getOptions();
    }
  }

}
