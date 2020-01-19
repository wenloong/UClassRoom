import React, {Component} from 'react';

export default class SignIn extends Component {
   render() {
      return (
         <React.Fragment>
            

            <h1><center>UClassRoom</center></h1>

            <div class="login">
               <center>
                  <h2>NetID:</h2>
                  <input type="text" name="firstname" placeholder="Your UCR NetID..."/>
                     <br/>
                  <h2>Password:</h2>
                  <input type="text" name="lastname" placeholder="Your password..."/>
               </center>
            </div>
            

         </React.Fragment>
      )
   }
}