/*** 
This function adds the pool user's information  on the "AtThePool" tab of the entrance program spreadsheet 
***/
function Edit(walk, pool) {
  var dash = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1oF-udC_qamZLgjgJB_szd14Gt_XSjpZ0KjYzGBKRvA4/edit#gid=549595336'); // Dashboard
  dash = dash.getSheetByName("URLs");
  var urlList = dash.getRange(1, 3, 30, 1).getValues();


  if (pool == 'village') var url = urlList[3]; //village
  //needs to be changed when done
  else var url = urlList[2]; // Bay
  Logger.log(url);

  var ss = SpreadsheetApp.openByUrl(url); //Main spreadsheet
  var main = ss.getSheetByName("Main");
  var atThePool = ss.getSheetByName('AtThePool');
  //var SignedUp = ss.getSheetByName('SignedUp')
  var arrPool = atThePool.getRange(1, 1, 100, 5).getValues();
  var ID = main.getRange('B2').getValue();
  var totalNumberOfFamAtPool = 0;
  var LEFT = false;
  var data = SpreadsheetApp.openByUrl(urlList[5]).getSheetByName('Data');
  var dataList = data.getRange(1, 1, data.getMaxRows(), 16).getValues();
  if (ID == '') return showAlert('Enter ID');
  Logger.log('ID: ' + ID)
  var names = toArray(atThePool.getRange(1, 100).getValue());
  var allHavePictures = atThePool.getRange(1, 101).getValue();
  atThePool.getRange(1, 101).setValue(0);
  atThePool.getRange(1, 50).setValue('');
  // var arr = data.getRange(1,1,data.getMaxRows(),1).getValues(); //everyone at pool
  var rows = data.getRange(find(dataList, ID) + 1, 1, 1, 15).getValues(); //selected ID row
  var actualNum = rows[0][2];
  var address = rows[0][4];
  var unit = rows[0][5];
  var d = new Date()
  var email = rows[0][3];
  var time = d.toLocaleTimeString(); //time left
  Logger.log(actualNum + ' actual number of people' + rows);
  //put.activate();
  var d = new Date();
  for (var i = 0; i < names.length; i++) {
    var checkBoxRange = main.getRange(1 + i, 7).getValue();
    var nameRange = main.getRange(1 + i, 6).getValue();
    main.getRange(i + 1, 6).setValue('');
    names[i][1] = checkBoxRange;
    if (names[i][1] == true) names[i][2] = 1;
    totalNumberOfFamAtPool += names[i][2]*1.0; //casted as a number 
  }
  var currentGuests = main.getRange(2, 8).getValue();
  var namesOfGuests = []
  if(currentGuests > 0){
    var GuestCounter = currentGuests;
    for(var i = 1; i <= GuestCounter; i++){
      var addGuestPrompt = "Please enter the name of Guest " + i + ":"
      //TODO --> create popup to add Guest name with addGuestPrompt as the prompt
      var nameOfGuestI; //get name from popup
      namesOfGuests.push(nameOfGuestI);



    }
  }


  if (totalNumberOfFamAtPool < 1 || toString(names).length <= 7) return showAlert('Error, Try again' + toString(names).length + "\n" + toString(names));
  var numPeople = 0;
  for (var i = 0; i < names.length; i++) {
    // Logger.log(names[i][1] + "SUM SUM SUM SUM SUM");
    if (names[i][1] == true) {
      numPeople++;
    }
  }
  var totalPeopleAtPoolForGroup = numPeople + currentGuests

  time = '';
  //var there = 'AtThePool';
  if (totalPeopleAtPoolForGroup == 0) {
    time = d.toLocaleTimeString();
    // there = 'Left';
  }
  var atPool = findAtPool(ID, url);
  // Logger.log(walk + '   Walk');
  var IdLoc = find(dataList, ID);
  var alert = dataList[IdLoc][13];
  if (atPool > 0) {
    var lastTimeIn = findLast(arrPool);
    var totalGuests = atThePool.getRange(lastTimeIn, 1, 1, 9).getValue(); //col J
    if (currentGuests > totalGuests) totalGuests = currentGuests;
    atThePool.getRange(lastTimeIn, 1, 1, 11).setValues([[d.toLocaleTimeString(), d.toLocaleDateString(), rows[0][0], email, address, unit, (totalNumberOfFamAtPool + totalGuests), (numPeople + currentGuests), currentGuests, totalGuests, numPeople,totalNumberOfFamAtPool,toString(names)]]);

  } else {
    var totalGuests = atThePool.getRange(lastTimeIn, 1, 1, 9).getValue(); //col J
    if (currentGuests > totalGuests) totalGuests = currentGuests;
    atThePool.getRange(findLast(arrPool), 1, 1, 12).setValues([[d.toLocaleTimeString(), d.toLocaleDateString(), rows[0][0], email, address, (totalNumberOfFamAtPool + totalGuests), (numPeople + currentGuests), currentGuests, totalGuests, numPeople,totalNumberOfFamAtPool,toString(names),timeOut]]]]);

  }

  cancel(pool)
  Update(pool);
  confirm();
}

/*** 
This function clears data from the "Main" tab of the entrance program spreadsheet 
***/
function cancel(pool = 'bay') {
  var dash = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1oF-udC_qamZLgjgJB_szd14Gt_XSjpZ0KjYzGBKRvA4/edit#gid=549595336'); // Dashboard
  dash = dash.getSheetByName("URLs");
  var urlList = dash.getRange(1, 3, 30, 1).getValues();


  if (pool === 'village') var url = urlList[3]; //village
  //needs to be changed when done
  else var url = urlList[2]; //bay
  var main = SpreadsheetApp.openByUrl(url).getSheetByName('Main');
  for (var i = 0; i < 10; i++) {
    main.getRange(i + 1, 6).setValue('');
    main.getRange(i + 1, 7).setValue(false);
    
  }
  main.getRange(2, 2).setValue('');
  main.getRange(2, 8).setValue(0);
}


