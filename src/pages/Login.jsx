import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import FormNewUser from "../components/FormNewUser";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showNewUser, setShowNewUser] = useState(false)

  const navigate = useNavigate()

  const onSumit = (e) => {
    e.preventDefault();
    axios
      .post("https://e-commerce-api-v2.academlo.tech/api/v1/users/login", {
        email: email,
        password: pass,
      })
      .then((resp) => {
        setEmail("");
        setPass("");
        localStorage.setItem("token", resp.data.token)
        localStorage.setItem("name", resp.data.user.firstName)
        navigate("/")
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Username does not exist!",
        });
        console.error(error);
      });
  };

  return (
    <div className="login">
      { showNewUser ? 
        <FormNewUser setShowNewUser={setShowNewUser} showNewUser={showNewUser}/>
        :
        <>
      <Form onSubmit={(e) => onSumit(e)} className="form-login">
        <p className="text-center">Welcome! Enter your email and password to continue</p>
         <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPass(e.target.value)}
            value={pass}
          />
        </Form.Group>
        <Button className="btn__login" variant="primary" type="submit" onClick={()=>console.clear()}>
          Login
        </Button>
      </Form>
        </>
        }
        <div>
          <span>{showNewUser ? "Don't have an account?" : "Already have an account?"}</span><span className="btn btn-link" onClick={()=>setShowNewUser(!showNewUser)}>{showNewUser ? "Log in" : "Sign up"}</span>
        </div>
    </div>
  );
};

export default Login;
