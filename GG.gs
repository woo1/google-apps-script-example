function onEdit(e) //에딧할때마다 실행 {
var sh = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet(); // 현재 sheet 얻고
  var col = sh.getActiveCell().getColumn(); // 현재 선택 셀의 열 번호
 
  if(col == 2 && sh.getName()=="업무일지") // 액티브 컬럼이 2열이고 액티브 시트가 "업무일지"라는 시트일때{
   printDate(sh);// 현재 줄 오른쪽 셀에 현재 시각 입력
  }
   if(sh.getName()=="관련 뉴스"){
   SpreadsheetApp.getActive().getRange('A1').setValue('http://newssearch.naver.com/search.naver?where=rss&query=%EA%B3%B5%EA%B3%B5%EC%99%80%EC%9D%B4%ED%8C%8C%EC%9D%B4&field=0&nx_search_query=&nx_and_query=&nx_sub_query=&nx_search_hlquery=&is_dts=0');
  }
   if(sh.getName()=="관련 뉴스" && sh.getRange('B1').getValue() =="1"){
   SpreadsheetApp.getActive().getRange('A1').setValue('http://newssearch.naver.com/search.naver?where=rss&query=%EA%B3%B5%EA%B3%B5%EC%99%80%EC%9D%B4%ED%8C%8C%EC%9D%B4&field=0&nx_search_query=&nx_and_query=&nx_sub_query=&nx_search_hlquery=&is_dts=1');
  }
}

function printDate(sh){
  
  sh.getRange(sh.getActiveCell().getRow(),1).setValue(new Date());
  
}
