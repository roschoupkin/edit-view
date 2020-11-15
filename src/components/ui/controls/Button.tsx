import React, { ButtonHTMLAttributes, FC } from 'react';

type BaseButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<BaseButtonProps> = ({ children, ...props }) => <button {...props}>{children}</button>;

export default Button;
