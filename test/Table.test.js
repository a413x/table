import React from "react";
import {shallow,mount} from 'enzyme';

import Table from "../src/components/Table";
import data from './data.js';

describe('tests for Table component',()=>{
  const tableColumns = data.tableColumns;
  const fakeData = data.fakeData;
  const mockOnRowClick = jest.fn();

  const props = {
    data: fakeData,
    columns: tableColumns,
    sortFunc: () => {},
    onRowClick: mockOnRowClick
  };

  const tableContainer = shallow(<Table {...props}/>);

  it('renders properly',()=>{
    expect(tableContainer).toMatchSnapshot();
  });

  it('onRowClick called when clicked on a row',()=>{
    tableContainer.find('tr').first().simulate('click');
    expect(mockOnRowClick).toHaveBeenCalledTimes(1);
  });
});
