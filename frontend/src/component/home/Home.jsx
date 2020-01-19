import React, {Component} from 'react';
import { Link } from "react-router-dom";

import Classes from './Classes';

import './../../stylesheets/Home.css';
import './../../stylesheets/UniqueCode.css';

export default class Home extends Component {
   state = { 
      showUniqueCode: false,

      classes: [
         {
            id: 1,
            title: 'CS 100',
            professor: 'Rose Hacker',
            desc: 'Lorem Ipsum this class is going to teach you how to ...'
         },
         {
            id: 2,
            title: 'CS 061',
            professor: 'Silverman Fish',
            desc: 'Lorem ipsum this class is going to teach you how to be a fish..'
         },
         {
            id: 3,
            title: 'BUS 061',
            professor: 'Dog Fish',
            desc: 'Lorem ipsum this class is going to teach you how to be a fish..'
         }
      ]
   };

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
                  <p><span className="bold">Welcome</span>, Student!</p>
               </div>
               <div className="classes-wrapper">
                  {this.state.classes.map(classes => (
                     <React.Fragment>
                        <div className="class-delete-wrapper">
                           <button className="class-delete-button">x</button>
                        </div>
                        <Link to="/info">
                           <Classes title={classes.title} professor={classes.professor} desc={classes.desc}/>
                        </Link>
                     </React.Fragment>
                  ))}
               </div>
               <UniqueCode showUniqueCode={this.state.showUniqueCode} handleClose={this.hideUniqueCode}>
                  <div className="inner-unique-code">
                     <h3>Enter Unique Code</h3>
                     <input type="text" name="firstname"/>
                  </div>
               </UniqueCode>
               <div className="join-classroom">
                  <p onClick={this.showUniqueCode}>Join a classroom</p>
               </div>

               <div className="create-classroom">
                  <div className="create-classroom-button">
                     <p>Create a class</p>
                     <button onClick="">+</button>
                  </div>
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
                  <p>Cancel</p>
               </div>
   
               <div className="enter-button">
                  <p>Enter</p>
               </div>   
            </div>
         </div>
      </div>
   )
};