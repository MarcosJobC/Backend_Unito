import React, {useState,useEffect} from 'react'
import { Link, useNavigate, useLocation  } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { FormContainer  } from '../components/FormContainer'
import { login } from '../actions/userAction'



function LoginScreen() {
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
      };
      

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const userLogin = useSelector(state => state.userLogin)
  const {error, loading, userInfo} = userLogin

  useEffect(()=> {
    if(userInfo){
        navigate(redirect);
    }
  },[navigate, userInfo, redirect])

  return (
    <FormContainer>
        <h1> Accedi</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
                <Form.Label>Indirizzo Email</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Inserisci Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Inserisci password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' style={{ backgroundColor: '#FFA500', color: 'white', fontWeight: 'bold' }}>
                Entra
            </Button>



        </Form>

        <Row className='py-3'>
            <Col>
                Nuovo cliente?  
                <Link to="/register">
                    Registrati
                </Link>

            </Col>
        </Row>

    </FormContainer>
  );
}

export default LoginScreen;
