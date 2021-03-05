import React from 'react';
import dummyinfo from './dummyinfo';
import YogaContext from './YogaContext';

class Timer extends React.Component {
    static contextType = YogaContext

    constructor(props) {
        super(props)
        this.state = { 
            count: 60,
            round: 1,
            currentPoses: "standing"
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

    changePosition = () => {
        this.setState({
            currentPoses: "sitting"
        })
    }
    
    render() {
        const standingOrder = this.context.randomStanding
        const { round, count, currentPoses } = this.state
        const length = this.props.match.params.practicelength
        if (this.state.round === length + 1) {
            return (
                <div>
                    Completed!
                </div>
            )
        }
        if (round > length/2) {
            this.changePosition()
        }
        if (this.state.count === 0) {
            clearInterval(this.interval);
            this.restartInterval()
        }
        let images = dummyinfo[currentPoses][standingOrder[round-1]].images
        return (
            <div>
                <h2>Pose Name: {dummyinfo[currentPoses][standingOrder[round-1]].name}</h2>
                <h3>Pose Number: {round}</h3>
                <h3>Notes: {dummyinfo[currentPoses][standingOrder[round-1]].notes}</h3>
                <h2>Timer: {count}</h2>
                {dummyinfo[currentPoses][standingOrder[round-1]].images.map(currImage =>
                    <img src={currImage} alt={dummyinfo[currentPoses][standingOrder[round-1]].name} />
                )}
            </div>
        )
    }

}

export default Timer