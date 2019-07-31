// https://kind.krx.co.kr/corpgeneral/corpList.do?method=loadInitPage
// 전체 종목코드 - 코스피, 코스닥으로 분리해서 받기
var code_KOSDAQ = "KOSDAQ_SPREADSHEET_ID"
var code_KOSPI = "KOSPI_SPREADSHEET_ID"
var main_code = "MAIN_SPREADSHEET_ID"

function myFunction() {
  printDt()
  getKorStock("삼성전자")
}

function printDt(){
  var d = new Date();
  var timeStamp = d.getTime();  // Number of ms since Jan 1, 1970

  var currentTime = d.toLocaleTimeString()
  var sheet = SpreadsheetApp.openById(main_code).getSheetByName("시트1")
  var row = [currentTime]
  sheet.appendRow(row)
}

function prints(str_val){
  Logger.log(str_val)
}

// get stock price from spreadsheet
function getAlphabetStockPrice() {
  var SHEET_FILE_ID = main_code
  var sheet = SpreadsheetApp.openById(SHEET_FILE_ID).getSheetByName('시트1')
  return sheet.getRange('B1').getValue()
}

function getKorStock(ticker){
  ksp_code = findInKospi(ticker)
  if(ksp_code != ""){
    appendStockRowKRX(ksp_code, ticker)
  } else {
    ksd_code = findInKosdaq(ticker)
    if(ksd_code != ""){
      appendStockRowKSD(ksd_code, ticker)
    } else {
      prints("No data - " + ticker)
    }
  }
}

// add row to spreadsheet
function appendStockRow(ticker) {
  var SHEET_FILE_ID = main_code
  var sheet = SpreadsheetApp.openById(SHEET_FILE_ID).getSheetByName("시트1")
  var row = [ticker, "=GOOGLEFINANCE(\"" + ticker + "\")"]
  sheet.appendRow(row)
}

// add row to spreadsheet
function appendStockRowKRX(ticker, ticker_nm) {
  var SHEET_FILE_ID = main_code
  var sheet = SpreadsheetApp.openById(SHEET_FILE_ID).getSheetByName("시트1")
  var row = [ticker_nm, "=GOOGLEFINANCE(\"KRX:" + ticker + "\")"]
  sheet.appendRow(row)
}

// add row to spreadsheet
function appendStockRowKSD(ticker, ticker_nm) {
  var SHEET_FILE_ID = main_code
  var sheet = SpreadsheetApp.openById(SHEET_FILE_ID).getSheetByName("시트1")
  var row = [ticker_nm, "=GOOGLEFINANCE(\"KOSDAQ:" + ticker + "\")"]
  sheet.appendRow(row)
}

function cvtCode(code){
  var add_txt = ""
  var code2 = code.toString()
  if(code2.length < 6){
    var add_len = 6 - code2.length
    for(var i=0; i<add_len; i++){
      add_txt += "0"
    }
  }
  prints(code2.length)
  prints(code2)
  return add_txt + code2
}

function findInKospi(query){
  var SHEET_FILE_ID = code_KOSPI
  var sheet = SpreadsheetApp.openById(SHEET_FILE_ID).getSheetByName('상장법인목록')
  var values = sheet.getRange('A2:B').getValues()
  for(var i=0; i<values.length; i++){
    var data = values[i]
    if(data[0] == query){
      return cvtCode(data[1])
    }
  }
  return ""
}

function findInKosdaq(query){
  var SHEET_FILE_ID = code_KOSDAQ
  var sheet = SpreadsheetApp.openById(SHEET_FILE_ID).getSheetByName('상장법인목록')
  var values = sheet.getRange('A2:B').getValues()
  for(var i=0; i<values.length; i++){
    var data = values[i]
    if(data[0] == query){
      return cvtCode(data[1])
    }
  }
  return ""
}
