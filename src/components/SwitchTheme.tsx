import { useEffect,useState } from "react"
import moon from '../assets/moon.svg'
import sun from '../assets/sun.svg'
export default function SwitchTheme({setThemeProp}:{setThemeProp:(prop :string)=> void}) {
    const themeStorage = localStorage.getItem('theme')
    const [theme, setTheme] = useState<string | null>(themeStorage)
    useEffect(() => { 
        if(themeStorage === null){
            localStorage.setItem('theme','light')
            setTheme('light')   
        } 
    },[themeStorage])
    function toggle() {
        if (theme == "dark") {
            localStorage.setItem("theme", "light")
            setTheme("light")
            setThemeProp("light")
        }
        if (theme == "light") {
            localStorage.setItem("theme", "dark")
            setTheme("dark")
            setThemeProp("dark")
        }
    }
    
    return (
        <button onClick={toggle} className={theme == "dark" ? "flex w-11 h-6 items-center bg-white rounded-full" : "flex w-11 h-6 items-center bg-black rounded-full"}>
            {themeStorage == "light" &&
                <img className="translate-x-full w-5 h-5 bg-orange-400 rounded-full" src={sun} alt="" />
            }
            {themeStorage == "dark" &&
                <img className="w-5 h-5 bg-blue-700 rounded-full translate-x-1 " src={moon} alt="" />
            }

        </button>
    )
}