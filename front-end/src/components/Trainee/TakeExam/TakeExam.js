import 'bootstrap/dist/css/bootstrap.min.css' // Bootstrap css
import './TakeExam.css';
import {Form, Button, Col, Row, InputGroup, Card} from 'react-bootstrap'; // Container for all Rows/Components


import {useState, useEffect} from 'react'; // React states to store API info

import Axios from 'axios' // for handling API Call
import Swal from 'sweetalert2'

const TakeExam = ({loggedInUser}) => {
    const [exams, setExams] = useState(
        [
            {
                title: "",
                endDate: "",
                description: ""
            }
        ]
    )

    const [showExamList, setShowExamList] = useState(true)
    const [showExam, setShowExam] = useState(false)
    const [currentExam, setCurrentExam] = useState(null)

    //Effect Hook 
    useEffect( () =>
    {
        async function fetchExams ()
        {
            try
            {
                var examsResponse = await Axios.get("http://localhost:3001/getExams", {withCredentials: true })
                setExams(examsResponse.data)
            }
            catch (err) {console.log(err)}
        }
        
        fetchExams()

    }, [])

    function startExam (event)
    {
        var examID = event.target.classList[0]
        setShowExamList(false)
        setShowExam(true)
        setCurrentExam(examID)
    }

    function run ()
    {
        console.log("hello")
    }


    if (showExamList)
    {
        return (
            <div>
                <Row className="mt-4">
                    {exams.map((exam, index) =>
                    {
                        return (
                            <Col key={index} className="mx-auto mb-4" xs="4">
                                <Card bg="dark" text="white" className="">
                                    <Card.Body>
                                        <Card.Title>{exam.title}</Card.Title>
                                        <Card.Subtitle className="dateDue mb-2 text-muted"> {"Complete By: " + new Date(exam.endDate).toLocaleString()} </Card.Subtitle>
                                        <Card.Text> {exam.description} </Card.Text>
                                        <div className="d-flex justify-content-center">
                                            <Button className={exam.id + " normalButton"} variant="primary" onClick={startExam}> Start Exam </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>  
                        )
                    })}
                </Row>

            </div>
        )
    }

    if (showExam)
    {
        return (
            <div>
                <Row className="mt-4">
                    <Col className="d-flex justify-content-center">

                        <Form className="takeExamSection">

    
                            <p className="takeExamQuestion ">1) What is the full form of SQL?</p>

                            <Form.Group>

                                <div className="takeExamOption" onClick={run}>
                                    <input className="takeExamRadio" type="radio" id="option1" name="options" />
                                    <label className="takeExamText ml-4" for="option1">Sample Query Language</label>
                                </div>

                                <div className="takeExamOption">
                                    <input className="takeExamRadio" type="radio" id="option2" name="options" />
                                    <label className="takeExamText ml-4" for="option2">Structure Query Language</label>
                                </div>

                                <div className="takeExamOption">
                                    <input className="takeExamRadio" type="radio" id="option3" name="options"/>
                                    <label className="takeExamText ml-4" for="option3">None of these.</label>
                                </div>

                            </Form.Group>
     

                            <div className="mt-4">
                                <Button  className="prevnext normalButton" variant="primary"> Previous </Button>
                                <Button className="prevnext ml-3 normalButton" variant="primary"> Next </Button>

                                <Button className="float-right normalButton" variant="primary"> Submit Attempt </Button>
                            
                            </div>

                            
                        </Form>

                    </Col>

                </Row>
            </div>  
        )
    }

}
    
    export default TakeExam