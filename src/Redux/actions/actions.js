export const set_products_data = (data)=>{
    return{
        type:'SETPRODUCTSDATA',
		payload: data
    };
};

export const remove_products_data = (data)=>{
    return{
        type:'RESETPRODUCTSDATA',
		payload: data
    };
};
