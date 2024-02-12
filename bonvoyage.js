// Initialize Firebase with your config
const firebaseConfig = {
  apiKey: "AIzaSyDzruMg_CVnFfuus2AHX760GSNUTG_6sT8",
  authDomain: "bonvoyage-67189.firebaseapp.com",
  projectId: "bonvoyage-67189",
  storageBucket: "bonvoyage-67189.appspot.com",
  messagingSenderId: "1090505886972",
  appId: "1:1090505886972:web:2cd278208ec4c52140db79",
  measurementId: "G-6TQQ7L65QZ"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

function register() {
  const name = document.getElementById('Name').value;
  const age = document.getElementById('age').value;
  const email = document.getElementById('email').value;
  const mobile = document.getElementById('mobile').value;
  const password = document.getElementById('password').value;

  if (!validateEmail(email)) {
    alert('Invalid email address');
    return false;
  }

  if (!validatePassword(password)) {
    alert('Invalid password. Password must be at least 8 characters and contain at least one digit, one lowercase letter, one uppercase letter, and one special character.');
    return false;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then(function (userCredential) {
      const user = userCredential.user;

      const user_data = {
        Name: name,
        age: age,
        email: email,
        mobile: mobile,
        last_login: Date.now()
      };

      database.ref('users/').child(user.uid).set(user_data);

      alert('User Created');
    })
    .catch(function (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage);
    });

  return false;
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[^\s]{8,}$/;
  return passwordRegex.test(password);
}
