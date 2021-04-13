import 'bootstrap/dist/css/bootstrap.min.css' // Bootstrap css
import './ViewResults.css';
import {Form, Button, ButtonGroup, Col, Row} from 'react-bootstrap'; // Container for all Rows/Components
import Axios from 'axios' // for handling API Call

const Dashboard = ({loggedInUser}) => {
        // Effect Hook 
        useEffect( () =>
        {
                async function fetchReport ()
                {
                var systemUsersResportData = null
                try
                {
                        var systemUsersReport = await Axios.get("http://localhost:3001/getReport", {withCredentials: true })
                        systemUsersResportData = systemUsersReport.data
                        //console.log(systemUsersResportData)
                        setSystemUsers(systemUsersResportData)
                }
                catch (err) 
                { 
                        console.log(err)
                }
                }
                
                fetchReport()
        }, [])


    return (
            <div>
                <table>
                        <tr>
                                <th>Exam ID</th>
                                <th>Module</th>
                                <th>Grade</th>
                                <th>Date</th>
                        </tr>
                        <tr>
                                <td>00001</td>
                                <td>FDME1290 - Mathematics</td>
                                <td>82%</td>
                                <td>25/03/2021</td>
                        </tr>
                        <tr>
                                <td>00003</td>
                                <td>FDME7240 - Elementary Physics</td>
                                <td>55%</td>
                                <td>06/04/2021</td>
                        </tr>
                        <tr>
                                <td>00004</td>
                                <td>FDME0830 - Geography</td>
                                <td>88%</td>
                                <td>07/04/2021</td>
                        </tr>
                        <tr>
                                <td>00009</td>
                                <td>FDME5890 - English Language</td>
                                <td>60%</td>
                                <td>09/04/2021</td>
                        </tr>
                        <tr id="fail">
                                <td>00010</td>
                                <td>FDME5880 - English Literature</td>
                                <td>48%</td>
                                <td>09/04/2021</td>
                        </tr>
                        <tr>
                                <td>00015</td>
                                <td>FDME4440 - Biology</td>
                                <td>64%</td>
                                <td>13/04/2021</td>
                        </tr>
                </table>
            </div>
    )
    }
    
    export default Dashboard