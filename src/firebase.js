// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration

const firebaseConfig = {
	apiKey: "AIzaSyCGyx6IpPkWC60U65-aWQEZCTYC_P43fOM",
	authDomain: "team-tracker-74588.firebaseapp.com",
	databaseURL: "https://team-tracker-74588-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "team-tracker-74588",
	storageBucket: "team-tracker-74588.appspot.com",
	messagingSenderId: "676267504915",
	appId: "1:676267504915:web:35e58cccb071a06b1156e6"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;