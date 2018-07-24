$(document).ready(function(){

    var totalQ = 5,
        answeredArray = [999],
        qNo,
        qRight,
        qWrong, 
        qRandom;
    
        $('#answerEarly').css("visibility","hidden");

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
                        $('#dialogAnswer').text(qAnswer[qNo]);
                    }
                },
                {
                    text: "答對",
                    click: function() {
                        qRight++;
                        $('.radioClass').prop("disabled", false);
                        $('.radioClass').removeAttr('checked').removeAttr('selected').button("refresh");
                        $('#countDownArea').text("　");//給全形空白以撐開該區域，以免fiendset縮回
                        $('#qArea').text("　");//給全形空白以撐開該區域，以免fiendset縮回
                        $('#answerEarly').css("visibility","hidden");
                        $( this ).dialog( "close" );
                    }
                },
                {
                    text: "答錯",
                    click: function() {
                        $('.radioClass').prop("disabled", false);
                        $('.radioClass').removeAttr('checked').removeAttr('selected').button("refresh");
                        $('#countDownArea').text("　");//給全形空白以撐開該區域，以免fiendset縮回
                        $('#qArea').text("　");//給全形空白以撐開該區域，以免fiendset縮回
                        $('#answerEarly').css("visibility","hidden");
                        $( this ).dialog( "close" );
                    }
                }
            ]
    });

    $( ".radioset" ).buttonset();


    // 將題目，類型，答案載入 array中
    var question = [];
    $('.qContent').each(function(){
        question.push($(this).text());
    });

    var qClass = [];
    $('.qClass').each(function(){
        qClass.push($(this).text());
    });     

    var qAnswer = [];
    $('.qAnswer').each(function(){
        qAnswer.push($(this).text());
    });     
    //qAnswer.forEach(function (val) { 
    //    console.log(val);
    //});

    // 等待動畫可使用 shCircleLoader
    $('.radioClass').click(function(){

        //$('#teamA').css('opacity','0.1').prop('disabled',true);
        var isPick = false;
        while ( isPick == false ) {
            
            // 題目以亂數選出題號
            qRandom = getRnd( 0, 4 );
            
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
        console.log("length:",answeredArray.length," totoalQ:", totalQ);
        console.log("answeredArray:",answeredArray);

        //所應答的題目已經答完，則將題型按鈕鎖住，array的第一個item是999，totalQ需 + 1
        if ( answeredArray.length == (totalQ + 1) ){
            $('.radioClass').prop("disabled", true);
        }

        //顯示題目
        var qHTML = "題目："　+ question[qNo];
        $('#qArea').text(qHTML);

        var counter = 5;
        function countdown(counter){
            if (counter > 0){
                //倒數計時應鎖住題型按鈕
                $('.radioClass').prop("disabled", true);
                $('#answerEarly').css("visibility","visible");
                counter--;
                setTimeout(function(){countdown(counter)},1000);
                $('#countDownArea').text("倒數計時...."+ counter);
                $('#answerEarly button').click(function(){
                    counter = 0;
                });
                //console.log(counter);
            }else{
                $("#dialog").dialog( "open" );
            }
            
        }
        countdown(counter);
        
        

    });

});

function getRnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
} 
