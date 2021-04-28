/***
This function determines the curretnt time slot for the selected pool. 
It collects the reservation times and the duration the reservation is good for from
the dashboard (https://docs.google.com/spreadsheets/d/1oF-udC_qamZLgjgJB_szd14Gt_XSjpZ0KjYzGBKRvA4/edit#gid=370756659)
Returns [timeIsGood, colToGetData]
timeIsGood --> 1 = inside the timeslot, 0 = outside the timeslot
coltoGetData --> returns the collumn which the current timeslot is if the curent time is within a timeslot, otherwise
returns collumn for next timeslot
***/
function checkTime(pool = 'bay'){
  var vMorn, vMid, vAft, vEve, bMorn, bMid, bAft, bEve, Time, d, out, minute, hour, n, num, ss, sheet, range, bh1, bh2, bh3, bh4, vh1, vh2, vh3, vh4, bm1, bm2, bm3, bm4, vm1, vm2, vm3, vm4, reserveLength; // variables
  reserveLength = getInfo(8,9);
  num = 0; 
  d = new Date()
  n = d.getMonth() + 1 + '/' + d.getDate();
 
  hour =  d.getHours();
  minute =  d.getMinutes();
  Logger.log(hour + ':' + minute)
  out = [0,0,0]
  if (pool === 'bay'){
    pool = 0;
    //bay pool times
    bh1 = getInfo(9,2);
    bh2 = getInfo(10,2);
    bh3 = getInfo(11,2);
    bh4 = getInfo(12,2);
    
    bm1 = getInfo(9,3);
    bm2 = getInfo(10,3);
    bm3 = getInfo(11,3);
    bm4 = getInfo(12,3);
    
  }else{
    pool = 2; 
    //village pool times
    vh1 = getInfo(9,7);
    vh2 = getInfo(10,7);
    vh3 = getInfo(11,7);
    vh4 = getInfo(12,7);
    
    vm1 = getInfo(9,8);
    vm2 = getInfo(10,8);
    vm3 = getInfo(11,8);
    vm4 = getInfo(12,8);
  }
  
  Time = [[bh1,bm1,vh1, vm1], [bh2,bm2,vh2,vm2],[bh3,bm3,vh3,vm3],[bh4,bm4,vh4,vm4]]; //times  [bayHour, bayMinute, villageHour, villageMinute]
  Logger.log(Time)
  if(pool < 1){
    //Bay Pool
    if (hour < Time[1][pool] || (hour <= Time[1][pool] && minute < Time[1][pool+1])){
      if (checkIfTheTimeIsGood(pool, Time, 0,reserveLength, hour, minute)){
        out = [1, 8]
        Logger.log('one')
      }else{
        out = [0, 9]
        Logger.log('one out of range');
      }
    }else if (hour < Time[2][pool] || (hour <= Time[2][pool] && minute < Time[2][pool+1])){
      if (checkIfTheTimeIsGood(pool, Time, 1,reserveLength, hour, minute)){
        Logger.log('two');
        out = [1, 9]
      }else{
        Logger.log('two out of range');
        return out = [0, 10];
      }
    }else if (hour < Time[3][pool] || (hour <= Time[3][pool] && minute < Time[3][pool+1])){
      if (checkIfTheTimeIsGood(pool, Time, 2,reserveLength, hour, minute)){
        Logger.log('three');
        return out = [1, 10]  
      }else{
        Logger.log('three out of range');
        return out = [0, 11]
      }
    }else{
      if (checkIfTheTimeIsGood(pool, Time, 3,reserveLength, hour, minute)){
        Logger.log('four')             
        return [1, 11]
      }else{
        Logger.log('four out of range');
        return [0, 17]
      }
    }
  }else{
    //Village Pool
   
      if (hour < Time[1][pool] || (hour <= Time[1][pool] && minute < Time[1][pool+1])){
        if (checkIfTheTimeIsGood(pool, Time, 0,reserveLength, hour, minute)){
          out = [1, 13]
          Logger.log('one')
        }else{
          out = [0, 14]
          Logger.log('one out of range');
        }
      }else if (hour < Time[2][pool] || (hour <= Time[2][pool] && minute < Time[2][pool+1])){
        if (checkIfTheTimeIsGood(pool, Time, 1,reserveLength, hour, minute)){
          Logger.log('two');
          out = [1, 14]
        }else{
          Logger.log('two out of range');
          return out = [0, 15];
        }
      }else if (hour < Time[3][pool] || (hour <= Time[3][pool] && minute < Time[3][pool+1])){
        if (checkIfTheTimeIsGood(pool, Time, 2,reserveLength, hour, minute)){
          Logger.log('three');
          return out = [1, 15]  
        }else{
          Logger.log('three out of range');
          return out = [0, 16]
        }
      }else{
        if (checkIfTheTimeIsGood(pool, Time, 3,reserveLength, hour, minute)){
          Logger.log('four')             
          return [1, 16]
        }else{
          Logger.log('four out of range');
          return [0, 17]
        }
      }
    
  }
  
  
  return out;
}


