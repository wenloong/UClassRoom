import React, {Component} from 'react';
import { Link } from "react-router-dom";

import './../../stylesheets/Info.css';

export default class Info extends Component {
   state = {
      showUniqueCode: false,

      announcements: [
         {
            id: 1,
            announcementTitle: 'Homework 1 DUE!',
            assigner: 'Prof. McDonalds',
            announcementDesc: 'Remeber to submit your homework on iLearn by tonight!'
         },
         {
            id: 3,
            announcementTitle: 'No Class On Monday',
            assigner: 'TA: Ronald',
            announcementDesc: 'A friendly reminder that there is no class on Monday due to MLK. I will not be tolerating anyone coming to class on that day'
         },
         {
            id: 4,
            announcementTitle: 'Homework Questions',
            assigner: 'Prof. McDonalds',
            announcementDesc: 'Come to office hours to learn more!'
         },
         {
            id: 5,
            announcementTitle: 'Office Hours Updated',
            assigner: 'Prof. McDonalds',
            announcementDesc: 'Only Saturdays and Sundays for office hours'
         },
         {
            id: 6,
            announcementTitle: 'Office Hours Updated',
            assigner: 'Prof. McDonalds',
            announcementDesc: 'Only MONDAYS and Sundays for office hours'
         }
      ]
   }

   showUniqueCode = () => {
      this.setState({ showUniqueCode: true });
   };

   hideUniqueCode = () => {
      this.setState({ showUniqueCode: false });
   }

   render() {
      return (
         <React.Fragment>
            <div className="information-wrapper">
               <div className="top-row">
                  <div className="information-title">
                     <p>CS 101</p>
                  </div>

                  <div className="back-button">
                     <Link to="/home">
                        <p>Back</p>
                     </Link>
                  </div>
               </div>

               <div className="information-desc">
                  <p>Description:</p>
                  <p>This class is going to teach you about creating your own ....</p>
               </div>


               <div className="announcement-title">
                  <p>Announcements:</p>
               </div>

               <div className="announcement-wrapper">
                  {this.state.announcements.map(announcement => (
                     <div className="announcement-block">
                        <div className="announcement-header">
                           <p>{announcement.announcementTitle}</p>
                           <p>{announcement.assigner}</p>
                        </div>
                        <div className="announcement-desc">
                           <p>{announcement.announcementDesc}</p>
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
               <div className="join-session-button">
                  <button onClick={this.showUniqueCode}>Join Session</button>
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
                  <Link to="/inclass">
                     <p>Enter</p>
                  </Link>
               </div>   
            </div>
         </div>
      </div>
   )
};