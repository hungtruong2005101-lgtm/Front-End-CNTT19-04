let products = [
    {name:'Laptop', price:20000},
    {name:'Phone', price:10000},
    {name:'Mouse', price:500},
    {name:'Keyboard', price:700},
    {name:'Headphone', price:1500}
];

console.log(products);

let findProduct = products.find(p=>p.name==='Phone');
console.log(findProduct);

let expensive = products.filter(p=>p.price > 1000);
console.log(expensive);