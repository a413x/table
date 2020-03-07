import React, { Component } from "react";
import PropTypes from 'prop-types';

const urlSmallData = 'http://www.filltext.com/?'+
                      'rows=32&id={number|1000}&firstName={firstName}&'+
                      'lastName={lastName}&email={email}'+
                      '&phone={phone|(xxx)xxx-xx-xx}'+
                      '&address={addressObject}&description={lorem|32}';
const urlBigData = 'http://www.filltext.com/?'+
                      'rows=1000&id={number|1000}&firstName={firstName}&'+
                      'delay=3&lastName={lastName}&email={email}&'+
                      'phone={phone|(xxx)xxx-xx-xx}'+
                      '&address={addressObject}&description={lorem|32}';


class LoadData extends Component {
  buttonClick(isBig){
    const url = isBig ? urlBigData : urlSmallData;
    this.props.onLoadData(url);
  }
  render(){
    return(
      <div className = 'my-3'>
        Загрузить данные:
        <button className = 'btn btn-primary mx-3'
          onClick = {()=>this.buttonClick(false)}>Small</button>
        <button className = 'btn btn-primary mr-3'
          onClick = {()=>this.buttonClick(true)}>Big</button>
        {this.props.isLoading &&
          <div className ="spinner-border" role="status">
            <span className ="sr-only">Loading...</span>
          </div>}
      </div>
    );
  }
}

LoadData.propTypes = {
  onLoadData: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default LoadData;
