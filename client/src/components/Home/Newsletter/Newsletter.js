import axios from 'axios';
import React, { useState } from 'react';
import swal from 'sweetalert';
import './newsletter.scss';
import emailjs from 'emailjs-com';

const Newsletter = ()=>{

    const [input, setInput] = useState({
        email: "",
        name: "",
        code: "couponTwo"
        
    })

    const handleInputChange = async (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        console.log(input)
        e.preventDefault()
        e.target.reset()
        await axios.post('http://localhost:3001/newsletter', input)
            .then(async (text) => {
                console.log(text)
                if(text.data === 'You are already suscribed')
                {
                    await emailjs.send('service_dltd1f5', 'template_0mfi7c2', input, 'user_xlZ5TJyGl03KbieKyEwWL')
                    .then((result) => {
                        console.log(result.text);
                    }, (error) => {
                        console.log(error.text);
                    })
                    return swal('You are already suscribed')
                    
                }
                return swal('Succesfully subscribed to the Newsletter')
            })
    }

    return (
        <div className='--Newsletter-main-head'>
            <div className='--Newsletter-main'>
                
                <form className="--Newsletter-form" onSubmit={handleSubmit}>
                <h2>Join our monthly Newsletter and get 10% off your next Purchase!</h2>
                    <label className='name'></label>
                        <input 
                            placeholder='Type your Name'
                            className="--RPInput" 
                            onChange={handleInputChange} 
                            type="name" 
                            name="name" 
                            required/>
                    <label className='name'></label>
                        <input 
                            placeholder='Type your Email'
                            className="--RPInput" 
                            onChange={handleInputChange} 
                            type="email" 
                            name="email" 
                            required/>
                    <div className="--NewsletterButton">
                        <button type='submit'>Subscribe</button>
                    </div>
                </form>
            </div>
        </div>
        
    )
};

export default Newsletter;