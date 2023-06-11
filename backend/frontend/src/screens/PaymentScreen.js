import React, {useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Col} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { FormContainer  } from '../components/FormContainer'
import  CheckoutSteps  from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'
import { CART_SAVE_PAYMENT_METHOD } from '../constants/cartConstants';

function PaymentScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart;

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    if (!shippingAddress || !shippingAddress.address) {
        navigate('/shipping');
      }
      

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />

            <Form onSubmit={submitHandler}>
                <Form.Group>
                    
                    <Form.Group>
                        <Form.Label as='legend' >Seleziona metodo di pagamento</Form.Label>
                        <Col>
                            <Form.Check
                                type='radio'
                                label='PayPal o Carta di Credito'
                                id='paypal'
                                name='paymentMethod'
                                checked
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            >

                            </Form.Check>
                        </Col>
                    </Form.Group>


                </Form.Group>

                <Button type='submit' variant='primary' style={{ backgroundColor: '#FFA500' }}>
                    Continua
                </Button>
            </Form>
        
        </FormContainer>
    )
}

export default PaymentScreen
