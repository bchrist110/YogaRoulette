import React from 'react'
import { Route } from 'react-router-dom';
import './App.css';
import Nav from './Nav';
import StartForm from './StartForm';
import Timer from './Timer'
import YogaContext from './YogaContext';
import LastSaved from './LastSaved';
const API_URL = process.env.REACT_APP_API_URL

function myRandomInts(quantity, max){
  const arr = []
  while(arr.length < quantity){
    var candidateInt = Math.floor(Math.random() * max) + 1
    if(arr.indexOf(candidateInt) === -1) arr.push(candidateInt)
  }
  return(arr)
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
        sitting: [],
        standing: [],
        randomStanding: [],
        randomSitting: [],
        last: []
    };
  }

  setStanding = standing => {
    this.setState({
      standing,
      error: null
    })
  }

  setSitting = sitting => {
    this.setState({
      sitting,
      error: null
    })
  }

  setlast = last => {
    this.setState({
      last,
      error: null
    })
  }

  setUpdatedLast = newOrder => {
    let newArr = this.state.last
    newArr.push(newOrder)
    this.setState({
      last: newArr,
      error: null
    })
  }

  setRSitting = randomSitting => {
    this.setState({
      randomSitting,
      error:null
    })
  }

  setRStanding = randomStanding => {
    this.setState({
      randomStanding,
      error:null
    })
  }

  setRandoms = () => {
    this.setState({
      randomStanding: myRandomInts(30, 30),
      randomSitting: myRandomInts(30, 30),
      error: null
    })
  }

  componentDidMount() {
    fetch(API_URL + 'standing/', {
      method: 'GET',
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(this.setStanding)
      .catch(error => this.setState({ error }))

    fetch(API_URL + 'sitting/', {
      method: 'GET',
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(this.setSitting)
      .catch(error => this.setState({ error }))

    fetch(API_URL + 'lastfive/', {
        method: 'GET',
      })
        .then(res => {
          if (!res.ok) {
            throw new Error(res.status)
          }
          return res.json()
        })
        .then(this.setlast)
        .catch(error => this.setState({ error }))
    }

  render() {
    const contextValue = {
      randomStanding: this.state.randomStanding,
      randomSitting: this.state.randomSitting,
      standing: this.state.standing,
      sitting: this.state.sitting,
      last: this.state.last,
      setRStanding: this.setRStanding,
      setRSitting: this.setRSitting,
      setRandoms: this.setRandoms,
      setUpdatedLast: this.setUpdatedLast
    }
    return (
      <YogaContext.Provider value={contextValue}>
      <div>
        <nav>
          <Nav />
        </nav>
        <header>
          <div class="decorative-box">
              <h1>Yoga Roulette</h1>
          </div>
        </header>
        <main>
          <Route exact path='/' component={StartForm} />
          <Route path='/practice/:practicelength' component={Timer} />
          <Route path='/saved/:savednumber' component = {LastSaved} />
        </main>
      </div>
      </YogaContext.Provider>
    );
  }
}

export default App;
