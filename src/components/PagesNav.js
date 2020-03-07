import React, { Component } from "react";
import PropTypes from 'prop-types';

import './styles/pages.css';

class PagesNav extends Component {
  constructor(props){
    super(props);
    this.nextPrevClick = this.nextPrevClick.bind(this);
    this.pageChange = this.pageChange.bind(this);
  }
  pageChange(e){
    const num = +e.target.value;
    if(num < 1 || num > this.props.pages) return;
    this.props.onPageChange(num);
  }
  nextPrevClick(direction){
    this.props.onPageChange(+this.props.currentPage + direction);
  }
  render(){
    const currPage = this.props.currentPage;
    const pages = this.props.pages;

    let prevEn = true;
    let nextEn = true;
    if(currPage == 1) prevEn = false;
    if(currPage == pages) nextEn = false;

    return (
      <div className='container d-flex'>
        <button className = 'btn btn-light' disabled = {prevEn ? null : true}
          onClick = {()=>this.nextPrevClick(-1)}>Назад</button>
        <nav className = 'd-flex w-100 justify-content-around'>
          <form className = 'form-inline'>
            <label>Страница</label>
            <input className="form-control m-2" id='pageInput' type="number"
              value={currPage} onChange={this.pageChange}/>
            <label>из {pages}</label>
          </form>
          <form className = 'form-inline'>
            <label className = 'mr-2'>Строк на странице:</label>
            <select onChange = {(e) => this.props.onNumberShownChange(+e.target.value)}>
              <option>5</option>
              <option>10</option>
              <option>50</option>
            </select>
          </form>
        </nav>
        <button className = 'btn btn-light' disabled = {nextEn ? null : true}
          onClick = {()=>this.nextPrevClick(1)}>Далее</button>
      </div>
    );
  }
}

PagesNav.propTypes = {
  pages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onNumberShownChange: PropTypes.func.isRequired
};

export default PagesNav;
