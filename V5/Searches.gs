/*** 
This subfucntion returns the row that the chosen value is at for a 2D array
***/
function find(arr, x) {
// Logger.log(arr);
  for(var i = 0; i < arr.length; i++){
    if (arr[i][0] === x){
      //Logger.log('found');
        Logger.log('found at index ' + i);
      return i; 
      
    } 
    
  }
  return -1;
}
/*** 
This subfucntion returns the row that the chosen email is at
***/
function findEmail(arr, x) {
// Logger.log(arr);
  for(var i = 0; i < arr.length; i++){
    if (arr[i][0].toLowerCase() === x){
      //Logger.log('found');
        Logger.log('found at index ' + i);
      return i; 
      
    } 
    
  }
  return -1;
}
/*** 
This subfucntion returns the row that the chosen value is at
***/
function find2(arr, x) {
  //Logger.log(arr);
  for(var i = 0; i < 750; i++){
   // Logger.log(arr[i] + 'find2')
     if (arr[i] == x){
        Logger.log('found at ' + i);
        return i; 
    
    }
  }
  return -1;
}
/*** 
This subfucntion returns true if the selected value is in the 2D array
***/
function ssearch(arr, x) { 
   
    for(var i = 0; i < arr.length; i++){ 
        //Logger.log(arr[i][0][0]);
        if (arr[i][0] ===x) return true; 
    } 
    return false; 
}

/*** 
This subfucntion returns the first row that is blank
***/
function findLast(arr){
Logger.log("Running findLast");
  for (var i = 0; i < arr.length; i++){
  //Logger.log(arr[i][3] + '   arr 3')
    if (arr[i][3] === ''){
      return i +1;
    }
  }
  return -1;
}

/*** 
This subfucntion returns the row of the user and a zero,
and zero and a one if the user is not at the pool 
***/
function findAtPool(ID, url){
  var ss = SpreadsheetApp.openByUrl(url); //Main spreadsheet
  var arr = ss.getSheetByName("AtThePool").getRange(1,1,750, 10).getValues();
  for (var i = 0; i < arr.length; i++){
 
    if (arr[i][2] == ID){
//      Logger.log(arr[i][2]);
      if (arr[i][7] > 0){
        //Logger.log(arr[i][9]);
        //Logger.log('AtThePool');
        return i + 1; //returns row of user
      }
    }
    //if (arr[i][0] == '') return [i+1, 1];
  }
  Logger.log('Not at the Pool');
  return 0;
}





