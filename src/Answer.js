

export default function Answer(props){


    function createMarkup(){
        return {__html: props.answer}
    }
    let style
    // style for selected option before checking answers
    if(props.selected === props.answer){
        style = {backgroundColor: ' rgb(180, 180, 217)', color:'rgba(255, 255, 255, 0.999)', fontWeight:'bold', border:'2px solid black'}
    }
    // style for incorrect answer once answers are checked
    if(((props.selected === props.answer) && props.selected!==props.correctAnswer) && props.quizEnded){
        style = {backgroundColor: ' rgba(255, 0, 0, 0.744)', color:'rgba(255, 255, 255, 0.999)', fontWeight:'bold', border: '3px solid white'}
    }
    // style for correctly answered answer
    if(props.quizEnded && props.answer===props.correctAnswer){
        style= {backgroundColor: 'rgb(51, 161, 51)' , fontWeight: 'bold'}
    }


     

    return (
        <div className="answer">
        <button dangerouslySetInnerHTML={createMarkup()} disabled={props.quizEnded} style={style} className="option" onClick={(e)=>props.handleClick(props.id,props.answer)} ></button>
        </div>
    )
}