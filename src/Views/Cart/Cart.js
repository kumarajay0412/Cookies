/* eslint-disable */
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { set_products_data } from '../../Redux/actions/actions'
import { Link } from "react-router-dom";

function Cart() {
    const dispatch = useDispatch();
    const reduxStateData = useSelector((state) => state.ProductData.products)
    const [products, setProducts] = useState((reduxStateData !== null) ? reduxStateData : []);
    const [total, setTotal] = useState(0);
    const [cartCount, setCartCount] = useState(0);
    const [cartArray, setCartArray] = useState(0);

    const AddItemToCart = (id) => {
        const UpdatedCart = products.map(item => {
            if (item.id === id) {
                if (item.count === 3) {
                    toast.error('You can only add maximum 3 products', {
                        position: "top-right",
                        autoClose: 2500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                else {
                    item.count = item.count + 1;
                }
            }
            return item;
        });
        setProducts(UpdatedCart);
        dispatch(set_products_data(UpdatedCart))
    }

    const DeleteItemFromCart = (id) => {
        const UpdatedCart = products.map(item => {
            if (item.id === id) {
                if (item.count === 0) {
                    item.incart = false;
                    toast.error('Add items first', {
                        position: "top-right",
                        autoClose: 2500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                else {
                    item.count = item.count - 1;
                    if (item.count === 0) {
                        item.incart = false;
                    }
                }
            }
            return item;
        });
        setProducts(UpdatedCart);
        dispatch(set_products_data(UpdatedCart))
    }

    const RemoveItemFromCart = (id) => {
        const UpdatedCart = products.map(item => {
            if (item.id === id) {
                item.count = 0;
                item.incart = false;
            }
            return item;
        });
        setProducts(UpdatedCart);
        dispatch(set_products_data(UpdatedCart))
    }
    useEffect(() => {
        let pricecount = 0;
        let itemcount = 0;
        let cartProducts = []
        if (reduxStateData !== null) {
            reduxStateData.map((item) => {
                if (item.incart) {
                    cartProducts.push(item);
                    itemcount = itemcount + item.count;
                    pricecount = pricecount + parseFloat(item.price) * parseFloat(item.count);
                }


            })
        }
        setCartArray(cartProducts)
        setTotal(pricecount);
        setCartCount(itemcount);

    }, [reduxStateData])

    return (
        <div class="container mx-auto mt-10">
            <div class="flex shadow-md my-10">
                <div class="w-full px-10 py-10 bg-lightbrown">
                    <div class="flex justify-between border-b pb-8">
                        <h1 class="font-semibold text-2xl">Shopping Cart</h1>
                        <h2 class="font-semibold text-2xl">{cartCount} Items</h2>
                    </div>
                    <div class="flex mt-10 mb-5">
                        <h3 class="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
                        <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-2/5 text-center">Quantity</h3>
                        <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
                    </div>
                    { }
                    {reduxStateData !== null &&

                        reduxStateData.map((item) => {
                            return (
                                <> {
                                    item?.incart && <>
                                        <div class="flex items-center hover:bg-gray-100  px-2 py-5">
                                            <div class="flex w-2/5">

                                                <div class="flex flex-col justify-between ml-4 flex-grow gap-4">
                                                    <span class="font-bold text-sm ">{item.name} </span>

                                                    <div class="w-20">
                                                        <img class="h-24" src={item.image} alt="" />
                                                    </div>
                                                    <div onClick={() => RemoveItemFromCart(item?.id)} className="flex flex-row gap-3 place-items-center	">
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                        <span href="#" class="font-semibold hover:text-red-500 text-gray-500 cursor-pointer text-xs">Remove</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flex justify-center w-2/5">
                                                <div className='flex flex-row gap-6 '>
                                                    <div class="text-xl  text-gray-900 text-brown  rounded-full cursor-pointer " onClick={() => DeleteItemFromCart(item?.id)} > <span className=''>-</span> </div>
                                                    <span class="text-xl  text-gray-900 text-brown ">{item?.count}</span>
                                                    <div class="text-xl  text-gray-900 text-brown  rounded-full  cursor-pointer " onClick={() => AddItemToCart(item?.id)}> <span className=''>+</span> </div>
                                                </div>
                                            </div>
                                            <span class="text-center w-1/5 font-semibold text-sm"> ${item?.price}  * {item?.count} = ${item?.price * item?.count}</span>
                                        </div>
                                        <div className="border-t-2 border-0 border-brown">
                                        </div>
                                    </>
                                }</>
                            )
                        })
                    }
                    <Link to="/" class="flex cursor-pointer font-semibold text-indigo-600 text-sm mt-10">
                        <svg class="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
                        Continue Shopping
                    </Link>
                </div>

            </div>

            <ToastContainer />
            <div id="summary" class="w-full px-8 py-10">
                <h1 class="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                <div class="flex justify-between mt-10 mb-5">
                    <span class="font-semibold text-sm uppercase">{cartCount} Items </span>
                    <span class="font-semibold text-sm">${total}</span>
                </div>
                <div>
                    <label class="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
                    <select class="block p-2 text-gray-600 w-full text-sm">
                        <option>Standard shipping - $10.00</option>
                    </select>
                </div>
                <button class="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">Apply</button>
                <div class="border-t mt-8">
                    <div class="flex font-semibold justify-between py-6 text-sm uppercase">
                        <span>Total cost</span>
                        {total ? (<span>${total + 10}</span>
                        ) : (<span>${0}</span>
                        )}
                    </div>
                    <button onClick={() => { console.log(cartArray) }} class="bg-indigo-500 font-semibold rounded-lg py-3 text-sm border-2 border-lightbrown cursor-pointer bg-lightbrown text-black uppercase w-full">Checkout</button>
                </div>
            </div>
        </div>
    )
}

export default Cart