import React from "react"
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { lessons } from "../../../lessons.js"

const E2 = () => {

    const {id} = useParams()

    const sortedName = []

    lessons?.forEach((lesson, i) => {
        if (lesson.id == id) {
            sortedName.push(lesson)
        }
    })

    console.log(sortedName && sortedName)

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
                     <Row>
                        <Col>
                            <Button className="d-block exercise-link-btn"  href={`http://localhost:3000/lessons/${id}/${sortedName[0].color}/1`}>Тапсырма 1</Button>
                            <Button className="d-block exercise-link-btn"  href={`http://localhost:3000/lessons/${id}/${sortedName[0].color}/2`}>Тапсырма 2</Button>
                            <Button className="d-block exercise-link-btn"  href={`http://localhost:3000/lessons/${id}/${sortedName[0].color}/3`}>Тапсырма 3</Button>
                            <Button className="d-block exercise-link-btn"  href={`http://localhost:3000/lessons/${id}/${sortedName[0].color}/4`}>Тапсырма 4</Button>
                            <Button className="d-block exercise-link-btn"  href={`http://localhost:3000/lessons/${id}/${sortedName[0].color}/5`}>Тапсырма 5</Button>
                        </Col>
                    </Row>               
                    <br />
                    <br />
                </Col>

                <Col md={2}></Col>
                <Col md={'10'} className="profile-main-panel"  style={{
                    backgroundColor: '#C1D9F2',
                    height: '100vh'
                }}>
                    <h2 style={{ color: '#001845' }}>{ sortedName[0].name  + ". " + 'Тапсырма: 2'}</h2>
                    <hr style={{ color: '#001845' }} />
                    <Col md={8}>
                        {/* //////////////////////МЫНА ЖЕРДЕ ТАПСЫРМА
                        /////////////////////////////////////////////



                        ///////////////////////////////////////////// */}
                    </Col>
                </Col>
            </Row>
        </Container >)
}

export default E2