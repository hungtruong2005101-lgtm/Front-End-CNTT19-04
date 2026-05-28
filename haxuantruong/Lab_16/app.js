$(document).ready(function(){

    let count = 0;



    function renderCounter(){

        $("#counter").text(count);


        if(count > 0){

            $("#counter").css("color","green");

        }else if(count < 0){

            $("#counter").css("color","red");

        }else{

            $("#counter").css("color","#007bff");
        }
    }



    $("#increaseBtn").click(function(){

        count++;

        renderCounter();

    });




    $("#decreaseBtn").click(function(){

        count--;

        renderCounter();

    });




    $("#resetBtn").click(function(){

        count = 0;

        renderCounter();

    });



    renderCounter();

});