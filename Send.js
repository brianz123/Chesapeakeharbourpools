/*** ---Written by Brian Zagalsky---
This function decides if the selected row is from the slipholder or a homeowner sends an email to the user with their Pool ID
***/
function email() {

    var dash = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1oF-udC_qamZLgjgJB_szd14Gt_XSjpZ0KjYzGBKRvA4/edit#gid=549595336'); // Dashboard
  dash = dash.getSheetByName("URLs");
  var urlList = dash.getRange(1,3,30,1).getValues();

  
  var sheet = SpreadsheetApp.openByUrl(urlList[4]).getSheetByName("Form Responses 1");
  for (var i = 1; i < 500; i++){
    var current = sheet.getRange(i, 1,1,1).getValue();
    if(current == '') return;
    current = sheet.getRange(i, 9); //get Village 9
    if (current.getBackground() == '#00ff00'){
      if (current.getValue() === 'Marina'){
        Logger.log('marina')
        if (emailMarina(i)){
          sheet.getRange(i, 1,1, sheet.getMaxColumns()).setBackgroundRGB(0,0,255);
        }
      }else{
        if(emailResident(i)){
          sheet.getRange(i, 1,1, sheet.getMaxColumns()).setBackgroundRGB(0,0,255);
        }
        Logger.log('resident');
      }
    }
  }
  Logger.log('check complete');
}
/***
This function sets the selected string to title case
***/
function titleCase(str) {
  str = String(str).toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
  return str.join(' ');
}
