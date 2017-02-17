importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js');

var config = {
    apiKey: "AIzaSyBJvp8EUww0JekGFTVIGwGfeKQ4d8QRgkE",
    authDomain: "kaskus-chat-df24f.firebaseapp.com",
    databaseURL: "https://kaskus-chat-df24f.firebaseio.com",
    storageBucket: "kaskus-chat-df24f.appspot.com",
    messagingSenderId: "337221431705"
};
firebase.initializeApp(config);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.log(JSON.stringify(payload.data));
    
    var title = payload.data.sender.split("@");
    const options = {
        body: payload.data.message
    };
    return self.registration.showNotification(title[0], options);
});
