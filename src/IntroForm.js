

export default function IntroForm(props){

    const questionChoice = [5,10,15,20,25,30,35,40,45,50]

    const displayQuestionChoice = questionChoice.map((op,i)=><option value={op} key={op}>{op}</option>)
   
    
    
    return(
    <>
        <p className='heading'>Quiz Zone</p>
        <p className='sub'>Test your knowledge</p>
        <form>
            <label htmlFor="difficulty">Set Difficulty </label>
            <select 
                id="difficulty"
                value={props.formData.difficulty}
                onChange={props.handleForm}
                name='difficulty'

            >
                <option value="">Any</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
            <label htmlFor="questions">Set number of questions </label>
            <select 
                id="questions"
                value={props.formData.questions}
                onChange={props.handleForm}
                name='questions'

            >
            {displayQuestionChoice}
            </select>
            <label htmlFor="catagory">Select Catagory</label>
            <select 
                id="catagory"
                value={props.formData.catagory}
                onChange={props.handleForm}
                name='catagory'

            >
            <option value=''>Any</option>
            <option value='9'>General Knowledge</option>
            <option value='15'>Entertainment: Video Games</option>
            <option value='12'>Entertainment: Music</option>
            <option value='27'>Animals</option>
            <option value='18'>Science: Computers</option>
            <option value='19'>Science: Mathematics</option>
            </select>

            <button className='primary-btn' onClick={props.startQuiz}>Start Quiz</button>
        </form>
    </>
    
    )
}