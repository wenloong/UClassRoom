import React, {Component} from 'react';

import './../../stylesheets/Classes.css';

export default class Classes extends Component {
   render() {
      return (
         <React.Fragment>
            <div className="class">
               <div className="class-row">
                  <div className="class-title">
                     <p><span className="bold">{this.props.title}</span></p>
                  </div>
                  <div className="professor-name">
                     <p>Prof. {this.props.professor}</p>
                  </div>
               </div>

               <div className="class-desc">
                  <p>{this.props.desc}</p>
               </div>
            </div>
         </React.Fragment>
      )
   }
}