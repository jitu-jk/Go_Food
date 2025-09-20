import React, { useEffect, useState } from 'react'
import Delete from '@mui/icons-material/Delete';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  const navigate = useNavigate();
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check authentication on component mount
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      alert("Please login to view your cart");
      navigate("/login");
      return;
    }
  }, [navigate]);

  // Show success message and redirect button after checkout
  if (data.length === 0 && isCheckoutSuccess) {
    return (
      <div>
        <div><Navbar /></div>
        <div className='m-5 w-100 text-center'>
          <div className='fs-1 text-success mb-4'>✅ Order Placed Successfully!</div>
          <div className='fs-4 mb-4'>Your order has been confirmed and saved.</div>
          <button 
            className='btn btn-success btn-lg me-3' 
            onClick={() => navigate("/myOrders")}
          >
            View My Orders
          </button>
          <button 
            className='btn btn-outline-success btn-lg' 
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>
        <Footer />
      </div>
    )
  }

  // Show empty cart message for new users
  if (data.length === 0) {
    return (
      <div>
        <div><Navbar /></div>
        <div className='m-5 w-100 text-center'>
          <div className='fs-3 mb-3'>The Cart is Empty!</div>
          <div className='fs-5 text-muted mb-4'>Add some delicious food items to get started.</div>
          <button 
            className='btn btn-success btn-lg' 
            onClick={() => navigate("/")}
          >
            Browse Food Items
          </button>
        </div>
        <Footer />
      </div>
    )
  }

  const handleCheckOut = async () => {
    setIsLoading(true);
    let userEmail = localStorage.getItem("userEmail");
    
    try {
      let response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/orderData`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString()
        })
      });
      
      console.log("JSON RESPONSE:::::", response.status);
      
      if (response.status === 200) {
        dispatch({ type: "DROP" });
        setIsCheckoutSuccess(true);
        // Don't navigate immediately, let user see success message
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("An error occurred during checkout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <div>
      <div><Navbar /></div>
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope='row' >{index + 1}</th>
                <td >{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>₹{food.price}</td>
                <td ><button type="button" className="btn p-0"><Delete onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td></tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: ₹{totalPrice}/-</h1></div>
        <div>
          <button 
            className='btn btn-success mt-5 btn-lg' 
            onClick={handleCheckOut}
            disabled={isLoading}
          > 
            {isLoading ? 'Processing...' : 'Check Out'} 
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}