# Kaskus Chat Bundle

## Description

Kaskus Chat Bundle is an application where is build base on Kaskus Chat *bundle.js*. The difference between the original one is this app add service-worker to cache request, so you can access app on offline mode. Though it not work properly on offline mode, but it wont show "dinosauros" or offline page, but the application itself (Sadly, just the loading page, because it's need to connect to XMPP server). This app just show that you still can access an application even if on offline mode, despite it's not working properly.

## Service Worker

service-worker.js is generated using [sw-precache](https://github.com/GoogleChrome/sw-precache). The simplest way to use sw-precache is install it as global command line.
```
npm install -g sw-precache
```
After that, just running sw-precache on working directory.
```
sw-precache
```
It will automaticly detects all your static resources (HTML, JavaScript, CSS, images, etc.) and generated service worker file.

## Deployment

Because service-worker only work on secure connection, we hosting this app on Firebase. Only few step to make it running. What you need is access to [Firebase](https://firebase.google.com/) and create an application. Next, install [Firebase CLI](https://www.npmjs.com/package/firebase-cli) on your own computer.
Just running three command below on working directory to deploy it to Firebase.

```
    firebase login
```
```
    firebase init
```
```
    firebase deploy
```

