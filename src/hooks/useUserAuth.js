import { useEffect, useState } from "react";

const useUserAuth = () => {
    const [user, setUser] = useState({});

    // const [adminLoading, setAdminLoading] = useState(true);


    // http://localhost:5000/api/v1/user/aliga@gamil.com
    const email = localStorage.getItem('authorization');
    useEffect(() => {
        // let admin = '';
        fetch(`http://localhost:5000/api/v1/user/${email}`)
            .then(res => res.json())

            .then(data =>
                setUser(data?.data)
                // admin = data?.data?.role
                // console.log(data?.data?.role)

            )
    }, [email]);

    // console.log(user);

    return [user];
}

export default useUserAuth;