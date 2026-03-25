// Write your code here. You may create as many files as you like. 

import readlineSync from "readline-sync";
import chalk from "chalk";

//using fake JSON for testing 
const questions = [
  {
    question: "What country is Zara from?",
    options: ["France", "Spain", "Italy", "Germany"],
    correctAnswer: 2,
  },
  {
    question: "Chanel is from?",
    options: ["Italy", "France", "USA", "Spain"],
    correctAnswer: 2,
  },
  {
    question: "Bershka originates from?",
    options: ["Spain", "Germany", "France", "UK"],
    correctAnswer: 1,
  },
  {
    question: "Volkswagen is from?",
    options: ["Germany", "Italy", "Japan", "USA"],
    correctAnswer: 1,
  },
  {
    question: "Nike is from?",
    options: ["USA", "UK", "Germany", "France"],
    correctAnswer: 1,
  },
  {
    question: "Adidas is from?",
    options: ["Germany", "USA", "France", "Italy"],
    correctAnswer: 1,
  },
  {
    question: "Gucci is from?",
    options: ["Italy", "France", "Spain", "UK"],
    correctAnswer: 1,
  },
  {
    question: "H&M is from?",
    options: ["Sweden", "Norway", "Germany", "Denmark"],
    correctAnswer: 1,
  },
  {
    question: "Puma is from?",
    options: ["Germany", "USA", "Italy", "France"],
    correctAnswer: 1,
  },
  {
    question: "Louis Vuitton is from?",
    options: ["France", "Italy", "Spain", "UK"],
    correctAnswer: 1,
  },
];


let score = 0;

console.log(chalk.blue("🎮 Welcome to the Brand Quiz Game!\n"));

for (let i = 0; i < questions.length; i++) {
  const q = questions[i];

  console.log(chalk.yellow(`Question ${i + 1}: ${q.question}`));

  for (let j = 0; j < q.options.length; j++) {
    console.log(`${j + 1}. ${q.options[j]}`);
  }

  const answer = readlineSync.question("Your answer (1-4): ");

  if (parseInt(answer) === q.correctAnswer) {
    console.log(chalk.green("✅ Correct! +1 point\n"));
    score++;
  } else {
    console.log(
      chalk.red(
        `❌ Wrong! Correct answer: ${q.options[q.correctAnswer - 1]}\n`
      )
    );
  }
}

console.log(chalk.blue(`🎯 Your final score: ${score}/10`));