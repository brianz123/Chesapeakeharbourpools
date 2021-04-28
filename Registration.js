/*** ---Written by Brian Zagalsky---
This function sends an email to the homeowner pool users with their Pool ID
***/ 

function emailResident(row = 3) {

   
    var dash = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1oF-udC_qamZLgjgJB_szd14Gt_XSjpZ0KjYzGBKRvA4/edit#gid=549595336'); // Dashboard
  dash = dash.getSheetByName("URLs");
  var urlList = dash.getRange(1,3,30,1).getValues();

  
    Logger.log(urlList[5]);
    var sheet = SpreadsheetApp.openByUrl(urlList[4]).getSheetByName('Form Responses 1'); //get residents sheet
    var lastYear = sheet.getSheetValues(row, 4,1,1); //Do you want the same Pool ID number from Last year? 4
    var poolID = sheet.getSheetValues(row, 5,1,1); // Pool ID from last year 5
     var data = SpreadsheetApp.openByUrl(urlList[5]);
       data =  data.getSheetByName('DataList'); //get data sheet from seperate spreadsheet

    if(checkFromLastYear(row)){
      return false;
    }else{  
      var name = sheet.getRange(row, 6).getValue(); //get last name of user 6
      if (name !== ''){ // check if there is name in cell
        var email = sheet.getRange(row, 2).getValue(); //get email col 2
        var num = sheet.getRange(row, 11).getValue(); // get maximum number of people 11
        var address = sheet.getRange(row, 7).getValue(); // get address 7
        var names = sheet.getRange(row, 12).getValue(); // get first names 12
        var unit = sheet.getRange(row, 8).getValue(); // get unit number 8
       
        var dataRow =2; //location of Id
        var row = data.getRange(dataRow, 4).getValue(); 
        
        while (row !== ''){ // find open ID to get assigned to
            dataRow++;
            row = data.getRange(dataRow, 4).getValue(); //email collumn
          } 
        var ID = data.getRange(dataRow, 1).getValue();
        data.getRange(dataRow, 2).setValue(titleCase(name));
        data.getRange(dataRow, 3).setValue(num);
        data.getRange(dataRow, 4).setValue(titleCase(email));
        data.getRange(dataRow, 5).setValue(titleCase(address));
        data.getRange(dataRow, 6).setValue(unit);
        data.getRange(dataRow, 7).setValue(titleCase(names));
        data.getRange(dataRow,15).setValue(true); //sets 2021 confirmed to true
        
        Logger.log(data.getRange(dataRow, 1,1,5).getValues());
        MailApp.sendEmail(email ,'Pool Registration Confirmation', 'Pool User ' + name + ',\nThank you for registering to use the pool!\n\nYOUR POOL ID IS: ' + ID + '\n\nPLEASE SAVE THIS EMAIL AND YOUR POOL ID! You will need your Pool ID number to enter the pool.\n\nThank you,\nCHCA Ad Hoc Pool Committee');
    
    data.getRange(dataRow, 7).splitTextToColumns(",");
      }
     /*var text = 'Below is the Pool Reservation Link.  Please open the link below to reserve your time slot at the Bay Front or Village Pools. Both pools are on the same link, just scroll down for the Village Pool. We are continuing to develop this form and plan to provide soon for reserving a slot a couple of days in advance. Thank you for your patience.\n' +

'\nSAME DAY RESERVATIONS are only available at this time. At any time during the day you can check the reservation link/sheet to see availability at the pools and make a reservation.' + 

'\n\nONE TIME SLOT RESERVATION PER DAY - At this time, reservations can only be made for one time slot for each day. But, you are welcome to try to be a  “Walk In”  for an additional time slot, based on space availability at the pools.\n' +

'\nWALK IN - If you do not make an electronic reservation, you can go to either pool and give the gate attendant your Pool ID #(' + ID + ') based on availability, or you can enter the pool area as a walk in.\n' + 

'\n20 MINUTE HOLD - The Time Slot Reservation is only held for the first 20 minutes of each time slot and after the 20 minutes the time slot will be released to walk ins.\n' +
'Link: chcapools.com';*/
      
      
    
    }
   
  
  return true;
}


