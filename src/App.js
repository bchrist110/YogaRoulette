import React from 'react'
import { Route } from 'react-router-dom';
import './App.css';
import Nav from './Nav';
import StartForm from './StartForm';
import Timer from './Timer'
import dummyinfo from './dummyinfo'
import YogaContext from './YogaContext';

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
        randomStanding: myRandomInts(5, dummyinfo.standing.length)
        // randomStanding: myRandomInts(1, dummyinfo.sitting.length)
    };
}
  render() {
    console.log(this.state.randomStanding)
    const contextValue = {
      randomStanding: this.state.randomStanding
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
