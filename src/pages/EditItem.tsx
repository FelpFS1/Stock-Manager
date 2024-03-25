import { useContext, useEffect, useState } from "react";
import { RootContext } from "../Contexts/RootContext";
import { ProductsProps } from "../interfaces/ProductsProps";
import { useNavigate, useParams } from "react-router-dom";
import Products from "../helpers/class/Products";
import { motion } from "framer-motion";
import { NumericFormat } from "react-number-format";

export default function EditItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { allProducts, userLoggedId, setAllProducts } = useContext(RootContext);
  const [productsEdit, setProductsEdit] = useState<ProductsProps[]>();
  const [updateProduct, setUpdateProduct] = useState<ProductsProps>({
    id: "",
    createdAt: "",
    description: "",
    updatedAt: "",
    name: "",
    quantity: 0,
    price: "",
    category: "",
  });

  const handleChange = (event: { target: { name: string; value: string } }) => {
    const { name, value } = event.target;
    setUpdateProduct((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (id) {
      const data = await Products.updateProduct(
        userLoggedId,
        id,
        updateProduct
      );
      setProductsEdit(data.product);

      if (allProducts != null) {
        const filter = allProducts.filter(
          (product: ProductsProps) => product.id !== id
        );
        filter.push({ ...updateProduct, updatedAt: String(new Date()) });
        setAllProducts(filter);
      }

      if (data) {
        navigate(`/items/info-item/${id}`, { replace: true });
      }
    }
  };

  useEffect(() => {
    if (allProducts != null) {
      const productShow = allProducts.find(
        (product: ProductsProps) => product.id === id
      );
      if (productShow) {
        setUpdateProduct(productShow);
      }
    }
  }, [productsEdit, allProducts, id]);

  console.log(updateProduct);

  return (
    <div className="mt-5 ">
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        onSubmit={handleFormSubmit}
        action=""
        className="w-4/5 grid gap-6 m-auto"
      >
        <h1 className="font-bold">Atualizar</h1>
        <div className="grid md:grid-cols-4 gap-5">
          <div className="flex flex-col">
            <label htmlFor="name">Nome</label>
            <input
              className="text-white"
              value={updateProduct.name}
              onChange={handleChange}
              type="text"
              name="name"
              id="name"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="quantity">Quantidade</label>
            <input
              className="text-white"
              onChange={handleChange}
              value={updateProduct.quantity}
              type="number"
              name="quantity"
              id="quantity"
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="price">Preço</label>
            <NumericFormat
              thousandSeparator="."
              decimalSeparator=","
              decimalScale={2}
              prefix="R$ "
              allowNegative={false}
              className="text-white"
              onChange={handleChange}
              value={updateProduct.price}
              name="price"
              id="price"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="category">Categoria</label>
            <select
              value={updateProduct.category}
              className="text-white"
              onChange={handleChange}
              name="category"
              id="category"
            >
              <option value="Jogos">Jogos</option>
              <option value="Vestuário">Vestuário</option>
              <option value="Eletrônicos">Eletrônicos</option>
            </select>
          </div>
        </div>
        <div className="w-full flex flex-col">
          <label htmlFor="description">Descrição</label>
          <textarea
            className="w-full min-h-44 px-10 text-white"
            name="description"
            id="description"
            value={updateProduct.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <button className="bg-blue-600 p-2 rounded" type="submit">
            Salvar
          </button>
        </div>
      </motion.form>
    </div>
  );
}
