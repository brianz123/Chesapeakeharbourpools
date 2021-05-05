/***
This script is used to automatically add Staff members to the database
***/function OnStaffFormSubmit() {
  var urlForm = 'https://docs.google.com/forms/d/1OvFyeRyBs5Gq8gE2g6Mf1eQMAcUOKtiZ71lWU-HKQk8/edit'; //Residents
  var ans = getArrayOfLastSubmissionsAnswers(urlForm);
  var url = 'https://docs.google.com/spreadsheets/d/12UCpBvr82Zh1h3TLLC3Q34yYZdUShLWoHsEuw8ghj50/edit#gid=1859174399';
  var data = SpreadsheetApp.openByUrl(url).getSheetByName('DataList');
  var last = ans[0];//get last name of user
  var email = ans[1]; //get email
  var name = ans[2]; // get first and last name
  var data = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/12UCpBvr82Zh1h3TLLC3Q34yYZdUShLWoHsEuw8ghj50/edit#gid=0').getSheetByName('DataList'); //get data sheet from seperate spreadsheet
  var c = 3990; //location of Id
  var row = data.getRange(c, 2).getValue(); 
  
  while (row !== ''){ // find open ID to get assigned to
          c++;
          row = data.getRange(c, 2).getValue();
        } 
      var ID = data.getRange(c, 1).getValue();
      data.getRange(c, 2).setValue(last); // assign last name to ID
      data.getRange(c, 4).setValue(email); // assign email to ID
      data.getRange(c, 7).setValue(name) //assign first name to ID
      Logger.log(data.getRange(c, 1,1,8).getValues());
      MailApp.sendEmail(email , 'Pool Registration Confirmation', 'Staff User ' + name + ',\nThank you for registering!\n\nYOUR POOL ID IS: ' + ID +
                        '\n\nPLEASE SAVE THIS EMAIL AND YOUR POOL ID!'+
                        '\n\nThank you,\nCHCA Ad Hoc Pool Committee'); // send email t staff user
    }
  
function getArrayOfLastSubmissionsAnswers(urlForm) {
  var allQuestions,i,itemType,L,thisAnswer,thisQuestion,thisSubmissionsAnswers,number_of_submissions;
  number_of_submissions = FormApp.openByUrl(urlForm).getResponses().length;
  allQuestions = FormApp.openByUrl(urlForm).getResponses()[number_of_submissions -1].getItemResponses();
  
  L = allQuestions.length;//How many questions are there in the Form
  thisSubmissionsAnswers = [];//Create an empty array for answers
  
  for (i=0;i<L;i++) {//Loop through all the questions in this Form submission
    thisQuestion = allQuestions[i];//Get this question
    
    itemType = thisQuestion.getItem().getType();
    if (itemType === FormApp.ItemType.PAGE_BREAK) {
      continue;//keep looping
    }
    thisAnswer = thisQuestion.getResponse();//Get the answer
    thisSubmissionsAnswers.push(thisAnswer);//add answer to the array
  }
  return thisSubmissionsAnswers;
}

