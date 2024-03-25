/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { RootContext } from "../Contexts/RootContext";
import { ProductsProps } from "../interfaces/ProductsProps";
import Products from "../helpers/class/Products";
import AlertDelete from "../components/Alerts/AlertDelete";
import AlertSucess from "../components/Alerts/AlertSucess";

export default function InfoItem() {
  const { pathname } = useLocation();

  const navigate = useNavigate();
  const { allProducts, setAllProducts } = useContext(RootContext);

  const [productName, setProductName] = useState<string | undefined>("");
  const [showAlert, setShowAlert] = useState(false);
  const [showSucessAlert, setShowSucessAlert] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string | undefined>("");
  const product = useLoaderData() as ProductsProps
  const deleteConfirm = (id?: string, productName?: string) => {
    setShowAlert((state) => !state);
    setDeleteId(id);
    setProductName(productName);
  };
  const deleteProduct = async (id?: string) => {
    try {
      const data: { message: string; product: ProductsProps[] } =
        await Products.deleteProduct(id);
      if (data.message == "Sucess") {
        
        const productsFilter = allProducts.filter(
          (product) => product.id != data.product[0].id
        );
        setAllProducts(productsFilter);
        setShowAlert((state) => !state);
        setShowSucessAlert((state) => !state);
        navigate('/items')
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = () => {
    deleteProduct(deleteId);
  };

  useEffect(() => {
    if (pathname == `/items/info-item/${deleteId}`) {
      setTimeout(() => {
        navigate("/items");
      }, 3000);
    }
  
  }, [allProducts]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

  }, [navigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className=" flex flex-row gap-6 mt-6 font-bold">
        {showSucessAlert && (
          <AlertSucess message="Produto deletado com sucesso!" />
        )}
        {showAlert && (
          <AlertDelete
            handleDelete={handleDelete}
            name={productName}
            setShowAlert={setShowAlert}
          />
        )}
        <h1 className="text-sm flex items-center">{product?.name}</h1>
        <Link to={`/items/update-item/${product?.id}`}>
          <button className="bg-blue-700 md:px-4 p-1 rounded">Atualizar</button>
        </Link>
        <button
          onClick={() => deleteConfirm(product?.id, product?.name)}
          className="bg-red-600 md:px-4 p-1 rounded"
        >
          Excluir
        </button>
      </div>

      <div className="flex flex-row gap-1 sm:gap-5 mt-6 mb-6 text-white text-center">
        <p className="py-2 px-2 sm:px-5 bg-zinc-900 rounded-xl">
          Categoria: {product?.category}
        </p>
        <p className="py-2 px-2 sm:px-5 bg-zinc-900 rounded-xl">
          Quantidade em estoque: {product?.quantity}
        </p>
        <p className="py-2 px-2 sm:px-5 bg-zinc-900 rounded-xl">
          Preço: {product?.price}
        </p>
      </div>
      <div className="mb-2">
        <h2 className="font-bold">Descrição:</h2>
        <p>{product?.description}</p>
      </div>
      <hr />
      <div className="mt-6">
        <p>
          <span className="font-bold ">Cadastrado em: </span>
          {product?.createdAt}
        </p>
        <p>
          <span className="font-bold">Atualizado em: </span>
          {product?.updatedAt}
        </p>
      </div>
    </motion.div>
  );
}