/***
This function sends an email to slipholder pool users with their Pool ID
***/

function emailMarina(row) {
  
  
    var dash = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1oF-udC_qamZLgjgJB_szd14Gt_XSjpZ0KjYzGBKRvA4/edit#gid=549595336'); // Dashboard
  dash = dash.getSheetByName("URLs");
  var urlList = dash.getRange(1,3,30,1).getValues();


  
    Logger.log(urlList[5]);
    var sheet = SpreadsheetApp.openByUrl(urlList[4]).getSheetByName('Form Responses 1'); //get residents sheet
    var lastYear = sheet.getSheetValues(row, 4,1,1); //Do you want the same Pool ID number from Last year? 4
    var poolID = sheet.getSheetValues(row, 5,1,1); // Pool ID from last year 5
     var data = SpreadsheetApp.openByUrl(urlList[5]);
       data =  data.getSheetByName('DataList'); //get data sheet from seperate spreadsheet
 if(checkFromLastYear(row)){
      return false;
  
  }else{
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Form Responses 1');
    var name = sheet.getRange(row, 6).getValue(); //get name 6
    if (name !== ''){
      var email = sheet.getRange(row, 2).getValue(); //get email 2
      var num = sheet.getRange(row, 13).getValue(); // get maximum number of people 13
      var address = sheet.getRange(row, 7).getValue(); // get slip number 7
      var names = sheet.getRange(row, 14).getValue(); // get first names 14
      var data = SpreadsheetApp.openByUrl(urlList[5]).getSheetByName('DataList');
      var dataRow = 2071;
       
      var place = data.getRange(dataRow, 2).getValue();

      while (place !== ''){
        dataRow++;
        place = data.getRange(dataRow, 2).getValue();  
        }  
        var ID = data.getRange(dataRow, 1).getValue();
        data.getRange(dataRow, 2).setValue(titleCase(name));
        data.getRange(dataRow, 3).setValue(num);
        data.getRange(dataRow, 4).setValue(titleCase(email));
        data.getRange(dataRow, 5).setValue(titleCase(address));
        data.getRange(dataRow, 6).setValue('Marina');
        data.getRange(dataRow, 7).setValue(titleCase(names)).splitTextToColumns();
        data.getRange(dataRow,15).setValue(true); //sets 2021 confirmed to true
        var text = 'Below is the Pool Reservation Link.  Please open the link below to reserve your time slot at the Bay Front or Village Pools. Both pools are on the same link, just scroll down for the Village Pool. We are continuing to develop this form and plan to provide soon for reserving a slot a couple of days in advance. Thank you for your patience.\n' +

  '\nSAME DAY RESERVATIONS are only available at this time. At any time during the day you can check the reservation link/sheet to see availability at the pools and make a reservation.' + 

  '\n\nONE TIME SLOT RESERVATION PER DAY- At this time, reservations can only be made for one time slot for each day. But, you are welcome to try to be a  “Walk In”  for an additional time slot, based on space availability at the pools.\n' +

  '\nWALK IN - If you do not make an electronic reservation, you can go to either pool and give the gate attendant your Pool ID #  based on availability you can enter the pool area.\n' + 

  '\n20 MINUTE HOLD - The Time Slot Reservation is only held for the first 20 minutes of each time slot and after the 20 minutes the time slot will be released to walk-ins.\n' +
  'Link: chcapools.com';
        
        
        Logger.log(data.getRange(dataRow, 1,1,5).getValues());
        MailApp.sendEmail(email ,'Pool Registration Confirmation', 'Pool User ' + name + ',\nThank you for registering to use the pool!\n\nYOUR POOL ID IS: ' + ID + '\n\nPLEASE SAVE THIS EMAIL AND YOUR POOL ID! You will need your Pool ID number to enter the pool.\n\nThank you,\nCHCA Ad Hoc Pool Committee');
                          
      }else Logger.log('error');
    
    }
  return true;
}
/*** 
This subfucntion returns the row that the chosen ID is at
***/
function findID(arr, x) {
// Logger.log(arr);
  for(var i = 0; i < arr.length; i++){
    if (arr[i][0]== x){
      //Logger.log('found');
        Logger.log('found at index ' + (i+1));
      return i+1; 
      
    } 
    
  }
  return -1;
}
/***
 * This subfunction checks if the user had a previous pool ID
 */
