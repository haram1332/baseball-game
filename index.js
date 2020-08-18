const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const INIT_STATUS ="not-started"
const INIT_NUMBER = [];



let num = INIT_NUMBER;
let put = [];
let stcount = 0;
let bcount = 0;
let ocount = 3;

const randum = () => {
  if (num.length > 0) {
    return;
  }
  for (i = 0; i < 3; i++) {
    let random = Math.floor(Math.random() * 10);
    while (num.includes(random)) {
      random = Math.floor(Math.random() * 10);
    }
    num.push(random);
  }
};

let match = (line) => {
  put = line;

  for (let i = 0; i < num.length; i++) {
    if (num[i] === put[i]) {
      stcount++;
      ocount--;
    }

    for (let j = 0; j < put.length; j++) {
      if (i !== j && num[i] === put[j]) {
        bcount++;
        ocount--;
      }
    }
  }
};

/* 조건 1 && 조건 2  */

let status = INIT_STATUS

const start = () => {
  console.log("숫자를 입력하세요");
  status = "started";
};


const finish = () => {
  console.log("게임이 끝났습니다.", "문자를 입력하세요")
  status = INIT_STATUS;
  num = [];
  console.log(num)
}


const numberHandlar = (line) => {
  if (status === "not-started") {
    console.log("게임을 먼저 시작해주세요");
  }
  randum();
  match(line);
  //console.log(num, put);
  console.log(stcount + "" + "s-" + bcount + "" + "b-" + ocount + "" + "o-");
  console.log(num)
  if(stcount === 3){
    finish()
  }
  stcount = 0;
  bcount = 0;
  ocount = 3;
};

rl.on("line", (line) => {
  console.log(`status 는 ${status} 입니다. number 는 ${num} 입니다.`)
  let type;
  if (line[0] === "0") {
    type = "number";
  }
  const sum = Number(line) + Number(line);
  if (!sum) {
    type = "string";
  }

  if (type === "string" && status === "not-started") {
    start();
  } else {
    const transfrom = line.toString().split("");
    for (let i = 0; i < 3; i++) {
      transfrom[i] = Number(transfrom[i]);
    }
    numberHandlar(transfrom);
  }

  line[0];
});

const errorhandler = (message) => {
  console.log(message);
  return;
};
