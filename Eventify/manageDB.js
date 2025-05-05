const { name } = require('ejs');

const MongoClient = require('mongodb').MongoClient;
var getID = require('mongodb').ObjectID();
var url = "mongodb://127.0.0.1:27017/";
let database = {};

let mongoClient = MongoClient(url,{ useUnifiedTopology: true });
let myDB;

myDB=mongoClient.db(dbName);

MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	console.log(`Connected to ${dbName}`);
  });

  database.get = function(dbName){
    if (myDB){
	return myDB;
    } else {
	return connect(dbName);
    }
}
database.close = async function(){

    try{
	await mongoClient.close();
	return;
    } catch(e){
	console.log(e.message);
    }
 }

 database.createCollection("users", function(err, res) {
	if (err) throw err;
	console.log("Collection created.");
	
  });

  database.createCollection("events", function(err, res) {
	if (err) throw err;
	console.log("Collection created.");
	
  });

  database.createCollection("tickets", function(err, res) {
	if (err) throw err;
	console.log("Collection created.");
	
  });

  //event data (maybe arrays?) needs to be connected and inserted for pastEvents parameter. It currently holds a string
  var userData = [
    {_id: 1,  name: 'Bob',          email: 'bob123@rowan.edu',      password: 'a6MaER7XAr', pastEvents: 'event'},
    {_id: 2,  name: 'Bill',         email: 'bill456@rowan.edu',     password: 'Nt5rwnaukH', pastEvents: 'event'},
    {_id: 3,  name: 'Brian',        email: 'bry@rowan.edu',         password: 'dhEDysFX4j', pastEvents: 'event'},
    {_id: 4,  name: 'Brett',        email: 'notbrett@rowan.edu',    password: 'Nw8uwgyJDj', pastEvents: 'event'},
    {_id: 5,  name: 'Josh',         email: 'josh@rowan.edu',        password: 'GjG2zRUxZw', pastEvents: 'event'},
    {_id: 6,  name: 'Jim',          email: 'jim@rowan.edu',         password: 'BL2xwpUw9J', pastEvents: 'event'},
    {_id: 7,  name: 'Sally',        email: 'sal@rowan.edu',         password: 'Xzfs3SCrZt', pastEvents: 'event'},
    {_id: 8,  name: 'Fred',         email: 'fred.dead@rowan.edu',   password: 'TeUbUMJV97', pastEvents: 'event'},
    {_id: 9,  name: 'Chris',        email: 'chris.name@rowan.edu',  password: 'UZ6kJ8P4Ya', pastEvents: 'event'},
    {_id: 10, name: 'Justin',       email: 'just@rowan.edu',        password: 'ySBFUHBPm8', pastEvents: 'event'},
    {_id: 11, name: 'Ted',          email: 'ted@rowan.edu',         password: 'PqcahZjyfR', pastEvents: 'event'},
    {_id: 12, name: 'Phil',         email: 'phil@rowan.edu',        password: 'ymhKhpqWHh', pastEvents: 'event'},
    {_id: 13, name: 'Greg',         email: 'greg@rowan.edu',        password: 'caEZm5NZq6', pastEvents: 'event'},
    {_id: 14, name: 'Garry',        email: 'gar@rowan.edu',         password: 'Drfcw4z5XT', pastEvents: 'event'},
    {_id: 15, name: 'Larry',        email: 'lar@rowan.edu',         password: '8rhfs6PLvr', pastEvents: 'event'},
    {_id: 16, name: 'Barry',        email: 'bar@rowan.edu',         password: '7MnBjFVmyc', pastEvents: 'event'},
    {_id: 17, name: 'Harry',        email: 'har@rowan.edu',         password: 'B7ffeskDrr', pastEvents: 'event'},
    {_id: 18, name: 'Bill',         email: 'bill@rowan.edu',        password: 'SRuhyyY2yP', pastEvents: 'event'},
    {_id: 19, name: 'John',         email: 'john@rowan.edu',        password: 'te436sfNmf', pastEvents: 'event'},
    {_id: 20, name: 'Maximiliano',  email: 'max@rowan.edu',         password: 'qaPI60V0%m', pastEvents: 'event'}
  ];

  database.collection("users").insertMany(userData, function(err, res) {
    if (err) throw err;
    console.log(res);
  });

  //locations were randomly created and are not based on anything, if this data is to be used for displaying on the map, it must be replaced and rewritten
  //flyer does not currently have jpg's placed in them, should be added later
  var eventData = [
    {_id: 1,  eventName: 'Party Bash',                 hostID: 1, date: '5/20/25', location: '123 This Dr.',    flyer: 'image', rsvpCount: 20,  requiresRSVP: true},
    {_id: 2,  eventName: 'Birthday Bonanza',           hostID: 3, date: '6/2/25',  location: '456 That St.',    flyer: 'image', rsvpCount: 40,  requiresRSVP: true},
    {_id: 3,  eventName: 'Cinco De Mayo',              hostID: 2, date: '5/5/25',  location: '789 What Rd.',    flyer: 'image', rsvpCount: 60,  requiresRSVP: true},
    {_id: 4,  eventName: 'Revenge of the Fifth',       hostID: 5, date: '5/5/25',  location: '102 Not Av.',     flyer: 'image', rsvpCount: 80,  requiresRSVP: true},
    {_id: 5,  eventName: 'My Party',                   hostID: 19, date: '5/27/25', location: '435 My Cir.',     flyer: 'image', rsvpCount: 100, requiresRSVP: true},
    {_id: 6,  eventName: 'Graduation Party',           hostID: 19, date: '6/1/25',  location: '987 Notta Ln.',   flyer: 'image', rsvpCount: 10,  requiresRSVP: true},
    {_id: 7,  eventName: 'Sals Birthday',              hostID: 7, date: '8/20/25', location: '6 Main Bl.',      flyer: 'image', rsvpCount: 30,  requiresRSVP: true},
    {_id: 8,  eventName: 'Surprise Party',             hostID: 4, date: '5/20/25', location: '83 Main Way',     flyer: 'image', rsvpCount: 50,  requiresRSVP: true},
    {_id: 9,  eventName: 'Street Fighter Tournament',  hostID: 4, date: '6/2/25',  location: '7 Main Ct.',      flyer: 'image', rsvpCount: 70,  requiresRSVP: true},
    {_id: 10, eventName: 'Semesters done, lets party', hostID: 9, date: '5/22/25', location: '8721 Garden Tr.', flyer: 'image', rsvpCount: 90,  requiresRSVP: true},
    {_id: 11, eventName: 'My Party',                   hostID: 8, date: '7/15/25', location: '7 Street Rd.',    flyer: 'image', rsvpCount: 2,   requiresRSVP: false},
    {_id: 12, eventName: 'My birthday',                hostID: 6, date: '5/25/25', location: '4 Road St.',      flyer: 'image', rsvpCount: 26,  requiresRSVP: false},
    {_id: 13, eventName: 'Gregs party',                hostID: 13, date: '6/3/25',  location: '98 That Av.',     flyer: 'image', rsvpCount: 62,  requiresRSVP: false},
    {_id: 14, eventName: 'Awesome Party',              hostID: 13, date: '9/9/25',  location: '76 This St.',     flyer: 'image', rsvpCount: 98,  requiresRSVP: false},
    {_id: 15, eventName: 'APW JS Study Workshop',      hostID: 1, date: '5/6/25',  location: '54 His Rd.',      flyer: 'image', rsvpCount: 12,  requiresRSVP: false},
    {_id: 16, eventName: 'Classic Get Together',       hostID: 2, date: '6/9/25',  location: '32 Her Ln.',      flyer: 'image', rsvpCount: 1,   requiresRSVP: false},
    {_id: 17, eventName: 'idk',                        hostID: 4, date: '6/1/25',  location: '1 Four Ct.',      flyer: 'image', rsvpCount: 29,  requiresRSVP: false},
    {_id: 18, eventName: 'My Birthday',                hostID: 18, date: '5/31/25', location: '85 Main St.',     flyer: 'image', rsvpCount: 69,  requiresRSVP: false},
    {_id: 19, eventName: 'Party',                      hostID: 11, date: '7/2/25',  location: '67 Main Rd.',     flyer: 'image', rsvpCount: 420, requiresRSVP: false},
    {_id: 20, eventName: 'Maxs Birthday Party',        hostID: 20, date: '5/22/25', location: '90 Road Ln.',     flyer: 'image', rsvpCount: 7,   requiresRSVP: false}
  ];

  database.collection("events").insertMany(eventData, function(err, res) {
    if (err) throw err;
    console.log(res);
  });

  database.collection("events").aggregate([
    {$lookup:
      {
        from: "users",
        localField: '_id',
        foreignField: 'host_id',
        as: 'user_id'
      }
    }
  ])

  var ticketData = [
    {_id: 1,  user_id: 1,  event_id: 2,  eventTime: '7:00',  amPm: 'pm'},
    {_id: 2,  user_id: 3,  event_id: 2,  eventTime: '7:00',  amPm: 'pm'},
    {_id: 3,  user_id: 5,  event_id: 2,  eventTime: '7:00',  amPm: 'pm'},
    {_id: 4,  user_id: 7,  event_id: 2,  eventTime: '7:00',  amPm: 'pm'},
    {_id: 5,  user_id: 9,  event_id: 4,  eventTime: '4:30',  amPm: 'pm'},
    {_id: 6,  user_id: 11, event_id: 4,  eventTime: '4:30',  amPm: 'pm'},
    {_id: 7,  user_id: 13, event_id: 4,  eventTime: '4:30',  amPm: 'pm'},
    {_id: 8,  user_id: 15, event_id: 4,  eventTime: '4:30',  amPm: 'pm'},
    {_id: 9,  user_id: 17, event_id: 6,  eventTime: '11:00', amPm: 'am'},
    {_id: 10, user_id: 19, event_id: 6,  eventTime: '11:00', amPm: 'am'},
    {_id: 11, user_id: 19, event_id: 6,  eventTime: '11:00', amPm: 'am'},
    {_id: 12, user_id: 17, event_id: 6,  eventTime: '11:00', amPm: 'am'},
    {_id: 13, user_id: 15, event_id: 8,  eventTime: '8:30',  amPm: 'pm'},
    {_id: 14, user_id: 13, event_id: 8,  eventTime: '8:30',  amPm: 'pm'},
    {_id: 15, user_id: 11, event_id: 8,  eventTime: '8:30',  amPm: 'pm'},
    {_id: 16, user_id: 9,  event_id: 8,  eventTime: '8:30',  amPm: 'pm'},
    {_id: 17, user_id: 7,  event_id: 10, eventTime: '7:00',  amPm: 'pm'},
    {_id: 18, user_id: 5,  event_id: 10, eventTime: '7:00',  amPm: 'pm'},
    {_id: 19, user_id: 3,  event_id: 10, eventTime: '7:00',  amPm: 'pm'},
    {_id: 20, user_id: 1,  event_id: 10, eventTime: '7:00',  amPm: 'pm'}
  ];

  database.collection("tickets").insertMany(ticketData, function(err, res) {
    if (err) throw err;
    console.log(res);
  });

  database.collection("tickets").aggregate([
    {$lookup:
      {
        from: "users",
        localField: '_id',
        foreignField: 'user_id',
        as: 'username'
      }
    }
  ])

  database.collection("tickets").aggregate([
    {$lookup:
      {
        from: "events",
        localField: '_id',
        foreignField: 'event_id',
        as: 'event name'
      }
    }
  ])
    
module.exports = database;