function checkFromLastYear(row){
   var dash = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1oF-udC_qamZLgjgJB_szd14Gt_XSjpZ0KjYzGBKRvA4/edit#gid=549595336'); // Dashboard
  dash = dash.getSheetByName("URLs");
  var urlList = dash.getRange(1,3,30,1).getValues();

  
    Logger.log(urlList[5]);
    var sheet = SpreadsheetApp.openByUrl(urlList[4]).getSheetByName('Form Responses 1'); //get residents sheet
    var lastYear = sheet.getSheetValues(row, 4,1,1); //Do you want the same Pool ID number from Last year? 4
    var poolID = sheet.getSheetValues(row, 5,1,1); // Pool ID from last year 5
     var data = SpreadsheetApp.openByUrl(urlList[5]);
       data =  data.getSheetByName('DataList'); //get data sheet from seperate spreadsheet

  if(lastYear[0][0] == "Yes"){ //if the resident wants same ID
      sheet.getRange(row, 4,1,1).setValue("Yes'"); //turns off green highlight
      var email = sheet.getRange(row, 2).getValue(); //get email col 2
      var poolID = sheet.getRange(row, 5).getValue(); //previous pool ID 5

      
      var IDList = data.getSheetValues(1,1, data.getLastRow(),1); //gets list of email from dataBase
      var IDLoc = findID(IDList,poolID); //finds the row the email is in
      var ID = data.getSheetValues(IDLoc,1, 1,1);
   
      if(IDLoc < 0){
        MailApp.sendEmail(email , 'UNSUCCESSFUL Pool Registration', "Your Pool ID was not in the system. Plese register for a new Pool ID number or contact support at help@chcapools.com");
        Logger.log("bad ID" + poolID);
        sheet.getRange(row, 1,1, sheet.getMaxColumns()).setBackgroundRGB(255,165,0);
        return true;
      }
      var oldEmail = data.getRange(IDLoc, 4).getValue();
      var name = data.getRange(IDLoc, 2).getValue();
      if (String(email).toLowerCase() === String(oldEmail).toLowerCase()){
        Logger.log("email match");
        data.getRange(IDLoc,15).setValue(true);
      }else{
        MailApp.sendEmail(email , 'UNSUCCESSFUL Pool Registration', "Your email address does not match your Pool ID. Plese go to https://sites.google.com/chcapools.com/chcapool/forgot-pool ID for help or register for a new Pool ID number");
        sheet.getRange(row, 1,1, sheet.getMaxColumns()).setBackgroundRGB(255,165,0);
        Logger.log("bad email" + oldEmail + "_" + email);
        return true;
      }
      MailApp.sendEmail(String(email) , 'Pool Registration Confirmation', 'Pool User ' + name + ',\nThank you for registering to use the pool!\n\nYOUR POOL ID IS: ' + ID +
                        '\n\nPLEASE SAVE THIS EMAIL AND YOUR POOL ID! You will need your Pool ID number to enter the pool.\n'+'\n\nThank you,\nCHCA Ad Hoc Pool Committee');
    sheet.getRange(row, 1,1, sheet.getMaxColumns()).setBackgroundRGB(0,0,255);
    return true;
    
}else 
  return false;
}

