document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app();
    const db = firebase.firestore();

    // Displays if user is logged in
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            document.getElementById("user_para").innerHTML = "Welcome " + user.displayName + "!";
        }
    });

    // Clear username and password fields for every login and logout
    document.getElementById("email_field").value = "";
    document.getElementById("password_field").value = "";

    document.getElementById("create_first_name_field").value = "";
    document.getElementById("create_last_name_field").value = "";
    document.getElementById("create_email_field").value = "";
    document.getElementById("create_password_field").value = "";

    document.getElementById("check_email_field").value = "";
    document.getElementById("check_password_field").value = "";
});

// Login using just email and password without Google authentication
function login() {
    // Get field values
    userEmail = document.getElementById("email_field").value;
    userPass = document.getElementById("password_field").value;

    // First, check if fields are empty
    if (isEmpty(userEmail) || isEmpty(userPass)) {
        window.alert("Please enter a valid email address and password.");
    } else {
        firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
            .catch(function (err) {
                switch (err.code) {
                    case "auth/invalid-email":
                        window.alert("Error: Invalid email address.");
                        break;
                    case "auth/user-disabled":
                        window.alert("Error: " + userEmail + " has been disabled.");
                        break;
                    case "auth/user-not-found":
                        window.alert("Error: User not found.")
                        break;
                    case "auth/wrong-password":
                        window.alert("Error: Incorrect password.");
                        break;
                    default:
                        break;
                }
            });
    }
}

// Create user
function createUser() {

    if (!firebase.auth().currentUser) {

        // Get field values
        var fname = document.getElementById("create_first_name_field").value;
        var lname = document.getElementById("create_last_name_field").value;
        var email = document.getElementById("create_email_field").value;
        var password = document.getElementById("create_password_field").value;
        var checkEmail = document.getElementById("check_email_field").value;
        var checkPassword = document.getElementById("check_password_field").value

        // Are all the required fields filled?
        var validFields =
            !isEmpty(fname)
            & !isEmpty(lname)
            & !isEmpty(email)
            & !isEmpty(password)
            & !isEmpty(checkEmail)
            & !isEmpty(checkPassword)
            & (email === checkEmail)
            & (password === checkPassword);

        // Display error messages for blank fields
        if (isEmpty(fname)) { window.alert("Error: First name cannot be empty or blank."); }
        if (isEmpty(lname)) { window.alert("Error: Last name cannot be empty or blank."); }
        if (isEmpty(email)) { window.alert("Error: Email address cannot be empty or blank."); }
        if (isEmpty(password)) { window.alert("Error: Password cannot be empty or blank."); }
        if (isEmpty(checkEmail)) { window.alert("Error: Please re-enter your email address."); }
        if (isEmpty(checkPassword)) { window.alert("Error: Please re-enter your password."); }
        // Display error messages for unmatched email and password
        if ((email !== checkEmail) & !isEmpty(email) & !isEmpty(checkEmail)) {
            window.alert("Error: Email addresses do not match.");
        }
        if ((password !== checkPassword) & !isEmpty(password) & !isEmpty(checkPassword)) {
            window.alert("Error: Passwords do not match.");
        }

        // If all the required fields are filled...
        if (validFields) {

            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(() => {
                    firebase.auth().currentUser.updateProfile({
                        displayName: fname + " " + lname,
                    });
                    window.alert("Account created! Welcome to Big Banking Online!");
                })
                .catch(function (err) {
                    switch (err) {
                        case "auth/email-already-in-use":
                            window.alert("Error: Email address already in use.");
                            break;
                        case "auth/invalid-email":
                            window.alert("Error: Invalid email address.");
                            break;
                        case "auth/operation-not-allowed":
                            // NOTE: THIS EXCEPTION SHOULD NEVER HAPPEN
                            window.alert("Error: Email/password accounts are not enabled. Enable email/password accounts in the Firebase Console, under the Auth tab");
                            break;
                        case "auth/weak-password":
                            window.alert("Error: Password is too weak.");
                            break;
                        default:
                            break;
                    }
                });
        }
    }
}

// Logout
function logout() {
    // If logged in, log out
    if (firebase.auth().currentUser) {
        firebase.auth().signOut();
        document.getElementById("user_para").innerHTML = firebase.auth().currentUser.email + " has signed out.";
    }
}

// Returns true if string is empty
function isEmpty(str) {
    return (!str || (str.trim().length === 0));
}