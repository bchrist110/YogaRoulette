import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class StartForm extends Component {
    render() {
        return (
            <div>
                <h2>Select Length of Practice:</h2>
                <Link to='/practice/10'>
                    10 Minutes
                </Link>
                <br />
                <Link to='/practice/20'>
                    20 Minutes
                </Link>
                <br />
                <Link to='/practice/30'>
                    30 Minutes
                </Link>
                <br />
                <Link to='/practice/40'>
                    40 Minutes
                </Link>
                <br />
                <Link to='/practice/50'>
                    50 Minutes
                </Link>
                <br />
                <Link to='/practice/60'>
                    60 Minutes
                </Link>
            </div>
        )
    }
}