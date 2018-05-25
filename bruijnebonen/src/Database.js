// var Rebase = require('re-base');
// var firebase = require('firebase');
// var app = firebase.initializeApp({
//       apiKey: "AIzaSyDN4_b-WpoH44r6ESOefFlXWCPPWS7ZmLg",
//       authDomain: "bruijnebonen.firebaseapp.com",
//       databaseURL: "https://bruijnebonen.firebaseio.com",
//       storageBucket: "bruijnebonen.appspot.com",
//       messagingSenderId: "32761742573"
// });


import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDN4_b-WpoH44r6ESOefFlXWCPPWS7ZmLg",
    authDomain: "bruijnebonen.firebaseapp.com",
    databaseURL: "https://bruijnebonen.firebaseio.com",
    projectId: "bruijnebonen",
    storageBucket: "bruijnebonen.appspot.com",
    messagingSenderId: "32761742573"
  };


var base = firebase.initializeApp(config);//Rebase.createClass(app.database());

export default base;