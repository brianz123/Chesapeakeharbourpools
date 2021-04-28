/***
This function is ran when the "CONFIRM" button is pressed. 
It decides whether to check if the current pool user has a 
reservatin based on the current time. Upon deciding if the 
pool user has a reservation, it will run the "Edit function
***/
function Add(pool = 'bay'){ 
   var dash = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1oF-udC_qamZLgjgJB_szd14Gt_XSjpZ0KjYzGBKRvA4/edit#gid=549595336'); // Dashboard
  dash = dash.getSheetByName("URLs");
  var urlList = dash.getRange(1,3,30,1).getValues();

  if (pool == 'bay') { 
    var url = urlList[2]; //Bay 
  }else var url = urlList[3]; //village 

  var ss = SpreadsheetApp.openByUrl(url);
  var main = ss.getSheetByName('Main');
  ss.getSheetByName('AtThePool').activate();
        Edit('Walk In', pool);
}



/***
This function is ran when the "SEARCH button is pressed. It returns the pool user's Pool ID and the number of allowed people they can bring to the pool
***/
function Search() {
   var dash = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1oF-udC_qamZLgjgJB_szd14Gt_XSjpZ0KjYzGBKRvA4/edit#gid=549595336'); // Dashboard
  dash = dash.getSheetByName("URLs");
  var urlList = dash.getRange(1,3,30,1).getValues();

  var ss = SpreadsheetApp.getActiveSheet();
  var spreadsheet = ss.getSheetByName("Main"); //gets active sheet
  var datas = SpreadsheetApp.openByUrl(urlList[5]);//gets pool database
  var dataSpreadsheet = datas.getSheetByName("Data");
  var arr = dataSpreadsheet.getRange(1,4,dataSpreadsheet.getLastRow(),1).getValues(); 
  var email = spreadsheet.getRange('B6').getValue();
  email = email.toLowerCase()
  Logger.log(email);
  var loc = findEmail(arr, email) + 1;
  if (loc == 0) return showAlert('User Not found');
  var ID = dataSpreadsheet.getRange(loc, 1,).getValue();
  var num = dataSpreadsheet.getRange(loc, 3,).getValue();
  spreadsheet.getRange("D6").setValue(ID);
  spreadsheet.getRange("E6").setValue(num);
  Logger.log(ID);
  
};
/***
This function is ran when the "EMPTY POOL" button is pressed. It sets the number of people at
the pool to zero and marks the time each user left with the current time
***/
function Empty(pool){
  //try{
  var d = new Date();
  var ui = SpreadsheetApp.getUi(); // Same variations.
  var result = ui.alert(
    'Warning',
    'Are you sure you want to remove everyone from the pool?',
    ui.ButtonSet.YES_NO);
  // Process the user's response.
  if (result == ui.Button.YES) {
    // User clicked "Yes".
    ui.alert('Warning','Click yes again to empty pool', ui.ButtonSet.YES_NO);
    // Process the user's response.
    if (result == ui.Button.YES) {
      // User clicked "Yes".
      
      var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('AtThePool');
      sheet.activate();
      var range = sheet.getRange(1,1,sheet.getMaxRows(),10);
      var currentValues = range.getValues();
      var newValues = [];
      for (var i = 0; i < sheet.getMaxRows(); i++) {
        Logger.log(i);
        if (currentValues[i][3] !==  "") { // if not empty cell
          Logger.log('empty');
          if (currentValues[i][7] > 0) {
            Logger.log('there');
            sheet.getRange(i+1, 8).setValue(0)
            sheet.getRange(i + 1,9).setValue('Left');
            sheet.getRange(i + 1,12).setValue(d.toLocaleTimeString());  
            
            
          }
        }
      }
      ui.alert('Pool emptied');
      Update(pool);
    }
  }
  sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Main');
  sheet.activate();
  Update(pool);
}


/***
This subfunction will display a pop up on the spreadsheet to notify the Gate Attendant of a selected string
***/
function showAlert(text) {
  var ui = SpreadsheetApp.getUi();
  
  var result = ui.alert(
    'Warning',
    text,
    ui.ButtonSet.OK);
}
/***
This subfunction will display a pop up on the spreadsheet to notify the Gate Attendant the action has been completed
***/
function confirm() {
  var ui = SpreadsheetApp.getUi();
  
  var result = ui.alert(
    'Confirmed',
    '',
    ui.ButtonSet.OK);
  
}


