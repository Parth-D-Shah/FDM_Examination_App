import 'bootstrap/dist/css/bootstrap.min.css' // Bootstrap css
import './CreateExam.css';
import {Form, Button, Col, Row, InputGroup} from 'react-bootstrap'; // Container for all Rows/Components

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
    const [deleteQuestionDisabled, setDeleteQuestionDisabled] = useState(true)
    const [showExamDetails, setShowExamDetails] = useState(true)

    //Effect Hook 
    useEffect( () =>
    {
        function canDeleteQuestion ()
        {
            if (questions.length === 1) {setDeleteQuestionDisabled(true)}
            else {setDeleteQuestionDisabled(false)} 
        }
        if (currentQuestion !== null) {canDeleteQuestion()}

    }, [currentQuestion]) // Updates when CREATE USER access key generated
    
    
    function handleChange(event)
    {
        var changedBox = event.target.name
        var value = event.target.value
        var currentQuestions = questions.slice()
        var index = event.target.classList[0]
        
        if (changedBox === "questionText")
        {

            currentQuestions[currentQuestion].questionText = value
            setQuestions(currentQuestions)
        }

        else if (changedBox === "answerText")
        {
            currentQuestions[currentQuestion].answerOptions[index].answerText = value
            setQuestions(currentQuestions)
        }

        else if (changedBox === "answerMarks")
        {
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

        if (buttonClicked === "publishExam")
        {
            console.log(questions)
        }
    }


    if (showExamDetails)
    {
        return (
            <div>
                <Row className="mt-4">
                    <Col className="d-flex justify-content-center">

                        <Form className="createExamDetails" onSubmit={handleSubmit}>


                            <p className="createExamDetailsTitle text-center mb-4">Exam Details</p>

                            
                            <Form.Group className="">
                                <Form.Label>Exam Title</Form.Label>
                                <Form.Control className="createExamTitle" name="examTitle" type="text" placeholder="Enter the exam title here"  onChange={handleChange} required />
                            </Form.Group>

                            <Form.Group className="">
                                <Form.Label>Exam Description</Form.Label>
                                <Form.Control className="createExamDesc" name="examDesc" as="textarea" placeholder="Enter the exam description here"  onChange={handleChange} required />
                            </Form.Group>

                            <Form.Row className="">
                                <Form.Group as={Col} className="">
                                    <Form.Label>Exam Start Date</Form.Label>
                                    <Form.Control className="createExamStartDate" name="examStartDate" type="datetime-local" onChange={handleChange} required />
                                </Form.Group>

                                <Form.Group as={Col} className="">
                                    <Form.Label>Exam End Date</Form.Label>
                                    <Form.Control className="createExamEndDate" name="examEndDate" type="datetime-local"  onChange={handleChange} required />
                                </Form.Group>
                            </Form.Row>

                            <Button type="submit" className="mt-3 prevnext normalButton" variant="primary"> Next </Button>
                        
                        </Form>
                    </Col>
                </Row>
            </div>


        )
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

                                        {questions[currentQuestion].answerOptions.length === parseInt(index+1) && (
                                        <Button onClick={addAnswer} className="mt-2 normalButton" variant="primary"> + </Button>
                                        )}

                                    </Form.Group>
                                    
                                )
                            })}
                            
                        
                        
                        <div className="mt-4">
                            <Button onClick={prevQuestion} className="prevnext normalButton" variant="primary"> Previous </Button>
                            <Button type="submit" onClick={() => (setButtonClicked("nextQuestion"))} className="prevnext ml-3 normalButton" variant="primary"> Next </Button>
                            <Button onClick={removeAnswer} className="ml-3" variant="danger" disabled={deleteQuestionDisabled}> Delete Question </Button>
                        </div>


                        <Button type="submit" onClick={() => (setButtonClicked("publishExam"))} className="mt-1 float-right normalButton" variant="primary"> Publish Exam </Button>


                        
                    </Form>

                </Col>

            </Row>
        </div>  
    )
    }
    
    export default CreateExam