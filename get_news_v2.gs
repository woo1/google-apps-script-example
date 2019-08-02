function onEdit(e) { //에딧할때마다 실행
  var sh = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet(); // 현재 sheet 얻고
  var col = sh.getActiveCell().getColumn(); // 현재 선택 셀의 열 번호
  var keyword = SpreadsheetApp.getActive().getRange('B1').getValue()
  if(keyword == ""){
    SpreadsheetApp.getActive().getRange('B1').setValue("이 칸에 검색할 뉴스 키워드를 넣어주세요.")
    return
  }
  keyword = encodeURI(keyword)
 
  if(col == 2 && sh.getName()=="업무일지") { // 액티브 컬럼이 2열이고 액티브 시트가 "업무일지"라는 시트일때
   printDate(sh);// 현재 줄 오른쪽 셀에 현재 시각 입력
  }
   if(sh.getName()=="관련 뉴스"){
   SpreadsheetApp.getActive().getRange('A2').setValue('=importfeed("http://newssearch.naver.com/search.naver?where=rss&query='+keyword+'&field=0&nx_search_query=&nx_and_query=&nx_sub_query=&nx_search_hlquery=&is_dts=0")');
  }
   if(sh.getName()=="관련 뉴스" && sh.getRange('A1').getValue() =="1"){
   SpreadsheetApp.getActive().getRange('A2').setValue('=importfeed("http://newssearch.naver.com/search.naver?where=rss&query='+keyword+'&field=0&nx_search_query=&nx_and_query=&nx_sub_query=&nx_search_hlquery=&is_dts=1")');
  }
}

function printDate(sh){
  sh.getRange(sh.getActiveCell().getRow(),1).setValue(new Date());
}
