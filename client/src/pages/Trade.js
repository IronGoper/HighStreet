import React, { useContext, useState } from 'react'
import Web3 from 'web3';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardDeck from 'react-bootstrap/CardDeck';
import Carousel from 'react-bootstrap/Carousel';
import Tilt from 'react-tilt';
import {TradeCard} from '../components/TradeCard';

import { ProductContext} from "../contexts/ProductState";



export const Trade = () => {
    
    const [active, setActive] = useState("none"); 
    console.log("this is active", active);
    const cart = active !== "none" ? (
        <TradeCard  active={active} style={{background: "black", opacity:"1", zIndex:"10", position: "fixed", top:"0px",width: "100vw", height:"100vh"}}></TradeCard> 

    ) : (
        <TradeCard style={{display:"none"}} /> 
    )

    const { products } = useContext(ProductContext)
    console.log("here are the current states", products)
    return (
        <div>
            {cart}
            <Jumbotron className="cardJumbo" style={{ margin: "0", background: '#CCDAF5', height:"100vh"}} fluid>
                <Carousel fade interval={null} indicators={false}>
                    {products.map(product => (
                        <Carousel.Item style={{ width: '25rem' }} >
                            <Container style={{ margin: "auto" }}>
                                <Row>
                                    <Col>
                                        <Tilt
                                            style={{ background: '#000', borderRadius: '8px' }}
                                            options={{ scale: 1.01, max: 10, glare: true, 'max-glare': 1, speed: 1000 }}
                                        >
                                        <Card className="bg-dark text-white" style={{ border: "none" }}>
                                            <Card.Img src={product.img}></Card.Img>
                                            <Card.ImgOverlay>
                                                <Card.Header style={{ padding: "0", backgroundColor: 'none', border: '0' }}><strong>{product.name}</strong></Card.Header>
                                                <Card.Title>{product.ticker}</Card.Title>
                                                <br></br>  <br></br>  <br></br>  <br></br><br></br> <br></br> <br></br>  <br></br>  <br></br> <br></br><br></br>   <br></br>
                                                <Card.Text style={{ margin: "0" }}><h3>{product.price}&nbsp;USD </h3></Card.Text>
                                                <Card.Footer style={{ padding: "0", backgroundColor: 'none', border: '0' }}>{product.available}&nbsp;out of {product.supply}&nbsp;stocks available</Card.Footer>
                                            </Card.ImgOverlay>
                                        </Card>
                                        </Tilt>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <div className="curvyButton">
                                            <Button variant="primary" style={{ background: "#4A90E2", width: "23rem", marginTop: "8px", marginBottom: "8px" }} onClick={
                                                ()=> setActive(product.name)
                                            }><strong>Buy</strong></Button> {'    '}
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <div className="curvyButton">
                                            <Button variant="secondary" style={{ background: "A0A3A6", width: "10.6rem" }}><strong>Sell</strong></Button> {''}
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="curvyButton">
                                            <Button variant="secondary" style={{ background: "A0A3A6", width: "10.6rem" }}><strong>Redeem</strong></Button> {''}
                                        </div>
                                    </Col>
                                </Row>
                            </Container>

                        </Carousel.Item>

                    )


                    )}

                </Carousel>
            </Jumbotron>
        </div>
    )
}
