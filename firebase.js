//import firebase from 'firebase/compat/app';
import firebase from 'firebase/compat';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export const firebaseConfig={
    apiKey: "AIzaSyCicQs4QERDI4GiffGxoPMV2nV6fD_BUnI",
    authDomain: "mynewproject-286f9.firebaseapp.com",
    databaseURL: "https://mynewproject-286f9-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "mynewproject-286f9",
    storageBucket: "mynewproject-286f9.appspot.com",
    messagingSenderId: "1013283481664",
    appId: "1:1013283481664:web:98492c6944534931ff97a5",
    measurementId: "G-SKD30GBFG3"
}
if(!firebase.apps.length){
   firebase.initializeApp(firebaseConfig) 
}
const auth = firebase.auth()
export {auth,firebase}