import React, { useEffect } from "react";
import "./App.css";
import QuizCard from "./QuizCard";
import uuid from "react-uuid";
import IntroForm from "./IntroForm";

function App() {
  const { useState } = React;

  // Open Trivia API https://opentdb.com/api_config.php

  // All quiz data retrieved from API call will be stored here
  const [quizData, setQuizData] = useState([]);

  // The state of the quiz which takes care of the state of quiz at any given moment
  const [quizState, setQuizState] = useState(defaultQuizState());

  // Destructuring Objects for future ease of access
  const { showScore, quizActive, loading, score, quizEnded } = quizState;

  // Collection of Questions/Answers so we can use it to pass props to components
  const [quizCards, setQuizCards] = useState([]);

  const [resourceFormData, setResourceFormData] = useState({
    questions: "5", //Max questions 50 as per the API Docs
    catagory: "", //Empty string indicates random catagory questions
    difficulty: "", //Empty String indicates random difficulty questions
  });

  const { questions, catagory, difficulty } = resourceFormData;
  const API = `https://opentdb.com/api.php?amount=${questions}&category=${catagory}&difficulty=${difficulty}`;

  // console.log(resourceFormData)
  function handleForm(event) {
    setResourceFormData((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  }

  // console.log(quizCards)
  // console.log(quizState)

  // Function to set Quiz State as defualt when needed
  function defaultQuizState() {
    return {
      quizActive: false,
      loading: false,
      score: 0,
      showScore: false,
      quizEnded: false,
    };
  }

  // Fetching API whenever Quiz is active and setting the quizData
  useEffect(() => {
    if (quizActive) {
      fetch(API)
        .then((res) => res.json())
        .then((data) => setQuizData(data.results));
    }
  }, [quizState.quizActive]);

  useEffect(() => {
    //When the show answer is clicked this scrolls the screen to the bottom so user can clearly see the score without scrolling
    if (showScore) {
      window.scroll({
        top: document.body.offsetHeight,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [showScore]);

  useEffect(() => {
    if (quizData) {
      // using quizData to extract all the relavant data needed and store it in the form below.
      const quizCardContent = quizData.map((item) => {
        return {
          id: uuid(), // Assigning ids to each quizCard that is created
          question: item.question,
          //  merging the correct and incorrect Answers into one Array and randomizing thier order so the order of anwswers is not the same every time.
          answers: [...item.incorrect_answers, item.correct_answer].sort(
            (a, b) => 0.5 - Math.random()
          ),
          correct_answer: item.correct_answer,
          selected: "",
        };
      });

      setQuizCards(quizCardContent);
      setQuizState((prev) => {
        return { ...prev, loading: false };
      });
    }
  }, [quizData]);

  // this allows us to highlight the selected answer when choosing the answer option
  function selectOption(id, checkedAnswer) {
    setQuizCards((prev) => {
      return prev.map((question) => {
        return question.id === id
          ? { ...question, selected: checkedAnswer }
          : question;
      });
    });
  }

  // Quiz state is changed to active so our useEffect can run as it is the dependency and loading screen can be showed
  function startQuiz() {
    setQuizState((prev) => ({ ...prev, quizActive: true }));
    setQuizState((prev) => {
      return { ...prev, loading: true };
    });
  }

  // this function serves two purposes. To check answers and if answers have been checked user can start a new quiz and quiz state is set to default again
  function checkAnswers() {
    if (!quizEnded) {
      const correctQuestion = quizCards.filter((question) => {
        return question.selected === question.correct_answer;
      });
      setQuizState((prev) => ({
        ...prev,
        quizEnded: true,
        showScore: true,
        score: correctQuestion.length,
      }));
    } else {
      setQuizState(defaultQuizState());
      setQuizCards([]);
    }
  }

  // collection of all Question/answers in form of components the data of quizCards aquired from quizData is mapped into it's respective QuizCard component and data is passed through props
  const quizCardsDisplay = quizCards.map((question) => {
    return (
      <QuizCard
        quizActive={quizActive}
        quizEnded={quizEnded}
        question={question.question}
        answers={question.answers}
        correctAnswer={question.correct_answer}
        id={question.id}
        selected={question.selected}
        handleClick={selectOption}
        checkAnswers={checkAnswers}
      />
    );
  });

  const introStyle = { display: !quizActive ? "" : "none" };

  const scoreStyle = {
    color: score / quizCardsDisplay.length >= 0.5 ? "green" : "red",
  };

  return (
    <section>
      {!quizActive && (
        <div className="intro" style={introStyle}>
          <IntroForm
            startQuiz={startQuiz}
            formData={resourceFormData}
            handleForm={handleForm}
          />
        </div>
      )}
      {showScore && (
        <h1
          className="endgame-summary"
          style={{ margin: "0", textAlign: "center" }}
        >
          Quiz Summary
        </h1>
      )}
      {loading ? <h1 className="loading">Loading...</h1> : ""}
      <div className="quiz">
        {quizActive && quizCardsDisplay}
        <div className="summary">
          {showScore && (
            <p className="score">
              Score: <span style={scoreStyle}>{score}</span>/
              {quizCardsDisplay.length}
            </p>
          )}
          <div className="legends">
            {showScore && (
              <p>
                <span className="correct">Correct Answer</span>
              </p>
            )}
            {showScore && (
              <p>
                <span className="incorrect">Incorrect Answer</span>{" "}
              </p>
            )}
          </div>

          {quizActive && !loading && (
            <button className="primary-btn" onClick={checkAnswers}>
              {showScore ? "New Quiz" : "Check Answers"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default App;
