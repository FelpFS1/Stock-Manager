import { Link } from "react-router-dom";
import SwitchTheme from "./SwitchTheme";
import { useEffect, useState } from "react";
import logo from '../assets/Stock.svg'
import { IoIosLogOut } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { TiThSmall } from "react-icons/ti";
import AwaitAnimation from "./AwaitAnimation";

export default function Header({ setThemeProp }: { setThemeProp: (string: string | null) => void }) {
    const [theme, setTheme] = useState<string | null>()
    const [logout, setLogout] = useState<boolean>(false)

    const handleClickLogout = () => {
        setLogout(state => !state)
        localStorage.removeItem('token')
    }
    useEffect(() => {
        const themeStorage = localStorage.getItem('theme')
        setThemeProp(themeStorage)
        setTheme(themeStorage)
    }, [setThemeProp, theme])
    if (logout) {

        return <AwaitAnimation content="Saindo..." />
    }
    return (
        <header className={theme == "light" ? "w-[90vw] m-auto bg-slate-200  text-black flex justify-between py-3" : "w-[90vw] m-auto flex justify-between py-3"}>
            <img src={logo} alt="" className="w-20 md:w-48 md:h-20" />
            <ul className="flex gap-2 font-bold items-center">
                <li className="text-3xl hover:text-blue-300"><Link to="/"><FaHome /></Link></li>
                <li className="text-3xl hover:text-blue-300"><Link to="/items"><TiThSmall /></Link></li>
                <li className="text-3xl hover:text-blue-300" onClick={handleClickLogout}><IoIosLogOut /></li>
                <li><SwitchTheme setThemeProp={setTheme} /></li>
            </ul>
        </header>
    )
}