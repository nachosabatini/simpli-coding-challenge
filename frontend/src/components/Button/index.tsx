import { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'toggled'
  | 'pagination';

interface SharedButtonStyles {
  isActive?: boolean;
  isDisabled?: boolean;
}

const sharedButtonStyles = css<SharedButtonStyles>`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: ${(props) => (props.isDisabled ? 'not-allowed' : 'pointer')};
  font-size: 14px;
  font-weight: bold;

  ${(props) =>
    props.isActive &&
    css`
      background-color: #903df7;
      color: white;
    `}

  ${(props) =>
    props.isDisabled &&
    css`
      opacity: 0.6;
      pointer-events: none;
    `}
`;

const PrimaryButton = styled.button<SharedButtonStyles>`
  ${sharedButtonStyles}
  background-color: #903df7;
  color: white;

  &:hover {
    background-color: #7a2fc5;
  }
`;

const SecondaryButton = styled.button<SharedButtonStyles>`
  ${sharedButtonStyles}
  background-color: #f0f0f0;
  color: black;

  &:hover {
    background-color: #d8d8d8;
  }
`;

const DangerButton = styled.button<SharedButtonStyles>`
  ${sharedButtonStyles}
  background-color: #f44336;
  color: white;

  &:hover {
    background-color: #e53935;
  }
`;

const ToggledButton = styled.button<SharedButtonStyles>`
  ${sharedButtonStyles}
  background-color: ${(props) => (props.isActive ? '#903df7' : 'white')};
  color: ${(props) => (props.isActive ? 'white' : '#903df7')};
  border: 1px solid #903df7;

  &:hover {
    background-color: #903df7;
    color: white;
  }
`;

const PaginationButtonVariant = styled.button<SharedButtonStyles>`
  ${sharedButtonStyles}
  margin: 0 5px;
  background-color: ${(props) => (props.isActive ? '#903df7' : 'white')};
  color: ${(props) => (props.isActive ? 'white' : '#903df7')};
  border: 1px solid #903df7;
`;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  isActive?: boolean;
  isDisabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  isActive,
  variant = 'primary',
  isDisabled = false,
  ...props
}) => {
  switch (variant) {
    case 'secondary':
      return (
        <SecondaryButton
          {...props}
          isActive={isActive}
          isDisabled={isDisabled}
        />
      );
    case 'danger':
      return (
        <DangerButton {...props} isActive={isActive} isDisabled={isDisabled} />
      );
    case 'toggled':
      return (
        <ToggledButton {...props} isActive={isActive} isDisabled={isDisabled} />
      );
    case 'pagination':
      return (
        <PaginationButtonVariant
          {...props}
          isActive={isActive}
          isDisabled={isDisabled}
        />
      );
    default:
      return (
        <PrimaryButton {...props} isActive={isActive} isDisabled={isDisabled} />
      );
  }
};

export default Button;
