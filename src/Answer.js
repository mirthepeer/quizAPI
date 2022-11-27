

export default function Answer(props){


    function createMarkup(){
        return {__html: props.answer}
    }
    let style
    if(props.selected === props.answer){
        style = {backgroundColor: ' rgb(180, 180, 217)', color:'black', fontWeight:'bold'}
    }
    if(((props.selected === props.answer) && props.selected!==props.correctAnswer) && props.quizEnded){
        style = {backgroundColor: ' rgba(255, 0, 0, 0.744)', color:'rgba(255, 255, 255, 0.999)', fontWeight:'bold', border: '3px solid white'}
    }
    if(props.quizEnded && props.answer===props.correctAnswer){
        style= {backgroundColor: 'lightgreen' , fontWeight: 'bold'}
    }


     

    return (
        <div className="answer">
        <button dangerouslySetInnerHTML={createMarkup()} disabled={props.quizEnded} style={style} className="option" onClick={(e)=>props.handleClick(props.id,props.answer)} ></button>
        </div>
    )
}