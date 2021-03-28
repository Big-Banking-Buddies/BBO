import firebase from 'firebase/app'
import "firebase/auth"

const app = firebase.initializeApp({
  apiKey: "AIzaSyA9X-1JMj4QX0prOXvZH06prHN0jpHP89Q",
  authDomain: "bigbankingonline.firebaseapp.com",
  projectId: "bigbankingonline",
  storageBucket: "bigbankingonline.appspot.com",
  messagingSenderId: "62468688216",
  appId: "1:62468688216:web:dff9451a54d6b4574e3d2d"
})

export const auth = app.auth()
export default app