import React from "react";
import {shallow,mount} from 'enzyme';

import PagesNav from "../src/components/PagesNav";

describe('tests for PagesNav component',() => {
  const mockonPageChange = jest.fn();
  const mockOnNumberShownChange = jest.fn();
  const props = {
    pages: 2,
    currentPage: 1,
    onPageChange: mockonPageChange,
    onNumberShownChange: mockOnNumberShownChange
  };

  const pagesNavContainer = shallow(<PagesNav {...props} />);

  it('renders properly',()=>{
    expect(pagesNavContainer).toMatchSnapshot();
  });

  it('pageChange called on input',()=>{
    const nextPage = 2;
    pagesNavContainer.find('#pageInput').simulate('change',{
      target:{value:nextPage}
    });
    expect(mockonPageChange).toHaveBeenCalledWith(nextPage);
  });

  it('pageChange called on button prev',()=>{
    pagesNavContainer.find('button').first().simulate('click');
    expect(mockonPageChange).toHaveBeenCalledWith(0);
  });

  it('pageChange called on button next',()=>{
    pagesNavContainer.find('button').last().simulate('click');
    expect(mockonPageChange).toHaveBeenCalledWith(2);
  });

  it('onNumberShownChange called on select change',()=>{
    pagesNavContainer.find('select').simulate('change',{
      target:{value:10}
    });
    expect(mockOnNumberShownChange).toHaveBeenCalledWith(10);
  });
});
