import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './StartForm.css'
import YogaContext from './YogaContext';

export default class StartForm extends Component {
    static contextType = YogaContext
    
    render() {
        return (
            <div>
                <h2>Either Choose a Randomly Selected Practice...</h2>
                <h3>Select Length of Practice:</h3>
                <Link to='/practice/10' onClick={this.context.setRandoms}>
                    10 Minutes
                </Link>
                <br />
                <Link to='/practice/20' onClick={this.context.setRandoms}>
                    20 Minutes
                </Link>
                <br />
                <Link to='/practice/30' onClick={this.context.setRandoms}>
                    30 Minutes
                </Link>
                

                <h2>Or Choose a Recently Liked Practice:</h2>
                <Link to='/saved/1'>
                    Saved Practice 1
                </Link>
                <br />
                <Link to='/saved/2'>
                    Saved Practice 2
                </Link>
                <br />
                <Link to='/saved/3'>
                    Saved Practice 3
                </Link>
                <br />
                <Link to='/saved/4'>
                    Saved Practice 4
                </Link>
                <br />
                <Link to='/saved/5'>
                    Saved Practice 5
                </Link>

            </div>
        )
    }
}