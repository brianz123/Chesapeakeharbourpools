
/***This script is used to automatically add Staff members to the database
***/
function OnFormSubmit() {
  var urlForm = 'https://docs.google.com/forms/d/18qeiH4vK2vfQOqO5L3OfC-tKhkHmfKdr6jiRq0NUN2U/edit#responses'; //Residents
  var ans = getArrayOfLastSubmissionsAnswers(urlForm);
Logger.log(ans)
  var name = ans[2];//get last name of user
  var email = ans[1].toString().titleCase() //get email
  var residentPoolID = ans[3]; // get first and last name
  var eighteeeighteenPlus = ans[4];
  var signature = ans[5]
  var data = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1NP6O688YQykRcqv4Xj02zxz93m84MvKh_PviqUCDWjg/edit#gid=1533196389').getSheetByName('GuestID'); //get data sheet from seperate spreadsheet
  var c = 1; //location of Id
  var row = data.getRange(c, 2).getValue(); 
  
  while (row !== ''){ // find open ID to get assigned to
          c++;
          row = data.getRange(c, 2).getValue();
        } 
      var ID = data.getRange(c, 1).getValue();
      data.getRange(c, 2).setValue(name); // assign last name to ID
      data.getRange(c, 3).setValue(email); // assign email to ID
      data.getRange(c, 4).setValue(residentPoolID) //assign first name to ID
      data.getRange(c, 5).setValue(eighteeeighteenPlus) //assign if they     are 18+
      data.getRange(c, 6).setValue(signature) //assign signasignature if not 18+
      Logger.log(data.getRange(c, 1,1,8).getValues());
      MailApp.sendEmail(email , 'Pool Guest Registration Confirmation', 'Guest ' + name + ',\nThank you for registering!\n\nYOUR GUEST ID IS: ' + ID + ". It will only be vaild when entering the pool with your resident."+
                        '\n\nPLEASE SAVE THIS EMAIL AND YOUR GUEST ID!'+
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


