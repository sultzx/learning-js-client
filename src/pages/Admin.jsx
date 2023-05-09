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
import { fetchCreateBootcamp } from "../redux/slices/bootcamp.js"

const Admin = () => {

    const inputImageRef = React.useRef()

    const dispatch = useDispatch();

    const [errorMessage, setErrorMessage] = React.useState('')

    const { data, rating } = useSelector((state) => state.user)

    const isAuth = useSelector(selectIsAuth)

    const [phone, setPhone] = React.useState(data?.phone)

    const [title, setTitle] = React.useState()

    const [desc, setDesc] = React.useState()

    const [location, setLocation] = React.useState()

    const [date, setDate] = React.useState()

    React.useEffect(() => {
        dispatch(fetchGetAllRatings())
        dispatch(fetchGetRating())
    }, [])

    const setRating = (rating) => {
        if (rating) {
            let result = (rating?.correct + rating?.wrong) == rating?.completed ?
                (rating?.correct * 100) / rating?.completed
                : 0
            return rating?.completed == 0 ? 0 : (5 * result) / 100
        }
    }

    let ratings = []

    let grades = {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0
    }

    let completed = 0

    let countCompleted = 0

    if (rating?.items) {
        rating?.items?.forEach((rat, i) => {
            switch (rat?.correct) {
                case 5: grades[5] += 1
                    break
                case 4: grades[4] += 1
                    break
                case 3: grades[3] += 1
                    break
                case 2: grades[2] += 1
                    break
                case 1: grades[1] += 1
                    break
            }
            completed += rat?.completed

            countCompleted += i
        })
    }

    console.log(((completed && completed) * 100) / rating?.items[0]?.total)

    const userRating = rating && rating.data && rating.data[0]

    console.log(((countCompleted && countCompleted)))

    const createBootcamp = async () => {
        try {
            await dispatch(fetchCreateBootcamp({
                title: title && title,
                description: desc && desc,
                location: location && location,
                time: date && date
            }))

            window.location.assign('http://localhost:3000/bootcamp')

        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <Container fluid>
            <Row>
                <Col md={2} className="tutorial-left-panel text-center" style={{
                    backgroundColor: '#001845',
                    height: '100vh',
                    paddingTop: '100px'
                }}>
                    {isAuth && <img
                        src={
                            data?.avatarUrl ? `http://localhost:5050${data?.avatarUrl}` :
                                "https://www.citypng.com/public/uploads/small/11639594360nclmllzpmer2dvmrgsojcin90qmnuloytwrcohikyurvuyfzvhxeeaveigoiajks5w2nytyfpix678beyh4ykhgvmhkv3r3yj5hi.png"}

                        className="img-fluid" style={{
                            width: '300px',
                            height: '280px',
                            margin: '6px auto',
                            padding: '6px'
                        }} alt="sdsdv" />}

                    <h5 className="page-heading" style={{ margin: '6px auto 24px auto' }}>{data?.username?.toUpperCase()}</h5>

                </Col>
                <Col md={2}></Col>

                <Col md={'10'} className="profile-main-panel" style={{ paddingTop: '100px' }}>
                    

                    <h4 style={{ color: '#C1D9F2' }}>{data?.fullname ? data?.fullname : 'Админ панелі'}
                        &nbsp;&nbsp;
                        <Badge bg="danger" pill>
                            Админ
                        </Badge>
                    </h4>
                    <hr style={{ color: 'white' }} />

                    <Row style={{
                        margin: '0'
                    }}>
                        <Col md={8} style={{

                            backgroundColor: 'white',

                        }}>
                            <Row>
                                <Col md={4} xs={6} style={{ padding: '20px 64px' }}>
                                    <h6>Орындалды</h6>
                                    <br />
                                    <CircularProgressbar
                                        value={((completed && completed) * 100) / rating?.items[0]?.total}
                                        styles={buildStyles({
                                            strokeLinecap: 'butt',
                                            textSize: '14px',
                                            pathTransitionDuration: 0.5,
                                            pathColor: `blue`,
                                            textColor: '#013369',
                                            trailColor: '#d6d6d6',
                                            backgroundColor: '#3e98c7'
                                        })} text={`${((completed && completed) * 100) / rating?.items[0]?.total}%`} />
                                </Col>
                                <Col md={4} xs={6} style={{ padding: '20px 64px' }}>
                                    <h6>Орындауға кірісті</h6>
                                    <br />
                                    <CircularProgressbar value={((countCompleted && countCompleted) * 100) / rating?.items?.length} styles={buildStyles({
                                        strokeLinecap: 'butt',
                                        textSize: '14px',
                                        pathTransitionDuration: 0.5,
                                        pathColor: `blue`,
                                        textColor: '#013369',
                                        trailColor: '#d6d6d6',
                                        backgroundColor: '#3e98c7'
                                    })} text={`${((countCompleted && countCompleted) * 100) / rating?.items?.length}%`} />
                                </Col>
                                <Col md={4} xs={6} style={{ padding: '20px 64px' }}>
                                    <h6>dwdwd</h6>
                                    <br />
                                    <CircularProgressbar value={34} styles={buildStyles({
                                        strokeLinecap: 'butt',
                                        textSize: '14px',
                                        pathTransitionDuration: 0.5,
                                        pathColor: `blue`,
                                        textColor: '#013369',
                                        trailColor: '#d6d6d6',
                                        backgroundColor: '#3e98c7'
                                    })} text={`${34}%`} />
                                </Col>

                                <Col md={12} style={{ padding: '16px 24px 16px 24px' }}>
                                    <h6>Бағалар көрсеткіші</h6>

                                    <ProgressBar animated striped
                                        label={`5 (${((grades?.[5] * 100) / rating?.items?.length)}%)`}
                                        style={{
                                            border: '1px solid #013369',
                                            borderRadius: '1px'
                                        }}
                                        variant="success"
                                        now={grades?.[5] != 0 ? ((grades?.[5] * 100) / rating?.items?.length) : 5} />
                                    <br />
                                    <ProgressBar animated striped
                                        label={`4 (${((grades?.[4] * 100) / rating?.items?.length)}%)`}
                                        style={{
                                            border: '1px solid #013369',
                                            borderRadius: '1px'
                                        }}
                                        variant="primary"
                                        now={grades?.[4] != 0 ? ((grades?.[4] * 100) / rating?.items?.length) : 5} />
                                    <br />
                                    <ProgressBar animated striped
                                        label={`3 (${((grades?.[3] * 100) / rating?.items?.length)}%)`}
                                        style={{
                                            border: '1px solid #013369',
                                            borderRadius: '1px'
                                        }}
                                        variant="info"
                                        now={grades?.[3] != 0 ? ((grades?.[3] * 100) / rating?.items?.length) : 5} />
                                    <br />
                                    <ProgressBar animated striped
                                        label={`2 (${((grades?.[2] * 100) / rating?.items?.length)}%)`}
                                        style={{
                                            border: '1px solid #013369',
                                            borderRadius: '1px'
                                        }}
                                        variant="warning"
                                        now={grades?.[2] != 0 ? ((grades?.[2] * 100) / rating?.items?.length) : 5} />
                                    <br />
                                    <ProgressBar animated striped
                                        label={`1 (${((grades?.[1] * 100) / rating?.items?.length)}%)`}
                                        style={{
                                            border: '1px solid #013369',
                                            borderRadius: '1px'
                                        }}
                                        variant="danger"
                                        now={grades?.[1] != 0 ? ((grades?.[1] * 100) / rating?.items?.length) : 5} />

                                </Col>

                            </Row>
                            <br />
                        </Col>
                    </Row>

                    <hr style={{ color: 'white' }} />

                    <Row style={{ margin: '0' }}>
                        <Col md={8}>
                            <h4 style={{ color: '#C1D9F2' }}>Жаңа кездесу құру</h4>
                            <label  style={{ color: 'white' }}>Атауы</label>
                            <input value={title} onChange={event => setTitle(event.target.value)} type="text" className="form-control" />
                            <br />
                            <label style={{ color: 'white' }}>Толығырақ</label>
                            <input value={desc} onChange={event => setDesc(event.target.value)} type="text" className="form-control" />
                            <br />
                            <label style={{ color: 'white' }}>Уақыты</label>
                            <input defaultValue={date} onChange={event => setDate(event.target.value)} type="date" className="form-control" />
                            <br />
                            <button className="signup-btn" onClick={() => {
                                createBootcamp()
                            }} style={{
                                padding: '8px 24px'
                            }}>Кездесу құру</button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container >)
}

export default Admin