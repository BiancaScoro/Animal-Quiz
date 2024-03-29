import React, {useState} from "react";
import { fetchQuizQuestions } from "./API";
import QuestionCard from "./components/question-card";
import { QuestionState, Difficulty } from "./API";
import { GlobalStyle, Wrapper } from "./App-styles";
import lion from './images/lion.jpg'

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}
const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.MEDIUM
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore(prev => prev + 1);
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject])
    }
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  }
  return (
    <>
    <GlobalStyle />
    <Wrapper>
    <div className="App">
       <h1 className="h1">Animal Quiz</h1>
       {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <div className="img-button">
        <img src={lion} alt="lion" />
       <button className="start" onClick={startQuiz}>
        Start
       </button>
       </div>
       ) : null}
       {!gameOver ? <p className="score">Score: {score}</p> : null}
       {loading && <p>Loading...</p>}
       {!loading && !gameOver && (
      <QuestionCard 
       questionNr={number + 1}
       totalQuestions={TOTAL_QUESTIONS}
       question={questions[number].question}
       answers={questions[number].answers}
       userAnswer={userAnswers ? userAnswers[number] : undefined}
       callback={checkAnswer}
        /> 
       )}
       {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
        <div className="btn-container">
        <button className="next" onClick={nextQuestion}>
        Next
       </button>
       </div>
       ) : null}
      </div>
    </Wrapper>
    </>
  );
}

export default App;
