import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'


export default class Nav extends Component {
  render() {
    return (
      <div className='Nav'>
        <Link to='/'>
          Home
        </Link>
      </div>
    )
  }
}