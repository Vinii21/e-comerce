import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ProductDetail = () => {

    const { id } = useParams()
    const [product, setProduct] = useState({})

    useEffect(()=>{
        axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
        .then(resp=>setProduct(resp.data))
        .catch(error=>console.log(error))
    },[])

    return (
        <Row>
            <Col className='my-1'>
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
                                        {/* <Button as={ Link } to={`/product/${product.id}`} variant="primary">Go somewhere</Button> */}
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}
 
export default ProductDetail;