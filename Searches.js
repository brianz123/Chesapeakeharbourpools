function find(arr, x) {
// Logger.log(arr);
  for(var i = 0; i < arr.length; i++){
    if (arr[i][0] == x){
      //Logger.log('found');
        Logger.log('found at index ' + i);
      return i; 
      
    } 
    
  }
  return -1;
}