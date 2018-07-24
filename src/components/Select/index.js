import React, { Component, Fragment, forwardRef } from 'react';
import { string, arrayOf, shape, func, bool, oneOfType, object } from 'prop-types';
import Downshift from 'downshift';
import styled from 'styled-components';
import DropDownIcon from 'icons/DropDownIcon';
import noop from 'utils/noop';
import { compose } from 'recompose';
import withAnimatedContainer from 'hoc/withAnimatedContainer';
import withErrorMessage from 'hoc/withErrorMessage';
import { orange, white, offWhite, gray, lightGray } from 'styles/colors';
import { fontWeight } from 'styles/fonts';

const ItemList = styled.div`
  position: absolute;
  width: 100%;
  z-index: 1;
  left: -1px;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.4);
`;

const Item = styled.div`
  border-left: 2px solid #fff;
  cursor: pointer;
  background-color: ${({ isActive }) => (isActive ? offWhite : white)};
  border-left-color: ${({ isActive }) => (isActive ? orange : white)};
  font-weight: ${({ isSelected }) =>
    isSelected ? fontWeight.bold : fontWeight.regular};
  width: 100%;
  &:hover,
  &:focus {
    background-color: ${offWhite};
    border-left-color: ${orange};
  }
  line-height: 32px;
  height: 32px;
`;

const ItemContent = styled.span`
  padding-left: 10px;
`;

const Button = styled.button`
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  padding: 12px;
  color: ${gray};
`;

const LeftSpan = styled.span`
  float: left;
  line-height: 24px;
  height: 24px;
`;

const RightSpan = styled.span`
  float: right;
`;

class Select extends Component {
  static propTypes = {
    innerRef: oneOfType([func, object]),
    id: string,
    itemList: arrayOf(shape({})).isRequired,
    selectedItem: shape({
      id: string,
      value: string,
    }),
    onChange: func.isRequired,
    onFocus: func,
    onBlur: func,
    required: bool,
  };

  static defaultProps = {
    id: null,
    onFocus: noop,
    onBlur: noop,
    selectedItem: null,
    required: false,
    innerRef: null,
  };

  render() {
    const {
      innerRef,
      itemList,
      selectedItem,
      onChange,
      onFocus,
      onBlur,
      id,
      required,
    } = this.props;

    return (
      <Fragment>
        <Downshift
          onChange={onChange}
          itemToString={item => (item !== null ? item.value : null)}
          id={id}
        >
          {({
            isOpen,
            getToggleButtonProps,
            getItemProps,
            highlightedIndex,
          }) => (
            <div
              style={{
                width: '100%',
                height: '48px',
              }}
            >
              <Button
                {...getToggleButtonProps({
                  onFocus,
                  onBlur,
                  'data-required': required,
                  'data-name': id,
                })}
                innerRef={innerRef}
                value={selectedItem !== null ? selectedItem.value : ''}
              >
                <LeftSpan>{`${
                  selectedItem !== null ? selectedItem.value : ''
                }`}</LeftSpan>
                <RightSpan>
                  <DropDownIcon color={lightGray} size={24} />
                </RightSpan>
              </Button>
              <div>
                {isOpen && (
                  <ItemList>
                    {itemList.map((item, index) => (
                      <Item
                        {...getItemProps({
                          item,
                          isActive: highlightedIndex === index,
                        })}
                        key={item.id}
                      >
                        <ItemContent>{item.value}</ItemContent>
                      </Item>
                    ))}
                  </ItemList>
                )}
              </div>
            </div>
          )}
        </Downshift>
      </Fragment>
    );
  }
}

const SelectWithRef = forwardRef((props, ref) => (
  <Select {...props} innerRef={ref} />
));

const EnhancedComp = compose(
  withErrorMessage,
  withAnimatedContainer
)(SelectWithRef);

export default EnhancedComp;