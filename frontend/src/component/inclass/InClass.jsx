import React, {Component} from 'react';
import { Link } from "react-router-dom";
import Dictaphone from './../speech-to-text/Dictaphone';
import './../../stylesheets/InClass.css';
import firebase from './../../firebase';
import io from "socket.io-client";

let sessionSocket = io("http://uclassroom.appspot.com/session-111");


export default class InClass extends Component {
   componentDidMount() {
      sessionSocket = io("http://uclassroom.appspot.com/session-111"); // Refresh
   }

   constructor(props) {
      super();
      this.state = {
         question: 0,
         slowdown: 0
      }

      this.handleQuestion = this.handleQuestion.bind(this);
      this.handleSlowdown = this.handleSlowdown.bind(this);

      sessionSocket.on('vote', function(user, choice) {
         if (choice === 0) {
            this.setState(prevState => {
               return {question: prevState.question + 1}
            })
         } else {
            this.setState(prevState => {
               return {slowdown: prevState.slowdown + 1}
            })
         }
      });

      sessionSocket.on('removevote', function(user, choice) {
         if (choice === 0) {
            this.setState(prevState => {
               return {question: prevState.question - 1}
            })
         } else {
            this.setState(prevState => {
               return {slowdown: prevState.question - 1}
            })
         }
      });

      sessionSocket.on('resetvotes', function() {
         this.setState(prevState => {
            return {slowdown: 0}
         })
      })
   }

   handleQuestion = () => {
      sessionSocket.emit('session vote', "dummy", 0);
   }

   handleSlowdown = () => {
      sessionSocket.emit('session vote', "dummy", 1);
   }

   handleResetVotes = () => {
      sessionSocket.emit('session resetvotes', "dummy");
   }

   render() {
      return (
         <React.Fragment>
            <div className="inclass-wrapper">
               <div className="text-to-speech">
                  <p><Dictaphone/></p>
               </div>
               <div className="inclass-buttons-wrapper">
                  <div className="inclass-button" onClick={this.handleQuestion}>
                     <p>Questions</p>
                  </div>
                  <div className="inclass-button" onClick={this.handleSlowdown}>
                     <p>Slow Down</p>
                  </div>
                  <div className="inclass-button" onClick={this.handResetVotes}>
                     <p>Reset Votes</p>
                  </div>
               </div>
               <div className="vote-counter-wrapper">
                  <div className="vote-counter-question">
                     <p>{this.state.question}</p>
                  </div>
                  <div className="vote-counter-slowdown">
                     <p>{this.state.slowdown}</p>
                  </div>
               </div>
               <div className="inclass-leave-session" onClick="leaveSession()">
                  <Link to="/home">
                     <p>Leave Session</p>
                  </Link>
               </div>
            </div>
         </React.Fragment>
      )
   }
}