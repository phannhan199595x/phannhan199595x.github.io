import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAevO6m9NVkWluyxaBjeO9-2V8BopKG534",
    authDomain: "vue-js-61850.firebaseapp.com",
    databaseURL: "https://vue-js-61850.firebaseio.com",
    projectId: "vue-js-61850",
    storageBucket: "vue-js-61850.appspot.com",
    messagingSenderId: "578886212870",
    appId: "1:578886212870:web:74ba5e1433aba14084d287",
    measurementId: "G-JH2WWLE0XS"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig)
export const eventsRef = firebaseApp.database().ref().child('events')