import { Link } from "react-router-dom";
import SwitchTheme from "./SwitchTheme";
import { useEffect, useState } from "react";
import logo from '../assets/Stock.svg'

export default function Header({ setThemeProp }: { setThemeProp: (string: string | null) => void }) {
    const [theme, setTheme] = useState<string | null>()
    useEffect(() => {
        const themeStorage = localStorage.getItem('theme')
        setThemeProp(themeStorage)
        setTheme(themeStorage)

    }, [setThemeProp, theme])

    return (
        <header className={theme == "light" ? "w-[90vw] m-auto bg-slate-200  text-black flex justify-between py-3" : "w-[90vw] m-auto flex justify-between py-3"}>
            <img src={logo} alt="" className="w-20 md:w-48 md:h-20" />
            <ul className="flex gap-2 font-bold items-center">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/items">Items</Link></li>
                <li>Sair</li>
                <li><SwitchTheme setThemeProp={setTheme} /></li>
            </ul>
        </header>
    )
}