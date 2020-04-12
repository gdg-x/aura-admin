# Aura Admin

Version: 3.1.1
<br>
Demo: [Click Here](https://auradmin.web.app/)

### Show some :heart: and star the repo to support the project

## Overview

Aura Admin is the Web App that helps you to mange the Tech Communities like GDGs, DSCs or any other tech communities.

The template is created by [GDG Jalandhar](https://meetup.com/GDG-Jalandhar/) team experience of running meetups/events.

## Features
| Feature | Description |
|---|---|
| **Fast and optimized** | PWA on Lighthouse |
| **Works offline** | Can work offline |
| **Mobile first** | Mobo Friendly Web app can be installed as a native app on your phone |
| **SEO optimized** | index all content and get to the top in search results |
| **Easy in management** | Store all the data in Cloud Firestore |
| **Trigger Push Notification** | Trigger Push Notification to Aura Main |
| **Usability** | Any Tech Communities can use |


## Getting Started

1. [Fork repository](https://github.com/Vrijraj/aura/fork) and clone it locally
1. Setup Environment
    - Install [Node.js (v8.9.4 or above)](https://nodejs.org/en/download/)
    - Install vue cli: `npm install -g @vue/cli`
1. Install project dependencies: `npm install` 
1. Create [Firebase account](https://console.firebase.google.com) and Create a new Project 
1. Go to Firebase Project Dashboard
1. Go to Cloud Firestore Database and Enable the database in test mode
1. In the Firebase project console dashboard. Click on create a new app
1. Go to Firebase project Settings and then General Settings Tab
1. Scroll down and go to your app section under Firebase SDK snippet
1. Now click on the node
1. Copy the code 
    ```js
    apiKey: "Axxxxxxxxxxxxxxxxxxx",
    authDomain: "xxxxxx.firebaseapp.com",
    databaseURL: "https://xxxxxxxx.firebaseio.com",
    projectId: "xxxxxxxxx",
    storageBucket: "xxxxxxx.appspot.com",
    messagingSenderId: "xxxxxxxxxxx",
    appId: "1:xxxxxxxxx:web:xxxxxxx"
    ```
1. Firebase console and got to Authentication, select Sign in method as a email and Password
    - Create user with Email and Password 
1. Now goto project code and inside `src/config/` update the `firebase.js` file with these codes
1. Update the field name in `vue.config`
1. Run locally
    `npm run serve`
1. For the production: `npm run build` and then one dir will be created dist
1. For testing: `npm run test`


### Push Notification Setup
1. Go to Firebase Project Dashboard
1. Go to Firebase Projects Settings then Cloud Messaging
1. Copy the `server key` and go to Aura Admin Config page then Keys & Securities and paste the code at `Cloud Messanging Server Key` field
1. Go to Firebase Project Settings then Cloud Messaging and Web configuration section and click on `generate Key pair` and Copy and go to Aura Admin Config page then Keys & Securities and paste the code at `Cloud Messaging Web Push certificate` field
1. Save the Config
1. For Sending Push Notification from Aura Admin, Goto Notification and then click on Add Notification and then click on Send Push Notification Button in Table

### Documentation
1. [Full documentation](https://docs.google.com/document/d/1WhpMxCE-H47em73F-8pcNGETye5Qun8cY3Jdg7jx6DE/edit?usp=sharing).


## Technology Stack

* [VueJS](https://vuejs.org/)
* [Vuetify](https://vuetifyjs.com/en/)
* [Firebase](https://firebase.google.com/)
* [Service Worker & PWA](https://www.npmjs.com/package/vue-pwa)
* [Workbox](https://developers.google.com/web/tools/workbox)



## Contributing

Awesome! Contributions of all kinds are greatly appreciated. To help smoothen the process we have a few non-exhaustive guidelines to follow which should get you going in no time.

### Using GitHub Issues

- Feel free to use GitHub issues for questions, bug reports, and feature requests
- Use the search feature to check for an existing issue
- Include as much information as possible and provide any relevant resources (Eg. screenshots)
- For bug reports ensure you have a reproducible test case
  - A pull request with a breaking test would be super preferable here but isn't required

### Submitting a Pull Request

- Squash commits
- Lint your code with eslint (config provided)
- Include relevant test updates/additions

## Contributors
<b>Maintainer:</b> [Vrijraj Singh](https://github.com/vrijraj) <br>
<b>Developers:</b> [Vrijraj Singh](https://github.com/vrijraj) &  [Bharat Agarwal](https://github.com/bharatagsrwal) 

## Facing Any Problem or need any Help?
Write me in [issues](https://github.com/issues) section. Our team will try solve your issue within 10-12 hours.<br>