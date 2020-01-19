import * as firebase from 'firebase';

const config = {
   apiKey: "AIzaSyDPShOhr8p6pYL11HoPCRq89rjzknU7PEk",
   authDomain: "uclassroom-test.firebaseapp.com",
   databaseURL: "https://uclassroom-test.firebaseio.com",
   projectId: "uclassroom-test",
   storageBucket: "uclassroom-test.appspot.com",
   messagingSenderId: "714986964250",
   appId: "1:714986964250:web:23eac178ffbdc4bf3f98a3",
   measurementId: "G-31TZBSRVBD"
}

 firebase.initializeApp(config);
firebase.analytics();