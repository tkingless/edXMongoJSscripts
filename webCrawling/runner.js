//ultimate csv format goal:
//recorded, matchid, type, stage, scores, corner(if there is CHL), {odds data}

//file naming: matchid_teams.csv

load('csv.js');
load('lib/index.js');

//Declarations of const
db = connect("localhost:27017/MongoProdWebcrawling");
print("Entered DB: " + db.getName());

//date is the handler from Datefu, a nice contributer from https://github.com/mde/date-fu
var dateParts = date.dateParts;


var recentEventsDate = new Date();
print("Before recentEventsDate is:" + recentEventsDate);
recentEventsDate = date.add(recentEventsDate, dateParts.HOUR, -6);
print("After recentEventsDate is:" + recentEventsDate);

var recentEventCursor = db.MatchEvents.find( { "lastModifiedAt" : {"$gte": recentEventsDate} } , { MatchId:1, commence:1} ).limit(3);


while(recentEventCursor.hasNext()) {
    var obj = recentEventCursor.next();
    //var id = obj._id;
    //print(tojson(id));
    print(tojson(obj));
}

helloWorld();

//Rundown:
//1. scan Match event that either commence or actualcommence less than four hours (of course commence time have priorty), then these are targets of runner
//2. 
// . On the other hand, check current directory of files starting with the matchid, get matchid and get the lastMod time, if 4 hrs ago, mv it to today history folder


//unit functions
//1.load filenames
//2.create folders
//3. read,compare,write time




//examples for queries
/*
db = connect("localhost:27017/test");
var cursor = db.unicorns.find({gender : "m"});
var total = 0;
while(cursor.hasNext()) {
  var obj = cursor.next();
  total += (obj.hits || 0);
}
print(total);
*/

/*
print(db.getName());

var cursor = db.modulestore.definitions.find();

while(cursor.hasNext()) {
  var obj = cursor.next();
  var id = obj._id;
  //print(tojson(id));
  print(tojson(obj));
}
*/

/*
print(db.getName());

var cursor = db.modulestore.structures.find();

while(cursor.hasNext()) {
  var obj = cursor.next();
  var id = obj._id;
  //print(tojson(id));
  print(tojson(obj));
}
*/
