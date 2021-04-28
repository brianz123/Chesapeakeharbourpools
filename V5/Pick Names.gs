/***
This subfunction is responsible for displaying pool user's informationon on the "Main" tab of the entrance program spreadsheet 
***/
function checkIn(pool) {
   var dash = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1oF-udC_qamZLgjgJB_szd14Gt_XSjpZ0KjYzGBKRvA4/edit#gid=549595336'); // Dashboard
  dash = dash.getSheetByName("URLs");
  var urlList = dash.getRange(1,3,30,1).getValues();


  var names = []
  var pool = pool;
  if (pool == 'village') var url = urlList[3]; //village
  //needs to be changed when done
  else var url = urlList[2]; //bay
  var ss = SpreadsheetApp.openByUrl(url);
  var main = ss.getSheetByName('Main');
  var atThePool = ss.getSheetByName('AtThePool');
  var data = SpreadsheetApp.openByUrl(urlList[5]).getSheetByName('DataList');
  var ATPOOL = true;
  var LEFT = false;
  var dataList = data.getRange(1, 1, data.getMaxRows(), 16).getValues(); //database
  var ID = main.getRange('B2').getValue();
  Logger.log(ID);
  
  var name = '';
  var IdLoc = find(dataList, ID);
  if (IdLoc == -1) return showAlert('ID Not Found');
  Logger.log(dataList[IdLoc][14] + " current member " + (dataList[IdLoc][14].toString().toLowerCase() === "false"))
  if (dataList[IdLoc][14].toString().toLowerCase() === 'false') return showAlert('ID Not Found\nPlease make sure user registered for this current season');
  var alert = dataList[IdLoc][13];
  if(alert != ''){
    var d = new Date(); // date library
    showAlert(alert); // if there are notes present diplay notes as a pop-up
    MailApp.sendEmail('brianz@chcapools.com', 'Alert!', alert + "\t"+ ID+ "\t"+ pool + "\t" + d.toLocaleTimeString())
  }
  //write names     
  var highestNumPeople = dataList[IdLoc][2];
  //get array of names
  var havePictures = 0;
  Logger.log(highestNumPeople)
  for (var i = 0; i <= highestNumPeople; i++){
    //      Logger.log(dataList[IdLoc][6 + i] + '  people');
    if (dataList[IdLoc][6 + i] !== ''){
      names.push([dataList[IdLoc][6 + i],LEFT, 0])
    }   
    var formula = data.getRange(IdLoc+1,7+i).getFormula();
    Logger.log(formula + " Formula");
    if(formula != ""){
    main.getRange(i+1, 6).setFormula(formula);
    }else{
      main.getRange(i+1, 6).setValue(data.getRange(IdLoc+1,7+i).getValue());
    }
    //Logger.log(names);
  }   
  var atPool = findAtPool(ID, url);
  if (atPool == 0) { 
    //not already at the pool
    Logger.log('Not at the pool');     
    //write if they are there
    for (var i = 0; i <highestNumPeople; i++){
      var person = names[i];
      var range = main.getRange(i + 1, 7);   
      range.setValue(LEFT); //set check boxes to false
    }
  }else{
    //already at the pool
    Logger.log("At the pool");
    name = toArray(atThePool.getRange(atPool, 11).getValue());
    Logger.log(name);
    Logger.log('Already at pool');
    //write if they are there
    for (var i = 0; i < name.length; i++){
      var person = name[i];
      var range = main.getRange(i + 1, 7);
      
      if (person[1] === 'true') range.setValue(ATPOOL) //sets checkboxes
      else range.setValue(LEFT)
      names = name
    }
  }
  atThePool.getRange(1,100).setValue(toString(names));
  if (havePictures == highestNumPeople)   atThePool.getRange(1,101).setValue(1);
  else atThePool.getRange(1,101).setValue(0);
  
}

/*** 
Google scripts does not have any easy way to store values so values are stored in a string on the entrance program spreadsheet. 
This subfucntion returns an array from a string
***/
function toArray(str){
  var tempArray  = str.split(':');
  var finalArray = [];
  for (var i = 0; i < tempArray.length; i++) {
    var temp = tempArray[i].split(',');
    finalArray.push(temp);
  }
  return finalArray
}

/*** 
This subfucntion returns a string from an array
***/
function toString(arr){
  var out ='';
  for(var i = 0; i < arr.length; i++){
    for(var j = 0; j < arr[0].length; j++){
      out += arr[i][j];
      if (j < arr[0].length -1 ){
        out += ','[0]
      }
    }
    if (i < arr.length -1){
      out += ':'
    }
  }
  return out;
}