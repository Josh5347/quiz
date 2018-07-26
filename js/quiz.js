$(document).ready(function(){

    var qRight = [0, 0],   //答對題數
        qWrong = [0, 0];   //答錯題數    
        
    //var answeredArray = new Array();
    var answeredArray = [999];
    var totalQ = 8;//teamA,teamB 應答總題數，此數應為偶數
    var qNo = 0;
    var team = 0;
    var inputClass;
    

    $( ".dialogWin" ).dialog({
        modal: true,
        autoOpen: false,
        //width: 400,
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
                }
            ]
    });

    // 將題目，類型，答案載入 array中
    question = [];
    $('.qContent').each(function(){
        question.push($(this).text());
    });

    qAnswer = [];
    $('.qAnswer').each(function(){
        qAnswer.push($(this).text());
    });     
    //question.forEach(function (val) { 
    //    console.log(val);
    //});

    var qClassNum = new Object();
    qClassNum['歷史'] = 0;
    qClassNum['科學'] = 0;

    qClass = [];
    $('.qClass').each(function(){
        qClass.push($(this).text());
        console.log($(this).text());
        //計算各題型的題目數量
        switch ($(this).text()) {
            case "歷史":
                qClassNum['歷史']++;
                break;
            case "科學":
                qClassNum['科學']++;
                break;
        
            default:
                break;
        }
    });     

    //console.log("歷史:",qClassNum['歷史']," 科學:",qClassNum['科學']);

    $('#answerEarly' + '0' ).css("visibility","hidden");
    $('#answerEarly' + '1' ).css("visibility","hidden");
    //遊戲開始時將teamB鎖住
    $('#team1').css('opacity','0.3').prop('disabled',true);

    var buttonset = new Object();    
    //挑選題型按鈕
    buttonset[0] = $('#buttonset0 input[type="button"]');
    buttonset[1] = $('#buttonset1 input[type="button"]');

    //設定題型按鈕文字為"歷史 : num"
    btnHTML = "歷史：" + qClassNum['歷史'];
    $('input[value="歷史"]').val(btnHTML);

    btnHTML = "科學：" + qClassNum['科學'];
    $('input[value="科學"]').val(btnHTML);

    // 提醒自己，等待動畫可使用 shCircleLoader
    //Team A 題型按鈕
    $(buttonset[0]).click(function(){

        inputClass = $(this).val();
        console.log(inputClass);

        //題型鈕於按下後鎖住
        $(buttonset[0]).prop('disabled',true);
        //換成teamA
        team = 0;
        showQ();

    });

    //Team B 題型按鈕
    $(buttonset[1]).click(function(){
        inputClass = $(this).val();
        console.log(inputClass);
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
    
                if ( answeredArray[i] != qRandom ){
                    
                    isPick = true;   
                }else{
                    isPick = false;
                    break;
                }
                console.log("qClass[",qRandom,"]:", qClass[qRandom], " inputClass:", inputClass);
                /* if ( qClass[qRandom] == inputClass){
                    isPick = true;   
                }else{
                    isPick = false;
                    break;
                } */
            }
    
        }
        
        console.log("answeredArray:",answeredArray);
        //將新題號新增入array中
        answeredArray.push(qRandom);
        qNo = qRandom;
        console.log("length:",answeredArray.length," totalQ:", totalQ);
        console.log("answeredArray:",answeredArray);
    
        //所應答的題目已經答完，則將題型按鈕鎖住，不可再選題型，array的第一個item是999，totalQ需 + 1
    
        if ( answeredArray.length == (totalQ  + 1 ) ){
            $(buttonset[0]).prop('disabled',true);
            //$('#team0').css('opacity','0.3').prop('disabled',true);
            //$('body').css('opacity','0.3').prop('disabled',true);
    
        }
    
        //顯示題目
        var qHTML = "題目："　+ question[qNo];
        $('#qArea'+ team).text(qHTML);
        //console.log(qHTML);

        qClassNum[inputClass]--;
        console.log("qClassNum[",inputClass,"]:",qClassNum[inputClass]);

        if(qClassNum[inputClass]==0){
            $('input[value='+inputClass+']').prop('disabled',true);
        }

        console.log("歷史:",qClassNum['歷史']," 科學:",qClassNum['科學']);
        btnHTML = "歷史：" + qClassNum['歷史'];
        $('input[value="歷史"]').val(btnHTML);
    
        btnHTML = "科學：" + qClassNum['科學'];
        $('input[value="科學"]').val(btnHTML);
    
        var counter = 5;
        function countdown(counter){
            if (counter > 0){
                
                //$('#radio' + team).prop("disabled", true);
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
        countdown(counter);    
    
    }

    function dialogFunc(){
        
        $(buttonset[team]).prop('disabled',false);
        //$('#radio' + team).prop("disabled", false);
        //$('.radioClass').removeAttr('checked').removeAttr('selected').button("refresh");
        $('#countDownArea' + team).text("　");//給全形空白以撐開該區域，以免fiendset縮回
        $('#qArea' + team).text("　");//給全形空白以撐開該區域，以免fiendset縮回
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
        //$( this ).dialog( "close" );
    }    

    function getRnd(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    } 
});






