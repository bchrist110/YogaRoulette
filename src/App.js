import React from 'react'
import { Route } from 'react-router-dom';
import './App.css';
import Nav from './Nav';
import StartForm from './StartForm';
import Timer from './Timer'
import YogaContext from './YogaContext';
const { API_URL }= process.env

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
        randomStanding: myRandomInts(30, 30),
        randomSitting: myRandomInts(30, 30)
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
    }

  render() {
    const contextValue = {
      randomStanding: this.state.randomStanding,
      randomSitting: this.state.randomSitting,
      standing: this.state.standing,
      sitting: this.state.sitting
    }
    return (
      <YogaContext.Provider value={contextValue}>
      <div>
        <nav>
          <Nav />
        </nav>
        <header>
          <h1>Yoga Roulette</h1>
        </header>
        <main>
          <Route exact path='/' component={StartForm} />
          <Route path='/practice/:practicelength' component={Timer} />
        </main>
      </div>
      </YogaContext.Provider>
    );
  }
}

export default App;
