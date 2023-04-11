import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
/* import { useDispatch } from "react-redux";
import { setToken } from "../store/slices/token.slice"; */
import { useNavigate } from "react-router-dom";

const Login = () => {
  /* const dispatch = useDispatch(); */
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate()

  const onSumit = (e) => {
    e.preventDefault();
    axios
      .post("https://e-commerce-api-v2.academlo.tech/api/v1/users/login", {
        email: email,
        password: pass,
      })
      .then((resp) => {
        /* dispatch(setToken(resp.data)); */
        setEmail("");
        setPass("");
        localStorage.setItem("token", resp.data.token)
        navigate("/")
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Usuario no existe!",
        });
        console.error(error);
      });
  };

  return (
    <div className="login">
      <Form onSubmit={(e) => onSumit(e)} className="form-login">
        <h1>Bien venido a la tienda </h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </Form.Group>
        {/* Este es el cambio */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPass(e.target.value)}
            value={pass}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Login;
