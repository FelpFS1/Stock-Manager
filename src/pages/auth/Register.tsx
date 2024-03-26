import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MdOutlineCancel } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import SwitchTheme from "../../components/SwitchTheme";
import AlertAuth from "../../components/Alerts/AlertAuth";
import SingUpForm from "../../services/auth/SignUpForm";
import ShowPassword from "../../components/ShowPassword";
import AlertSucess from "../../components/Alerts/AlertSucess";

export default function Register() {
    const themeStorage = localStorage.getItem('theme')
    const [theme, setTheme] = useState<string | null>()
    const [user, setUser] = useState({ name: '', lastName: '', email: '', password: '', passwordAgain: '' })
    const [erroMessage, setErroMessage] = useState<string>('')
    const [showRequirements, setShowRequirements] = useState(false)
    const [showPassword, setShowPassword] = useState<boolean>(true)
    const [showSucessAlert,setShowSucessAlert] = useState<boolean>(false)
    const navigate = useNavigate()
    const [requirements, setRequirements] = useState({
        lengthRequirements: false,
        lowercaseRequirements: false,
        uppercaseRequirements: false,
        numberRequirements: false,
        specialCharacterRequirements: false,
        samePasswordRequeriments: false
    })
    const handleChange = (event: { target: { name: string, value: string } }) => {
        const { name, value } = event.target
        setUser(current => ({
            ...current,
            [name]: value
        }))
    }
    const formSubmit = async (event: { preventDefault: () => void }) => {
        setErroMessage('')
        event.preventDefault()
        const response = await SingUpForm(user)
        if (response.message) {   
            setErroMessage(response.message)
            return
        }
        setShowSucessAlert(true)
        setTimeout(() => {
          navigate('/')
        },2000)
    }

    const handleRequirementsPassword = () => {
        user.password ? setShowRequirements(true) : setShowRequirements(false)

        if (user.password.length === 0) {
            return null
        }
        console.log(user.password);
        
        const verifyUppercase = /.*[A-Z].*/
        const verifyLowercase = /.*[a-z].*/
        const verifyNumber = /.*[0-9].*/
        const verifyCharacter = /.*[[@$!%*?&¨].*/
        setRequirements(state => ({
            ...state,
            lengthRequirements: user.password.length >= 8 ? true : false,
            uppercaseRequirements: verifyUppercase.test(user.password) ? true : false,
            lowercaseRequirements: verifyLowercase.test(user.password) ? true : false,
            numberRequirements: verifyNumber.test(user.password) ? true : false,
            specialCharacterRequirements: verifyCharacter.test(user.password) ? true : false,
            samePasswordRequeriments: user.password === user.passwordAgain ? true : false
        }))
    }

    useEffect(() => {
        handleRequirementsPassword()
        setTheme(themeStorage)
    }, [themeStorage, user.password, user.passwordAgain])

    return (
        <div className={theme == 'light' ? 'bg-slate-200 h-screen text-black' : 'h-screen'}>
            <header className="w-screen flex justify-center items-center text-center gap-10 p-5">
                <h1 className="font-bold md:text-3xl uppercase ">SignUp - Stock Manager</h1>
                <SwitchTheme setThemeProp={setTheme} />
            </header>

            <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="relative h-[75vh] flex items-center" >

                <form onSubmit={formSubmit} className={theme == "light" ? "relative bg-slate-300 w-[98vw] md:w-[30vw] flex flex-col gap-2 m-auto justify-center p-5 md:p-10 border rounded-xl " : "relative w-[98vw] md:w-[30vw] flex flex-col gap-2 m-auto justify-center p-5 md:p-10 border rounded-xl "}>
                    {erroMessage && <AlertAuth content={erroMessage} />}
                    {showSucessAlert && <AlertSucess message="Usuário cadastrado com sucesso!"/>}
                    <div className="grid grid-cols-2 gap-5">
                        <div className="flex flex-col">
                            <label htmlFor="name">Nome:</label>
                            <input
                                className="text-white"
                                value={user.name}
                                onChange={handleChange}
                                type="text"
                                name="name" id="name"
                                required placeholder="Digite seu nome *" />
                                
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="lastName">Sobrenome:</label>
                            <input
                                className="text-white"
                                value={user.lastName}
                                onChange={handleChange}
                                type="text"
                                name="lastName" id="lastName"
                                required placeholder="Digite seu sobrenome *" />
                        </div>
                    </div>
                    <label htmlFor="email">Email:</label>
                    <input
                        value={user.email}
                        onChange={handleChange}
                        className="py-3 border-0 text-white focus:invalid:border-2 focus:invalid:border-red-700"
                        type="email" name="email"
                        id="email" placeholder="Digite seu email *" required />

                    <label htmlFor="password">Senha:</label>
                    <input
                        value={user.password}
                        onChange={handleChange}
                        className="py-3 focus:invalid:border-2 text-white focus:invalid:border-red-700"
                        type={showPassword ? "password" : "text"}
                        name="password"
                        id="password"
                        placeholder="Digite sua senha *" required minLength={8} />
                    <label htmlFor="passwordAgain">Repita sua senha:</label>
                    <input
                        value={user.passwordAgain}
                        onChange={handleChange}
                        className="py-3 focus:invalid:border-2 text-white focus:invalid:border-red-700"
                        type={showPassword ? "password" : "text"}
                        name="passwordAgain"
                        id="passwordAgain"
                        placeholder="Digite sua senha novamente *" required minLength={8} />
                    <div onClick={() => setShowPassword(state => !state)}><ShowPassword /></div>
                    {showRequirements &&
                        <div className="text-sm">
                            <p className="font-bold">Requisitos senha:</p>
                            <ul>
                                <li className={requirements.lengthRequirements ? 'text-green-600 flex items-center gap-2' : 'flex items-center gap-2'}>
                                    {!requirements.lengthRequirements ? <MdOutlineCancel className="text-red-600" /> : <FaCheck />} A senha deve conter no mínimo 8 caracteres

                                </li>
                                <li className={requirements.uppercaseRequirements ? 'text-green-600 flex items-center gap-2' : 'flex items-center gap-2'}>
                                    {!requirements.uppercaseRequirements ? <MdOutlineCancel className="text-red-600" /> : <FaCheck />} A senha deve incluir pelo menos uma letra maiúscula
                                </li>
                                <li className={requirements.lowercaseRequirements ? 'text-green-600 flex items-center gap-2' : 'flex items-center gap-2'}>
                                    {!requirements.lowercaseRequirements ? <MdOutlineCancel className="text-red-600" /> : <FaCheck />} A senha deve incluir pelo menos uma letra minúscula
                                </li>
                                <li className={requirements.numberRequirements ? 'text-green-600 flex items-center gap-2' : 'flex items-center gap-2'}>
                                    {!requirements.numberRequirements ? <MdOutlineCancel className="text-red-600" /> : <FaCheck />} A senha deve incluir pelo menos um número
                                </li>
                                <li className={requirements.specialCharacterRequirements ? 'text-green-600 flex items-center gap-2' : 'flex items-center gap-2'}>
                                    {!requirements.specialCharacterRequirements ? <MdOutlineCancel className="text-red-600" /> : <FaCheck />} A senha deve incluir pelo menos um caractere especial (!, @, #, $, %,...)
                                </li>
                                <li className={requirements.samePasswordRequeriments ? 'text-green-600 flex items-center gap-2' : 'flex items-center gap-2'}>
                                    {!requirements.samePasswordRequeriments ? <MdOutlineCancel className="text-red-600" /> : <FaCheck />} As senhas devem ser idênticas
                                </li>
                            </ul>
                        </div>
                    }
                    <div className="mb-3 mt-3">
                        <p>Já tem uma conta?<Link to='/login' className="font-bold"> Entre</Link></p>
                    </div>
                    <button className="bg-blue-600 text-white w-1/2 p-2 rounded" type="submit">Registrar</button>
                </form>
            </motion.main>
        </div>

    )
}