import Answer from "./Answer"


export default function QuizCard(props){
    
    const answers = props.answers.map(answer=>{
        return (
            <Answer
             answer={answer}
             key= {answer}
             correctAnswer = {props.correctAnswer}
             selected={props.selected}
             handleClick={props.handleClick}
             id= {props.id}
             quizActive= {props.quizActive}
             quizEnded={props.quizEnded}
            />
        )
    })
    
    return(
        <>
        <div className="card">
            <p className="question">{props.question}</p>
            <div className="answers">
                {answers}
            </div>
            
        </div>
        </>
    )
}