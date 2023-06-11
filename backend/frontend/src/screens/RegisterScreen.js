import React, {useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { FormContainer  } from '../components/FormContainer'
import { register } from '../actions/userAction'


function RegisterScreen({ location }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault()

        if (password != confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, password))
        }

    }

  const redirect = location?.search ? location.search.split('=')[1] : '/';

  const userRegister = useSelector(state => state.userRegister)
  const { error, loading, userInfo } = userRegister

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);
    


  return (
    <FormContainer>
        <h1> Registrati </h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandler}>

            <Form.Group controlId='name'>
                <Form.Label>Nome</Form.Label>
                <Form.Control
                required
                    type='name'
                    placeholder='Inserisci nome'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
                <Form.Label>Indirizzo Email</Form.Label>
                <Form.Control
                    required
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
                    required
                    type='password'
                    placeholder='Inserisci password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='passwordConfirm'>
                <Form.Label>Conferma Password</Form.Label>
                <Form.Control
                    required
                    type='password'
                    placeholder='Conferma password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' style={{ backgroundColor: '#FFA500' }}>
                Registrati
            </Button>

        </Form>

        <Row className='py-3'>
            <Col>
                Hai già un account? 
                <Link
                    to={redirect ? `/login?redirect=${redirect}`: '/login'}>
                    Accedi
                </Link>
            </Col>
        </Row>
      
    </FormContainer>
  )
}

export default RegisterScreen
