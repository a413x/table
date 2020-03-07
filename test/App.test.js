import React from "react";
import {shallow,mount} from 'enzyme';

import App from "../src/components/App";
import data from './data.js';

describe('tests for App component',() => {
  const appContainer = shallow(<App />);
  const instance = appContainer.instance();

  const initialState = {
    users:[],
    page:1,
    numberOfShownUsers:5,
    selectedUser:null,
    isLoading: false
  };

  const fakeData = data.fakeData;
  const tableColumns = data.tableColumns;

  it('renders properly',()=>{
    expect(appContainer).toMatchSnapshot();
  });

  it('initialize with initial state',()=>{
    expect(appContainer.state()).toEqual(initialState);
  });

  it('onLoadData function call',async ()=>{
    jest.spyOn(instance,'onLoadData');

    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeData)
      })
    );

    await instance.onLoadData('/');
    expect(instance.onLoadData).toHaveBeenCalledWith('/');
    expect(appContainer.state().users).toEqual(fakeData);
    expect(instance.usersCopy).toEqual(fakeData);
    expect(appContainer.state().isLoading).toBe(false);

    global.fetch.mockClear();
    delete global.fetch;
  });

  it('getShownData function call',()=>{
    jest.spyOn(instance,'getShownData');
    const numberOfUsers = 5;
    appContainer.setState({users:fakeData,numberOfShownUsers:numberOfUsers});
    const shownData = instance.getShownData(0);
    expect(instance.getShownData).toHaveBeenCalledWith(0);
    expect(shownData).toEqual(fakeData.slice(0,numberOfUsers));
  });

  describe('searchFunc function call',()=>{
    jest.spyOn(instance,'searchFunc');
    instance.usersCopy = fakeData;
    let searchStr;
    it('call searchFunc with "2", should find 1 row, users should equal fakeData[1]',()=>{
      searchStr = '2';
      instance.searchFunc(searchStr,tableColumns);
      expect(instance.searchFunc).toHaveBeenCalledWith('2',tableColumns);
      expect(appContainer.state().users).toEqual(fakeData.slice(1,2));
    });
    it('call searchFunc with "d", should find 2 rows, users should include fakeData[1] and fakeData[3]',()=>{
      searchStr = 'd';
      instance.searchFunc(searchStr,tableColumns);
      expect(instance.searchFunc).toHaveBeenCalledWith('d',tableColumns);
      expect(appContainer.state().users).toEqual(fakeData.slice(1,2).concat(fakeData.slice(3,4)));
    });
    it('call searchFunc with "z", should find 0 rows, users should equal []',()=>{
      searchStr = 'z';
      instance.searchFunc(searchStr,tableColumns);
      expect(instance.searchFunc).toHaveBeenCalledWith('z',tableColumns);
      expect(appContainer.state().users).toEqual([]);
    });
  });

  describe('sortFunc function call',()=>{
    jest.spyOn(instance,'sortFunc');
    let field;
    let order;
    it('sort users descending by id',()=>{
      appContainer.setState({users:fakeData});
      field = 'id';
      order = 'desc';
      const sortedData = [...fakeData].sort((a,b) => a[field] > b[field] ? -1 : 1)
      instance.sortFunc(field,order);
      expect(instance.sortFunc).toHaveBeenCalledWith(field,order);
      expect(appContainer.state().users).toEqual(sortedData);
    });
    it('sort users ascending by email',()=>{
      field = 'email';
      order = 'asc';
      const sortedData = [...fakeData].sort((a,b) => a[field] > b[field] ? 1 : -1)
      instance.sortFunc(field,order);
      expect(instance.sortFunc).toHaveBeenCalledWith(field,order);
      expect(appContainer.state().users).toEqual(sortedData);
    });
  });

  it('onPageChange function call',()=>{
    jest.spyOn(instance,'onPageChange');
    const page = 2;
    instance.onPageChange(page);
    expect(instance.onPageChange).toHaveBeenCalledWith(page);
    expect(appContainer.state().page).toBe(page);
  });

  it('onNumberShownChange function call',()=>{
    jest.spyOn(instance,'onNumberShownChange');
    const num = 10;
    instance.onNumberShownChange(num);
    expect(instance.onNumberShownChange).toHaveBeenCalledWith(num);
    expect(appContainer.state().page).toBe(1);
    expect(appContainer.state().numberOfShownUsers).toBe(num);
  });

  it('onRowClick function call',()=>{
    jest.spyOn(instance,'onRowClick');
    appContainer.setState({users:fakeData});
    const user = fakeData[3];
    expect(appContainer.find('SelectedUser')).toHaveLength(0);
    instance.onRowClick(user);
    expect(instance.onRowClick).toHaveBeenCalledWith(user);
    expect(appContainer.state().selectedUser).toEqual(user);
    expect(appContainer.find('SelectedUser')).toHaveLength(1);
  });

  it('addUser function call',()=>{
    jest.spyOn(instance,'addUser');
    const newUser = {id:7,firstName:'Z',lastName:'Z',email:'z@zz.zz',phone:'71111111111'};
    const newUsersArr = [...fakeData];
    newUsersArr.unshift(newUser);
    instance.addUser(newUser);
    expect(instance.addUser).toHaveBeenCalledWith(newUser);
    expect(appContainer.state().users).toEqual(newUsersArr);
  });

  afterAll(() => {
    appContainer.setState(initialState);
  });
});
