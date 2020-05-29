import React, { useState , useEffect} from 'react';
import axios from 'axios';
import FormControl from 'react-bootstrap/FormControl';
import {
  Col,
  Input,
  Form,
  FormGroup,
  Label,
  Button }
from 'reactstrap';
import Signup from './Signup';
import { Error, Validate} from "./AuthForms";
import { useParams, Redirect, useHistory, Link } from 'react-router-dom';
import { useAuth } from "../Auth";
import './connexion.css';
import Right from '../svg/right.svg'

const Login = (props) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isValidate, setIsValidation] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();
  const [loading, setLoading] = useState(false);

  // const referer = props.location.state.referer || '/admin';

  // const handleInputChange = event => {
  //   event.persist();
  //   setInputs({
  //     ...inputs,
  //     [event.target.name]: event.target.value});
  // };

  const postLogin = async (e) => {
    e.preventDefault()
    setLoading(true);
    axios.post('/login', {
     username,
     password
    }).then(result => {
      if (result.status === 200) {
        setLoading(false);
        setAuthTokens(result.data);
        // setIsValidation(true);
        setLoggedIn(true);
        // props.history.push('/admin')
      } else {
        setLoading(false);
        setIsError(true);
      }
    }).catch(e => {
      setLoading(false);
      setIsError(true);
    });
  }

	
  //  if (redirectToReferrer) {
  //   return <Redirect to='/admin' />
  // }
  // if (!isLoggedIn) {
  //   return <Link to="/login">Vous êtes pas connecté</Link>;

  // }

  // if (isLoggedIn) {
  //     return <Redirect to="/admin/dashboard" />
  //   } else {
  //     return <Redirect to="/user/dashboard" />
  //   }
  


  //async function checkUser() {
  //   {
  //     const {user} = await setAuthTokens();
       
  //     if (user) {
  //       let username = !!(user.username);


  //     }
  //   }
  // }




  




return (
  <div className="letsconnectuser">
    <section className="loginIn">
      { isValidate &&<Validate>Redirection vers votre page</Validate> }

      { isError &&<Error>Votre mot de passe ou username est incorrect!</Error> }
      
      <h3 className="form-title">Connectez vous ici</h3>

      <Form className="form-ii-connect" >

        <FormGroup>
          <Col>
            <Input
              type="text"
              name="username"
              value={username}
              onChange={e => {
                setUsername(e.target.value);
              }}
              placeholder="Username"
              required
            />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col>
            <Input
              type="password"
              name="password"
              placeholder='Mot de passe'
              value={password}
              onChange={e => {
              setPassword(e.target.value);
            }}
              required
          /> 
          </Col>
        </FormGroup>

        <div className="submit_newbook">
          <Button
            onClick={postLogin}
            className="waves-effect waves-light btn"
            value={loading ? 'Loading...' : 'Login'} 
            disabled={loading} 
          >
            Connexion
          </Button>
        </div>

      </Form>

      <small className='sideconnect'>
        <Link to ='/login'>
          <img className="cursor-right more" src={Right} alt="logo" />
          Vous avez pas encore pris de chambre chez nous ? Venez ici
        </Link> 
      </small>
    </section>

   <hr className="vertical"/>

    <section className="signUp">
      <Signup/>
    </section>
    
  </div>
  
  )
}
export default Login;
