import React, { useEffect } from 'react'
import './App.css';
import QuizCard from './QuizCard'
import uuid from 'react-uuid';
import ReactLoading from 'react-loading';

function App() {
  const {useState} = React
  const API_KEY = 'https://opentdb.com/api.php?amount=5&category=15' 
  const [quizData, setQuizData] = useState([])
  const [quizState, setQuizState] = useState(defaultQuizState())
  const {showScore,quizActive, loading, score, quizEnded} = quizState
  const [quizCards, setQuizCards] = useState([])
  
  console.log(quizCards)
  console.log(quizState)
  
  function defaultQuizState(){
    return {
      quizActive: false,
      loading: false,
      score: 0,
      showScore: false,
      quizEnded: false
    }
  }

  
  
  useEffect(()=>{
    if(quizActive){
      fetch(API_KEY)
      .then(res=>res.json())
      .then(data=> 
        setQuizData(data.results)
      )
    }
    
    
  },[quizState.quizActive])

  useEffect(()=>{
    if(quizData){
      const quizCardContent = quizData.map(item => {
        return {
          id: uuid(),
          question: item.question,
          answers: [...item.incorrect_answers , item.correct_answer].sort((a, b) => 0.5 - Math.random()),
          correct_answer: item.correct_answer,
          selected: '' 
  
        }
      })
      
      setQuizCards(quizCardContent)
      setQuizState(prev=>{
        return {...prev,loading:false}
      })
     
    }
    

  },[quizData])

  function selectOption(id, checkedAnswer){
    setQuizCards(prev=>{
      return(
        prev.map(question=>{
          return question.id === id ? {...question, selected: checkedAnswer } : question
        })
      )
      
    })
  }

  function startQuiz(){
    setQuizState(prev=> ({...prev, quizActive:true}) )
    setQuizState(prev=>{
      return {...prev,loading:true}
    })
     
  }

 function checkAnswers(){
  if(!quizEnded){
    const correctQuestion = quizCards.filter(question=>{
      return question.selected===question.correct_answer
    })
    setQuizState(prev=> ({...prev, quizEnded:true,showScore:true, score: correctQuestion.length}) )
    
  } else{
    setQuizState(defaultQuizState())
  }
  
  

 }


const quizCardsDisplay = quizCards.map(question=>{
  return (
    <QuizCard 
    quizActive={quizActive}
    quizEnded={quizEnded}
    question={question.question}
    answers={question.answers}
    correctAnswer = {question.correct_answer}
    id= {question.id}
    selected={question.selected}
    handleClick={selectOption}
    checkAnswers={checkAnswers}
     />
  )
})

 const introStyle = {display: !quizActive?'':'none'}
  


  return (
    <>
    <div className='intro' style={introStyle}>
      {!quizActive &&<p className='heading'>Quiz Zone</p>}
      {!quizActive &&<p className='sub'>Test you gaming knowledge</p>}
      {!quizActive &&<button className='primary-btn' onClick={startQuiz}>Start Quiz</button>}
    </div>
    {loading? <h1 className='loading'>Loading...</h1>: ''}
    <div className="quiz">
      {quizActive && quizCardsDisplay}
      <div className='button'>
      <div className='legends'>
        {showScore && <p><span>GREEN</span> = Correct Answer</p>} 
      </div>
      {showScore && <p className='score'>Score: {score}/{quizCardsDisplay.length}</p>}
      {(quizActive && !loading) &&<button className='primary-btn' onClick={checkAnswers}>{showScore? 'New Quiz' : 'Check Answers'}</button>}
    </div>
    </div>
    
    
    </>
  );
}

export default App;
