// src/services/authService.js

// const BACKEND_URL = 'http://localhost:3000'; // this is our Express API url
const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

const signup = async (formData) => {
    try {
        const res = await fetch(`${BACKEND_URL}/users/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const json = await res.json();

        if (json.err) {
            throw new Error(json.err);
        }

        if (json.token) {
            localStorage.setItem('token', json.token);
            // set localStorage object's key-value { token: json.token } from parsed response JSON 
            return json;
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
};

// const signin = async (user) => {
//     try {
//         const res = await fetch(`${BACKEND_URL}/users/signin`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(user),
//         });
//         const json = await res.json();

//         if (json.error) {
//             throw new Error(json.error);
//         }

//         if (json.token) {
//             const user = JSON.parse(atob(json.token.split('.')[1]));
//             return user;
//         }
//     } catch (err) {
//         console.log(err);
//         throw err;
//     }
// };
const signin = async (user) => {
    try {
        const res = await fetch(`${BACKEND_URL}/users/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        })
        const json = await res.json()

        if (json.token) {
            localStorage.setItem('token', json.token); // add this line to store the JWT token in localStorage

            const user = JSON.parse(atob(json.token.split('.')[1]));

            return user
        }
        if (json.err) {
            throw new Error(json.err)
        }
    } catch (err) {
        console.log(err)
        throw err
    }
};

const getUser = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const user = JSON.parse(atob(token.split('.')[1]));
    return user;
};

const signout = () => {
    localStorage.removeItem('token');
        // deletes the key-value pair in the localStorage object with the argument of the key
};

export {
    signup,
    signin,
    getUser,
    signout,
};