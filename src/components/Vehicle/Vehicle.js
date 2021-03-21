import { Button } from 'react-bootstrap';
import React from 'react';
import { Card, Col } from 'react-bootstrap';
import './Vehicle.css'
import { Link } from 'react-router-dom';

const Vehicle = (props) => {
    const { name, img, vehicleType } = props.vehicle;
    return (
        <Col lg={3} md={6} className="justify-content-center d-flex">
            <Card className="vehicle m-2" style={{width: '18rem'}}>
                <Card.Img variant="top" src={img} style={{height: 150}} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Link to={`/destination/${vehicleType}`}><Button variant="primary">Book Now</Button></Link>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default Vehicle;