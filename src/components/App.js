import React, { Component } from "react";

import Search from './Search.js';
import Table from './Table.js';
import PagesNav from './PagesNav.js';
import SelectedUser from './SelectedUser.js';
import AddForm from './AddForm.js';
import LoadData from './LoadData.js';

//Колонки таблицы
//field - ключ данных в базе данных,
//title - имя колонки в шапке таблицы,
//type - тип данных для валидации при добавлении строки
const tableColumns = [{field:'id',title:'#',type:'number'},
  {field:'firstName',title:'First name',type:'text'},
  {field:'lastName',title:'Last name',type:'text'},
  {field:'email',title:'E-mail',type:'email'},
  {field:'phone',title:'Phone',type:'phone'}];

class App extends Component {
    constructor(props){
      super(props);
      this.state = {
        users:[],
        page:1,
        numberOfShownUsers:5,
        selectedUser:null,
        isLoading: false
      };
      this.usersCopy = [];
      this.searchFunc = this.searchFunc.bind(this);
      this.onNumberShownChange = this.onNumberShownChange.bind(this);
      this.getShownData = this.getShownData.bind(this);
      this.onPageChange = this.onPageChange.bind(this);
      this.sortFunc = this.sortFunc.bind(this);
      this.onRowClick = this.onRowClick.bind(this);
      this.addUser = this.addUser.bind(this);
      this.onLoadData = this.onLoadData.bind(this);
    }

    async onLoadData(url){
      this.setState({isLoading: true});
      const response = await fetch(url)
        .then(response => response.json())
        .then(data => {
          this.setState({
            users: data,
            isLoading: false
          });
          this.usersCopy = data;
        }).catch(error => {
          alert('Не удалось загрузить данные');
          this.setState({isLoading: false});
        });
    }

    getShownData(page){
      let from = 0;
      const users = this.state.users;
      const numberOfUsers = users.length;
      const numberOfShownUsers = this.state.numberOfShownUsers;
      if(page) from = (page-1)*numberOfShownUsers;
      return users.slice(from,from+numberOfShownUsers);
    }

    searchFunc(str,columnsToSearch){
      const filteredUsers = this.usersCopy.filter((user)=>{
        for(let i = 0; i < columnsToSearch.length; i++){
          const val = user[columnsToSearch[i].field];
          if(typeof val === 'object' || typeof val === 'boolean'
            || typeof val === 'function' || typeof val === 'undefined') continue;
          if((''+val).toLowerCase().includes(str.toLowerCase())) return true;
        }
        return false;
      });
      this.setState({
        users: filteredUsers,
        page: 1
      });
    }

    sortFunc(field,order){
      const sign = order == 'asc' ? 1 : -1;
      const sortedUsers = [...this.state.users];
      sortedUsers.sort((a,b) => {
        let val1 = a[field];
        let val2 = b[field];
        if(typeof val1 === 'string' && typeof val2 === 'string'){
          val1 = val1.toLowerCase();
          val2 = val2.toLowerCase();
        }
        return val1 > val2 ? sign : -sign;
      });
      this.setState({
        users: sortedUsers
      });
    }

    onPageChange(newPage){
      this.setState({
        page:newPage
      });
    }
    onNumberShownChange(val){
      this.setState({
        page:1,
        numberOfShownUsers: val
      });
    }

    onRowClick(user){
      this.setState({selectedUser:user});
    }

    addUser(newUser){
      let newUsers = [...this.state.users];
      newUsers.unshift(newUser);
      this.setState({
        users: newUsers
      });
      this.usersCopy = newUsers;
    }

    render() {
        const currentPage = this.state.page;
        const shownUsers = this.getShownData(currentPage);
        const numberOfPages = Math.ceil(this.state.users.length/this.state.numberOfShownUsers);
        return (
          <div className = 'container'>
            <LoadData onLoadData = {this.onLoadData} isLoading = {this.state.isLoading}/>
            <AddForm columns = {tableColumns} addUser = {this.addUser}/>
            <Search searchFunc = {this.searchFunc} columns = {tableColumns} />
            <Table data = {shownUsers}
              columns = {tableColumns}
              sortFunc = {this.sortFunc}
              onRowClick = {this.onRowClick}/>
            <PagesNav pages = {numberOfPages} currentPage = {currentPage}
              onPageChange={this.onPageChange}
              onNumberShownChange = {this.onNumberShownChange}/>
            {this.state.selectedUser &&
              <SelectedUser user = {this.state.selectedUser}
                unselectRow = {()=>{this.setState({selectedUser:null})}}/>
            }
          </div>
        );
    }
}

export default App;
