import { useContext } from "react";
import { StoreContext } from "../stores/store";

// When we use this hook, this is going to give us access to our stores that's inside our store context
export function useStore() {
    return useContext(StoreContext);
}