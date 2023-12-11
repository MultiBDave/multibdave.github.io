importScripts("https://www.gstatic.com/firebasejs/7.5.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.5.0/firebase-messaging.js");
firebase.initializeApp({
    databaseURL: "https://consumption-bbe04-default-rtdb.europe-west1.firebasedatabase.app",
    apiKey: "AIzaSyDafxbzDqppWX6S4fTkxogmlZtpa-6XI6o",
    authDomain: "consumption-bbe04.firebaseapp.com",
    projectId: "consumption-bbe04",
    storageBucket: "consumption-bbe04.appspot.com",
    messagingSenderId: "239715456396",
    appId: "1:239715456396:web:0b4e2beae66fed58ae72a9",
    measurementId: "G-GYNZ5KQ82B"
});
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            return registration.showNotification("New Message");
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification received: ', event)
});