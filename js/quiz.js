$(document).ready(function(){

    var totalQ = 6,
        answeredArray = [999],
        qNo, 
        qRandom;
    
    $( "#radioset" ).buttonset();


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

        var isPick = false;
        while ( isPick == false ) {
            
            // 題目以亂數出題
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

        //所應答的題目已經答完，則將題型按鈕鎖住
        if ( answeredArray.length == totalQ ){
            $('.radioClass').prop("disabled", true);
        }

        var qHTML = "題目："　+ question[qNo];

        $('#qArea').text(qHTML);
    });

});

function getRnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
} 