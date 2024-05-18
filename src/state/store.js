import { proxy } from "valtio";

const initialState = {
    isAdmin: true
}

const store = proxy(initialState);

export default store;