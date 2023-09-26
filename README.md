# Aura Admin

<img src="https://raw.githubusercontent.com/GDG-Jalandhar/WebsiteData/master/Aura%20Admin%20V-3.1.png" width="100%">
Version: 3.5.0

[Click Here](https://auradmin.web.app/)

### Show some :heart: and :star: the repo to support the project

### If you are using Aura, Kindly [fill this form](https://forms.gle/SNpajdAnqbSac2AV9) for Aura Web App Directory

## Overview

Aura Admin is the Web App that helps you to mange the Tech Communities like GDGs, DSCs or any other tech communities.


## Features

| Feature                       | Description                                                          |
| ----------------------------- | -------------------------------------------------------------------- |
| **Fast and optimized**        | PWA on Lighthouse                                                    |
| **Works offline**             | Can work offline                                                     |
| **Mobile first**              | Mobo Friendly Web app can be installed as a native app on your phone |
| **SEO optimized**             | index all content and get to the top in search results               |
| **Easy in management**        | Store all the data in Cloud Firestore                                |
| **User Management**           | Role based Authentication for the Team                               |
| **Usability**                 | Any Tech Communities can use                                         |
| **Easy to install**           | Added support to install admin panel with install route              |
| **Easy to onboard team**      | Added support for onboard a user in user management                  |

## Contributors
<b>Maintainer:</b> 
1. [Vrijraj Singh](https://github.com/vrijraj)  
1. [Bharat Agarwal](https://github.com/bharatagsrwal) 


## Getting Started

1. [Fork this repository](https://github.com/gdg-x/aura-admin/fork) & [Aura Main](https://github.com/gdg-x/aura/fork) (Important) and clone both repo locally
1. Setup Environment
   - Install [Node.js (v8.9.4 - v12.13.0)](https://nodejs.org/en/download/)
   - Install vue cli: `npm install -g @vue/cli`
1. Install project dependencies: `npm install`
1. If you already have setup [Aura Main](https://github.com/gdg-x/aura/fork) then use same Firebase Project
1. Otherwise Create [Firebase account](https://console.firebase.google.com) and Create a new Project
1. Go to Firebase Project Dashboard
1. Go to Cloud Firestore Database and Enable the database in test mode
1. Once the database is created, Click on Rules navigation pill and add the following lines in the rules edit
   Add rules from file `/firebase-rules/firestore.rules` copy and paste in firestore rules
1. Go to Firebase Storage
1. Copy the code which looks similar to the below sample and update the rule for Firebase Storage
   ```js
   service firebase.storage {
     match /b/{bucket}/o {
       match /{allPaths=**} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```
1. In the Firebase project console dashboard. Click on create a new app
1. Go to Firebase project Settings and then General Settings Tab
1. Scroll down and go to your app section under Firebase SDK snippet
1. Click on node/config radio select
1. Copy the code which looks similar to the below sample
   ```js
   apiKey: "Axxxxxxxxxxxxxxxxxxx",
   authDomain: "xxxxxx.firebaseapp.com",
   databaseURL: "https://xxxxxxxx.firebaseio.com",
   projectId: "xxxxxxxxx",
   storageBucket: "xxxxxxx.appspot.com",
   messagingSenderId: "xxxxxxxxxxx",
   appId: "1:xxxxxxxxx:web:xxxxxxx"
   ```
1. Now goto project code on your local system and inside `src/config/firebase-config.js` update the `firebase-config.js` file with the code you copied from the Firebase console and Update the field `name` in [vue.config](https://github.com/gdg-x/aura-admin/blob/master/vue.config.js) in the local project root directory
1. Click on Authentication in the left navigation.
1. Click on Sign-in method and enable Email/Password
   - Create user with Email and Password
1. Run locally
   `npm run serve`
1. When you are ready to build for production, use the following command -
   - `npm run build`
   - A directory named dist will be created
1. For testing: `npm run test`

## Deployment on Firebase

1. Install required tools for performing Firebase deployment
   - Install Firebase CLI: `npm i -g firebase-tools`
1. Login into Firebase CLI using the following command - `firebase login`
1. Open Terminal/CMD/Powershell in the root directory of your clone of aura-admin repository.
1. Now type `firebase login` command in your Terminal/CMD/Powershell
1. Update the `Firebase Project ID` in `.firebasesrc` file. This value should match the project ID in your Project Settings of the Firebase project you created in the previous section.
1. Go to the Firebase Console Dashboard and Click on Hosting in the left navigation.
1. Click on Get Started
1. Click through all steps till you’re taken to the Hosting page in the console.
1. You’ll be provided with a ready domain with your project ID. It should look like - `<project-id>.web.app or <project-id>.firebaseapp.com`
1. Copy the sub-domain name of the URL provided. In this case, it will be the project ID. However, to be precise, you have to copy the part before .web.aap or .firebaseapp.com. This is your Site ID
1. Update `Firebase.json` file, set the site key to Site ID
   ```js
       {
           "hosting": {
               "site":"Your_Firebase_Hosting_id",
               "public": "dist",
               "rewrites": [ {
                   "source": "**",
                   "destination": "/index.html"
               } ],
               "ignore": [
                   "firebase.json",
                   "**/.*",
                   "**/node_modules/**"
               ]
           }
       }
   ```
1. In your terminal at the root directory of the project, build and deploy using the following command
   - `firebase deploy`
1. If the project is successfully deployed, you should be able to visit your domain as found, and see the Aura Admin Dashboard. In future, we’ll refer to this website as your Aura Admin Dashboard.

### Documentation

1. [Full documentation](https://docs.google.com/document/d/1WhpMxCE-H47em73F-8pcNGETye5Qun8cY3Jdg7jx6DE/edit?usp=sharing).

## Technology Stack

- [VueJS](https://vuejs.org/)
- [Vuetify](https://vuetifyjs.com/en/)
- [Firebase](https://firebase.google.com/)
- [Service Worker & PWA](https://www.npmjs.com/package/vue-pwa)
- [Workbox](https://developers.google.com/web/tools/workbox)

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
- Pull requests _must_ be made against `develop` branch. Any other branch (unless specified by the maintainers) will get rejected.

### View Website Built with Projects

| Community Name | Web App Link                              |
| -------------- | ----------------------------------------- |
| GDG Jalandhar  | [View Now](https://gdgjalandhar.com)      |
| DSC NSEC       | [View Now](https://dscnsec.com)           |
| DSC VJIT       | [View Now](https://dsc-vjit-admin.now.sh) |

## Facing Any Problem or need any Help?

Write us in [issues](https://github.com/issues) section. Our team will try solve your issue within 10-12 hours.<br>

Project is published under the [MIT license](/LICENSE.md).  
Feel free to clone and modify repo as you want, but don't forget to add reference to authors :)
