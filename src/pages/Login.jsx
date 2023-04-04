import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Login = () => {
    return (
        <div className="login">
        <Form className="form-login" >
          <h1>Bien venido a la tienda </h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
           
          </Form.Group>
  ​
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
}
 
export default Login;