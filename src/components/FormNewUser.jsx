import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";

const FormNewUser = ({setShowNewUser, showNewUser}) => {

    const {register, handleSubmit, reset} = useForm()

    const submit = (data) => {
        axios.post("https://e-commerce-api-v2.academlo.tech/api/v1/users", data)
        .then(()=>{
            emptyForm()
            setShowNewUser(!showNewUser)
        })
        .catch(error=>console.error(error))
    }

    const emptyForm = () => {
        reset({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            phone: ""
        })
    }

    return (
        <>
        <Form onSubmit={handleSubmit(submit)} className="form-login">
        <h1>Sign Up</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Firts Name"
            {...register("firstName")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Last Name"
            {...register("lastName")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="E-mail"
            {...register("email")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="New Password"
            {...register("password")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Phone (10 characters)</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Phone Number"
            maxLength="10"
            {...register("phone")}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sing up
        </Button>
      </Form>
        </>
    );
}
 
export default FormNewUser;