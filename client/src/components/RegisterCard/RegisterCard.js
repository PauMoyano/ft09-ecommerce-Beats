import React, { useState } from 'react';
import "./RegisterCard.css"
import axios from 'axios';
import { useHistory } from "react-router-dom";
import {serverUrl} from '../../auxiliar/variables';

const RegisterCard = () => {
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        username: "",
        password:"",
        confirmPassword:"",
        email:"",
    });

    const handleInputChange =(e) => {
        setInput({
             ...input,
             [e.target.name]: e.target.value
             
        });

        setErrors(validate({
             ...input,
             [e.target.name]: e.target.value
        }));
        
      };
      

    const validate = (input) => {
        let errors = {};
        if (!input.username) {
            errors.username = 'Username is required';
        } else if (!/\S+@\S+\.\S+/.test(input.username)) {
             errors.username = 'Username is invalid';
        }
        if (input.password && input.password === 'invalid password') {
             errors.password = 'Password is required';
        } else if (!/(?=.*[0-9])/.test(input.password)) {
             errors.password = 'Password is invalid';
        }
        return errors;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        let newUser = {
            name:input.username,
             password: input.password,
             email: input.email
            }
       const user = await axios.post(`${serverUrl}/users`, newUser)
       .then((user)=>{
           if(user.data.msg === 'email aready exist'){
            setErrors({
                email:'email aready exist'
            })
           
           }
           if(user.data.msg === 'invalid password'){
            setErrors({
                password:'invalid password'
            })
           }

           if(user.data.msg === 'user already exist'){
                console.log("redrect")
                
                return history.push('/home')
               
            }
           
       })   
       .catch((error)=>{
            console.log(error)
        })

    //    localStorage.setItem('user', JSON.stringify(user.data))

  
    }

    return(
        <div className="--RegisterCard">
            <h2>Sign up</h2>
            <form onSubmit={handleSubmit} className="--RegisterCard-form">

                <div className="--RegisterCard-form-email">
                    <p className='--RegisterCard-title'>Email</p>
                    <input className="--RegisterCard-form-input" 
                        type="text" 
                        placeholder="Type your email"
                        name="email" 
                        onChange={handleInputChange} 
                        value={input.email}/>
                    
                    {errors.email && errors.email === 'email aready exist'
                        ?
                        (
                        <p className="danger">{errors.email}</p> 
                        )
                        :
                        (
                        <p>  </p>
                        )
                     }
                </div>

                <div className="--RegisterCard-form-username">
                    <p className='--RegisterCard-title'>Username</p>
                    <input className="--RegisterCard-form-input" 
                        type="text" 
                        placeholder="Set a username for you profile"
                        name="username" 
                        onChange={handleInputChange} 
                        value={input.username}/>
                </div>
                <div className="--RegisterCard-form-password">
                    <p className='--RegisterCard-title'>Password</p>
                    <input className="--RegisterCard-form-input" 
                        type="password" 
                        placeholder="Type your password"
                        name="password" 
                        onChange={handleInputChange} 
                        value={input.password}/>

                    {errors.password && errors.password === 'invalid password'
                    ?
                    (<p className="danger">{errors.password}</p> ):
                    (
                      <p>  </p>
                    )
                     }
                    
                </div>
                <div className="--RegisterCard-form-password-repeat">
                    <p className='--RegisterCard-title'>Confirm password</p>
                    <input className="--RegisterCard-form-input" 
                        type="password" 
                        placeholder="Type your password again"
                        name="confirmPassword" 
                        onChange={handleInputChange} 
                        value={input.confirmPassword}/>
                </div>
                <button type="submit">Sign up</button>
            </form>
        </div>
    )
}

export default RegisterCard;