/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useLocation, useNavigate, } from "react-router-dom";
import { motion } from "framer-motion";
import CardDashboard from "../components/CardDashboard";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { RootContext } from "../Contexts/RootContext";
import { ProductsProps } from "../interfaces/ProductsProps";
import Products from "../helpers/class/Products";
export default function Dashboard() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { theme, allProducts, setProductId } = useContext(RootContext); 
    const [products, setProducts] = useState<ProductsProps[]>([]);
    const [recentProducts, setRecentProducts] = useState<ProductsProps[]>([]);
    const [endingProducts, setEndingProducts] = useState<ProductsProps[]>([]);

    const addProducts = () => {
        const recentProduct = new Products(products).getRecentProducts();
        const endingProduct = new Products(products).getProductsEnding();
        setRecentProducts(recentProduct);
        setEndingProducts(endingProduct);
    };

    const checkToken = async() =>{
        const data = await Products.getAllProduct()
        console.log(data);
        
        if(data.message){
           
            navigate('/login')
        }
    }

    useEffect(() => {
        checkToken()
        setProducts(allProducts)

    }, [navigate, pathname]);

    useLayoutEffect(() => {
        setProducts(allProducts)
        addProducts()

    }, [products]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}>
            <section
                className={
                    theme == "light" ? " text-black w-[90vw] m-auto" : "w-[90vw] m-auto"
                }
            >
                <h1 className="font-bold text-2xl md:text-3xl uppercase mb-5">
                    Dashboard
                </h1>
                <section className="text-white w-[90vw] grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-10">
                    <CardDashboard
                        cardTitle="Diversidade de itens"
                        contentCard={Number(!products[0]?.id ? 0 : new Products(products).getDiversityProduct())}
                    />
                    <CardDashboard
                        cardTitle="Inventário total"
                        contentCard={Number(!products[0]?.id ? 0 : allProducts.length)}
                    />
                    <CardDashboard
                        cardTitle="Itens recentes"
                        contentCard={new Products(products).getRecentProducts().length}
                    />
                    <CardDashboard
                        cardTitle="itens acabando"
                        contentCard={new Products(products).getProductsEnding().length}
                    />
                </section>
                <section className="w-full grid md:grid-cols-2 gap-10 ">
                    <div>
                        <table className="w-full text-left my-4 ">
                            <thead className="text-white bg-zinc-900 md:text-2xl">
                                <tr>
                                    <th className="py-4 px-4 rounded-tl-xl rounded-bl-xl">
                                        Itens recentes
                                    </th>
                                    <th className="rounded-tr-xl rounded-br-xl text-center">
                                        {" "}
                                        Ações
                                    </th>
                                </tr>
                            </thead>
                            <tbody className=" md:text-xl p-3 overflow-auto">
                                {recentProducts?.map((recentProducts) => (
                                    <tr
                                        className="border-b border-y-teal-500"
                                        key={recentProducts.id}
                                    >
                                        <td className="px-4 py-3">{recentProducts.name}</td>
                                        <td className="text-center">
                                            <Link to={`items/info-item/${recentProducts.id}`}>
                                                <button
                                                    className="bg-white text-black px-2 rounded-xl"
                                                    onClick={() => setProductId(recentProducts.id)}
                                                >
                                                    Ver
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <table className="w-full text-left my-4">
                            <thead className="text-white bg-zinc-900 md:text-2xl">
                                <tr>
                                    <th className="py-4 px-4 rounded-tl-xl rounded-bl-xl">
                                        Itens acabando
                                    </th>
                                    <th className="text-center"> Qtd.</th>
                                    <th className="text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="text-xl p-3">
                                {endingProducts.map((product) => (
                                    <tr className="border-b border-y-teal-500" key={product.id}>
                                        <td className="px-4 py-3">{product.name}</td>
                                        <td className="text-center">{product.quantity}</td>
                                        <td className="text-center">
                                            <Link to={`items/info-item/${product.id}`}><button onClick={() => setProductId(product.id)} className="bg-black text-white px-2 rounded-xl">
                                                Ver
                                            </button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </section>
        </motion.div>
    );
}
