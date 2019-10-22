/* eslint-disable react/no-children-prop */
import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <div>
        <h1>notable</h1>
        <h3>physicians</h3>
        <ul>
          <li>
            <Link to="/Hibbert,Julius">Hibbert,Julius</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/:id" children={<Appointments />} />
        </Switch>
      </div>
    </Router>
  );
}

function Appointments() {
  const { id } = useParams();
  return (
    <div>
      <h2>{id}</h2>
      <h3>
        <p># Name</p>
        <p>Time</p>
        <p>Kind</p>
      </h3>
    </div>
  );
}
