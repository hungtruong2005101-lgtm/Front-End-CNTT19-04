$(document).ready(function(){


    $("#fadeOutBtn").click(function(){

        $(".box").fadeOut(800);

    });



    $("#fadeInBtn").click(function(){

        $(".box").fadeIn(800);

    });



    $("#slideUpBtn").click(function(){

        $(".box").slideUp(800);

    });



    $("#slideDownBtn").click(function(){

        $(".box").slideDown(800);

    });



    $("#toggleBtn").click(function(){

        $(".box").slideToggle(800);

    });


});