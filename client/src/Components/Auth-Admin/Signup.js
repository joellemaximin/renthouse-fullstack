import React, { useState , useEffect} from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import {
  Col,
  Input,
  Form,
  FormGroup,
  Label,
  Button}
from 'reactstrap';
import { Error } from "./AuthForms";
import { useAuth } from "../Auth";
import './connexion.css';

const Signup = (props) => {
  const [isSignup, setSignUp] = useState(false);
  const [isError, setIsError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { setAuthTokens } = useAuth();
  // // const history = useHistory()

  const signUpUser = async (e) => {
    e.preventDefault()
    axios.post('/signup',{
     username, password, email
    }).then(result => {
      if (result.status === 200) {
        setAuthTokens(result.data);
        //console.log(result.data)
        setSignUp(true);
        props.history.push('/')
      } else {
        setIsError(true);
      }
    }).catch(e => {
      setIsError(true);
    });
  }

  // if (isSignup) {
  //   return  <Redirect to='/login' />;
  // } 
  // if (username === true) {
  //   return Error
  // }

  // if (!value.username) {
  //   Error.username = 'Username is required';
  // }
  // return Error;

  return (
    <div>
    <h3 className="form-title">S'enregistrer ici</h3>
   
   { isError &&<Error>Ce username est déjà pris!</Error> }

    <Form className="form-ii-connect" > 
      <FormGroup>
        <Col >
          <Input
            type="text"
            // value={inputs.username || ""}
            // onChange={handleInputChange}
            placeholder='Username'
            value={username}
            onChange={e => {
              setUsername(e.target.value);
            }}
            name="username"
            required
        />
        </Col>
      </FormGroup>

      <FormGroup>
        <Col >
          <Input
            type="email"
            // value={inputs.username || ""}
            // onChange={handleInputChange}
            placeholder='Email'
            value={email}
            onChange={e => {
              setEmail(e.target.value);
            }}
            name="email"
            required
        />
        </Col>
      </FormGroup>

      <FormGroup>
        <Col>
          <Input
            type="password"
            // value={inputs.password || ""}
            // onChange={handleInputChange}
            placeholder='Mot de passe'
            value={password}
            onChange={e => {
            setPassword(e.target.value);
          }}
            name="password"
            required
        /> 
        </Col>
      </FormGroup>

      <div className="submit_newbook">
        <Button
          onClick={signUpUser}
          className="waves-effect waves-light btn"
        >
          S'enregistrer
        </Button>
      </div>
       
    </Form>
   
    <small className='sideconnect'>
      <Link to ='/login'> Déjà un compte chez nous ? Connectez vous </Link> 
    </small>

  </div>
  );
}

export default Signup;