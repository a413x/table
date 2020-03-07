import React from "react";
import {shallow,mount} from 'enzyme';

import SelectedUser from "../src/components/SelectedUser";
import data from './data.js';

describe('tests for SelectedUser component',() => {
  const fakeData = data.fakeData;
  const mockUnselectRow = jest.fn();
  const props = {
    user: fakeData[0],
    unselectRow: mockUnselectRow
  };

  it('renders properly without full description',()=>{
    const selectdContainer = shallow(<SelectedUser {...props} />);
    expect(selectdContainer.find('p')).toHaveLength(1);
  });

  it('renders properly with full description',()=>{
    let newProps = props;
    newProps.user.description = 'abc';
    newProps.user.address = {
      streetAddress: '',
      city: '',
      state: '',
      zip:1
    }
    const selectdContainer = shallow(<SelectedUser {...newProps} />);
    expect(selectdContainer.find('p')).toHaveLength(6);
  });

  it('unselect button clicked, unselectRow should called',()=>{
    const selectdContainer = shallow(<SelectedUser {...props} />);
    selectdContainer.find('button').simulate('click');
    expect(mockUnselectRow).toHaveBeenCalledTimes(1);
  });
});
