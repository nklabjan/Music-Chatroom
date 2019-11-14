# Cadence - The Music Chatroom

## To run the app on your local machine
### IMPORTANT - Go to https://developer.spotify.com/ and register a Spotify app.
### Take note of your Spotify Client ID & Client Server
1. Git clone this repository onto your machine
2. You will notice that there are two main subdirectories - `client` and `server`
3. Go into the client subdirectory and run `cd client` then run `npm install` to install the dependencies in the client subdirectory.
4. `npm start` in the client subdirectory to run the Client.
5. Then, go into the server subdirectory using `cd ../server` and run `npm install` to install the dependencies for the server.
6. Create a .env file using `vim .env` or whatever coding environment you prefer and put this block of code in.
``` 
CLIENT_APP_ID=<INSERT SPOTIFY CLIENT ID HERE>
CLIENT_APP_SECRET=<INSERT SPOTIFY CLIENT SECRET HERE>
BACKEND_URL=
FRONTEND_URI=
```
7. `npm start` in the server subdirectory to run the Server.


## Available Scripts for Frontend

In the project directory, you must run "npm install" followed by "npm start".

### `npm install`

Installs all the dependencies needed for the client side of the application, which are specified in the package.json file.

### `npm start`

Runs the react app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Available Scripts for Backend

In the "server" sub-directory, you must run "npm install" followed by "npm start".

### `npm install`

Installs all the dependencies needed for the server, which are specified in the /server/package.json file.

### `npm start`

Runs the express app in the development mode.<br />
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.