/***
This function updates the numbers at the pool
***/
function Update(pool = 'village'){
   var dash = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1oF-udC_qamZLgjgJB_szd14Gt_XSjpZ0KjYzGBKRvA4/edit#gid=549595336'); // Dashboard
  dash = dash.getSheetByName("URLs");
  var urlList = dash.getRange(1,3,30,1).getValues();

  
  if (pool == 'bay') { 
    var max = getInfo(3,2);
    var url = urlList[2]; //Bay 
  }else {
    var max = getInfo(3,7);
    var url = urlList[3]; //village 
  }

  var ss = SpreadsheetApp.openByUrl(url);
  var atPool = ss.getSheetByName('AtThePool');
  var main = ss.getSheetByName('Main');
  // var sheet = ss.getSheetByName('SignedUp');
  // var time = checkTime(pool);
  var total = 0;
  var arrOfAtPool = atPool.getRange(1,1,atPool.getMaxRows(),5).getValues();
  var end = findLast(arrOfAtPool);
  // Logger.log('end   '  +  end)
  var walkIn = 0;
  var signUp = 0;
  // Logger.log(time +' CheckTime');
  /*if (time[0] >0){
    var timeOfDay = sheet.getRange(2, time[1]).getValue();
    Logger.log(timeOfDay)
    for(var i = 2; i < end; i++){
      var val = atPool.getRange(i, 14).getValue();
      total += atPool.getRange(i, 8).getValue();
      if (val === timeOfDay){
        Logger.log(val + " Value at 14");
      }else{
        Logger.log("not a Sign Up" + " val " + val + "  " + timeOfDay);
        walkIn += atPool.getRange(i, 8).getValue();
      }
    }
    signUp = timeSignUp(pool);
    main.getRange("B8").setValue(max - (walkIn + signUp[0]));
    main.getRange("B9").setValue(signUp[1]);
  }else{*/
 
    
    for(var i = 2; i < end; i++){
      
       total += atPool.getRange(i, 8).getValue();
    }  
    //}
    // signUp = timeSignUp(pool);
   // var numSignUpsNotAtPool = signUp[1] - NumSignUpsAtPool;
    //Logger.log("numsignups at pool " + NumSignUpsAtPool);
    main.getRange("B8").setValue(max - total);
   // main.getRange("B9").setValue(numSignUpsNotAtPool);
    if (/*signUp[1] + */total < max){
      main.getRange('D10').setValue('Pool does NOT need to be emptied at the end of the time shift. Total combined: ' +        (/*signUp[1] + */total));
      main.getRange('D10').setBackgroundRGB(0,180,0);
    }else{
      main.getRange('D10').setValue('Pool DOES need to be emptied at the end of the time shift. Total combined: ' +  (/*signUp[1] + */total));
      main.getRange('D10').setBackgroundRGB(180,0,0);
    }
  
  var  high = main.getRange('B1000').getValue(); 
  if (high < total){
    high = total;
  }
  Logger.log(total  + "  --> total");
  main.getRange('B100').setValue(high); 
  main.getRange('B10').setValue(high);
  main.getRange("B7").setValue(total);
  Logger.log(total +  ' Total')
  //Logger.log(walkIn + ' Walk In')
}


/***
This subfunction gets information from the dashboard (https://docs.google.com/spreadsheets/d/1oF-udC_qamZLgjgJB_szd14Gt_XSjpZ0KjYzGBKRvA4/edit#gid=370756659)
based off the row and collum provided. 
returns value in selected cell
***/
function getInfo(row,col){
  var sheet = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1oF-udC_qamZLgjgJB_szd14Gt_XSjpZ0KjYzGBKRvA4/edit#gid=0').getSheetByName('Other Info'); //from dashboard
  return sheet.getRange(row, col).getValue();
}

/***
This subfunction determines if the time provided is within the current timeslot provided
returns TRUE when the current time is within the current timeslot
returns FALSE when the current time is not within the current timeslot
***/
function checkIfTheTimeIsGood(pool, time, t,reserveLength, currentHour, currentMinute){
  reserveLength += time[t][pool +1];
  var hour = time[t][pool];
  if (reserveLength > 59){
    hour++;
    reserveLength-= 60;
  }
  Logger.log(hour + " hour");
  Logger.log(reserveLength + " reserveLength")
  if (currentHour <= hour){
    if(currentMinute <= reserveLength){
      Logger.log('Inside reservation time slot')
      return true
    }
  }
  Logger.log('Outside reservation timeslot')
  return false
}






