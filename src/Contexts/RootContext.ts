import { SetStateAction, createContext } from "react";
import { ProductsProps } from "../interfaces/ProductsProps";
type RootContextProps ={
    theme:string | null | undefined,
    setProductId:React.Dispatch<SetStateAction<string>>
    allProducts:ProductsProps[]
    setAllProducts:React.Dispatch<SetStateAction<ProductsProps[]>>
    productId:string,
    userLoggedId:string
}
export const RootContext = createContext<RootContextProps>({
    theme: '' || null,
    setProductId:()=>{},
    allProducts:[],
    productId:'',
    userLoggedId:'',
    setAllProducts:()=>{}
    

})