$(document).ready(function(){

    var totalQ = 5,
        answeredArray = [],
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
    $('#radioset').click(function(){


        answeredArray.push(1);


        var isPick = false;
        while ( isPick == false ) {

            // 題目編號為亂數
            qRandom = getRnd( 0, 4 );
            
            answeredArray.forEach(function( val ){
                if ( val != qRandom ){
                    isPick = true;

                }
            });

        }
        
        answeredArray.push(qRandom);
        qNo = qRandom;

        if ( answeredArray.length == totalQ ){
            $(this).prop("disable");
        }

        var qHTML = "題目："　+ question[qNo];

        $('#qArea').text(qHTML);
    });

});

function getRnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
} 