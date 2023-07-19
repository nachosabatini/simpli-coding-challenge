import React, {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  Ref,
  forwardRef,
} from 'react';
import styled, { css } from 'styled-components';

type InputTypes = 'text' | 'tel' | 'password' | 'number' | 'email' | 'file';
type InputElementProps = InputHTMLAttributes<HTMLInputElement>;
type TextareaElementProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

interface InputProps<T extends InputTypes | 'textarea'> {
  type: T;
  label?: string;
  id?: string;
  name?: string;
  required?: boolean;
  placeholder?: string;
  accept?: string;
  value?: T extends 'textarea' ? string : string | number;
  onChange?: T extends 'textarea'
    ? (event: React.ChangeEvent<HTMLTextAreaElement>) => void
    : (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 8px;
`;

const sharedInputStyles = css`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

const StyledInput = styled.input`
  ${sharedInputStyles}
`;

const StyledTextarea = styled.textarea`
  ${sharedInputStyles}
  resize: none;
`;

const Input = forwardRef(
  <T extends InputTypes | 'textarea'>(
    { type, label, ...props }: InputProps<T>,
    ref: Ref<T extends 'textarea' ? HTMLTextAreaElement : HTMLInputElement>
  ) => {
    return (
      <InputContainer>
        {label && <Label>{label}</Label>}
        {type === 'textarea' ? (
          <StyledTextarea
            ref={ref as Ref<HTMLTextAreaElement>}
            {...(props as TextareaElementProps)}
          />
        ) : (
          <StyledInput
            type={type}
            ref={ref as Ref<HTMLInputElement>}
            {...(props as InputElementProps)}
          />
        )}
      </InputContainer>
    );
  }
);

Input.displayName = 'Input';
export default Input;
