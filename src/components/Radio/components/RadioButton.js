import React, { PureComponent } from 'react';
import { bool, func, node, string, oneOf } from 'prop-types';
import styled, { css } from 'styled-components';
import { rgba } from 'polished';

import noop from 'utils/noop';
import { nobel, primary, mineShaft } from 'styles/colors';
import { primaryFonts } from 'styles/fonts';

const Radio = styled.span`
  display: inline-block;
  box-sizing: border-box;
  width: 16px;
  height: 16px;
  padding: 2px;
  border: 1px solid ${nobel.main};
  margin-right: 0.2em;
  border-radius: 50%;
  vertical-align: middle;
`;

const Text = styled.span`
  display: inline-block;
  font-family: ${primaryFonts};
`;

const Label = styled.label`
  cursor: pointer;

  input {
    position: absolute;
    overflow: hidden;
    width: 1px;
    height: 1px;
    padding: 0;
    border: 0;
    margin: -1px;
    clip: rect(0, 0, 0, 0);
  }

  span {
    vertical-align: middle;
  }
  
  /* layout */
  ${({ block }) =>
    block &&
    css`
      display: flex;
    `};
  
  /* type */
  ${({ variant }) =>
    variant === 'list' &&
    css`
      border: 1px solid ${nobel['200']};
      padding: 0.75em;
      margin: 0.5em 0;
      line-height: 1.5em;
      align-items: center;
    `}

  &:hover ${/* sc-selector */ Radio},
  & > input:focus ~ ${/* sc-selector */ Radio} {
    border: 1px solid ${nobel.main};
  }
  
  &:hover > input:not(:checked):not(:disabled) ~ ${/* sc-selector */ Radio}, 
  &:active > input:not(:checked):not(:disabled) ~ ${/* sc-selector */ Radio} {
    border: 1px solid ${mineShaft['900']};
  }
  
  &:active > input:not(:checked):not(:disabled) ~ ${/* sc-selector */ Radio}, 
  & > input:focus:not(:checked):not(:disabled) ~ ${/* sc-selector */ Radio} {
    box-shadow: 0 0 0 4px ${rgba(nobel.main, 0.2)};
  }

  & > input:disabled ~ ${/* sc-selector */ Radio}, 
  & > input:disabled ~ ${/* sc-selector */ Text} {
    opacity: 0.5;
  }

  & > input:checked ~ ${/* sc-selector */ Radio}:before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background: ${primary.main};
    border-radius: 50%;
  }
  
  /* stylelint-disable no-descending-specificity */
  ${props =>
    props.disabled &&
    css`
      cursor: not-allowed;
      &:hover ${/* sc-selector */ Radio} {
        box-shadow: none;
      }
    `}
`;

const Button = styled.label`
  padding: 1em;
  margin: 0.8em 0;
  border: 2px solid ${nobel['200']};
  border-radius: 5px;
  background-color: #fff;
  cursor: pointer;

  input {
    position: absolute;
    overflow: hidden;
    width: 1px;
    height: 1px;
    padding: 0;
    border: 0;
    margin: -1px;
    clip: rect(0, 0, 0, 0);
  }

  span {
    vertical-align: middle;
  }

  /* layout */
  ${({ block }) =>
    block &&
    css`
      display: flex;
    `};

  & ${/* sc-selector */ Text} {
    color: ${nobel.main};
    font-weight: 700;
  }

  &:hover,
  &:active {
    background-color: ${nobel['100']};
  }

  &:active,
  &:focus {
    box-shadow: 0 0 0 4px ${rgba(nobel.main, 0.2)};
  }

  ${({ checked }) =>
    checked &&
    css`
      border: 2px solid ${primary.main};

      & ${/* sc-selector */ Text} {
        color: ${primary.main};
      }

      &:hover,
      &:active {
        background-color: ${primary.main};
      }

      &:hover
        > ${/* sc-selector */ Text},
        &:active
        > ${/* sc-selector */ Text} {
        color: #fff;
      }

      &:active,
      &:focus {
        box-shadow: 0 0 0 4px ${rgba(primary.main, 0.2)};
      }
    `};
`;

class RadioButton extends PureComponent {
  static displayName = 'Radio';

  static propTypes = {
    children: node,
    name: string,
    value: string.isRequired, // eslint-disable-line react/no-typos
    checked: bool,
    onChange: func,
    disabled: bool,
    block: bool,
    variant: oneOf(['default', 'list', 'toggle']),
  };

  static defaultProps = {
    children: null,
    name: null,
    onChange: noop,
    checked: false,
    disabled: false,
    block: false,
    variant: 'default',
  };

  render() {
    const {
      children,
      checked,
      name,
      onChange,
      value,
      variant,
      disabled,
      block,
      ...rest
    } = this.props;

    const Comp = variant !== 'toggle' ? Label : Button;
    return (
      <Comp
        {...rest}
        checked={checked}
        variant={variant}
        block={block}
        disabled={disabled}
      >
        <input
          type="radio"
          name={name}
          onChange={onChange}
          checked={checked}
          value={value}
          disabled={disabled}
        />
        {variant !== 'toggle' && <Radio />} <Text>{children}</Text>
      </Comp>
    );
  }
}

export default RadioButton;
