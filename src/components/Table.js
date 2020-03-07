import React, { Component } from "react";
import PropTypes from 'prop-types';

import TableHead from './TableHead.js';

class Table extends Component{
  onRowClick(selectedUser){
    this.props.onRowClick(selectedUser);
  }
  render(){
    const {data,columns} = this.props;
    return(
      <table className = 'table table-hover'>
        <TableHead columns = {columns}
          sortFunc = {this.props.sortFunc}/>
        <tbody>
          {data.map((dataObj,ind)=>
            <tr key={ind} onClick = {()=>this.onRowClick(dataObj)}>
              {columns.map((colObj,ind) =>
                <td key={ind}>{dataObj[colObj.field]}</td>
              )}
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortFunc: PropTypes.func.isRequired,
  onRowClick: PropTypes.func.isRequired
};

export default Table;
