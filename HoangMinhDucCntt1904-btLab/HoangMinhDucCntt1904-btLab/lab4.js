let scores = [8,7,9,10,6];

let sum = scores.reduce((a,b)=>a+b,0);
let avg = sum / scores.length;

console.log('Điểm TB:', avg);

if(avg < 5) console.log('Yếu');
else if(avg < 7) console.log('Trung bình');
else if(avg < 8) console.log('Khá');
else console.log('Giỏi');