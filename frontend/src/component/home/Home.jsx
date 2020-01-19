import React, {Component} from 'react';
import { Link } from "react-router-dom";

import firebase from './../../firebase.js';

import Classes from './Classes';

import './../../stylesheets/Home.css';
import './../../stylesheets/UniqueCode.css';

export default class Home extends Component {
   // state = { 
   //    showUniqueCode: false,

   //    classes: [
   //       {
   //          id: 1,
   //          title: 'CS 100',
   //          professor: 'Rose Hacker',
   //          desc: 'Lorem Ipsum this class is going to teach you how to ...'
   //       },
   //       {
   //          id: 2,
   //          title: 'CS 061',
   //          professor: 'Silverman Fish',
   //          desc: 'Lorem ipsum this class is going to teach you how to be a fish..'
   //       },
   //       {
   //          id: 3,
   //          title: 'BUS 061',
   //          professor: 'Dog Fish',
   //          desc: 'Lorem ipsum this class is going to teach you how to be a fish..'
   //       }
   //    ]
   // };

   constructor() {
      super();
      this.state = {
         course_title: '',
         course_professor: '',
         course_desc: '',
         classes: []
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleAddClass = this.handleAddClass.bind(this);
   }

   handleChange(e) {
      this.setState({
         [e.target.name]: e.target.value
      });
   }

   handleAddClass(e) {
      e.preventDefault();
      const itemRef = firebase.database().ref('classes');
      const classItem = {
         title: this.state.course_title,
         professor: this.state.course_professor,
         desc: this.state.course_desc
      }

      itemRef.push(classItem);
      this.setState({
         course_title: '',
         course_professor: '',
         course_desc: ''
      });
   }

   componentDidMount() {
      const itemRef = firebase.database().ref('classes');
      itemRef.on('value', (snapshot) =>  {
         let classItems = snapshot.val();
         let newState = [];

         for (let classItem in classItems) {
            newState.push({
               id: classItem,
               title: classItems[classItem].title,
               professor: classItems[classItem].professor,
               desc: classItems[classItem].desc
            });
         }

         this.setState({
            classes: newState
         });
      });
   }

   removeClass(classId) {
      const itemRef = firebase.database().ref(`/classes/${classId}`);
      itemRef.remove();
   }

   showUniqueCode = () => {
      this.setState({ showUniqueCode: true });
   };

   hideUniqueCode = () => {
      this.setState({ showUniqueCode: false });
   }

   showAddClass = () => {
      this.setState({ showAddClass: true });
   }

   hideAddClass = () => {
      this.setState({ showAddClass: false });
   }

   render() {
      return (
         <React.Fragment>
            <div className="home-wrapper">
               <div className="welcome-greeting">
                  <p><span className="bold">Welcome</span>, Student!</p>
               </div>
               <div className="classes-wrapper">
                  {this.state.classes.map((classItem) => {
                     return (
                     <React.Fragment>
                        <div className="class-delete-wrapper">
                           <button onClick={() => this.removeClass(classItem.id)} className="class-delete-button">x</button>
                        </div>
                        <Link to={{pathname:["/info/", classItem.id].join(""), state: this.state.classes}}>
                           <Classes key={classItem.id} title={classItem.title} professor={classItem.professor} desc={classItem.desc}/>
                        </Link>
                     </React.Fragment>
                     )
                  })}
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

               <AddClass showAddClass={this.state.showAddClass}>
                  <form className="form-add-class" onSubmit={this.handleAddClass}>
                     <p>Create a Class</p>
                     <input type="text" name="course_title" onChange={this.handleChange} placeholder="Title" value={this.state.course_title}/>
                     <input type="text" name="course_professor" onChange={this.handleChange} placeholder="Professor" value={this.state.course_professor}/>
                     <input type="text" name="course_desc" onChange={this.handleChange} placeholder="Description" value={this.state.course_desc}/>
                     
                     <button className="add-class-submit"><p>Add Class</p></button>
                     <div className="return-announcement-button" onClick={this.hideAddClass}>
                        <p>Cancel</p>
                     </div>
                  </form>
               </AddClass>

               <div className="create-classroom">
                  <div className="create-classroom-button">
                     {/* <p>Create a class</p> */}
                     <button onClick={this.showAddClass}>+</button>
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

const AddClass = ({showAddClass, children }) => {
   const showHideClassName = showAddClass? "modal display-block" : "modal display-none";

   return (
      <div className={showHideClassName}>
         <div className="add-class-wrapper">
            {children}
         </div>
      </div>
   )
};