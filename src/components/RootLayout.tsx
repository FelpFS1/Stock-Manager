/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useLayoutEffect, useState } from "react";
import { RootContext } from "../Contexts/RootContext";
import { ProductsProps } from "../interfaces/ProductsProps";
import Products from "../helpers/class/Products";
import { motion } from "framer-motion";


export default function RootLayout() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<string | null>();
  const [state,setState] = useState(false)
  const [allProducts, setAllProducts] = useState<ProductsProps[]>([]);
  const [productId, setProductId] = useState<string>("");
  const [userLoggedId, setUserLoggedId] = useState<string>('')
  const getProduct = async () => {
    const data = await Products.getAllProduct();
    if (data.message === "Token inválido") {
      localStorage.removeItem("token");
      navigate("/login");
      return;
    }
      setAllProducts(data[0].products);
      setUserLoggedId(data[0].id)
      setState(true)
  };

  useLayoutEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    getProduct();

  }, []);

  if (!localStorage.getItem("token")) {
    return null
  }

  return (
    
    <RootContext.Provider
      value={{ theme, allProducts, setProductId, productId, userLoggedId, setAllProducts }}
    >
      {
      state &&
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          exit={{ opacity: 0 }}
          className={
            theme == "light"
              ? "min-h-[100vh] bg-slate-200 px-2 md:px-9"
              : " h-screen px-2 md:px-9"
          }
        >
          <Header setThemeProp={setTheme} />
          <main>
            <Outlet />
          </main>
        </motion.div>
    }
    </RootContext.Provider>
  );
}
