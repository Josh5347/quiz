$(document).ready(function(){

    var totalQ = 5,
        answerQ = 0,
        qNo;
    
    $( "#radioset" ).buttonset();

    var question = [];
    $('.qContent').each(function(){
        question.push($(this).text());
        //console.log($(this).text());
    });

    var qClass = [];
    $('.qClass').each(function(){
        qClass.push($(this).text());
        //console.log($(this).text());
    });     

    var qAnswer = [];
    $('.qAnswer').each(function(){
        qAnswer.push($(this).text());
        //console.log($(this).text());
    });     
    //qAnswer.forEach(function (val) { 
    //    console.log(val);
    //});

    
    $('#radioset').click(function(){

        qNo = 3;

        $('qArea').text(question[qNo]);
    });

});