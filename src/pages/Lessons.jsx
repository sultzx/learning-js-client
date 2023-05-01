import React from "react"
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap"
import { useSelector } from "react-redux"
import { lessons } from '../lessons.js'


const Lessons = () => {

    const { data } = useSelector(state => state.user)

    return (
        <Container fluid>
            <Row>
                <Col md={2} className="tutorial-left-panel" style={{
                    backgroundColor: '#001845',
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

                    <br />
                    <br />
                </Col>

                <Col md={2}></Col>
                <Col md={'10'} className="profile-main-panel" >
                    <h2 style={{ color: '#C1D9F2' }}>{'Тапсырмалар'}</h2>
                    <hr style={{ color: 'white' }} />
                    <Col md={8}>
                        <Row>
                            <Col md={12} className="text-center">
                                {
                                    lessons?.map((lesson, i) =>
                                    (<Button className={`lesson-btn-${i + 1}`}
                                    style={{
                                        margin: '10px'
                                    }}
                                    onClick={() => {
                                        window.location.assign(`http://localhost:3000/lessons/${i + 1}/${lesson.color}/1`)
                                    }}>
                                        { lesson.name }
                                    </Button>))
                                }
                            </Col>
                        </Row>
                    </Col>
                </Col>
            </Row>
        </Container >)
}

export default Lessons