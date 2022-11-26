import Answer from "./Answer"


export default function QuizCard(props){
    // since the question is a String format html we have to use this so it displays in HTML format
    function createMarkup(){
        return {__html: props.question}
    }

    // collection of answers for each question
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
            <p dangerouslySetInnerHTML={createMarkup()} className="question"></p>
            <div className="answers">
                {answers}
            </div>
            
        </div>
        </>
    )
}