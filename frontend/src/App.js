import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import SignIn from './component/signin/SignIn';
import Home from './component/home/Home';
import InClass from './component/inclass/InClass';
import Info from './component/inclass/Info';
import Dictaphone from './component/speech-to-text/Dictaphone';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/signin" component={SignIn}/>
          <Route path="/home" component={Home}/>
          <Route path="/inclass" component={InClass}/>
          <Route exact path="/info/:id/" component={Info}/>
          <Route path="/dic" component={Dictaphone}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
