import React, { FC } from 'react';

import cx from 'classnames';
import { createUseStyles } from 'react-jss';

import { Theme } from '@styles/types';

export type Placement =
  | 'topLeft'
  | 'top'
  | 'topRight'
  | 'left'
  | 'leftTop'
  | 'right'
  | 'rightTop'
  | 'bottomLeft'
  | 'bottom'
  | 'bottomRight';

interface OverlayStylesProp {
  withArrow: boolean;
  offset: number;
}

export interface OverlayProps extends Partial<OverlayStylesProp> {
  placement?: Placement;
  open?: boolean;
}

const useStyles = createUseStyles((theme: Theme) => {
  const renderOffset = ({ offset }: OverlayStylesProp) => `calc(100% + ${offset}px)`;
  const arrowCommonStyles = {
    top: {
      bottom: -8,
      borderTopWidth: 8,
      borderBottomWidth: 0,
      borderTopColor: theme.colorBg,
    },
    bottom: {
      top: -8,
      borderTopWidth: 0,
      borderBottomWidth: 8,
      borderBottomColor: theme.colorBg,
    },
    left: {
      right: -8,
      borderLeftWidth: 8,
      borderRightWidth: 0,
      borderLeftColor: theme.colorBg,
    },
    right: {
      left: -8,
      borderRightWidth: 8,
      borderLeftWidth: 0,
      borderRightColor: theme.colorBg,
    },
  };

  return {
    root: {
      'position': 'absolute',
      'display': 'block',
      'borderRadius': 2,
      'backgroundColor': theme.colorBg,
      'zIndex': 1,

      '&::after': {
        content: '""',
        position: 'absolute',
        display: ({ withArrow }: OverlayStylesProp) => (withArrow ? 'block' : 'none'),
        borderWidth: 8,
        borderStyle: 'solid',
        borderColor: 'transparent',
        zIndex: 1,
      },
    },
    topLeft: {
      'bottom': renderOffset,
      'left': 0,

      '&::after': {
        ...arrowCommonStyles.top,
        left: 12,
      },
    },
    top: {
      'bottom': renderOffset,
      'left': '50%',
      'transform': 'translateX(-50%)',

      '&::after': {
        ...arrowCommonStyles.top,
        left: '50%',
        transform: 'translateX(-50%)',
      },
    },
    topRight: {
      'bottom': renderOffset,
      'right': 0,

      '&::after': {
        ...arrowCommonStyles.top,
        right: 12,
      },
    },
    left: {
      'top': '50%',
      'transform': 'translateY(-50%)',
      'right': renderOffset,

      '&::after': {
        ...arrowCommonStyles.left,
        top: '50%',
        transform: 'translateY(-50%)',
      },
    },
    leftTop: {
      'top': 0,
      'right': renderOffset,

      '&::after': {
        ...arrowCommonStyles.left,
        top: 12,
      },
    },
    right: {
      'top': '50%',
      'transform': 'translateY(-50%)',
      'left': renderOffset,

      '&::after': {
        ...arrowCommonStyles.right,
        top: 12,
      },
    },
    rightTop: {
      'top': 0,
      'left': renderOffset,

      '&::after': {
        ...arrowCommonStyles.right,
        top: 12,
      },
    },
    bottomLeft: {
      'top': renderOffset,
      'left': 0,

      '&::after': {
        ...arrowCommonStyles.bottom,
        left: 12,
      },
    },
    bottom: {
      'top': renderOffset,
      'left': '50%',
      'transform': 'translateX(-50%)',

      '&::after': {
        ...arrowCommonStyles.bottom,
        left: '50%',
        transform: 'translateX(-50%)',
      },
    },
    bottomRight: {
      'top': renderOffset,
      'right': 0,

      '&::after': {
        ...arrowCommonStyles.bottom,
        right: 12,
      },
    },
  };
});

const Overlay: FC<OverlayProps> = ({ placement = 'bottom', offset = 0, children, withArrow, open }) => {
  const classes = useStyles({ offset, withArrow });
  if (!open) {
    return null;
  }
  return <div className={cx(classes.root, classes[placement])}>{children}</div>;
};

export default Overlay;
