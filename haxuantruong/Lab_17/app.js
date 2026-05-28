$(document).ready(function(){

    let quantity = 1;

    let price = 500000;



    function updateCart(){

        $("#quantity").text(quantity);

        $("#total").text(quantity * price);
    }




    $("#plusBtn").click(function(){

        quantity++;

        updateCart();

    });




    $("#minusBtn").click(function(){

        if(quantity > 1){

            quantity--;

            updateCart();
        }

    });



    updateCart();

});