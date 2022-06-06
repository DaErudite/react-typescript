import React, {useState} from 'react';
import {fetchQuestions} from "./API"
//import types
import {QuestionState, Difficulty } from './API';
//import styles
import { GlobalStyle, Wrapper } from './app.styles';

import QuestionCard from './components/questionCard'

export type AnsObject={
  question:String;
  answer: String;
  correct: boolean;
  correctChoice: string
}

const Total_Questions= 10

const App: React.FC =()=> {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] =useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userChoices, setUserChoices] = useState<AnsObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver]= useState(true)

  console.log(questions)

  const StartTrivia= async()=>{
    setLoading(true);
    setGameOver(false)

    const newQuestions=await fetchQuestions(Total_Questions, Difficulty.EASY);

    setQuestions(newQuestions);
    setScore(0);
    setUserChoices([]);
    setNumber(0);
    setLoading(false)
  }

  const verifyAnswer=(e: any)=>{
    if(!gameOver) {
      //get user's choice
      const answer= e.currentTarget.value
      //check user's choice against correct answer
      const correct= questions[number].correct_answer === answer
      //accumulate score if choice is correct
      if(correct) setScore((prev) => prev + 1)
      //save all answers in array
      const answerObject = {
        question : questions[number].question,
        answer,
        correct,
        correctChoice: questions[number].correct_answer 
      }
      setUserChoices((prev) => [...prev, answerObject])
    }
  }

  const nextQuestion=()=>{
    //Go to next questionif not last question
    const nextQuest=number +1
    
    if(nextQuest === Total_Questions){
      setGameOver(true)
      
    } else {
      setNumber(nextQuest)
    }

  }
  return (
    <>
    <GlobalStyle/>
    <Wrapper>
     <h1>React Quiz app</h1>
     {
     gameOver || userChoices.length===Total_Questions ?
     (<button className='start' onClick={StartTrivia}>
       Start Quiz
     </button> ) : null
    }

    {!gameOver ?
     <p className='score'>Score={score}</p>: null}
     { loading && <p>Loading questions...</p>}
     {!loading && !gameOver && (

     <QuestionCard
     questionNo={number + 1}
     totalQuestions={Total_Questions}
     question={questions[number].question}
     answers={questions[number].answers}
     userChoice={userChoices ? userChoices[number]: undefined}
     callback={verifyAnswer}
     />
     )}
     {!gameOver && !loading && userChoices.length === number +1 && number !== Total_Questions - 1 ?(


     <button className='next' onClick={nextQuestion}>Next Question</button>
     ): null}
    </Wrapper>
    </>
  );
}

export default App;
