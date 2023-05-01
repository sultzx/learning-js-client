
import { Container, Row, Col, Nav, Navbar, Button } from "react-bootstrap"
import { Code } from 'react-bootstrap-icons'
import JS5 from '../images/JS5.png'
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsAuth } from "../redux/slices/user";

const Navigation = () => {

  const isAuth = useSelector(selectIsAuth);

  const dispatch = useDispatch();

  const {data} = useSelector((state) => state.user);

  const onClickLogout = () => {
    if (window.confirm("Жүйеден шығасыз ба?")) dispatch(logout());
    window.localStorage.removeItem("token");
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="shadow" variant="dark" fixed="top" style={{
      fontWeight: '600',
      fontSize: '18px',
      backgroundColor: '#013369',
      color: '#39ace7',
      height: '80px'
    }}>

      <Container fluid>
        <Navbar.Brand href="/" style={{
          fontSize: '24px'
        }}>
          &nbsp;<span style={{color: 'yellow'}}>JS</span> үйрену <Code color="yellow" size={'30px'}/>
          {/* <img src={JS5}  height={'auto'} alt="" style={{
            maxWidth: '250px',
            borderRight: '1px solid white'
          }} /> */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" style={{
          backgroundColor: '#013369'
        }}>
          <Nav className="me-auto" >
            <Nav.Link href="/profile">Жеке профиль</Nav.Link>
            <Nav.Link href="/tutorial">Оқулық</Nav.Link>
            {/* <Nav.Link href="/">Интерактив</Nav.Link> */}
            <Nav.Link href="/lessons">Тапсырмалар</Nav.Link>
            <Nav.Link href="/">Online Bootcamp</Nav.Link>
          </Nav>
          {
            isAuth ? 
            <Nav>
              <Nav.Link>{data?.email}</Nav.Link>
            <Nav.Link
              className="signup-btn text-center"
              style={{
                padding: 'auto 20px',
                margin: 'auto 18px'
              }}
              eventKey={2} onClick={() => {
                onClickLogout()
              }}>
                <div style={{margin: 'auto 14px'}}>Шығу</div>
            </Nav.Link>
          </Nav>
            :
            <Nav>
            <Nav.Link href="/login">Кіру</Nav.Link>
            <Nav.Link
              className="signup-btn text-center"
              style={{
                padding: 'auto 20px',
                margin: 'auto 18px'
              }}
              eventKey={2} href="/registration">
                <div style={{margin: 'auto 14px'}}>Тіркелу</div>
              
            </Nav.Link>
          </Nav>
          }

        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation