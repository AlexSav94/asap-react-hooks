import React from 'react';

export interface FieldProps<V> {
  name: string;
  initialValue?: V;
  onChange?: (fieldName: string, value: V) => void;
  touched?: boolean;
  error?: string;
  isLoading?: boolean;
}

function applyDefaults<V, T extends FieldProps<V>>(props: T) {}

export const useField = <V, T extends FieldProps<V>>(props: T, ...hooks: any) => {

}