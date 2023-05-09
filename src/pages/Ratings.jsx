import React from "react"
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap"
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

const Ratings = () => {

    const inputImageRef = React.useRef()

    const dispatch = useDispatch();

    const [errorMessage, setErrorMessage] = React.useState('')

    const { data, rating } = useSelector((state) => state.user)

    const isAuth = useSelector(selectIsAuth)

    const [phone, setPhone] = React.useState(data?.phone)


    React.useEffect(() => {
        dispatch(fetchGetAllRatings())
        dispatch(fetchGetRating())
    }, [])

    console.log(rating && rating)

    const setRating = (rating) => {
        if (rating) {
            let result = (rating?.correct + rating?.wrong) == rating?.completed ?
                (rating?.correct * 100) / rating?.completed
                : 0
            return rating?.completed == 0 ? 0 : (5 * result) / 100
        }
    }

    const userRating = rating && rating.data && rating.data[0]

    console.log('rating?.data && rating?.data[0]', rating?.data && rating?.data[0])

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

                    {isAuth && <Row>
                        <Col md={12} style={{
                            padding: '8px 68px'
                        }}>
                            <CircularProgressbar value={((userRating?.correct + userRating?.wrong) == userRating?.completed)
                                && userRating?.completed != 0 ?
                                (userRating?.correct * 100) / userRating?.completed : 0} styles={buildStyles({
                                    strokeLinecap: 'butt',
                                    textSize: '14px',
                                    pathTransitionDuration: 0.5,
                                    pathColor: `rgba(16, 34, 230, ${((userRating?.correct + userRating?.wrong) == userRating?.completed)
                                        && userRating?.completed != 0 ?
                                        (userRating?.correct * 100) / userRating?.completed : 0})`,
                                    textColor: '#FFFFFF',
                                    trailColor: '#d6d6d6',
                                    backgroundColor: '#3e98c7'
                                })} text={`${((userRating?.correct + userRating?.wrong) == userRating?.completed)
                                    && userRating?.completed != 0 ?
                                    (userRating?.correct * 100) / userRating?.completed : 0}%`} />
                        </Col>
                        <Col md={12} style={{
                            padding: '8px 38px',
                        }}>
                            <Rating initialValue={setRating(userRating)} size={36} readonly iconsCount={5} />
                        </Col>
                    </Row>}
                </Col>
                <Col md={2}></Col>


                <Col md={'10'} className="profile-main-panel">
                    <br />
                    <br />

                    <h2 style={{ color: '#C1D9F2' }}>{'Рейтинг'} <img src={top10} width={'100px'} alt="" /></h2>
                    <hr style={{ color: 'white' }} />

                    <Row style={{
                        backgroundColor: '#001845',
                        margin: '-1px -1px 0 -1px',
                        color: 'white',
                        padding: '24px 12px'
                    }}>
                        <Col md={1}>
                            №
                        </Col>
                        <Col md={3}>
                            Т.А.Ә
                        </Col>
                        <Col md={2}>
                            Поштаcы
                        </Col>
                        <Col md={2}>
                            Телефоны
                        </Col>
                        <Col md={2}>
                            Көрсеткіш
                        </Col>
                        <Col md={2}>
                            Рейтинг
                        </Col>
                    </Row>
                    {
                        rating?.items?.map((rating, i) => i < 10 && (
                            <Row style={{
                                backgroundColor: '#FFFFFF',
                                margin: '-1px -1px 0 -1px',
                                color: 'black',
                                padding: '24px 12px',
                                border: '1px solid black',
                                borderTopWidth: '1px'
                            }}>
                                <Col md={1}>
                                    {i + 1}
                                </Col>
                                <Col md={3}>
                                    {rating?.user?.fullname ? rating?.user?.fullname : 'Енгізілмеген'}
                                </Col>
                                <Col md={2}>
                                    {rating?.user?.email}
                                </Col>
                                <Col md={2}>
                                    {rating?.user?.phone ? rating?.user?.phone : 'Енгізілмеген'}
                                </Col>
                                <Col md={2} className="text-start">
                                    {((rating?.correct + rating?.wrong) == rating?.completed) && rating?.completed != 0 ?
                                        (rating?.correct * 100) / rating?.completed : 0}
                                </Col>
                                <Col md={2}>
                                    <Rating initialValue={
                                        setRating(rating)
                                    } size={36} readonly iconsCount={5} />
                                </Col>
                            </Row>
                        ))
                    }


                </Col>
            </Row>
        </Container >)
}

export default Ratings