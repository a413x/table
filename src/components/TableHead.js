import React, { Component } from "react";
import PropTypes from 'prop-types';

import './styles/table.css';

class TableHead extends Component{
  constructor(props){
    super(props);
    this.state={
      activeCol: {field:'',order:'asc'}
    }
  }
  headerClick(field){
    let order = this.state.activeCol.order;
    if(this.state.activeCol.field == field){
      order = order == 'asc' ? 'desc' : 'asc';
    }else{
      order = 'asc';
    }
    this.setState({
      activeCol: {field:field,order:order}
    });
    this.props.sortFunc(field,order);
  }
  render(){
    const columns = this.props.columns;
    const active = this.state.activeCol;
    return(
      <thead>
        <tr>
          {columns.map((colObj,ind)=>
            <th scope = 'col' key={ind} onClick={()=>this.headerClick(colObj.field)}
              className = {active.field == colObj.field ? active.order : null}>
              {colObj.title}
            </th>
          )}
        </tr>
      </thead>
    );
  }
}

TableHead.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortFunc: PropTypes.func.isRequired
};

export default TableHead;
