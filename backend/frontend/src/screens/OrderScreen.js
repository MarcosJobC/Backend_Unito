import React, { useState, useEffect } from 'react';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails, payOrder, deliverOrder  } from '../actions/orderActions';
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET  } from '../constants/orderConstants'

function OrderScreen(match) {

    const { id: orderId } = useParams();
    const [isPaid, setIsPaid] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const orderDetails = useSelector(state => state.orderDetails);
    const { order, error, loading } = orderDetails;

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    if(!loading && !error){
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }
    
    useEffect(() => {
        if (!userInfo) {
          navigate('/login');
        }
      
        if (!order || order._id !== Number(orderId) || successDeliver) {
          dispatch({ type: ORDER_PAY_RESET }); // Reset the order payment state
          dispatch({ type: ORDER_DELIVER_RESET });
          dispatch(getOrderDetails(orderId));
        } else {
          setIsPaid(order.isPaid);
        }
    }, [dispatch, order, orderId, successDeliver, userInfo]);
      
      
      
          
    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }


    const payHandler = () => {
        dispatch(payOrder(order._id));
    };
      
    useEffect(() => {
        if (successPay) {
            dispatch(getOrderDetails(orderId));
        }
    }, [dispatch, orderId, successPay]);


    return loading ? (
        <Loader/>
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
            <div>
                <h1>Ordine numero: {order._id}</h1>
                <Row>
                    <Col md={8}>
                        <ListGroup variant='flush'>

                            <ListGroup.Item>
                                <h2>Articoli:</h2>
                                {order.orderItems.length === 0 ? <Message variant='info'>
                                    Il tuo carrello è vuoto
                                </Message> : (
                                        <ListGroup variant='flush'>
                                            {order.orderItems.map((item, index) => (
                                                <ListGroup.Item key={index}>
                                                    <Row>
                                                        <Col md={1}>
                                                            <Image src={item.image} alt={item.name} fluid rounded />
                                                        </Col>

                                                        <Col>
                                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                        </Col>

                                                        <Col md={4}>
                                                            {item.qty} X ${item.price} = €{(item.qty * item.price).toFixed(2)}
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    )}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Metodo di pagamento</h2>
                                <p>
                                    {order.paymentMethod}
                                </p>

                                {order.isPaid ? (
                                    <Message variant='success'>Pagamento confermato il:  {order.paidAt}</Message>
                                ):(
                                        <Message variant='warning'>Pagamento in attesa di conferma...</Message>
                                    )}

                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Spedizione</h2>
                                <p><strong>Nominativo: </strong>{order.user.name}</p>
                                <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                                <p>
                                    <strong>Indirizzo di spedizione: </strong>
                                    {order.shippingAddress.address},  {order.shippingAddress.city},
                                    {'  '}
                                    {order.shippingAddress.postalCode},
                                    {'  '}
                                    {order.shippingAddress.country},
                                </p>
                                {order.isDelivered ? (
                                    <Message variant='success'>Ordine consegnato il: {order.deliveredAt}</Message>
                                ):(
                                        <Message variant='warning'>Ordine non ancora consegnato</Message>
                                    )}
                            </ListGroup.Item>

                        </ListGroup>

                    </Col>

                    <Col md={4}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>Riepilogo ordine</h2>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Articoli:</Col>
                                        <Col>${order.itemsPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Spedizione:</Col>
                                        <Col>€{order.shippingPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tasse:</Col>
                                        <Col>€{order.taxPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Totale:</Col>
                                        <Col>€{order.totalPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                            </ListGroup>

                            <Row>
                                <Col md={6} className="text-left">
                                    {loadingDeliver && <Loader />}
                                    {userInfo && userInfo.isAdmin && !isPaid && !order.isDelivered && (
                                    <ListGroup.Item>
                                        <Button
                                            type='button'
                                            className='btn btn-block'
                                            onClick={payHandler}
                                            style={{ backgroundColor: '#FFA500', borderColor: '#FFA500', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                        >
                                            Contrassegna come pagato
                                        </Button>
                                    </ListGroup.Item>
                                    )}
                                </Col>
                            
                                <Col md={6} className="text-right">
                                {loadingDeliver && <Loader />}
                                {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                    <ListGroup.Item>
                                        <Button
                                            type='button'
                                            className='btn btn-block'
                                            onClick={deliverHandler}
                                            style={{ backgroundColor: '#FFA500', borderColor: '#FFA500', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                        >
                                            Contrassegna come consegnato
                                        </Button>
                                    </ListGroup.Item>
                                )}
                                </Col>
                            </Row>

                            
                        </Card>
                    </Col>
                </Row>
            </div>
        )
}

export default OrderScreen;
