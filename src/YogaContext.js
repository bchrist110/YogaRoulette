import React from 'react';

const YogaContext = React.createContext({
    standing: [],
    sitting: [],
    randomStanding: [],
    randomSitting: [],
    last: [],
    setRStanding:() => {},
    setRSitting: () => {},
    setRandoms: () => {},
    setUpdatedLast: () => {}
})

export default YogaContext