/* eslint-disable */
import { data } from '../Helpers/Products'
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from "react-redux";
import { set_products_data } from '../Redux/actions/actions'
function Home() {
    const reduxStateData = useSelector((state) => state.ProductData.products)
    const dispatch = useDispatch();
    const [products, setProducts] = useState((reduxStateData !== null) ? reduxStateData : data);

    const AddToCart = (id) => {
        const UpdatedCart = products.map(item => {
            if (item.id === id) {
                item.incart = true;
                item.count = item.count + 1;
            }
            return item;
        });
        setProducts(UpdatedCart);
        dispatch(set_products_data(UpdatedCart))
    }

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

    useEffect(() => {

    }, [products])

    return (
        <div class="container mx-auto mt-10">
            <div class="flex  my-10">
                <div >
                    <div class="grid lg:grid-cols-2 place-content-center p-8 gap-8">
                        {data.map((item, key) => {
                            return (
                                <div key={item?.id}
                                >
                                    <div class="m-4 bg-white rounded-lg shadow-xl lg:flex lg:max-w-lg">
                                        <img src={item?.image}
                                            class="w-1/1 lg:w-1/2 rounded-2xl hover:scale-150 ease-in duration-500" />
                                        <div class="p-6 bg-gray-50">
                                            <h2 class="mb-2 text-2xl font-bold text-blue-500">{item?.name}</h2>
                                            <p class="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores ipsum ab
                                                rem, consequuntur autem totam sit minima porro?</p>
                                            <div className="flex w-full justify-center p-5 text-center ">
                                                <div class="flex justify-between items-center">
                                                    <span class="text-3xl font-bold text-gray-900 dark:text-brown">${item.price}</span>
                                                </div>
                                            </div>

                                            <div className="flex w-full justify-center text-center ">
                                                <div >

                                                    {(!item?.incart) ? (
                                                        <div className="flex justify-between items-center border-2 p-2 rounded-xl border-brown " onClick={() => AddToCart(item?.id)}>
                                                            <span className="text-2xl font-bold text-gray-900 dark:text-brown cursor-pointer">Add to cart</span>
                                                        </div>
                                                    ) : (
                                                        <> <div className='flex flex-row gap-4 '>
                                                            <div class="text-3xl font-bold text-gray-900 dark:text-brown border h-12 w-12 rounded-full p-1  hover:bg-lightbrown cursor-pointer" onClick={() => DeleteItemFromCart(item?.id)}> <span className=''>-</span> </div>
                                                            <span class="text-3xl font-bold text-gray-900 dark:text-brown p-1">{item?.count}</span>
                                                            <div class="text-3xl font-bold text-gray-900 dark:text-brown border h-12 w-12 rounded-full p-1 border-gray cursor-pointer hover:bg-lightbrown" onClick={() => AddItemToCart(item?.id)}> <span className=''>+</span> </div>
                                                            <div onClick={() => RemoveItemFromCart(item?.id)} className="flex cursor-pointer flex-row gap-3 place-items-center	">
                                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                            </div>
                                                        </div>


                                                        </>
                                                    )}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <ToastContainer />
                </div>
            </div>       </div>
    )
}

export default Home