import productData from "./productData";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
	ProductData: productData
});

export default rootReducer;