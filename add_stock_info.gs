// https://kind.krx.co.kr/corpgeneral/corpList.do?method=loadInitPage
// 전체 종목코드 - 코스피, 코스닥으로 분리해서 받기
var code_KOSDAQ = "KOSDAQ_SPREADSHEET_ID"
var code_KOSPI = "KOSPI_SPREADSHEET_ID-p8nMdn56I"
var curr_sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()

function myOnEdit() {
  printDt()
  
  var has_data = false
  var values = curr_sheet.getRange('A2:A').getValues()
  for(var i=0; i<values.length; i++){
    var data = values[i]
    if(data == ''){
      break
    }
    has_data = true
    
    var row = getKorStock(data)
    if(row.length > 0){
      var rownum = i + 2
      SpreadsheetApp.getActive().getRange('B' + rownum.toString()).setValue(row[1])
    }
  }
  
  if(!has_data){
    SpreadsheetApp.getActive().getRange('A2').setValue("검색하고 싶은 종목명을 여기에 입력해주세요.")
    return
  }
}

function myFunction() {
  
}

function printDt(){
  var d = new Date();
  var timeStamp = d.getTime();  // Number of ms since Jan 1, 1970

  var currentTime = d.toLocaleTimeString()
  var sheet = curr_sheet
  SpreadsheetApp.getActive().getRange('A1').setValue("최종갱신일시")
  SpreadsheetApp.getActive().getRange('B1').setValue(currentTime)
}

function prints(str_val){
  Logger.log(str_val)
}

// get stock price from spreadsheet
function getAlphabetStockPrice() {
  var sheet = curr_sheet
  return sheet.getRange('B1').getValue()
}

function getKorStock(ticker){
  ksp_code = findInKospi(ticker)
  if(ksp_code != ""){
    return getStockRowKRX(ksp_code, ticker)
  } else {
    ksd_code = findInKosdaq(ticker)
    if(ksd_code != ""){
      return getStockRowKSD(ksd_code, ticker)
    } else {
      prints("No data - " + ticker)
      return []
    }
  }
}

// add row to spreadsheet
function appendStockRow(ticker) {
  var sheet = curr_sheet
  var row = [ticker, "=GOOGLEFINANCE(\"" + ticker + "\")"]
  sheet.appendRow(row)
}

// add row to spreadsheet
function getStockRowKRX(ticker, ticker_nm) {
  var sheet = curr_sheet
  var row = [ticker_nm, "=GOOGLEFINANCE(\"KRX:" + ticker + "\")"]
  return row
}

// add row to spreadsheet
function getStockRowKSD(ticker, ticker_nm) {
  var sheet = curr_sheet
  var row = [ticker_nm, "=GOOGLEFINANCE(\"KOSDAQ:" + ticker + "\")"]
  return row
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
