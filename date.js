let currentDate = new Date();
let cDay = currentDate.getDate();
let cMonth = currentDate.getMonth() + 1;
let cYear = currentDate.getFullYear();
let date = cDay + "-" + cMonth + "-" + cYear;

let time =
  currentDate.getHours() +
  ":" +
  currentDate.getMinutes() +
  ":" +
  currentDate.getSeconds();
// console.log(time);
time = time.toLocaleString();
// console.log(time)
let newDateTime = { date: date, time: time };
// console.log(newDateTime);

export default newDateTime;