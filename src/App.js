import React, { useEffect } from 'react'
import './App.css';
import QuizCard from './QuizCard'
import uuid from 'react-uuid';

function App() {
  const {useState} = React

  // Open Trivia API https://opentdb.com/api_config.php
  const API = 'https://opentdb.com/api.php?amount=5&category=15' 

  // All quiz data retrieved from API call will be stored here
  const [quizData, setQuizData] = useState([])

  // The state of the quiz which takes care of the state of quiz at any given moment
  const [quizState, setQuizState] = useState(defaultQuizState())

  // Destructuring Objects for future ease of access 
  const {showScore,quizActive, loading, score, quizEnded} = quizState

  // Collection of Questions/Answers so we can use it to pass props to components
  const [quizCards, setQuizCards] = useState([])
  
  console.log(quizCards)
  console.log(quizState)
  
  // Function to set Quiz State as defualt when needed
  function defaultQuizState(){
    return {
      quizActive: false,
      loading: false,
      score: 0,
      showScore: false,
      quizEnded: false
    }
  }

  
  // Fetching API whenever Quiz is active and setting the quizData
  useEffect(()=>{
    if(quizActive){
      fetch(API)
      .then(res=>res.json())
      .then(data=> 
        setQuizData(data.results)
      )
    }
    
    
  },[quizState.quizActive])

  useEffect(()=>{
    if(quizData){
      // using quizData to extract all the relavant data needed and store it in the form below.
      const quizCardContent = quizData.map(item => {
        return {
          id: uuid(), // Assigning ids to each quizCard that is created
          question: item.question,
          //  merging the correct and incorrect Answers into one Array and randomizing thier order so the order of anwswers is not the same every time.
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


  // this allows us to highlight the selected answer when choosing the answer option
  function selectOption(id, checkedAnswer){
    setQuizCards(prev=>{
      return(
        prev.map(question=>{
          return question.id === id ? {...question, selected: checkedAnswer } : question
        })
      )
      
    })
  }

  // Quiz state is changed to active so our useEffect can run as it is the dependency and loading screen can be showed
  function startQuiz(){
    setQuizState(prev=> ({...prev, quizActive:true}) )
    setQuizState(prev=>{
      return {...prev,loading:true}
    })
     
  }

  // this function serves two purposes. To check answers and if answers have been checked user can start a new quiz and quiz state is set to default again
 function checkAnswers(){
  if(!quizEnded){
    const correctQuestion = quizCards.filter(question=>{
      return question.selected===question.correct_answer
    })
    setQuizState(prev=> ({...prev, quizEnded:true,showScore:true, score: correctQuestion.length}) )
    
  } else{
    setQuizState(defaultQuizState())
    setQuizCards([])
  }
  
  

 }

// collection of all Question/answers in form of components the data of quizCards aquired from quizData is mapped into it's respective QuizCard component and data is passed through props
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
        {showScore && <p><span className='correct'>GREEN</span> = Correct Answer</p>} 
        {showScore && <p><span className='incorrect'>RED</span> = Incorrect Answer</p>} 
      </div>
      {showScore && <p className='score'>Score: {score}/{quizCardsDisplay.length}</p>}
      {(quizActive && !loading) &&<button className='primary-btn' onClick={checkAnswers}>{showScore? 'New Quiz' : 'Check Answers'}</button>}
    </div>
    </div>
    
    
    </>
  );
}

export default App;
