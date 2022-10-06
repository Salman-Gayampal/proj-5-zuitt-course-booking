import { Fragment, useState, useEffect, useContext } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Navigate, useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';


export default function Register() {

    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    // STATE HOOKS
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const [isActive, setIsActive] = useState(false);

    // console.log(email);
    // console.log(password);
    // console.log(password2);

    function registerUser(e) {

        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/users/checkEmail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email
            })

        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data) {
                    Swal.fire({
                        title: "Duplicate email found",
                        icon: "error",
                        text: "Please provide a different email."
                    })
                } else {
                    fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            firstName: firstName,
                            lastName: lastName,
                            mobileNo: mobileNo,
                            email: email,
                            password: password
                        })
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);

                            if (data === true) {
                                Swal.fire({
                                    title: 'Registration Successful!',
                                    icon: 'success',
                                    text: 'Welcome to Zuitt!'
                                })

                                // clear input fields
                                setFirstName('');
                                setLastName('');
                                setMobileNo('');
                                setEmail('');
                                setPassword1('');
                                setPassword2('');

                                navigate('/login')
                            } else {
                                Swal.fire({
                                    title: 'Registration failed',
                                    icon: 'error',
                                    text: 'Something went wrong, try again'
                                })
                            }
                        })
                }
            })
    };

    useEffect(() => {

        if ((firstName !== '' && lastName !== '' && mobileNo.length === 11 && email !== '' && password !== '' && password2 !== '') && (password === password2)) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [firstName, lastName, mobileNo, email, password, password2]);

    return (
        (user.id !== null) ?
            <Navigate to="/courses" />
            :
            <Form onSubmit={(e) => registerUser(e)}>

                <h1>Create an account</h1>
                <Form.Group className="mb-3" controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={firstName}
                        onChange={(e) => { setFirstName(e.target.value) }}
                        placeholder="Enter your First Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={lastName}
                        onChange={(e) => { setLastName(e.target.value) }}
                        placeholder="Enter your Last Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="userEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        placeholder="Enter Your Email Address" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="mobileNo">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control
                        type="text"
                        value={mobileNo}
                        onChange={(e) => { setMobileNo(e.target.value) }}
                        placeholder="+630000000000" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => { setPassword1(e.target.value) }}
                        placeholder="Enter Your Password" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password2">
                    <Form.Label>Verify Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password2}
                        onChange={(e) => { setPassword2(e.target.value) }}
                        placeholder="Verify Your Password" />
                </Form.Group>

                {isActive ?
                    <Button variant="primary" type="submit" id="submitBtn">
                        Submit
                    </Button>
                    :
                    <Button variant="primary" type="submit" id="submitBtn" disabled>
                        Submit
                    </Button>
                }

            </Form>




    )
};