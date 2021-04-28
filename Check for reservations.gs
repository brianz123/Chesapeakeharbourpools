/***
This function checks to see if the selected user has a reservation
Returns the number of people that the selected user reserved forun
***/
function checkReservation(ID,pool = 'bay'){
  Logger.log('running check for Reservations ');
  Logger.log(ID);
  if (pool == 'village') var url = 'https://docs.google.com/spreadsheets/d/1MQstlynIe54Evw_ZVKzlTgSmr3FbPFcrEAtv0SlQbYQ/edit#gid=0'; //village
  //needs to be changed when done
  else var url = 'https://docs.google.com/spreadsheets/d/15mStL5Ac6N3FIHMy8MlB9vB0RqmJ6uAPaC_21b7DhN0/edit#gid=0'; // Bay
  var d = new Date();
  var total = 0;
  var numAtTime = 0;
  var nameOfSheet = d.getMonth() + 1 + '/' + d.getDate(); //get sheet of that day
  var ss = SpreadsheetApp.openByUrl(url);
  var sheet = ss.getSheetByName('SignedUp');
  var arrayOfIds = sheet.getRange(1,1,300,1).getValues();
  var check = checkTime(pool);
  Logger.log(check)
  if (check[0] == 1){
    total = sheet.getRange(3,check[1]).getValue()
    Logger.log(total);
    var found = find(arrayOfIds, ID);
    if (found > 0){
      numAtTime = sheet.getRange(found +1, check[1]).getValue();
      Logger.log('Found ID   ' + [numAtTime]);
    }else Logger.log('ID Not Found');
  }
  return numAtTime;
}


/***
This function finds and returns the time that the selcted user reserved a time for 
***/
function getReservationTime(ID, pool){
   if (pool == 'village') var url = 'https://docs.google.com/spreadsheets/d/1MQstlynIe54Evw_ZVKzlTgSmr3FbPFcrEAtv0SlQbYQ/edit#gid=0'; //village
  //needs to be changed when done
  else var url = 'https://docs.google.com/spreadsheets/d/15mStL5Ac6N3FIHMy8MlB9vB0RqmJ6uAPaC_21b7DhN0/edit#gid=0'; // Bay
  var d = new Date();
  var total = 0;
  var numAtTime = 0;
  var nameOfSheet = d.getMonth() + 1 + '/' + d.getDate(); //get sheet of that day
  var ss = SpreadsheetApp.openByUrl(url);
  var sheet = ss.getSheetByName('SignedUp');
 
  var arrayOfIds = sheet.getRange(1,1,300,1).getValues();
  var loc = find(arrayOfIds, ID);
  Logger.log(loc + " LOCATION" );
  if (loc == -1) return 0;
  Logger.log(time(loc +1, pool)  + " time found ");
  return time(loc +1, pool);
}

/***
This is a subfunction of getReservationTime()
it returns the time of the reservation
***/
function time(row, pool){
  if (pool == 'bay') { 
    var start = 8;
    var end = 12;
    var url = 'https://docs.google.com/spreadsheets/d/15mStL5Ac6N3FIHMy8MlB9vB0RqmJ6uAPaC_21b7DhN0/edit#gid=0'; // Bay
  }else {
   var url = 'https://docs.google.com/spreadsheets/d/1MQstlynIe54Evw_ZVKzlTgSmr3FbPFcrEAtv0SlQbYQ/edit#gid=456594848y'; //village
  //needs to be changed when done
    var start = 13;
    var end = 17;
  }
  var d = new Date();
  Logger.log(url);
  var total = 0;
  var numAtTime = 0;
  var nameOfSheet = d.getMonth() + 1 + '/' + d.getDate(); //get sheet of that day
  var ss = SpreadsheetApp.openByUrl(url);
  var sheet = ss.getSheetByName('SignedUp');
  for (var i = start; i < end; i++){
    Logger.log(sheet.getRange(row,i).getValue() +  "   time Value");
    if (sheet.getRange(row,i).getValue() > 0){
      return sheet.getRange(2,i).getValue();
    }
  } 
  return 0;
}



/***
This function determines the number of people who have a reservation for the current timeslot and the next timeslot
***/
function timeSignUp(pool){
 if (pool == 'village') var url = 'https://docs.google.com/spreadsheets/d/1MQstlynIe54Evw_ZVKzlTgSmr3FbPFcrEAtv0SlQbYQ/edit#gid=0'; //village
  //needs to be changed when done
  else var url = 'https://docs.google.com/spreadsheets/d/15mStL5Ac6N3FIHMy8MlB9vB0RqmJ6uAPaC_21b7DhN0/edit#gid=0'; // Bay
  var d = new Date();
  var total = 0;
  var numAtTime = 0;
  var nameOfSheet = d.getMonth() + 1 + '/' + d.getDate(); //get sheet of that day
  var ss = SpreadsheetApp.openByUrl(url);
  var sheet = ss.getSheetByName('SignedUp');
  var time = checkTime(pool);
  if (time[0] > 0){
    var signedUp = sheet.getRange(3, time[1]).getValue();
    var next = sheet.getRange(3, time[1]+1).getValue()
    Logger.log("next Reservations " + next + " people");
    return [signedUp, next];
  }else{
    var signedUp = sheet.getRange(3, time[1] -1).getValue();
    var next = sheet.getRange(3, time[1]).getValue()
    Logger.log("next Reservations " + next + " people");
    return [signedUp, next];;
  }
}

