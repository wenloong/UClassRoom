import React, {Component} from 'react';

import './../../stylesheets/Home.css';
import './../../stylesheets/UniqueCode.css';

export default class Home extends Component {
   state = { showUniqueCode: false };

   showUniqueCode = () => {
      this.setState({ showUniqueCode: true });
   };

   hideUniqueCode = () => {
      this.setState({ showUniqueCode: false });
   }

   render() {
      return (
         <React.Fragment>
            <div className="home-wrapper">
               <div className="welcome-greeting">
                  <p><span className="bold">Welcome</span>, xxx</p>
               </div>
               <div className="create-classroom">
                  <button onClick="">+</button>
                  <p>Create a classroom</p>
               </div>
               <UniqueCode showUniqueCode={this.state.showUniqueCode} handleClose={this.hideUniqueCode}>
                  <div className="inner-unique-code">
                     <h3>Enter Unique Code</h3>
                     <input type="text" name="firstname"/>
                  </div>
               </UniqueCode>
               <div className="join-classroom">
                  <button onClick={this.showUniqueCode}>+</button>
                  <p>Join a classroom</p>
               </div>
            </div>
         </React.Fragment>
      )
   }
}

const UniqueCode = ({ handleClose, showUniqueCode, children }) => {
   const showHideClassName = showUniqueCode? "modal display-block" : "modal display-none"; 

   return (
      <div className={showHideClassName}>
         <div className="unique-code-wrapper">
            {children}
            <div className="button-wrapper">
               <div className="return-button" onClick={handleClose}>
                  <p>Return</p>
               </div>
   
               <div className="enter-button">
                  <p>Enter</p>
               </div>   
            </div>
         </div>
      </div>
   )
};