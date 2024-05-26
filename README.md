# Advanced Solution Job Application Platform

This repository contains a Vue.js 3 frontend and a Node.js backend for the Advanced Solution Job Application Platform. Follow the instructions below to set up and run both the frontend and backend locally.

## Prerequisites

Make sure you have the following installed on your system:

- Node.js (>=18.x)
- npm (comes with Node.js)
- Vue CLI

## Environment Variables

Modify or Create a `.env` file in the root of your server directory with the following content:

```env
MAILERSEND_API_KEY=your_mailersend_api_key
MAILERSEND_FROM_EMAIL=your_email@your_domain
MAILERSEND_FROM_NAME=Advanced Solution
MAILERSEND_TO_EMAIL=email_where_you_want_to_get_the_email(eg. receiver_mail@kernalapp.com)
MAILERSEND_TO_NAME=KERNALAPP
```

Modify or Create a `.env` file in the root of your client directory with the following content:

```env
VITE_APP_TITLE=Advanced Solution
VITE_APP_WEBSTORAGE_NAMESPACE=kernalapp
VITE_APP_API_SERVER=server_url (e.g. http://localhost:3000)
VITE_APP_API_SERVER_BASE=server_url (e.g. http://localhost:3000)
YARN_IGNORE_NODE=1
```

###### Set up both the backend and frontend and start the application locally.

## Navigate to the frontend directory

```
cd client
npm install --legacy-peer-deps
npm run dev
```
###### The frontend client should now be running on http://localhost:5173

## Navigate to the backend directory

```
cd server
npm install
npm start
```
###### The backend server should now be running on http://localhost:3000

## Project structure
```
.
├── server
│   ├── .env                 # Environment variables for the backend
│   ├── node_modules         # Node.js dependencies
│   ├── package.json         # NPM package configuration
│   ├── server.js            # Entry point for the backend server
│   └── ...
└── client
    ├── node_modules         # Node.js dependencies
    ├── public               # Public assets
    ├── src                  # Source code for the frontend
    ├── package.json         # NPM package configuration
    ├── vite.config.js       # Vite configuration
    └── ...
```

## Build the frontend project

```
cd client
npm run build
```

It will generate the `dist` folder.