DO NOT PUSH TO MAIN
Push and PULL from DEV Branch

Eventify - 2025
Packages Needed:
npm install express mongoose dotenv express-session

To restore the dump file and have a set series of data appear when you open the app, run 
mongorestore --uri="mongodb://localhost:27017/eventify" --archive="INSERT_PATH_NAME_HERE\Eventify\eventify.dump" 


Run eventify.js in order to run the server
Eventify is used to display events in an Area specifically tailed to a certain location
Allows user submissions in the Submit Tab
Users must be logged in to submit events
Events are listed in the Events Tab
Registration requires an email, name and password

The Homepage features a map that displays the events using leaflet
