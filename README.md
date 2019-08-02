# google-apps-script-example
## 1. add_stock_info.gs
한국 주식의 현재 주가 정보를 스프레드시트에 추가할 수 있습니다.<br>
아래 파일들을 본인 클라우드에 스프레드시트로 생성한 뒤 시트명을 "상장법인목록"으로 변경하면 바로 사용 가능합니다.<br>
KOSPI : https://drive.google.com/file/d/1P1FhoiO9wCfLUFSxX3WAtW2tBKbA1vYB/view?usp=sharing<br>
KOSDAQ : https://drive.google.com/file/d/16P7ZKvYv77yQ9cOaX9fuyo5E6SJqu4Cs/view?usp=sharing<br><br>
1분마다 주식 종목의 가격 자동 갱신을 위한 트리거 설정 방법<br>
https://developers.google.com/apps-script/guides/triggers/installable#managing_triggers_manually <br>
스크립트 에디터에서 myOnEdit 함수를 [수정] - [현재 프로젝트의 트리거]로 이동한 뒤 "트리거 추가" 버튼 클릭 <br>
이벤트 소스 선택 - 시간 기반, 분 단위, 1분마다로 설정<br>
종목명은 한국거래소 기준으로 일치해야 조회가 되며, 네이버 증권정보의 종목명과 다를 수 있습니다.<br>


## 2. RSS Import
뉴스 등 RSS 피드를 가지고서 관련 정보를 테이블로 보여줍니다. <br>
뉴스 검색 RSS 피드 가져오기 : https://www.youtube.com/watch?v=ua_WFNutGAE
ex) 스프레트 시트 셀 안에서 =importfeed("RSS 피드 주소")

## 3. get_news_v2.gs
GG.gs 파일의 다른 버전으로 스프레드시트의 B1 셀에 키워드를 입력하면 바로 뉴스 정보를 네이버에서 조회해서 뿌려주는 스크립트입니다. <br>
스프레드시트에 "관련 뉴스"라는 이름으로 시트를 만들면 편집할 때마다 해당 시트에 뉴스 정보가 갱신됩니다. <br>
