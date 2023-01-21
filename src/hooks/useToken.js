import { useState } from "react";


const useToken = to => {
    // const [adminLoading, setAdminLoading] = useState(true);
    const tokens = localStorage.getItem('authorization');
    // console.log(tokens);
    // setAdminLoading(false);
    // const [token, setToken] = useState('');
    // useEffect(() => {
    // console.log('user:', user?.user?.email);
    // const email = user?.user?.email;
    // console.log(email)
    // const currentUser = { email: email };
    // http://localhost:5000/user/${email} 


    // fetch(`http://localhost:5000/api/v1/user/me`){
    // method: 'GET',
    //     headers: {
    //         'content-type': 'application/json'
    //     },
    // }



    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(data)
    //         // console.log('data inside useTOken', data);
    //         const accessToken = data.token;
    //         localStorage.setItem('accessToken', accessToken);
    //         setToken(accessToken);
    //     }
    //     )


    // fetch(`http://localhost:5000/api/v1/user/me`, {
    //     method: 'PUT',
    //     headers: {
    //         'content-type': 'application/json'
    //     },
    //     body: JSON.stringify(currentUser)
    // })
    //     .then(res => res.json())
    //     .then(data => {
    //         // console.log('data inside useTOken', data);
    //         const accessToken = data.token;
    //         localStorage.setItem('accessToken', accessToken);
    //         setToken(accessToken);
    //     }
    //     );


    // },)



    // fetch(`http://localhost:5000/api/v1/user/me`, {
    //     method: 'GET',
    //     headers: {
    //         'content-type': 'application/json'
    //     },

    // })
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log('data inside useTOken', data);
    //         const accessToken = data.token;
    //         localStorage.setItem('accessToken', accessToken);
    //         setToken(accessToken);
    //     }
    //     );

    return [tokens];

}
export default useToken;