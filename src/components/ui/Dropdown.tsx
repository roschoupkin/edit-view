import React, { useCallback, useEffect, FC } from 'react';

import { createUseStyles } from 'react-jss';

import { handleEvent } from '@utils/events';

import Overlay, { OverlayProps } from './Overlay';

interface DropdownProps extends OverlayProps {
  overlay: React.ReactNode;
  onClickInside?(): void;
  onClickOutside?(): void;
}

const useStyles = createUseStyles({
  root: {
    position: 'relative',
  },
});

const Dropdown: FC<DropdownProps> = ({ children, overlay, open, onClickInside, onClickOutside, ...overlayProps }) => {
  const classes = useStyles();

  const elementRef = React.useRef<HTMLSpanElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = React.useState(false);

  const handleDocumentClick = useCallback(
    (e: MouseEvent) => {
      const target = e.target as Node;
      const { current: element } = elementRef;
      const { current: container } = containerRef;

      if (element?.contains(target)) {
        if (typeof open !== 'boolean') {
          setIsOpen(!isOpen);
        }
        handleEvent(onClickInside);
      } else if (!container?.contains(target)) {
        if (typeof open !== 'boolean') {
          setIsOpen(false);
        }
        handleEvent(onClickOutside);
      }
    },
    [isOpen, elementRef, containerRef, onClickInside, onClickOutside]
  );

  useEffect(() => {
    window.addEventListener('click', handleDocumentClick);
    return () => {
      window.removeEventListener('click', handleDocumentClick);
    };
  }, [handleDocumentClick]);

  return (
    <div className={classes.root} ref={containerRef}>
      <span ref={elementRef}>{children}</span>
      <Overlay open={open || isOpen} {...overlayProps}>
        {overlay}
      </Overlay>
    </div>
  );
};

export default Dropdown;
