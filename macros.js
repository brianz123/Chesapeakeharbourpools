function UntitledMacro() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('M3').activate();
  spreadsheet.getRange('M3').splitTextToColumns();
};