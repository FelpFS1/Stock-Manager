/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useEffect, useState } from "react";
import { RootContext } from "../Contexts/RootContext";
import { ProductsProps } from "../interfaces/ProductsProps";
import Products from "../helpers/class/Products";


  export default function RootLayout() {
    const [theme, setTheme] = useState<string | null>();
    const [allProducts, setAllProducts] = useState<ProductsProps[]>([]);
    const [loading, setLoading] = useState(true); 
    const [productId, setProductId] = useState<string>("");
    const [userLoggedId, setUserLoggedId] = useState<string>('');
    const navigate = useNavigate();
    const [execute, setExecute] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        if (localStorage.getItem('token')) {
          const data = await Products.getAllProduct();
          
          if(data.message){
            localStorage.removeItem('token')
            return
          }
          setAllProducts(data[0].products);
          setUserLoggedId(data[0].id);
          setLoading(false); 
        }
      };
  
      fetchData();
    }, []); 
  
   
    useEffect(() => {
      if (!localStorage.getItem('token')) {
        navigate('/login');
      }
    }, []);
  
    useEffect(() => {
      if (allProducts.length < 1 && execute && !loading) {
        setExecute(false);
      }
    }, [allProducts, execute, loading]);
 
    return (
      <RootContext.Provider
        value={{
          theme,
          allProducts,
          setProductId,
          productId,
          userLoggedId,
          setAllProducts
        }}
      >
        {!loading && ( 
          <div
            className={
              theme === "light"
                ? "min-h-[100vh] bg-slate-200 px-2 md:px-9"
                : " h-screen px-2 md:px-9"
            }
          >
            <Header setThemeProp={setTheme} />
            <main>
              <Outlet />
            </main>
          </div>
        )}
      </RootContext.Provider>
    );
  }
  