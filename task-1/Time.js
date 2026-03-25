export class Time {
  // Your code here
  #secondsFromMidnight;

  constructor(hours, minutes, seconds){
     const totalSeconds = hours* 3600 + minutes * 60 + seconds; 

    if (totalSeconds < 0 || totalSeconds >= 86400 ){
      throw new Error("Invalid");
    }
    this.#secondsFromMidnight = totalSeconds;
  }


getHours(){
  return Math.floor(this.#secondsFromMidnight / 3600);
}

getMinutes(){
return Math.floor((this.#secondsFromMidnight % 3600) / 60);
}

getSeconds(){
  return this.#secondsFromMidnight % 60;
}

addSeconds(seconds) {
  this.#secondsFromMidnight = (this.#secondsFromMidnight + seconds) % 86400;

  if (this.#secondsFromMidnight < 0) {
    this.#secondsFromMidnight += 86400;
  }
}

addMinutes(minutes){
  this.addSeconds(minutes * 60);
}

addHours(hours){
  this.addSeconds(hours * 3600);
}

toString() {
  const h = String(this.getHours()).padStart(2, "0");
  const m = String(this.getMinutes()).padStart(2, "0");
  const s = String(this.getSeconds()).padStart(2, "0");

  return `${h}:${m}:${s}`;
}

}
const myTime = new Time(12, 35, 0);
console.log(myTime.toString()); // 12:35:00
myTime.getHours(); // 12
myTime.getMinutes(); // 35
myTime.getSeconds(); // 0

myTime.addMinutes(35);
console.log(myTime.toString());  // 13:00:00

myTime.addHours(12);
console.log(myTime.toString());  // 01:00:00


const t = new Time(23, 59, 50);
t.addSeconds(15);
console.log(t.toString()); // 00:00:05

const t2 = new Time(0, 0, 5);
t2.addSeconds(-10);
console.log(t2.toString()); // 23:59:55
