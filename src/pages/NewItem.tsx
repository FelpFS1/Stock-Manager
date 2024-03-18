import { useContext, useState } from "react";
import Products from "../helpers/class/Products";
import { useNavigate } from "react-router-dom";
import { RootContext } from "../Contexts/RootContext";
import AlertSucess from "../components/Alerts/AlertSucess";

export default function NewItem() {
    const { userLoggedId, setAllProducts,allProducts} = useContext(RootContext);
    const [showAlert,setShowAlert] = useState<boolean>(false)
    const [newProduct, setNewProduct] = useState({
        name: "",
        quantity: '',
        price: '',
        category: "default",
        description: "",
    });
    const navigate = useNavigate();
    const handleChange = (event: {
        target: { name: string; value: number | string };
    }) => {
        const { name, value } = event.target;
        setNewProduct((state) => ({
            ...state,
            [name]: value,
        }));
    };

    const onSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        const { category, name, price, quantity } = newProduct
        
        if (category != 'default' && name != '' && price != '' && quantity != '') {
            try {
                setShowAlert(true)
                const data = await Products.addProduct(userLoggedId, newProduct);
                const products = allProducts
                products.push(data.product)
                if(products[0].id){
                    setAllProducts(products)
                }else{
                    setAllProducts([products[1]])
                }
                setTimeout(() => {
                    if (data.message == "Sucess") {   
                        navigate("/items");
                        return
                    }
                  
                },5000)
                return
            } catch (error) {
                console.log(error);
                
            }
           
        }

        alert("Preencha todos os campos!")
    };

    return (
        <div className="flex justify-center mt-5">
            {showAlert &&
                <AlertSucess message="Produto sendo adicionado..."/>
}
            <form onSubmit={onSubmit} className="w-4/5 grid gap-6 ">
                <div className="grid md:grid-cols-4 gap-5">
                    <div className="flex flex-col">
                        <label htmlFor="name">Nome</label>
                        <input
                            className="text-white"
                            value={newProduct.name}
                            onChange={handleChange}
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Nome do produto"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="quantity">Quantidade</label>
                        <input
                            className="text-white"
                            value={newProduct.quantity}
                            onChange={handleChange}
                            type="number"
                            name="quantity"
                            id="quantity"
                            placeholder="Quant em estoque"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="price">Preço</label>
                        <input
                            className="text-white"
                            value={newProduct.price}
                            onChange={handleChange}
                            type="number"
                            name="price"
                            id="price"
                            placeholder="Preço do produto"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="category">Categoria</label>
                        <select
                            value={newProduct.category}
                            onChange={handleChange}
                            className="text-white"
                            name="category"
                            id="category"
                        >
                            <option defaultChecked disabled value="default">
                                Escolha a categoria
                            </option>
                            <option value="Jogos">Jogos</option>
                            <option value="Vestuário">Vestuário</option>
                            <option value="Eletrônicos">Eletrônicos</option>
                        </select>
                    </div>
                </div>
                <div className="w-full flex flex-col">
                    <label htmlFor="description">Descrição</label>
                    <textarea
                        value={newProduct.description}
                        onChange={handleChange}
                        className="w-full text-white p-10"
                        name="description"
                        id="description"
                        placeholder="Escreva a descrição do produto"
                    ></textarea>
                </div>
                <div>
                    <button className="bg-blue-600 p-2 rounded" type="submit">
                        Salvar
                    </button>
                </div>
            </form>
        </div>
    );
}
