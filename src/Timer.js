import React from 'react';
import YogaContext from './YogaContext';
import './Timer.css';

class Timer extends React.Component {
    static contextType = YogaContext

    constructor(props) {
        super(props)
        this.state = { 
            count: 60,
            round: 1
        };
    }

    componentDidMount() {
        this.interval = setInterval(() => {
          this.setState({
            count: this.state.count - 1
          })
        }, 1000)
    }

    restartInterval = () => {
        this.setState({
            count: 60,
            round: this.state.round + 1
        })
        this.interval = setInterval(() => {
            this.setState({
              count: this.state.count - 1
            })
        }, 1000)
    }
    
    render() {
        const standingOrder = this.context.randomStanding
        const sittingOrder = this.context.randomSitting
        const { round, count } = this.state
        const length = this.props.match.params.practicelength
        if (round === parseInt(length) + 1) {
            return (
                <h1>
                    Completed!
                </h1>
            )
        }
        const standingPoses = [...this.context.standing]
        const sittingPoses = [...this.context.sitting]
        let currentPoses;
        let orderList;
        
        if (round <= length/2) {
            currentPoses = standingPoses;
            orderList = standingOrder;
        }
        if (round > length/2) {
            currentPoses = sittingPoses
            orderList = sittingOrder
        }
        if (this.state.count === 0) {
            clearInterval(this.interval);
            this.restartInterval()
        }

        return (
            <div>
                <h2 className="name">Pose Name: {currentPoses[orderList[round-1]-1].name}</h2>
                <h3 className="number">Pose Number: {round}</h3>
                <h3 className="notes">Notes: {currentPoses[orderList[round-1]-1].notes}</h3>
                <h2 className="timer">Timer: {count}</h2>
                <div className="group">
                    <img src={currentPoses[orderList[round-1]-1].img1} alt={currentPoses[orderList[round-1]-1].name} className="item"/>
                    <img src={currentPoses[orderList[round-1]-1].img2} alt={currentPoses[orderList[round-1]-1].name} className="item"/>
                </div>
            </div>
        )
    }

}

export default Timer