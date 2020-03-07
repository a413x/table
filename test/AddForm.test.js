import React from "react";
import {shallow,mount} from 'enzyme';

import AddForm from "../src/components/AddForm";
import data from './data.js';

describe('tests for AddForm component',() => {
  const tableColumns = data.tableColumns;
  const mockAddUser = jest.fn();
  const props = {
    columns: tableColumns,
    addUser: mockAddUser
  };
  const initialState = {
    showForm : false,
    inputsValid: Array(props.columns.length).fill(false)
  }

  const addFormContainer = shallow(<AddForm {...props} />);
  const instance = addFormContainer.instance();

  it('initialize with initial state',()=>{
    expect(addFormContainer.state()).toEqual(initialState);
    expect(instance.addingUser).toEqual({});
  });

  it('renders properly with showForm = false',()=>{
    expect(addFormContainer.find('form')).toHaveLength(0);
  });

  it('button add click, should change state correctly and show the form',()=>{
    addFormContainer.find('button').first().simulate('click');
    expect(addFormContainer.state()).toEqual({showForm:true,inputsValid:initialState.inputsValid});
    expect(instance.addingUser).toEqual({});
    expect(addFormContainer.find('form')).toHaveLength(1);
  });

  it('addingUserChange function call',()=>{
    jest.spyOn(instance,'addingUserChange');
    const field = 'id';
    const val = 123;
    const newAddingUser = {};
    newAddingUser[field] = val;
    instance.addingUserChange(field,val);
    expect(instance.addingUserChange).toHaveBeenCalledWith(field,val);
    expect(instance.addingUser).toEqual(newAddingUser);
  });

  describe('validationChange function call',()=>{
    jest.spyOn(instance,'validationChange');
    let ind = 0;
    let val = true;
    it('with valid value',()=>{
      instance.validationChange(ind,val);
      expect(instance.validationChange).toHaveBeenCalledWith(ind,val);
      expect(addFormContainer.state().inputsValid[ind]).toBe(true);
    });
    it('with invalid value',()=>{
      val = false;
      instance.validationChange(ind,val);
      expect(instance.validationChange).toHaveBeenCalledWith(ind,val);
      expect(addFormContainer.state().inputsValid[ind]).toBe(false);
    });
  });

  it('button add to table click, should call addUser from props',()=>{
    const addingUser = {id:123};
    instance.addingUser = addingUser;
    addFormContainer.find('.btn-success').simulate('click');
    expect(mockAddUser).toHaveBeenCalledWith(addingUser);
  });
});
