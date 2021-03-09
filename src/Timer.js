import React from 'react';
import YogaContext from './YogaContext';

class Timer extends React.Component {
    static contextType = YogaContext

    constructor(props) {
        super(props)
        this.state = { 
            count: 5,
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
            count: 5,
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
                <div>
                    Completed!
                </div>
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
                <h2>Pose Name: {currentPoses[orderList[round-1]-1].name}</h2>
                <h3>Pose Number: {round}</h3>
                <h3>Notes: {currentPoses[orderList[round-1]-1].notes}</h3>
                <h2>Timer: {count}</h2>
                <img src={currentPoses[orderList[round-1]-1].img1} alt={currentPoses[orderList[round-1]-1].name} />
                <img src={currentPoses[orderList[round-1]-1].img2} alt={currentPoses[orderList[round-1]-1].name} />
                <img src={currentPoses[orderList[round-1]-1].img3} alt={currentPoses[orderList[round-1]-1].name} />

            </div>
        )
    }

}

export default Timer