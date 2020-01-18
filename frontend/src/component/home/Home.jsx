import React, {Component} from 'react';

import './../../stylesheets/Home.css';

export default class Home extends Component {
   render() {
      return (
         <React.Fragment>
            <div className="home-wrapper">
               <div className="welcome-greeting">
                  <p><span className="bold">Welcome</span>, xxx</p>
               </div>
               <div className="create-classroom">
                  <button>+</button>
                  <p>Create a classroom</p>
               </div>
               <div className="join-classroom">
                  <button>+</button>
                  <p>Join a classroom</p>
               </div>
            </div>
         </React.Fragment>
      )
   }
}