import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProductDetails } from '../actions/productActions';

function ProductScreen() {
    const [qty, setQty] = useState(1);

    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();

    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;

    useEffect(() => {
        dispatch(listProductDetails(id));
        console.log(qty);
    }, [dispatch, id]);

    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`);
    };

    return (
        <div>
            <Link to="/" className="btn btn-light my-3">
                Indietro
            </Link>
            {loading ? (
                <Loader />
                    ) : error ? (
                        <Message variant='danger'>{error}</Message>
                    ) : (
                        <Row>
                            <Col md={6}>
                                <Image src={product.image} alt={product.name} fluid />
                            </Col>
                            <Col md={3}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <h3>{product.name}</h3>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Rating
                                            value={product.rating}
                                            text={`${product.numReviews} reviews`}
                                            color={'#f8e825'}
                                        />
                                    </ListGroup.Item>
                                    <ListGroup.Item>Prezzo: €{product.price}</ListGroup.Item>
                                    <ListGroup.Item>
                                        Descrizione: {product.description}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={3}>
                                <Card>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Prezzo:</Col>
                                                <Col>
                                                    <strong>€ {product.price}</strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Disponibilità:</Col>
                                                <Col>
                                                    {product.countInStock > 0
                                                        ? 'In magazzino'
                                                        : 'Non disponibile'}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        {product.countInStock > 0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col> Quantità </Col>
                                                    <Col xs='auto ' className='my-1'>
                                                        <Form.Control
                                                            as="select"
                                                            value={qty}
                                                            onChange={(e) => setQty(e.target.value)}
                                                        >
                                                            {
                                                                [...Array(product.countInStock).keys()].map((x) => (
                                                                    <option key={x+1} value={x+1}>
                                                                        {x+1}
                                                                    </option>
                                                                ))
                                                            }
                                                        </Form.Control>

                                                     </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )}



                                        <ListGroup.Item>
                                            <Button
                                                onClick={addToCartHandler}
                                                className="btn-block"
                                                disabled={product.countInStock === 0}
                                                type="button"
                                                style={{ backgroundColor: '#FFA500' }}
                                            >
                                                Aggiungi al carrello
                                            </Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                    )}
        </div>
    );
}

export default ProductScreen;
