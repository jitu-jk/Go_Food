
import React, { useState, useRef, useEffect } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';
import { useNavigate } from 'react-router-dom';

export default function Temp(props) {
    const dispatch = useDispatchCart();
    const data = useCart();
    const navigate = useNavigate();
    const priceRef = useRef();
    const options = props.options;
    const priceOptions = Object.keys(options);
    const [qty, setQty] = useState(1); 
    const [size, setSize] = useState(priceOptions[0] || ""); 

    const handleAddToCart = async () => {
        // Check if user is authenticated
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
            alert("Please login to add items to cart");
            navigate("/login");
            return;
        }
        
        await dispatch({type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, img: props.foodItem.img});
        alert("Item added to cart successfully!");
    }

    let finalPrice = !isNaN(options[size]) ? qty * parseInt(options[size]) : 0;

    return (
        <div>
            <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
                <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                  
                    <div className="container w-100">
                        <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>
                        <select className="m-2 h-100 bg-success rounded" onChange={(e) => setSize(e.target.value)}>
                           {priceOptions.map((data) => (
                                <option key={data} value={data}>{data}</option>
                           ))}
                        </select>
                        <div className="d-inline h-100 fs-5">
                            ₹{finalPrice}/-
                        </div>
                    </div>
                    <hr></hr>
                     <button className="btn btn-success justify-center ms-2" onClick={handleAddToCart}>Add To Cart</button>

                </div>
            </div>
        </div>
    );
}
