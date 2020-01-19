import React, {Component} from 'react';

import './../../stylesheets/InClass.css';

export default class InClass extends Component {
   render() {
      return (
         <React.Fragment>
            <div className="inclass-wrapper">
               <div className="text-to-speech">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                     sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                     Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                     nisi ut aliquip ex ea commodo consequat.</p>
               </div>
               <div className="inclass-buttons-wrapper">
                  <div className="inclass-button">
                     <p>Raise Hand</p>
                  </div>
                  <div className="inclass-button">
                     <p>Slow Down</p>
                  </div>
                  <div className="inclass-button">
                     <p>Questions</p>
                  </div>
               </div>
               <div className="inclass-leave-session" onClick="leaveSession()">
                  <p>Leave Session</p>
               </div>
            </div>
         </React.Fragment>
      )
   }
}