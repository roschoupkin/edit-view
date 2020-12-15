import React, { FC } from 'react';

import { createUseStyles } from 'react-jss';

import { createBoxShadow } from '@styles/theme';
import { Theme } from '@styles/types';

export interface PaperProp {
  width?: number;
}

const useStyles = createUseStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.colorBgPopup,
    boxShadow: createBoxShadow(theme.boxShadows.normal),
    borderRadius: theme.borderRadius,
  },
}));

const Paper: FC<PaperProp> = (props) => {
  const { children, ...paperProps } = props;
  const classes = useStyles(props);

  return (
    <div className={classes.root} {...paperProps}>
      {children}
    </div>
  );
};

export default Paper;
