import React from "react"
import { Container, Row, Col, Button, Card, Form, Badge, ProgressBar } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { fetchAuthMe, fetchGetAllRatings, fetchGetRating, fetchUpdate, selectIsAuth } from "../redux/slices/user.js"
import { useDispatch, useSelector } from "react-redux"

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Rating } from 'react-simple-star-rating'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import top10 from '../images/top10.png'
import axios from '../axios.js'
import { fetchCreateBootcamp, fetchGetBootcamps, fetchParticipate } from "../redux/slices/bootcamp.js"
import bootcamp from '../images/bootcamp.png'
const Bootcamp = () => {


    const dispatch = useDispatch();

    const userData = useSelector((state) => state.user.data)

    const { data } = useSelector((state) => state.bootcamp)

    React.useEffect(() => {
        dispatch(fetchGetBootcamps())
    }, [])

    const participate = async (id) => {
        try {
            await dispatch(fetchParticipate({
                bootcampId: id && id
            }))
            window.location.assign('http://localhost:3000/bootcamp')
        } catch (error) {
            alert(error.message)
        }
    }

    console.log(data && data)

    return (
        <Container fluid>
            <Row>
                <Col md={2} className="tutorial-left-panel text-center" style={{
                    backgroundColor: '#001845',
                    height: '100vh',
                    paddingTop: '100px'
                }}>


                </Col>
                <Col md={2}></Col>

                <Col md={'10'} className="profile-main-panel" >
                    

                    <h4 style={{ color: '#C1D9F2' }}>{'Bootcamp'}&nbsp;
                    <img src={bootcamp} width={'100px'} alt="" />
                    </h4>
                    <hr style={{ color: 'white' }} />

                    <Row style={{  margin: '0' }}>
                        <Col md={8} >
                            <Row>
                                {data?.map((d, i) => 
                                (<Col md={12} style={{
                                    border: '1px solid white',
                                    borderRadius: '1px',
                                    padding: '24px',
                                    marginBottom: '12px'
                                }}>
                                    <h4 style={{color: 'white'}}>{ d?.title}</h4>
                                    <p style={{color: 'white'}}>{d?.time?.substring(0, 10)}</p>
                                    <p style={{color: 'white'}}>{d?.description}</p>
                                    <hr style={{color: 'white'}} />
                                    <Row style={{
                                        margin: 'auto 12px'
                                    }}>
                                        { d?.members?.map((m, i) => (
                                            <Col md={2} key={i} className="" style={{
                                                border: '1px solid white', borderRadius: '6px', margin: '4px'
                                            }}>
                                                <img style={{border: '1px solid white', borderRadius: '3px', margin: '12px auto'}}
                                                src={m ? `http://localhost:5050${m?.avatarUrl}` :
                                            'https://www.citypng.com/public/uploads/small/11639594360nclmllzpmer2dvmrgsojcin90qmnuloytwrcohikyurvuyfzvhxeeaveigoiajks5w2nytyfpix678beyh4ykhgvmhkv3r3yj5hi.png' } 
                                            width={'70px'} height={'70px'} alt="" />
                                                <p style={{color: "white"}}>{m?.fullname}</p>
                                            </Col>
                                        ))

                                        }
                                    </Row>
                                    <hr style={{color: 'white'}} />
                                    <div className="text-end">
                                        <button className="signup-btn" onClick={() => {participate(d?._id)}} style={{padding: '8px 24px'}}>
                                            Қатысу
                                        </button>
                                    </div>
                                    </Col>))
                                    
                                }
                            </Row>
                            <br />
                        </Col>
                    </Row>

                    <hr style={{ color: 'white' }} />

                </Col>
            </Row>
        </Container >)
}

export default Bootcamp