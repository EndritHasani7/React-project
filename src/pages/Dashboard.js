import { useLocalStorage } from '@uidotdev/usehooks';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [orders, setOrders] = useLocalStorage('orders', [])
    const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isloggedin')
    const navigate = useNavigate()
    const [myOrders, setMyOrders] = useState([])

    useEffect(() => {
        if(isLoggedIn == null) {
            navigate("/login");
        } else {
            setMyOrders(orders.filter(order => order.user == isLoggedIn.id))
        }
    }, [])

    return (
        <section className="my-4">
            <div className="container">
            {
                (myOrders.length > 0) ?
                <>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Fullname</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Products</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                    myOrders.map((order, key) => (
                        <tr key={key}>
                        <td>{order.fullname}</td>
                        <td>{order.email}</td>
                        <td>{order.phone}</td>
                        <td>{ order.products.map(product => <p>{product.title}</p>)}</td>
                        </tr>
                    ))
                    }
                    </tbody>
                </table>
                </> : <p>0 orders</p>
                }
            </div>
        </section>
    )
}

export default Dashboard