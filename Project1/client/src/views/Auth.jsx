import React from 'react'
import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'
const Auth = ({authRoute}) => {
    let body;
    body = (
        <>
          {authRoute === "login" &&<LoginForm/>}  
          {authRoute === "register" &&<RegisterForm/>} 
        </>
    )
    return( 
        <div className="landing">
             <div className="landing-inner">
                 <h1>LEARN IT</h1>
                 <h4>Keep track of what you are learning</h4>
                 {body}
             </div>
        </div>
        )
}

export default Auth
