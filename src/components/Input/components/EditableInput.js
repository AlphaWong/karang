import React, { Component, forwardRef } from 'react';
import { func, string, bool, shape } from 'prop-types';
import styled from 'styled-components';
import { compose } from 'recompose';

import noop from 'utils/noop';
import { offWhite, orange } from 'styles/colors';
import withAnimatedContainer from 'hoc/withAnimatedContainer';
import withErrorMessage from 'hoc/withErrorMessage';
import TextInput from 'components/Input/components/TextInput'; // eslint-disable-line import/no-named-as-default, import/no-named-as-default-member
import ButtonContainer from './ButtonContainer';
import NoneditableDisplay from './NoneditableDisplay';

const EditableInputContainer = styled.div`
  display: flex;
  width: 400px;
  border: 1px solid ${offWhite};
  &:focus-within {
    border-color: ${orange};
  }
  [class^='withErrorMessage__ScWrappedComponent'] {
    border-color: transparent;
  }
`;

const EnhancedTextInput = compose(
  withErrorMessage,
  withAnimatedContainer
)(TextInput);

class EditableInput extends Component {
  static propTypes = {
    value: string,
    isEditable: bool,
    innerRef: func,
    type: string,
    label: string,
    error: string,
    onChange: func,
    onSave: func,
    onCancel: func,
    saveBtnText: string,
    editBtnText: string,
    cancelBtnText: string,
    style: shape({}),
    className: string,
  };

  static defaultProps = {
    value: '',
    isEditable: false,
    innerRef: noop,
    type: 'text',
    label: '',
    error: null,
    onChange: noop,
    onSave: noop,
    onCancel: noop,
    saveBtnText: 'Save',
    editBtnText: 'Edit',
    cancelBtnText: 'Cancel',
    style: {},
    className: '',
  };

  state = {
    value: this.props.value,
    lastSavedValue: this.props.value,
    isEditable: this.props.isEditable,
  };

  componentDidUpdate = (_, prevState) => {
    if (!prevState.isEditable) {
      this.focusTextInput();
    }
  };

  onSaveButtonClick = e => {
    this.props.onSave(this.state.value);
    this.setState({
      isEditable: !this.state.isEditable,
    });
  };

  onEditButtonClick = e => {
    this.setState({
      isEditable: !this.state.isEditable,
      lastSavedValue: this.state.value,
    });
  };

  onCancelButtonClick = e => {
    this.props.onCancel(this.state.lastSavedValue);
    this.setState({
      value: this.state.lastSavedValue,
      isEditable: !this.state.isEditable,
    });
    e.target.blur();
  };

  onInputChange = e => {
    const {
      target: { value },
    } = e;
    this.props.onChange(e);
    this.setState({ value });
  };

  getReference = node => {
    const { innerRef } = this.props;
    if (innerRef) {
      if (typeof innerRef === 'function') {
        innerRef(node);
      } else {
        innerRef.current = node;
      }
    }
  };

  getInputReference = node => {
    this.input = node;
  };

  focusTextInput = () => {
    this.input.focus();
    this.input.setSelectionRange(
      this.input.value.length,
      this.input.value.length
    );
  };

  render() {
    const { isEditable, value } = this.state;
    const {
      innerRef,
      type,
      label,
      error,
      onChange,
      value: _,
      onCancel,
      onSave,
      saveBtnText,
      editBtnText,
      cancelBtnText,
      style,
      className,
      ...remainProps
    } = this.props;
    return (
      <EditableInputContainer
        style={style}
        className={className}
        ref={this.getReference}
      >
        {isEditable ? (
          <EnhancedTextInput
            isEditable={isEditable}
            label={isEditable ? label : ''}
            value={value}
            innerRef={this.getInputReference}
            onChange={this.onInputChange}
            {...remainProps}
          />
        ) : (
          <NoneditableDisplay value={value} {...remainProps} />
        )}
        <ButtonContainer
          isEditable={isEditable}
          saveBtnText={saveBtnText}
          cancelBtnText={cancelBtnText}
          editBtnText={editBtnText}
          onSaveButtonClick={this.onSaveButtonClick}
          onEditButtonClick={this.onEditButtonClick}
          onCancelButtonClick={this.onCancelButtonClick}
          innerRef={node => {
            this.editButton = node;
          }}
        />
      </EditableInputContainer>
    );
  }
}

export default forwardRef((props, ref) => (
  <EditableInput innerRef={ref} {...props} />
));