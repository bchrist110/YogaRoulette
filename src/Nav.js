import React, { Component } from 'react'
import { Link } from 'react-router-dom'


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