import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './component/home/Home';
import InClass from './component/inclass/InClass';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/home" component={Home}/>
          <Route path="/inclass" component={InClass}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
