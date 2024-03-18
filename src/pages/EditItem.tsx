import { useContext, useEffect, useLayoutEffect, useState } from "react"
import { RootContext } from "../Contexts/RootContext"
import { ProductsProps } from "../interfaces/ProductsProps"
import { useNavigate, useParams } from "react-router-dom"
import Products from "../helpers/class/Products"


export default function EditItem() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { allProducts, userLoggedId, setAllProducts } = useContext(RootContext)
    const [productsEdit, setProductsEdit] = useState<ProductsProps[]>()
    const [updateProduct, setUpdateProduct] = useState<ProductsProps>({
        id: '',
        createdAt: '',
        description: '',
        updatedAt: '',
        name: '',
        quantity: 0,
        price: 0,
        category: '',
    })

    const handleChange = (event: { target: { name: string, value: string } }) => {
        const { name, value } = event.target
        setUpdateProduct(state => ({
            ...state,
            [name]: value
        }))
    }

    const handleFormSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault()
        if (id) {
            console.log(updateProduct);

            const data = await Products.updateProduct(userLoggedId, id, updateProduct)
            setProductsEdit(data.product)

            if (allProducts != null) {
                const filter = allProducts.filter((product: ProductsProps) => product.id !== id)
                filter.push({...updateProduct,updatedAt:String(new Date())})
                setAllProducts(filter)
            }

            if(data){
                navigate(`/items/info-item/${id}`)
            }
        }
    }

    useEffect(() => {
        if (allProducts != null) {
            const productShow = allProducts.find((product: ProductsProps) => product.id === id)
            if (productShow) {
                setUpdateProduct(productShow)
            }
        }

    }, [productsEdit, allProducts, id])

    console.log(updateProduct);
    

    return (
        <div className="mt-5 ">

            <form onSubmit={handleFormSubmit} action="" className="w-4/5 grid gap-6 m-auto">
                <h1 className="font-bold">Atualizar</h1>
                <div className="grid md:grid-cols-4 gap-5">
                    <div className="flex flex-col">
                        <label htmlFor="name">Nome</label>
                        <input value={updateProduct.name}
                            onChange={handleChange}
                            type="text" name="name" id="name" />
                    </div>
                    <div className="flex flex-col">

                        <label htmlFor="quantity">Quantidade</label>
                        <input
                            onChange={handleChange}
                            value={updateProduct.quantity} type="number" name="quantity" id="quantity" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="price">Preço</label>
                        <input
                            onChange={handleChange}
                            value={updateProduct.price} type="number" name="price" id="price" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="category">Categoria</label>
                        <select value={updateProduct.category}
                            onChange={handleChange}
                            name="category" id="category">
                            <option value="Jogos">Jogos</option>
                            <option value="Vestuário">Vestuário</option>
                            <option value="Eletrônicos">Eletrônicos</option>
                        </select>
                    </div>

                </div>
                <div className="w-full flex flex-col">
                    <label htmlFor="description">Descrição</label>
                    <textarea className="w-full min-h-44 px-10" name="description" id="description" value={updateProduct.description} onChange={handleChange}></textarea>
                </div>
                <div>
                    <button className="bg-blue-600 p-2 rounded" type="submit">Salvar</button>
                </div>
            </form>
        </div>
    )
}