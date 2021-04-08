import 'bootstrap/dist/css/bootstrap.min.css' // Bootstrap css
import './CreateExam.css';
import {Form, Button, ButtonGroup, Col, Row, InputGroup} from 'react-bootstrap'; // Container for all Rows/Components

import {useState, useEffect} from 'react'; // React states to store API info

import Axios from 'axios' // for handling API Call
import Swal from 'sweetalert2'

const CreateExam = ({loggedInUser}) => {
    const [questions, setQuestions] = useState(
        [
            {
                questionText: "",
                answerOptions: 
                [
                    {answerText: "", answerMarks: ""},
                ]
            }
        ]
    )
    const [currentQuestion, setCurrentQuestion] = useState(0)

    const [buttonClicked, setButtonClicked] = useState(null)
    const [previousDisabled, setPreviousDisabled] = useState(true)

    //Effect Hook 
    useEffect( () =>
    {
        function canClickPrevious ()
        {
            if (currentQuestion == 0) {setPreviousDisabled(true)}
            else {setPreviousDisabled(false)} 
        }
        if (currentQuestion !== null) {canClickPrevious()}

    }, [currentQuestion]) // Updates when CREATE USER access key generated
    
    
    function handleChange(event)
    {
        var changedBox = event.target.name
        var value = event.target.value
        var currentQuestions = questions.slice()
        
        if (changedBox === "questionText")
        {

            currentQuestions[currentQuestion].questionText = value
            setQuestions(currentQuestions)
        }

        else if (changedBox === "answerText")
        {
            var index = event.target.classList[0]
            currentQuestions[currentQuestion].answerOptions[index].answerText = value
            setQuestions(currentQuestions)
        }

        else if (changedBox === "answerMarks")
        {
            var index = event.target.classList[0]
            currentQuestions[currentQuestion].answerOptions[index].answerMarks = value
            setQuestions(currentQuestions)
        }

    }

    function addAnswer ()
    {
        var newAnswer = {answerText: "", answerMarks: ""}
        var currentQuestions = questions.slice()

        currentQuestions[currentQuestion].answerOptions.push(newAnswer)
        setQuestions(currentQuestions)
    }

    function removeAnswer (event)
    {
        var index = event.target.classList[0]
        var currentQuestions = questions.slice()

        currentQuestions[currentQuestion].answerOptions.splice(index, 1)
        setQuestions(currentQuestions)     
    }


    function prevQuestion ()
    {
        var currentQuestionNum = currentQuestion
        setCurrentQuestion(currentQuestionNum-1)
    }


    function handleSubmit (event)
    {
        event.preventDefault(event)
        
        if (buttonClicked === "nextQuestion")
        {
            var currentQuestions = questions.slice()
            var newQuestion =
            {
                questionText: "",
                answerOptions: 
                [
                    {answerText: "", answerMarks: ""},
                ]
            }
            currentQuestions.push(newQuestion)
            setQuestions(currentQuestions)
            
            var currentQuestionNum = currentQuestion
            setCurrentQuestion(currentQuestionNum+1)
        }
    }


    return (
        <div>
            <Row className="mt-5">
                <Col className="d-flex justify-content-center">

                    <Form className="createExamSection" onSubmit={handleSubmit}>

                        <p className="createExamQuestionNumber mb-4">{"Question " + parseInt(currentQuestion+1)}</p>
                        
                        <Form.Group className="">
                            <Form.Label>Question Text</Form.Label>
                            <Form.Control className="createExamQuestion" name="questionText" as="textarea" placeholder="Enter your question text here" value={questions[currentQuestion].questionText} onChange={handleChange} required />
                        </Form.Group>



                        {questions[currentQuestion].answerOptions.map((answer, index) =>
                        {
                            var disabled = false
                            if (questions[currentQuestion].answerOptions.length === 1) {disabled=true}
                            return (
                                <Form.Group key={index} className="">
                                    <Form.Label>{"Answer Option " + parseInt(index+1)} </Form.Label>
                                    <InputGroup>
                                        <Form.Control className={index + " createExamAnswer"} name="answerText" type="text" placeholder="Enter an answer for your question here" value={answer.answerText} onChange={handleChange} required />
                                        
                                        <InputGroup.Append>
                                            <Form.Control className={index + " createExamAnswerMarks"} name="answerMarks" type="number" placeholder="Marks" value={answer.answerMarks} onChange={handleChange} required />
                                        </InputGroup.Append>

                                        <Button onClick={removeAnswer} className={index + " ml-2"} variant="danger" disabled={disabled}> - </Button>
                                    
                                    </InputGroup>
                                </Form.Group>
                            )
                        })}

                        <Button onClick={addAnswer} className="normalButton" variant="primary"> + </Button>
                        

                        

                        <div className="mt-5 pt-5">
                            <Button onClick={prevQuestion} className="normalButton" variant="primary" disabled={previousDisabled}> Previous Question </Button>
                            <Button type="submit" onClick={() => (setButtonClicked("nextQuestion"))} className="ml-3 normalButton" variant="primary"> Next Question </Button>
                            <Button type="submit" onClick={() => (setButtonClicked("reviewExam"))} className="float-right ml-3 normalButton" variant="primary"> Review Exam </Button>
                        </div>

                        
                    </Form>

                </Col>

            </Row>
        </div>

        
    )
    }
    
    export default CreateExam