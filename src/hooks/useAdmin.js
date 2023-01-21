import { useEffect, useState } from "react";

const useAdmin = user => {
    const [admin, setAdmin] = useState('');

    const [adminLoading, setAdminLoading] = useState(true);


    // http://localhost:5000/api/v1/user/aliga@gamil.com
    const email = localStorage.getItem('authorization');
    useEffect(() => {
        // let admin = '';
        fetch(`http://localhost:5000/api/v1/user/${email}`)
            .then(res => res.json())

            .then(data => {
                setAdmin(data?.data?.role)
                setAdminLoading(false)
            }
            )
    }, [email, adminLoading]);


    // useEffect(() => {
    //     const email = user?.email;
    //     if (email) {
    //         fetch(`https://murmuring-sea-88663.herokuapp.com/admin/${email}`, {
    //             method: 'GET',
    //             headers: {
    //                 'content-type': 'application/json',
    //                 authorization: `Bearer ${localStorage.getItem('accessToken')}`

    //             }
    //         })
    //             .then(res => res.json())
    //             .then(data => {
    //                 setAdmin(data?.admin);
    //                 setAdminLoading(false);
    //             }
    //             );
    //     }
    // }, [user, adminLoading])

    return [admin, adminLoading];
}

export default useAdmin;