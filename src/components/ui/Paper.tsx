import React, { FC } from 'react';

import { createUseStyles } from 'react-jss';

import { createBoxShadow } from '@styles/theme';
import { Theme } from '@styles/types';

export interface PaperProps {
  width?: number;
}

const useStyles = createUseStyles((theme: Theme) => ({
  root: {
    width: ({ width }: PaperProps) => width ?? '100%',
    backgroundColor: theme.colorBgPopup,
    boxShadow: createBoxShadow(theme.boxShadows.normal),
    borderRadius: theme.borderRadius,
    overflow: 'hidden',
  },
}));

const Paper: FC<PaperProps> = (props) => {
  const { children, ...paperProps } = props;
  const classes = useStyles(props);

  return (
    <div className={classes.root} {...paperProps}>
      {children}
    </div>
  );
};

export default Paper;
