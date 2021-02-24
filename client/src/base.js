import firebase from 'firebase/app'
import "firebase/storage"

var firebaseConfig = {
          apiKey: "AIzaSyAB0CpD7vpsSqDaiPvUWyNmSE51RVmxv2E",
          authDomain: "manobik-narsingdi.firebaseapp.com",
          projectId: "manobik-narsingdi",
          storageBucket: "manobik-narsingdi.appspot.com",
          messagingSenderId: "67503491284",
          appId: "1:67503491284:web:fabdcb7c853d22d6ab1341"
  };

  firebase.initializeApp(firebaseConfig)

  const storage = firebase.storage()
  export {storage, firebase as default}