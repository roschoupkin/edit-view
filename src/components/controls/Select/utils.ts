import { Option } from '../index';

export const prepareOption = (option: string | Option) =>
  typeof option === 'object' ? option : { value: option, label: option.toString() };

export const prepareOptionSet = (set: Set<string>, option: string | Option) => set.add(typeof option === 'object' ? option.value : option);
