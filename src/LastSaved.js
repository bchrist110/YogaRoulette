import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import YogaContext from './YogaContext';

export default class LastSaved extends Component {
    static contextType = YogaContext

    componentDidMount() {
        const practiceNum = this.props.match.params.savednumber
        const sittingOrder = this.context.last.slice(practiceNum * -1)[0].ordersitting.split(" ")
        const standingOrder = this.context.last.slice(practiceNum * -1)[0].orderstanding.split(" ")
        let standingArr = []
        let sittingArr = []
        for (let i = 0; i< sittingOrder.length;i++) {
            sittingArr.push(parseInt(sittingOrder[i]))
            standingArr.push(parseInt(standingOrder[i]))
        }
        this.context.setRStanding(standingArr);
        this.context.setRSitting(sittingArr);
    }

    render() {
        return (
            <div>
                <h2>Terrific!</h2>
                <h3>Select Length of Practice:</h3>
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
            </div>
        )
    }
}