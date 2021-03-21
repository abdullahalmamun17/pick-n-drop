import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useParams } from 'react-router';
import data from '../../data/data.json';
import { BsFillPeopleFill } from 'react-icons/bs';
import Maps from '../Maps/Maps';


const Destination = () => {
    const { register, handleSubmit, errors } = useForm();
    const { vehicleType } = useParams()
    const [destination, setDestination] = useState({})
    const [vehicles, setVehicles] = useState(data)
    const vehicle = vehicles.find(vehicle => vehicle.vehicleType === vehicleType)

    const onSubmit = data => {
        setDestination(data)
        console.log(data);
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col lg={4} className="mb-4">
                    <div style={{ width: '100%', margin: '0 auto'}} className="p-3 bg-light rounded h-100">
                        {
                            !destination.pickFrom
                                ? <form className="mb-3" onSubmit={handleSubmit(onSubmit)}>
                                    <h2 className="text-center p-2 border-bottom mb-3 rounded text-muted">Find Your Trip</h2>
                                    <span className="d-block">Pick From</span>
                                    <input name="pickFrom" className="w-100 mb-4 p-2" ref={register({ required: true })} />
                                    {errors.pickFrom && <span style={{color: 'red'}}>Pick From is required</span>}
                                    <span className="d-block">Drop To</span>
                                    <input name="dropTo" className="w-100 mb-4 p-2" ref={register({ required: true })} />
                                    {errors.dropTo && <span style={{color: 'red'}}>Drop To is required</span>}
                                    <br />
                                    <input className="w-100 btn btn-primary" type="submit" value="Search" />
                                </form>
                                : <div className="pb-3">
                                    <div style={{ backgroundColor: 'orangered', borderRadius: '10px', textAlign: 'center', color: 'white', padding: '10px' }}>
                                        <h4>{destination.pickFrom}</h4>
                                        <h5>to</h5>
                                        <h4>{destination.dropTo}</h4>
                                    </div>
                                    <h2 className="text-center p-2 mt-5 mb-3 border-top border-bottom rounded text-muted">Select Your Trip</h2>
                                    <div className="d-flex justify-content-between align-items-center p-2 bg-primary mt-2 rounded text-light" style={{ cursor: 'pointer' }}>
                                        <img style={{ height: '50px', borderRadius: '5px' }} src={vehicle.img} alt="" />
                                        <h3 className="mx-2">{vehicle.name}</h3>
                                        <h4><BsFillPeopleFill /> 4</h4>
                                        <h5>$150</h5>
                                    </div>
                                </div>
                        }
                    </div>
                </Col>
                <Col md={8}>
                    <Maps></Maps>
                </Col>
            </Row>
        </Container>
    );
};

export default Destination;