import { proxy } from "valtio";

const initialState = {
    isAdmin: false
}

const store = proxy(initialState);

export default store;