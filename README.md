# Firebase React Redux

# Requirements

- NVM
- NodeJS 8.16.0
- Firebase Tools

## Local Setup

Install dependencies

### Node Version

Make sure you have the correct version of node installed because firebase only supports specific versions of node and not the latest versions.

```bash
nvm install;
```

### Firebase Tools

Make sure you have the firebase tools installed on your computer with the correct node version.

```bash
yarn add firebase-tools; # npm install firebase-tools
```

### Initial Firebase Setup From Scratch

These are the steps you would take if you were setting your project from scratch. If the project is already setup, please ignore these steps and proceed to `### Existing Firebase Setup`

1. Make sure you are logged into your google account:

```bash
./node_modules/firebase-tools/lib/bin/firebase.js login;
```

2. Init or select your project

```bash
./node_modules/firebase-tools/lib/bin/firebase.js init;
```

3. When the prompt appears, select `Hosting`

```
Which Firebase CLI features do you want to set up for this folder? Press Space to select features, then Enter
 to confirm your choices.
 ◯ Database: Deploy Firebase Realtime Database Rules
 ◯ Firestore: Deploy rules and create indexes for Firestore
 ◯ Functions: Configure and deploy Cloud Functions
❯◉ Hosting: Configure and deploy Firebase Hosting sites
 ◯ Storage: Deploy Cloud Storage security rules
```

4. You'll need to select an existing project:

```
Select a default Firebase project for this directory:
  [don't setup a default project]
❯ yourproject (your-project)
  [create a new project]
```

5. Select `public` for public directory

**_NOTE_:** This will be changed later.

```
What do you want to use as your public directory? (public)
```

6. Setup as a SPA

```
Configure as a single-page app (rewrite all urls to /index.html)? (y/N) y
```

7. Install scaffold out react app

```bash
npx create-react-app app
```

8. Adding Config File:

A. In your firebase console in the browser, next to `Project Overview`, click the `⚙` icon and go to `Project Settings`.

B. In the top navigation, go to `General`

C. Scroll down to section `Your Apps` > `Web apps` and make sure your project is selected.

D. Under `Firebase SDK snippet` make sure `Config` is selected and copy the scripts:

```javascript
const firebaseConfig = {
  apiKey: '{api-key}',
  authDomain: '{auth-domain}',
  databaseURL: '{database-url}',
  projectId: '{project-id}',
  storageBucket: '{storage-bucket}',
  messagingSenderId: '{messaging-sender-id}',
  appId: '{app-id}'
};
```

E. Create a new file called `app/config/config.json`, paste and modify the code as:

```json
{
  "apiKey": "{api-key}",
  "authDomain": "{auth-domain}",
  "databaseURL": "{database-url}",
  "projectId": "{project-id}",
  "storageBucket": "{storage-bucket}",
  "messagingSenderId": "{messaging-sender-id}",
  "appId": "{app-id}"
}
```

9. Re-Configure `public` folder for hosting.

Modify your existing `firebase.json` and change the following:

```json
{
  "hosting": {
    "public": "app/build",
```

Delete previously generated `/public` folder.

10. Configure `API` url:

```bash
cp app/public/api.example.js app/public/api.js;
```

11. Change your `/app/public/index.html` to read the `api.js` file:

```html
    <script src="./api.js"></script>
    <title>React App</title>
  </head>
```

### Existing Firebase Setup

1. Configure `.firebaserc`

```bash
cp .firebaserc.example .firebaserc;
```

2. Make sure you are logged into your google account:

```bash
./node_modules/firebase-tools/lib/bin/firebase.js login;
```

3. Set project

```json
{
  "projects": {
    "default": "your-project"
  }
}
```

4. Configure your `config.json` file:

Copy and modify accordingly with the right crentials.

```bash
cp app/config/config.example.json app/config/config.json;
```

5. Install Root Dependencies

```bash
yarn install; # npm install
```

6. Install Hosting Dependencies

```bash
cd app;
yarn install; # npm install
```

## Run Local Server

To run the server locally, run:

```bash
cd app;
yarn start; # npm start
```

When we go to `http://localhost:3000` we should see our frontend application.

## Deployment

**_NOTE_**: You will need to be logged in to `firebase-tools` for this to work, and make sure you are set the correct `project` as well.

**_IMPORTANT_**: Make sure you environment keys / variables are set for production before pushing.

**_NODE_VERSION_**: Make sure you are using node the correct node version (run `nvm use`);

**_LINTING_ERRORS_**: Make sure to fix your linting errors, otherwise it will NOT deploy.

**_DEPLOYMENT_VERSIONING_**: Make sure to increment the deployment version in `app/config/version.json` to make sure you have an idea if the new code has been deployed.

**_!!!!API URL_** Make sure to change `/app/public/api.js` the correct production url:

```javascript
window.API_URL = 'https://{firebase-functions-url}.cloudfunctions.net/app';
```

Build the application:

```bash
cd app;
yarn run build;
```

To deploy, run:

```bash
# !!! Make sure you're in the root of the project
./node_modules/firebase-tools/lib/bin/firebase.js deploy --only hosting;
```

If successfully deployed, it should be deployed to:

`https://{your-firebase-project}.firebaseapp.com`

If it was successfully deployed, but it's NOT showing, check:

`https://console.firebase.google.com/project/{your-firebase-project}/overview`
