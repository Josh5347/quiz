$(document).ready(function(){
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


});