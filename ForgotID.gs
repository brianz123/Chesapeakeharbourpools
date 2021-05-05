
function onForgotIDFormSubmit(e){
  var max = 100;

  var dash = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1oF-udC_qamZLgjgJB_szd14Gt_XSjpZ0KjYzGBKRvA4/edit#gid=549595336'); // Dashboard
  dash = dash.getSheetByName("URLs");
  var urlList = dash.getRange(1,3,30,1).getValues();

  var urlForm = urlList[6];
  //var form = SpreadsheetApp.openByUrl(urlForm);
  var ans = getArrayOfLastSubmissionsAnswers(urlForm);
  var email = ans[0];
  var sheet = SpreadsheetApp.openByUrl(urlList[5]);
  var data = sheet.getSheetByName('Data'); 
  var dataList = data.getRange(2,1,data.getMaxRows(), 4).getValues();
  
  for(var i = 0; i < dataList.length; i++){
    var possibleEmail = dataList[i][3];
    var ID = dataList[i][0];
    var name = dataList[i][1];
    if (possibleEmail == email)
     return MailApp.sendEmail(email, 'Pool ID recovery' , 'Pool User ' + name + ',\nYour Pool ID is: ' + ID)
 
  }
   return MailApp.sendEmail(email, 'Pool ID recovery' , 'This email is not registered in our database')

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
