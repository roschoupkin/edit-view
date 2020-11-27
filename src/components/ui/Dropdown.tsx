import React, { useCallback, useEffect, useRef, useState, FC, ReactNode } from 'react';

import { createUseStyles } from 'react-jss';

import { handleEvent } from '@utils/events';

import Overlay, { OverlayProps } from './Overlay';

interface DropdownProps extends OverlayProps {
  overlay: ReactNode;
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

  const elementRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

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
      <div ref={elementRef}>{children}</div>
      <Overlay open={open || isOpen} {...overlayProps}>
        {overlay}
      </Overlay>
    </div>
  );
};

export default Dropdown;
