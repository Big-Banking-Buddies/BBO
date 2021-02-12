document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app();
    const db = firebase.firestore();
    const myPost = db.collection('posts').doc('firstpost');

    myPost.onSnapshot(doc => {
        const data = doc.data();
    });

});

function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
        .then(result => {
            const user = result.user;
            console.log(user);
        })
        .catch(console.log);
}

function updatePost(e) {
    const db = firebase.firestore();
    const myPost = db.collection('posts').doc('firstpost');
    myPost.update({ title: e.target.value });
}