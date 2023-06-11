import React, {useState,useEffect} from 'react'
import { Link, useNavigate,useLocation } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { FormContainer  } from '../components/FormContainer'
import { getUserDetails, updateUserProfile } from '../actions/userAction'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { listMyOrders } from '../actions/orderActions'

function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const success = userUpdateProfile?.success || false;


  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      if (!user || !user.name || success || userInfo._id !== user._id) {
        dispatch({type: USER_UPDATE_PROFILE_RESET})
        dispatch(getUserDetails('profile'));
        dispatch(listMyOrders())
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, navigate, userInfo, user, success]);

  // Verifica se i dati dell'utente sono ancora in caricamento
  if (loading) {
    return <Loader />;
  }

  const submitHandler = (e) => {
    e.preventDefault()

    if (password != confirmPassword) {
        setMessage('La password non corrisponde')
    } else {
        dispatch(updateUserProfile({
            'id': user._id,
            'name': name,
            'email': email,
            'password': password
        }))
        setMessage('')
        dispatch(getUserDetails('name'));

    }
}

  return (
    <Row>
      <Col md={3}>
        <h2>Profilo</h2>

        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Nome e cognome</Form.Label>
            <Form.Control
              required
              type="name"
              placeholder="Inserisci nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Indirizzo Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Inserisci Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Inserisci password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="passwordConfirm">
            <Form.Label>Conferma Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Conferma password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="primary" style={{ backgroundColor: '#FFA500' }}>
            Aggiorna profilo
          </Button>
        </Form>
      </Col>

    </Row>
  );
}

export default ProfileScreen;