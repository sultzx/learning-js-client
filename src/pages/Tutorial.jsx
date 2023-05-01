import React from "react"
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap"
import { useSelector } from "react-redux"
import {lessons} from '../lessons.js'


const Tutorial = () => {

    const { data } = useSelector(state => state.user)

    return (
        <Container fluid>
            <Row>
                <Col md={2} className="tutorial-left-panel" style={{
                    backgroundColor: '#001845',
                    // height: '100vh',
                    paddingTop: '100px'
                }}>
                    <Row>
                        <Row>
                            <Col className="col-6">
                                <img
                                    src={
                                        data?.avatarUrl ? `http://localhost:5050${data?.avatarUrl}` :
                                            "https://www.citypng.com/public/uploads/small/11639594360nclmllzpmer2dvmrgsojcin90qmnuloytwrcohikyurvuyfzvhxeeaveigoiajks5w2nytyfpix678beyh4ykhgvmhkv3r3yj5hi.png"}
                                            For
                                    className="img-fluid" style={{
                                        width: '120px',
                                        height: '120px',
                                        margin: '6px auto',

                                    }} alt="sdsdv" />
                            </Col>
                            <Col className="col-6 d-flex row align-items-center">
                                <h5 className="page-heading" style={{ margin: '6px auto 24px auto' }}>{data?.fullname}</h5>
                            </Col>
                        </Row>
                    </Row>
                    <hr style={{ color: 'white' }} />
                    <Row>
                        <Col md={12} className="text-center">
                            {
                                lessons?.map((lesson, i) => 
                                (<Button className={`lesson-btn-${i + 1}`} onClick={() => {
                                    window.location.assign(`http://localhost:3000/tutorial/${lesson.color}`)
                                }}>
                                    {lesson.name}
                                </Button>))
                            }
                        </Col>
                    </Row>

                    <br />
                    <br />
                </Col>

                <Col md={'10'} className="profile-main-panel">
                    
                </Col>
            </Row>
        </Container >)
}

export default Tutorial