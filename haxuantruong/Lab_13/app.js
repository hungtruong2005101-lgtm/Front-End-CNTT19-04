$(document).ready(function(){


    $("#hideBtn").click(function(){

        $(".content-box").hide(500);

    });



    $("#showBtn").click(function(){

        $(".content-box").show(500);

    });



    $("#toggleBtn").click(function(){

        $(".content-box").toggle(500);

    });


});