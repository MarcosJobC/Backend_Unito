import React, {useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { FormContainer  } from '../components/FormContainer'
import  CheckoutSteps  from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

function ShippingScreen() {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart;
    
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [address, setAddress] = useState(shippingAddress?.address || '');
    const [city, setCity] = useState(shippingAddress?.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
    const [country, setCountry] = useState(shippingAddress?.country || '');


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        navigate('/payment')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>
                Dati di spedizione
            </h1>
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='address'>
                    <Form.Label>Indirizzo</Form.Label>
                    <Form.Control
                    required
                        type='text'
                        placeholder='Inserisci indirizzo'
                        value={address ? address : ''}
                        onChange={(e) => setAddress(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='city'>
                    <Form.Label>Città</Form.Label>
                    <Form.Control
                    required
                        type='text'
                        placeholder='Inserisci città'
                        value={city ? city : ''}
                        onChange={(e) => setCity(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode'>
                    <Form.Label>CAP</Form.Label>
                    <Form.Control
                    required
                        type='text'
                        placeholder='Inserisci codice di avviamento postale'
                        value={postalCode ? postalCode : ''}
                        onChange={(e) => setPostalCode(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='country'>
                    <Form.Label>Regione</Form.Label>
                    <Form.Control
                    required
                        type='text'
                        placeholder='Inserisci regione'
                        value={country ? country : ''}
                        onChange={(e) => setCountry(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' style={{ backgroundColor: '#FFA500' }}>
                    Procedi al pagamento
                </Button>



            </Form>

        </FormContainer>
    );
}

export default ShippingScreen;