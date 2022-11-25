

export default function Answer(props){
    let style
    if(props.selected === props.answer){
        style = {backgroundColor: ' rgb(180, 180, 217)', color:'black', fontWeight:'bold'}
    }
    if(((props.selected === props.answer) && props.selected!==props.correctAnswer) && props.quizEnded){
        style = {backgroundColor: 'rgba(255, 0, 0, 0.227)', color:'black', fontWeight:'bold'}
    }
    if(props.quizEnded && props.answer===props.correctAnswer){
        style= {backgroundColor: 'lightgreen' , border: '3px solid white', fontWeight: 'bold'}
    }


     

    return (
        <>
        <button disabled={props.quizEnded} style={style} className="option" onClick={(e)=>props.handleClick(props.id,props.answer)} >{props.answer}</button>
        </>
    )
}