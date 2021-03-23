import React, { FC, ReactNode } from 'react';

import { Schema } from '@editor/types';
import { getEditor } from '@editor/utils';

type ViewModelField = (props?: object) => ReactNode;
type ViewModel<Name extends string = string> = Record<Name, ViewModelField>;

interface EditorProps {
  children?: ReactNode;
}

export const createUseSchema = <Name extends string = string>(schema: Schema<Name>) => () =>
  Object.entries(schema).reduce((view, [name, property]) => {
    const Editor = getEditor(property);
    return { ...view, [name]: () => <Editor /> };
  }, {} as ViewModel<Name>);

const EditView: FC<EditorProps> = ({ children }) => {
  return <>{children}</>;
};

export default EditView;
