$(document).ready(function(){

    var qRight = [0, 0],   //答對題數
        qWrong = [0, 0];   //答錯題數    
        
    window.answeredArray = new Array();
    window.answeredArray = [999];
    window.totalQ = 6;//teamA,teamB 應答總題數，此數應為偶數
    window.qNo = 0;
    window.team = 0;
    

    $( ".dialogWin" ).dialog({
        modal: true,
        autoOpen: false,
        //width: 400,
        autoSize: true,
        show: 300,
        hide: 100,
        buttons: [
                {
                    text: "看答案",
                    click: function() {
                        $('#dialogAnswer').text(window.qAnswer[qNo]);
                    }
                },
                {
                    text: "答對",
                    click: function() {
                        qRight[team]++;
                        $('#radio' + team).prop("disabled", false);
                        //$('.radioClass').removeAttr('checked').removeAttr('selected').button("refresh");
                        $('#countDownArea' + team).text("　");//給全形空白以撐開該區域，以免fiendset縮回
                        $('#qArea' + team).text("　");//給全形空白以撐開該區域，以免fiendset縮回
                        $('#answerEarly' + team).css("visibility","hidden");
                        if(team){
                            //選擇teamA，將teamB鎖住
                            $('#team0').css('opacity','1').prop('disabled',false);
                            $('#team1').css('opacity','0.2').prop('disabled',true);
                        }else{
                            //選擇teamB，將teamA鎖住
                            $('#team1').css('opacity','1').prop('disabled',false);
                            $('#team0').css('opacity','0.2').prop('disabled',true);
                        }
                        $( this ).dialog( "close" );
                    }
                },
                {
                    text: "答錯",
                    click: function() {
                        qWrong[team]++;
                        $('#radio' + team).prop("disabled", false);
                        //$('.radioClass').removeAttr('checked').removeAttr('selected').button("refresh");
                        $('#countDownArea' + team).text("　");//給全形空白以撐開該區域，以免fiendset縮回
                        $('#qArea' + team).text("　");//給全形空白以撐開該區域，以免fiendset縮回
                        $('#answerEarly' + team).css("visibility","hidden");
                        if(team){
                            //選擇teamA，將teamB鎖住
                            $('#team0').css('opacity','1').prop('disabled',false);
                            $('#team1').css('opacity','0.2').prop('disabled',true);
                        }else{
                            //選擇teamB，將teamA鎖住
                            $('#team1').css('opacity','1').prop('disabled',false);
                            $('#team0').css('opacity','0.2').prop('disabled',true);
                        }
                        $( this ).dialog( "close" );
                    }
                }
            ]
    });

    // 將題目，類型，答案載入 array中
    window.question = [];
    $('.qContent').each(function(){
        window.question.push($(this).text());
    });

    window.qClass = [];
    $('.qClass').each(function(){
        window.qClass.push($(this).text());
    });     

    window.qAnswer = [];
    $('.qAnswer').each(function(){
        window.qAnswer.push($(this).text());
    });     
    //question.forEach(function (val) { 
    //    console.log(val);
    //});

    //$( "#radioset0" ).buttonset();

    $('#answerEarly' + '0' ).css("visibility","hidden");
    $('#answerEarly' + '1' ).css("visibility","hidden");
    //遊戲開始時teamB鎖住
    $('#team1').css('opacity','0.1').prop('disabled',true);


    // 提醒自己，等待動畫可使用 shCircleLoader
    $('#radio0').click(function(){
        //換成teamA
        team = 0;
        showQ();
    });
    $('#radio1').click(function(){
        //換成teamB
        team = 1;
        showQ();
    });

});
function showQ(){

    var isPick = false;
    while ( isPick == false ) {
        
        // 題目以亂數選出題號
        var qRandom = getRnd( 0, 5 );
        
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
        $('#radioset' + team).prop("disabled", true);
    }

    //顯示題目
    var qHTML = "題目："　+ question[qNo];
    $('#qArea'+ team).text(qHTML);
    //console.log(qHTML);

    var counter = 5;
    function countdown(counter){
        if (counter > 0){
            //倒數計時應鎖住題型按鈕
            $('#radio' + team).prop("disabled", true);
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
function getRnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
} 
