import React, { forwardRef } from 'react';
import { string } from 'prop-types';
import styled, { css } from 'styled-components';

import { orange, black } from 'styles/colors';
import { primaryFonts, fontSize } from 'styles/fonts';

const InputField = styled.input`
  border: none;
  color: ${black};
  caret-color: ${orange};
  font-size: ${fontSize.regular};
  font-family: ${primaryFonts};
  line-height: 20px;
  padding: 14px 8px;
  width: 100%;
  resize: none;
  outline: none;

  ${({ label }) =>
    Boolean(label) &&
    css`
      &::placeholder {
        color: transparent;
      }
    `};
`;

const TextInput = forwardRef(
  (
    { innerRef, type, name, autoComplete, label, placeholder, ...remainProps },
    ref
  ) => (
    <InputField
      innerRef={ref}
      type={type}
      name={name}
      autoComplete={autoComplete}
      label={label}
      placeholder={placeholder}
      {...remainProps}
    />
  )
);

TextInput.propTypes = {
  type: string,
  name: string.isRequired, // eslint-disable-line react/no-typos
  autoComplete: string,
  label: string,
  placeholder: string,
};

TextInput.defaultProps = {
  type: 'text',
  // autocomplete=off is ignored on non-login INPUT elements
  // https://bugs.chromium.org/p/chromium/issues/detail?id=468153#c164
  autoComplete: 'new-password',
  label: '',
  placeholder: string,
};

export default TextInput;
