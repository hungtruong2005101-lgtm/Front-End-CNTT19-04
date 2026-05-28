function calcMoney(order, callback){
    let total = order.price;
    callback(total);
}

function discount(total, callback){
    let newTotal = total * 0.9;
    callback(newTotal);
}

function shipping(total){
    let final = total + 30000;
    console.log('Tổng cuối:', final);
}

calcMoney({price:500000}, function(total){
    discount(total, shipping);
});