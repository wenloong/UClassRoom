import React, {Component} from 'react';
import { Link } from "react-router-dom";
import firebase from './../../firebase.js';
import io from 'socket.io-client';

import './../../stylesheets/Info.css';

export default class Info extends Component {
   constructor(props) {
      super(props);
      this.state = {
         id: '',
         title: '',
         professor: '',
         desc: '',
         course_announcements: [],
         course_announcement_title: '',
         course_announcement_desc: '',
      }

      this.handleChange = this.handleChange.bind(this);
      this.handleAddAnnouncement = this.handleAddAnnouncement.bind(this);
   }

   handleChange(e) {
      this.setState({
         [e.target.name]: e.target.value
      });
   }

   handleAddAnnouncement(e) {
      e.preventDefault();
      const itemRef = firebase.database().ref(`classes/${this.props.match.params.id}`);
      const announcementItem = {
         announcement_title: this.state.course_announcement_title,
         announcement_desc: this.state.course_announcement_desc
      }

      itemRef.push(announcementItem);
      this.setState({
         course_announcement_title: '',
         course_announcement_desc: ''
      });
   }

   

   componentDidMount() {
      const itemRef = firebase.database().ref(`classes/${this.props.match.params.id}`);
      const descRef = itemRef.child('desc');
      const profRef = itemRef.child('professor');
      const titleRef = itemRef.child('title');
      descRef.on('value', (snapshot) => {
         this.setState({
            desc: snapshot.val()
         })
      });

      profRef.on('value', (snapshot) => {
         this.setState({
            professor: snapshot.val()
         })
      });

      titleRef.on('value', (snapshot) => {
         this.setState({
            title: snapshot.val()
         })
      });

      itemRef.on('value', (snapshot) =>  {
         console.log(snapshot.val());
         let announcementItems = snapshot.val();
         let newState = [];

         for (let announcementItem in announcementItems) {
            console.log(snapshot.val());
            newState.push({
               announcement_id: announcementItem,
               announcement_title: announcementItems[announcementItem].announcement_title,
               announcement_desc: announcementItems[announcementItem].announcement_desc
            });
         }

         this.setState({
            course_announcements: newState
         });
      });
   }

   showUniqueCode = () => {
      this.setState({ showUniqueCode: true });
   };

   hideUniqueCode = () => {
      this.setState({ showUniqueCode: false });
   }

   showAddAnnouncement = () => {
      this.setState({ showAddAnnouncement: true });
   }

   hideAddAnnouncement = () => {
      this.setState({ showAddAnnouncement: false });
   }

   handleJoinSession = () => {
      let clientSocket = null;
      clientSocket = io("http://uclassroom.appspot.com" + "/session-" + "123111");
      clientSocket.emit('session join', "dummyUser");
      clientSocket.on('success session join', function() {
         console.log("Sucess");
      });
   }

   render() {
      return (
         <React.Fragment>
            <div className="information-wrapper">
               <div className="top-row">
                  <div className="information-title">
                     <p>{this.state.title}</p>
                  </div>

                  <div className="back-button">
                     <Link to="/home">
                        <p>Back</p>
                     </Link>
                  </div>
               </div>

               <div className="information-desc">
                  <p>Description:</p>
                  <p>{this.state.desc}</p>
               </div>


               <div className="announcement-title">
                  <p>Announcements:</p>
               </div>

               <div className="announcement-wrapper">
                  {this.state.course_announcements.slice(0, this.state.course_announcements.length - 3).map(announcement => (
                     <div className="announcement-block">
                        <div className="announcement-header">
                           <p>{announcement.announcement_title}</p>
                           {/* <p>{announcement.assigner}</p> */}
                        </div>
                        <div className="announcement-desc">
                           <p>{announcement.announcement_desc}</p>
                        </div>
                     </div>
                  ))}
               </div>

               <UniqueCode showUniqueCode={this.state.showUniqueCode} handleClose={this.hideUniqueCode}>
                  <div className="inner-unique-code">
                     <h3>Enter Unique Code</h3>
                     <input type="text" name="firstname"/>
                  </div>
               </UniqueCode>

               <div className="bottom-button-wrapper">
                  <div className="join-session-button">
                     <button onClick={this.showUniqueCode}>Join Session</button>
                  </div>

                  <div className="add-announcement-button">
                     <button onClick={this.showAddAnnouncement}>Make Announcement</button>
                  </div>
               </div>

               <AddAnnouncement showAddAnnouncement={this.state.showAddAnnouncement}>
                  <form className="add-announcement-form" onSubmit={this.handleAddAnnouncement}>
                     <p>Add an Announcement</p>
                     <input type="text" name="course_announcement_title" onChange={this.handleChange} placeholder="Announcement Title" value={this.state.course_announcement_title}/>
                     <input type="text" name="course_announcement_desc" onChange={this.handleChange} placeholder="Announcement Description" value={this.state.course_announcement_desc}/>
                     <button className="add-announcement-submit"><p>Add Announcement</p></button>
                     <div className="return-announcement-button" onClick={this.hideAddAnnouncement}>
                        <p>Cancel</p>
                     </div>
                  </form>
               </AddAnnouncement>
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
                  <Link to="/inclass">
                     <p>Enter</p>
                  </Link>
               </div>   
            </div>
         </div>
      </div>
   )
};

const AddAnnouncement = ({showAddAnnouncement, children }) => {
   const showHideClassName = showAddAnnouncement? "modal display-block" : "modal display-none";

   return (
      <div className={showHideClassName}>
         <div className="add-announcement-wrapper">
            {children}
         </div>
      </div>
   )
};