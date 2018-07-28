$(document).ready(function(){

    var qRight = [0, 0],   //答對題數
        qWrong = [0, 0];   //答錯題數    
        
    //var answeredArray = new Array();
    var answeredArray = [999];
    var totalQ = 0;//teamA + teamB 應答總題數，此數應為偶數
    var teamTotalQ;//各隊總題數 totalQ / 2 
    var qNo = 0;
    var team = 0;
    var inputType;

    $( ".dialogWin" ).dialog({
        open: function(event, ui){ $(".ui-dialog-titlebar-close").hide();},
        modal: true,
        autoOpen: false,
        width: 350,
        autoSize: true,
        show: 100,
        hide: 100,
        buttons: [
                {
                    text: "看答案",
                    click: function() {
                        $('#dialogAnswer').text(qAnswer[qNo]);
                    }
                },
                {
                    text: "答對",
                    click: function() {
                        qRight[team]++;
                        dialogFunc();
                        $( this ).dialog( "close" );

                    }
                },
                {
                    text: "答錯",
                    click: function() {
                        qWrong[team]++;
                        dialogFunc();                        
                        $( this ).dialog( "close" );
                    }
                },
                {
                    text: "不知",
                    click: function() {
                        qWrong[team]++;
                        dialogFunc();                        
                        $( this ).dialog( "close" );
                    }
                }

            ]
    });

    // 將題目，類型，答案載入 array中
    question = [];
    $('.qContent').each(function(){
        question.push($(this).text());
        totalQ++;
    });

    qAnswer = [];
    $('.qAnswer').each(function(){
        qAnswer.push($(this).text());
    });     
    //question.forEach(function (val) { 
    //    console.log(val);
    //});

    var qTypeNum = new Object();
    qTypeNum['科學'] = 0;
    qTypeNum['發明'] = 0;
    qTypeNum['天文'] = 0;
    qTypeNum['常識'] = 0;
    qTypeNum['藝術'] = 0;
    qTypeNum['人物'] = 0;

    qType = [];
    $('.qType').each(function(){
        qType.push($(this).text());
        console.log($(this).text());
        //計算各題型的題目數量
        switch ($(this).text()) {
            case "科學":
                qTypeNum['科學']++;
                break;
            case "發明":
                qTypeNum['發明']++;
                break;
            case "天文":
                qTypeNum['天文']++;
                break;
            case "常識":
                qTypeNum['常識']++;
                break;        
            case "藝術":
                qTypeNum['藝術']++;
                break;        
            case "人物":
                qTypeNum['人物']++;
                break;        
            default:
                break;
        }
    });     

    //console.log("歷史:",qTypeNum['歷史']," 科學:",qTypeNum['科學']);

    $('#answerEarly' + '0' ).css("visibility","hidden");
    $('#answerEarly' + '1' ).css("visibility","hidden");
    //遊戲開始時將teamB鎖住
    $('#team1').css('opacity','0.3').prop('disabled',true);

    teamTotalQ = totalQ / 2;
    $('.teamTotalQ').text(teamTotalQ);

    var buttonset = new Object();    
    //挑選題型按鈕
    buttonset[0] = $('#buttonset0 button[type="button"]');
    buttonset[1] = $('#buttonset1 button[type="button"]');

    //設定題型按鈕文字為"科學 : number"
    $('button[value="科學"] span').text(qTypeNum['科學']);
    $('button[value="發明"] span').text(qTypeNum['發明']);
    $('button[value="天文"] span').text(qTypeNum['天文']);
    $('button[value="常識"] span').text(qTypeNum['常識']);
    $('button[value="藝術"] span').text(qTypeNum['藝術']);
    $('button[value="人物"] span').text(qTypeNum['人物']);


    // 提醒自己，等待動畫可使用 shCircleLoader
    //Team A 題型按鈕
    $(buttonset[0]).click(function(){

        inputType = $(this).val();
        //var tmpType = $(this).val();
        // inputType 中不包含 ": num"
        //inputType = tmpType.substr(0, 2);
        console.log(inputType);

        //題型鈕於按下後鎖住，等按下答對或答錯按鈕後解開
        $(buttonset[0]).prop('disabled',true);
        //換成teamA
        team = 0;
        showQ();

    });

    //Team B 題型按鈕
    $(buttonset[1]).click(function(){
        
        var tmpType = $(this).val();
        // inputType 中不包含 ": num"
        inputType = tmpType.substr(0, 2);
        console.log(inputType);
        $(buttonset[1]).prop('disabled',true);
        //換成teamB
        team = 1;
        showQ();

    });

    function showQ(){

        var isPick = false;

        // 出題
        while ( isPick == false ) {
            
            // 題目以亂數選出題號
            var qRandom = getRnd( 0, (totalQ - 1) );
            
            console.log("length:",answeredArray.length);
            //若題目未出現過，則選擇該題，否則再以亂數重新選題號
            for( i=0; i< answeredArray.length; i++ ){
                
                console.log("val:", answeredArray[i], " qRandom:", qRandom );
    
                //亂數出題題號 不等於 已經出過的題號，一旦亂數出題 等於 已經出過的題號 則跳出迴圈，重新出題
                if ( qRandom != answeredArray[i] ){
                    isPick = true;   
                }else{
                    isPick = false;
                    break;
                }
                console.log("qType[",qRandom,"]:", qType[qRandom], " inputType:", inputType);
                //亂數出題題型 等於 輸入的題型，一旦亂數出題題型 不等於 輸入題型 則跳出迴圈，重新出題
                if ( qType[qRandom] == inputType){
                    isPick = true;   
                }else{
                    isPick = false;
                    break;
                }
            }
    
        }
        
        console.log("answeredArray:",answeredArray);
        //將新題號新增入array中
        answeredArray.push(qRandom);
        qNo = qRandom;
        console.log("length:",answeredArray.length," totalQ:", totalQ);
        console.log("answeredArray:",answeredArray);
    
        //所應答的題目已經答完，題型按鈕皆已消失，不可再選題型，array的第一個item是999，totalQ需 + 1
    
        if ( answeredArray.length == (totalQ  + 1 ) ){
            $(buttonset[0]).prop('disabled',true);
            //$('#team0').css('opacity','0.3').prop('disabled',true);
            //$('body').css('opacity','0.3').prop('disabled',true);
    
        }
    
        //顯示題目
        var qHTML = "題目："　+ question[qNo];
        $('#qArea'+ team).text(qHTML);
        //console.log(qHTML);

        qTypeNum[inputType]--;
        console.log("qTypeNum[",inputType,"]:",qTypeNum[inputType]);

        //若該題型已經無題目可出，將該題型按鈕隱藏
        if(qTypeNum[inputType]==0){
            $('button[value='+inputType+']').slideUp(2000);
        }

        //console.log("歷史:",qTypeNum['歷史']," 科學:",qTypeNum['科學']);

        changeButtonText(inputType);
        //btnHTML = "歷史：" + qTypeNum['歷史'];
        //$('input[value^='+inputType+']').val(btnHTML);
    
        //btnHTML = "科學：" + qTypeNum['科學'];
        //$('input[value^='+inputType+']').val(btnHTML);
    
        var counter = 5;
        countdown(counter);    
    
    }

    function countdown(counter){
        if (counter > 0){
            
            //$('#radio' + team).prop("disabled", true);
            //將
            $('#answerEarly' + team).css("visibility","visible");
            counter--;
            setTimeout(function(){countdown(counter)},1000);
            $('#countDownArea' + team).text("倒數計時...."+ counter);
            $('#answerEarlyButton'+ team).click(function(){
                counter = 0;
            });
            //console.log(counter);
        }else{
            $("#dialog").dialog( "open" );
        }
        
    }
    function changeButtonText(inputTypeInFunc) {
        //console.log("qTypeNum[",inputTypeInFunc,"]:",qTypeNum[inputTypeInFunc]);
        //更改的文字
        btnHTML = inputTypeInFunc + "：" + qTypeNum[inputTypeInFunc];
        //因為value已經是 "歷史 : num"，所以只要開頭符合 "歷史" 就是要選擇的 button
        $('button[value='+inputTypeInFunc+']').text(btnHTML);
    }
    function dialogFunc(){
        
        //按下答對或答錯按鈕後解開
        $(buttonset[team]).prop('disabled',false);
        //$('#radio' + team).prop("disabled", false);
        //$('.radioType').removeAttr('checked').removeAttr('selected').button("refresh");
        $('#countDownArea' + team).text("　");//給全形空白以撐開該區域，以免fieldset縮回
        $('#qArea' + team).text("　");//給全形空白以撐開該區域，以免fieldset縮回
        $('#dialogAnswer').text("");//關閉dialog前，將答案清空

        $('#answerEarly' + team).css("visibility","hidden");
        if(team){
            //選擇teamA，將teamB鎖住
            $('#team0').css('opacity','1').prop('disabled',false);
            $('#team1').css('opacity','0.3').prop('disabled',true);
        }else{
            //選擇teamB，將teamA鎖住
            $('#team1').css('opacity','1').prop('disabled',false);
            $('#team0').css('opacity','0.3').prop('disabled',true);
        }

        //所應答的題目已經答完，array的第一個item是999，totalQ需 + 1
        if(answeredArray.length == (totalQ  + 1 )){
            //開啟teamB，即teamA與teamB皆已開啟
            $('#team1').css('opacity','1').prop('disabled',false);
        }
        //計分區
        $('#rightAnsNum' + team).text(qRight[team]);
        $('#wrongAnsNum' + team).text(qWrong[team]);

        //$( this ).dialog( "close" );
    }    

    function getRnd(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    } 
});






