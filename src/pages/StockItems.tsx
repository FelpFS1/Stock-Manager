
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RootContext } from "../Contexts/RootContext";
import { motion } from "framer-motion";
import Products from "../helpers/class/Products";
import AlertDelete from "../components/Alerts/AlertDelete";
import { ProductsProps } from "../interfaces/ProductsProps";
import AlertSucess from "../components/Alerts/AlertSucess";

export default function StockItems() {
    const { theme } = useContext(RootContext)
    const { allProducts, setProductId, setAllProducts } = useContext(RootContext)
    const [productName, setProductName] = useState<string>('')
    const [showAlert, setShowAlert] = useState(false)
    const [showSucessAlert,setShowSucessAlert] = useState<boolean>(false)
    const [deleteId, setDeleteId] = useState<string>('')
    const deleteConfirm = (id: string, productName: string) => {
        setShowAlert(state => !state)
        setDeleteId(id)
        setProductName(productName)
    }
    const deleteProduct = async (id: string) => {
        try {
            const data: { message: string, product: ProductsProps[] } = await Products.deleteProduct(id)
            if (data.message == "Sucess") {
                const productsFilter = allProducts.filter(product => product.id != data.product[0].id)
                setAllProducts(productsFilter)
                setShowAlert(state => !state)
                setShowSucessAlert(state => !state)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleDelete = () => {
        deleteProduct(deleteId)
    }

    useEffect(() => {
       
    }, [allProducts])
    

    return (
        <section className="overflow-auto" >
            <div>
                {showSucessAlert &&
                <AlertSucess message="Produto deletado com sucesso!"/>
                }   
                {showAlert &&
                <AlertDelete handleDelete={handleDelete} name={productName} setShowAlert={setShowAlert} />
            }
                <table border={1} className={theme === "light" ? "text-black w-full my-4 text-center " : "text-center w-full my-4"}>
                    <thead className="text-white bg-zinc-900 text-sm md:text-2xl">
                        <tr >
                            <td>ID</td>
                            <td>Nome</td>
                            <td >Em estoque</td>
                            <td>Categoria</td>
                            <td>Ações</td>
                        </tr>
                    </thead>
                    <tbody className="text-sm md:text-xl gap-4">
                        {allProducts.map(product =>
                            product.id &&
                            <motion.tr
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                key={product.id} className="border-2 border-black border-opacity-20 my-4">
                                <td>{product.id.replace(/(.{4})(.{4})(.{4})(.{4})(.{4})(.{4})/, '$1-$2-$3-$4-$5-$6')}</td>
                                <td>{product.name}</td>
                                <td >{product.quantity} unid.</td>
                                <td>{product.category}</td>
                                <td className="flex justify-center flex-col md:flex-row gap-4 p-4 font-semibold">
                                    <Link to={`/items/info-item/${product.id}`}><button className="bg-blue-600 px-2 rounded" onClick={() => setProductId(product.id)}>Ver</button></Link>
                                    <Link to={`update-item/${product.id}`}><button onClick={()=>setProductId(product.id)}className="bg-white text-black md:px-2 rounded">Atualizar</button></Link>
                                    <button onClick={() => deleteConfirm(product.id, product.name)} className="bg-red-600 md:px-2 rounded">Excluir</button>
                                </td>
                            </motion.tr>
                        )}

                    </tbody>
                </table>
            </div>
        </section>
    )
}