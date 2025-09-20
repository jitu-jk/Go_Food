import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MyOrders() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    try {
      const userEmail = localStorage.getItem("userEmail");
      if (!userEmail) {
        alert("Please login to view your orders");
        return;
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/myOrders/${userEmail}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setOrderData(data);
      } else {
        console.log("Error fetching orders");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <div><Navbar /></div>
      
      <div className='container'>
        <div className='row'>
          {orderData.length === 0 ? (
            <div className='text-center mt-5'>
              <h3>No orders found!</h3>
              <p>You haven't placed any orders yet.</p>
            </div>
          ) : (
            orderData.map((order, index) => (
              <div key={index} className='col-12 col-md-6 col-lg-4 mb-4'>
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Order #{index + 1}</h5>
                    <small className="text-muted">Date: {order.order_date}</small>
                  </div>
                  <div className="card-body">
                    <h6>Items:</h6>
                    {order.order_data.map((item, itemIndex) => (
                      <div key={itemIndex} className="d-flex justify-content-between align-items-center mb-2">
                        <span>{item.name} x{item.qty}</span>
                        <span className="badge bg-success">₹{item.price}</span>
                      </div>
                    ))}
                    <hr />
                    <div className="d-flex justify-content-between">
                      <strong>Total Items:</strong>
                      <span>{order.order_data.length}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <strong>Total Amount:</strong>
                      <span className="text-success">₹{order.order_data.reduce((total, item) => total + item.price, 0)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
