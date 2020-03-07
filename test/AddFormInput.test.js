import React from "react";
import {shallow,mount} from 'enzyme';

import AddFormInput from "../src/components/AddFormInput";
import data from './data.js';

describe('tests for AddFormInput component',() => {
  const tableColumns = data.tableColumns;
  const mockAddingUserChange = jest.fn();
  const mockValidationChange = jest.fn();
  const props = {
    index: 0,
    col: tableColumns[0],
    valid: false,
    addingUserChange: mockAddingUserChange,
    validationChange: mockValidationChange
  };

  const addInputContainer = shallow(<AddFormInput {...props} />);

  it('renders properly',()=>{
    expect(addInputContainer).toMatchSnapshot();
  });

  it('renders properly with valid prop = true',()=>{
    let nextProps = props;
    nextProps.valid = true;
    expect(addInputContainer.find('input').hasClass('is-invalid'));
    const nextAddInputContainer = shallow(<AddFormInput {...nextProps} />);
    expect(nextAddInputContainer.find('input').hasClass('is-valid'));
  });

  describe('input change called',()=>{
    it('with invalid value',()=>{
      addInputContainer.find('input').simulate('change',{
        target:{value:''}
      });
      expect(mockAddingUserChange).toHaveBeenCalledTimes(0);
      expect(mockValidationChange).toHaveBeenCalledWith(props.index,false);
    });
    it('with valid value',()=>{
      addInputContainer.find('input').simulate('change',{
        target:{value:'123'}
      });
      expect(mockAddingUserChange).toHaveBeenCalledWith(props.col.field,123);
      expect(mockValidationChange).toHaveBeenCalledWith(props.index,true);
    });
  });
});
