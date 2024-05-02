import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const isAdmin = ({children, authentication=true, isAdmin=false}) => {

    const navigate = useNavigate();
    
    useEffect(() => {
        if(authentication = false && isAdmin == false) {
            navigate('/admin/auth/login');
        }
        else if(authentication == true && isAdmin == false){
            navigate('/');
        }
        else if(authentication == true && isAdmin == true) {
            return true;
        }
    }, []);

    return (
    <div>
        {children}
    </div>
  )
}

export default isAdmin