import { useContext } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { RootContext } from "../Contexts/RootContext";
import BackButton from "./BackButton";

export default function StockLayout() {
    const { theme } = useContext(RootContext)
    const { pathname } = useLocation()
    return (
        <>
            <section className={theme == "light" ? "text-black w-[90vw] md:m-auto" : "w-[90vw] m-auto"} >
                <div className="flex relative">
                    <h1 className="font-bold text-2xl md:text-3xl uppercase mb-5">Stock Items</h1>
                    <BackButton />
                </div>
                
                <div className=" relative flex font-bold gap-2 mb-2">
                    <Link to="/items"><button className={pathname == '/items' ? "border-b-2 border-y-teal-500" : "border-b-0"}>Todos os itens</button></Link>
                    <Link to="new-item"><button className={pathname == '/items/new-item' ? "border-b-2 border-y-teal-500" : "border-b-0"}>Novo item</button></Link>
                    

                </div>
                <hr className={theme == 'light' ? "border-1 border-black" : ''} />
                <Outlet />
            </section>
        </>
    )
}