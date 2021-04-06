import React from 'react';
import YogaContext from './YogaContext';
import './Timer.css';
const API_URL = process.env.REACT_APP_API_URL

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

    handleSubmit = (event) => {
        event.preventDefault();
        let ordersitting = this.context.randomSitting.join(" ")
        let orderstanding = this.context.randomStanding.join(" ")
        const fiveData = { 'ordersitting': ordersitting, 'orderstanding': orderstanding }
        fetch(API_URL + 'lastfive/', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(fiveData)
        })
            .then(res => {
            if (!res.ok) {
                // get the error message from the response,
                return res.json().then(error => {
                // then throw it
                throw error
                })
            }
            return res.json()
            })
            .then(this.context.setUpdatedLast(fiveData))
            .then(this.props.history.push('/'))
            .catch(error => {
                console.error(error)
            })
    }

    componentDidUpdate() {
        if (this.state.count === 0) {
            clearInterval(this.interval);
            this.restartInterval()
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
    
    render() {
        const standingOrder = this.context.randomStanding
        const sittingOrder = this.context.randomSitting
        const { round, count } = this.state
        const length = this.props.match.params.practicelength
        if (round === parseInt(length) + 1) {
            return (
                <form onSubmit={this.handleSubmit}>
                    <h1>
                        Completed!
                    </h1>
                    <h2>
                        If You Liked the Practice, Hit the Like Button Below, and It Will Be Displayed on the Page!
                    </h2>
                    <button type='submit'>Like</button>
                </form>
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