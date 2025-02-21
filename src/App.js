import React, { useState } from "react";
import "./App.css";
import { motion } from "framer-motion";
import taylorImage from "./taylor.jpg"; // Pievienots attēls

const questions = [
  { question: "Kāds ir Taylor Swift fanu bāzes nosaukums?", options: ["Swifties", "Taylorians"], answer: "Swifties" },
  { question: "Kāds bija Taylor Swift pirmais hits, kas sasniedza Billboard Top 10?", options: ["Love Story", "You Belong With Me"], answer: "Love Story" },
  { question: "Kurā gadā Taylor Swift izdeva albumu 'Folklore'?", options: ["2020", "2018"], answer: "2020" },
  { question: "Kura no šīm dziesmām ir Taylor Swift rakstīta par break-up?", options: ["All Too Well", "Shake It Off"], answer: "All Too Well" },
  { question: "Kurš no šiem albumiem tika atkārtoti ierakstīts?", options: ["Fearless", "Speak Now"], answer: "Fearless" },
  { question: "Kurš aktieris tiek uzskatīts par Taylor Swift iedvesmu dziesmai 'Style'?", options: ["Harry Styles", "Jake Gyllenhaal"], answer: "Harry Styles" },
  { question: "Kurš no šiem albumiem ir visvairāk Grammy ieguvušais?", options: ["1989", "Fearless"], answer: "Fearless" },
  { question: "Kura dziesma sākas ar vārdiem 'I remember it all too well'?", options: ["All Too Well", "Enchanted"], answer: "All Too Well" },
  { question: "Taylor Swift bieži izmanto kādu skaitli savā dzīvē un dziesmās. Kurš tas ir?", options: ["13", "22"], answer: "13" },
  { question: "Kurš bija Taylor Swift pirmais pilnīgi popmūzikas albums?", options: ["1989", "Red"], answer: "1989" }
];

function App() {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [shake, setShake] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  const handleAnswer = (index, option) => {
    setAnswers({ ...answers, [index]: option });
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.answer) correct++;
    });
    const finalScore = (correct / questions.length) * 100;
    setScore(finalScore);
    setCelebrate(finalScore === 100);
    setShake(finalScore < 100);
  };

  return (
    <div className="container">
      <img src={taylorImage} alt="Taylor Swift" className="taylor-img" />
      <h1>Taylor Swift Viktorīna</h1>
      {questions.map((q, index) => (
        <motion.div
          key={index}
          className="question-block"
          animate={shake && answers[index] && answers[index] !== q.answer ? { x: [0, -10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.3 }}
        >
          <p>{index + 1}. {q.question}</p>
          {q.options.map(option => (
            <label key={option}>
              <input
                type="radio"
                name={`q${index}`}
                value={option}
                onChange={() => handleAnswer(index, option)}
              /> {option}
            </label>
          ))}
        </motion.div>
      ))}
      <button onClick={calculateScore}>Pabeigt</button>
      {score !== null && (
        <motion.h2
          className="score"
          animate={celebrate ? { scale: [1, 1.5, 1] } : {}}
          transition={{ duration: 0.5 }}
        >
          Jūsu rezultāts: {score.toFixed(2)}%
        </motion.h2>
      )}
    </div>
  );
}

export default App;