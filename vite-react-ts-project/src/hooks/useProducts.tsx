import { useContext } from "react";
import ProductsContext, { useProductsContextType } from "../context/ProductsProvider";

const useProducts = (): useProductsContextType => {
    return useContext(ProductsContext)
}

export default useProducts