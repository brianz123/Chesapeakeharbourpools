function onFormSubmit(e,num,url) {
  var TotalNumberUsers = 400
  var ss = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/12UCpBvr82Zh1h3TLLC3Q34yYZdUShLWoHsEuw8ghj50/edit#gid=808482676');
  var names = ss.getSheetByName('Data');
  var ans = getArrayOfLastSubmissionsAnswers(url);
  var ID = ans[0]
  Logger.log(ans[0])
  Logger.log(num)
  var pic1 =  DriveApp.getFileById(ans[1]).getId()
  Logger.log(pic1 + "  Pic")
  var poolPics = '1LYIsZ2snJnN3T-jyy4A2-QF8cIOR6bQ0';
  var folders = DriveApp.getFolderById(poolPics).getFolders()
  var IdLoc = find(names.getRange(1,1, 4000,1).getValues(), ID)+1;
  while (folders.hasNext()){
    var currentFolder = folders.next();
    if (currentFolder == ID){
      var IdLoc = find(names.getRange(1,1, 4000,1).getValues(), ID)+1;
      var name = names.getRange(IdLoc,num).getValue();
      Logger.log(name + "  Name" )
      Logger.log(IdLoc + "  IDLOC")
      if (IdLoc > 0){
        DriveApp.getFolderById(currentFolder.getId()).addFile(DriveApp.getFileById(pic1).setName(name));
      }else Logger.log("ERROR")
      
        }
  }
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