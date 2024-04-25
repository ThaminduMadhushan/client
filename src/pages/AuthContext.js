// import { createContext, useEffect, useState } from 'react';
// import axios from 'axios';


// export const AuthContext = createContext()

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(
//             JSON.parse(localStorage.getItem('user'))
//             || null
//     )
    
//     const login = async (inputs) => {
//         const res = axios.post('http://localhost:3001/api/auth/login', inputs, 
//         {withCredentials: true}
//         ); 

//         setUser(res.data)
//     };


//     useEffect(() => {
//         localStorage.setItem('user', JSON.stringify(user));
//     }, [user]);

//     return (
//         <AuthContext.Provider value={{ user, login }}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    );
    
    const login = async (inputs) => {
        try {
            const res = await axios.post('http://localhost:3001/api/auth/login', inputs, { withCredentials: true });
            setUser(res.data);
        } catch (error) {
            // Handle error here
            console.error("Error occurred during login:", error);
        }
    };

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, login }}>
            {children}
        </AuthContext.Provider>
    );
};
