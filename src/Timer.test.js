import React from 'react';
import ReactDOM from 'react-dom';
import StartForm from './StartForm';
import { BrowserRouter } from "react-router-dom";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><StartForm /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});