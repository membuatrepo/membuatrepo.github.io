var config = {
    apiKey: "AIzaSyBJvp8EUww0JekGFTVIGwGfeKQ4d8QRgkE",
    authDomain: "kaskus-chat-df24f.firebaseapp.com",
    databaseURL: "https://kaskus-chat-df24f.firebaseio.com",
    storageBucket: "kaskus-chat-df24f.appspot.com",
    messagingSenderId: "337221431705"
};

firebase.initializeApp(config);
const messaging = firebase.messaging();

requestPermission();

messaging.onMessage(function (payload) {
    console.log(payload);
});

messaging.onTokenRefresh(function () {
    messaging.getToken()
        .then(function (refreshedToken) {
            console.log('Token refreshed.');
            setTokenSentToServer(false);
            sendTokenToServer(refreshedToken);
        })
        .catch(function (err) {
            console.log('Unable to retrieve refreshed token ', err);
        });
});

messaging.onMessage(function (payload) {
    console.log("Message received. ", payload);
});

function getToken() {
    messaging.getToken()
        .then(function (currentToken) {
            if (currentToken) {
                console.log('Token:' + currentToken);
                sendTokenToServer(currentToken);
            } else {
                console.log('No Instance ID token available. Request permission to generate one.');
                setTokenSentToServer(false);
            }
        })
        .catch(function (err) {
            console.log('An error occurred while retrieving token. ', err);
            setTokenSentToServer(false);
        });
}

function sendTokenToServer(currentToken) {
    if (!isTokenSentToServer()) {
        console.log('Sending token to server...');
        subscribeTokenToTopic(currentToken, '6a6f6b657266616e74617379');
    } else {
        console.log('Token already sent to server so won\'t send it again ' +
            'unless it changes');
    }
}
function isTokenSentToServer() {
    return window.localStorage.getItem('sentToServer') == 1;

}
function setTokenSentToServer(sent) {
    if (sent) {
        window.localStorage.setItem('sentToServer', 1);
    } else {
        window.localStorage.setItem('sentToServer', 0);
    }
}

function requestPermission() {
    console.log('Requesting permission...');
    messaging.requestPermission()
        .then(function () {
            console.log('Notification permission granted.');
            getToken();
        })
        .catch(function (err) {
            console.log('Unable to get permission to notify.', err);
        });
}

function subscribeTokenToTopic(token, topic) {
    axios({
        url: 'http://52.22.102.225/index.php/' + token + '/channel_' + topic,
        method: 'post'
    }).then(function (r) {
        console.log("Success Subscribe to Topic", r);
        setTokenSentToServer(true);
    }).catch(function (e) {
        console.log("Fail Subscribe to Topic", e);
        setTokenSentToServer(false);
    });
}

if ('serviceWorker' in navigator && 'PushManager' in window) {
     navigator.serviceWorker
         .register('./sw.js')
        .then(function (swReg) {
             console.log('Service Worker Registeredd');
             swRegistration = swReg;
         });
}
