import React from "react";
import {shallow,mount} from 'enzyme';

import TableHead from "../src/components/TableHead";
import data from './data.js';

describe('tests for TableHead component',() => {
  const initialState = {
    activeCol: {field:'',order:'asc'}
  };
  const tableColumns = data.tableColumns;
  const mockSortFunc = jest.fn();
  const props = {
    columns: tableColumns,
    sortFunc: mockSortFunc
  };

  const thContainer = shallow(<TableHead {...props} />);

  it('renders properly',()=>{
    expect(thContainer).toMatchSnapshot();
  });

  it('initialize with initial state',()=>{
    expect(thContainer.state()).toEqual(initialState);
  });

  describe('clicked on a th',()=>{
    const field = 'id';
    it('clicked once, headerClick should called, th should have class "asc"',()=>{
      thContainer.find('th').first().simulate('click');
      const currState = thContainer.state().activeCol;
      expect(currState).toEqual({field:field,order:'asc'});
      expect(mockSortFunc).toHaveBeenCalledWith(currState.field,currState.order);
      expect(thContainer.find('th').first().hasClass(currState.order)).toBe(true);
    });
    it('clicked twise, headerClick should called, th should have class "desc"',()=>{
      thContainer.find('th').first().simulate('click');
      const currState = thContainer.state().activeCol;
      expect(currState).toEqual({field:field,order:'desc'});
      expect(mockSortFunc).toHaveBeenCalledWith(currState.field,currState.order);
      expect(thContainer.find('th').first().hasClass(currState.order)).toBe(true);
    });
  });

  afterAll(() => {
    thContainer.setState(initialState);
  });
});
