import { useGetLatest } from '.';

export default function useDual(instance) {

  const getInstance = useGetLatest(instance);

  const {
    selectedValue,
    props,
    getOptions
  } = getInstance();

  getInstance().getOptions = () => {
    if (selectedValue && Array.isArray(selectedValue)) {
      return getOptions().filter(optionInstance => !selectedValue.includes(props.getOptionValue ? props.getOptionValue(optionInstance.option) : optionInstance.option.value))
    } else {
      return getOptions();
    }
  }

  getInstance().getSelectedOptions = () => {
    if (selectedValue && Array.isArray(selectedValue)) {
      return props.options.filter(option => selectedValue.includes(props.getOptionValue ? props.getOptionValue(option) : option.value)).map(option => {
        return {
          option,
          getOptionProps: () => ({
            key: `${props.getOptionValue ? props.getOptionValue(option) : (option).value}`,
            role: 'option',
            onClick: () => {
              getInstance().selectOption(option);
            }
          })
        }
      })
    }
  }

}