import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Vehicle from '../Vehicle/Vehicle';
import data from '../../data/data.json'
import bg from '../../images/Bg.png'

const Home = () => {
    const [vehicles, setVehicles] = useState(data)

    return (
        <Container className="mt-5">
            <h1 className="text-center text-muted mb-3">Select Vehicle</h1>
            <Row>
                {
                    vehicles.map(vehicle => <Vehicle vehicle={vehicle}></Vehicle>)
                }
            </Row>
        </Container>
    );
};

export default Home;