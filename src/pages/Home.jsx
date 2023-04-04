import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsThunk, filterCategoriesThunk, filterHeadLineThunk } from '../store/slices/products.slice';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {

    const dispatch = useDispatch()
    const [categories, setCategories] = useState([])
    const [inputValue, setInputValue] = useState("")

    useEffect( ()=>{
        dispatch(getProductsThunk())

        axios.get("https://e-commerce-api-v2.academlo.tech/api/v1/categories")
        .then(resp=>setCategories(resp.data))
        .catch(error=>console.error(error))
    },[])

    const products = useSelector( state => state.products)

    /* Que el buton despache el thunk de filtrado */ 
    return (
        <div>
            <Container>
                <Row>
                    {
                        categories.map( category => (
                            <Col key={category.id}>
                                <Button onClick={()=>dispatch(filterCategoriesThunk(category.id))}>{category.name}</Button>
                            </Col>
                        ))
                    }
                    <Col>
                        <Button onClick={()=>dispatch(getProductsThunk())} className='w-100'>All</Button>
                    </Col>
                </Row>
                <Row className='py-3'>
                    <Col>
                        <InputGroup className="mb-3">
                            <Form.Control
                            placeholder="Buscar productos"
                            aria-label="Products Name"
                            aria-describedby="basic-addon2"
                            value={inputValue}
                            onChange={(e)=>setInputValue(e.target.value)}
                            />
                            <Button variant="outline-primary" id="button-addon2" onClick={()=>dispatch(filterHeadLineThunk(inputValue))}>
                                Button
                            </Button>
                        </InputGroup>
                    </Col>
                </Row>
                <Row xs={1} md={2} lg={3} className="py-1">
                    {
                        products.map( product =>{
                            return(
                                <Col key={product?.id} className='my-1'>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" style={{ height: '200', objectFit:"cover" }} src={product.images?.[0].url} />
                                    <Card.Body>
                                        <Card.Title>{product.title}</Card.Title>
                                        <Card.Text>
                                        {product?.price}
                                        </Card.Text>
                                        <Card.Text>
                                        {product?.brand}
                                        </Card.Text>
                                        <Button as={ Link } to={`/product/${product.id}`} variant="primary">Go somewhere</Button>
                                    </Card.Body>
                                </Card>
                                </Col>
                            )
                        })
                    }
                </Row>
            </Container>
        </div>
    );
}
 
export default Home;