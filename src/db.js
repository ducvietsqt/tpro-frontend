import Firebase from 'firebase/app'
import 'firebase/database'
let config = {
    	apiKey: "AIzaSyCAZwpokqzTCr2qytGf2vTiENx2EAiYtSc",
	  authDomain: "t-pro-553e9.firebaseapp.com",
	  databaseURL: "https://t-pro-553e9.firebaseio.com",
	  projectId: "t-pro-553e9",
	  storageBucket: "t-pro-553e9.appspot.com",
	  messagingSenderId: "413559544832",
	  appId: "1:413559544832:web:fd2f040d670ab11d"
};
let app = Firebase.initializeApp(config)
export const db = app.database()