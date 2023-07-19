import React, { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'toggled';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isActive?: boolean;
}

const sharedButtonStyles = css`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
`;

const PrimaryButton = styled.button`
  ${sharedButtonStyles}
  background-color: #903df7;
  color: white;

  &:hover {
    background-color: #7a2fc5;
  }
`;

const SecondaryButton = styled.button`
  ${sharedButtonStyles}
  background-color: #f0f0f0;
  color: black;

  &:hover {
    background-color: #d8d8d8;
  }
`;

const DangerButton = styled.button`
  ${sharedButtonStyles}
  background-color: #f44336;
  color: white;

  &:hover {
    background-color: #e53935;
  }
`;

const ToggledButton = styled.button<{ isActive?: boolean }>`
  ${sharedButtonStyles}
  background-color: ${(props) => (props.isActive ? '#903df7' : 'white')};
  color: ${(props) => (props.isActive ? 'white' : '#903df7')};
  border: 1px solid #903df7;
  ${(props) =>
    props.isActive &&
    css`
      background-color: #903df7;
      color: white;
    `}
`;

const Button: React.FC<ButtonProps> = ({
  isActive,
  variant = 'primary',
  ...props
}) => {
  switch (variant) {
    case 'secondary':
      return <SecondaryButton {...props} />;
    case 'danger':
      return <DangerButton {...props} />;
    case 'toggled':
      return <ToggledButton {...props} isActive={isActive} />;
    default:
      return <PrimaryButton {...props} />;
  }
};

export default Button;
