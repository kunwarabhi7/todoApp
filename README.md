# Todo App

A simple Todo App built with React, Firebase Firestore, and Firebase Authentication.

## Features

* Add Todo
* View Todos in Real Time
* Mark Todo as Completed
* Delete Todo
* Firebase Firestore Integration
* Anonymous Authentication
* Secure Firestore Rules

## Prerequisites

* Node.js
* npm
* Firebase Project

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd <project-folder>
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root and add the following variables:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_PROJECT_ID=your_project_id
REACT_APP_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_APP_ID=your_app_id
```

Start the development server:

```bash
npm start
```

## Firebase Setup

### Enable Authentication

1. Open Firebase Console.
2. Go to Authentication → Sign-in Method.
3. Enable Anonymous Authentication.

### Firestore Rules

Use the following Firestore security rules:

```js
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Build for Production

```bash
npm run build
```

## Technologies Used

* React
* Firebase Firestore
* Firebase Authentication
* Tailwind CSS
* React Icons

```
```
