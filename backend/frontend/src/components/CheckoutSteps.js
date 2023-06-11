import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'


function CheckoutSteps({ step1, step2, step3, step4 }) {

    return (
        <Nav className='justify-content-center mb-4'>
            <Nav.Item>
                {step1 ? (
                    <Link to='/login'>
                        <Nav.Link>Accesso</Nav.Link>
                    </Link>
                ) : (
                        <Nav.Link disabled>Accesso</Nav.Link>
                    )}
            </Nav.Item>

            <Nav.Item>
                {step2 ? (
                    <Link to='/shipping'>
                        <Nav.Link>Spedizione</Nav.Link>
                    </Link>
                ) : (
                        <Nav.Link disabled>Spedizione</Nav.Link>
                    )}
            </Nav.Item>

            <Nav.Item>
                {step3 ? (
                    <Link to='/payment'>
                        <Nav.Link>Pagamento</Nav.Link>
                    </Link>
                ) : (
                        <Nav.Link disabled>Pagamento</Nav.Link>
                    )}
            </Nav.Item>

            <Nav.Item>
                {step4 ? (
                    <Link to='/placeorder'>
                        <Nav.Link>Conferma ordine</Nav.Link>
                    </Link>
                ) : (
                        <Nav.Link disabled>Conferma ordine</Nav.Link>
                    )}
            </Nav.Item>
        </Nav>
    )
}

export default CheckoutSteps