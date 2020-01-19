import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './component/home/Home';
import InClass from './component/inclass/InClass';
import Info from './component/inclass/Info';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/home" component={Home}/>
          <Route path="/inclass" component={InClass}/>
          <Route path="/info" component={Info}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
