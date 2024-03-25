import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SwitchTheme from "../../components/SwitchTheme";
import { useEffect, useState } from "react";
import SingInForm from "../../services/auth/SignInForm";
import AlertAuth from "../../components/Alerts/AlertAuth";
import ShowPassword from "../../components/ShowPassword";
import AwaitAnimation from "../../components/AwaitAnimation";


export default function Login() {
  const navigate = useNavigate();
  const { pathname } = useLocation()
  const [theme, setTheme] = useState<string | null>();
  const themeStorage = localStorage.getItem("theme");

  const [user, setUser] = useState({ email: "", password: "", });
  const [erroMessage, setErroMessage] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [showLoginSucess, setShowLoginSucess] = useState<boolean>(false)


  const handleChange = (event: { target: { name: string; value: string } }) => {
    const { name, value } = event.target;
    setUser((currentvalue) => ({
      ...currentvalue,
      [name]: value,
    }));
  };

  const loginSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setErroMessage("");
    const data = await SingInForm(user);
    if (!data.message) {
      localStorage.setItem("token", data.token);
      setShowLoginSucess(true)
      return;
    }
    setErroMessage(data.message);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
      return
    }
    setTheme(themeStorage);
  }, [navigate, themeStorage, pathname]);

  if (showLoginSucess) {
    return <AwaitAnimation content="Entrando..." />
  }

  return (
    <div
      className={
        theme == "light" ? "bg-slate-200 h-screen text-black" : "h-screen"
      }
    >
      <header className="w-screen flex justify-center items-center text-center gap-10 p-5">
        <h1 className="font-bold md:text-3xl uppercase">Login - Stock Manager</h1>
        <SwitchTheme setThemeProp={setTheme} />
      </header>
      <motion.main
        initial={{ translateX: -500 }}
        animate={{ translateX: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="h-[75vh] flex items-center text-white"
      >
        <form
          onSubmit={loginSubmit}
          className={
            theme == "light"
              ? "bg-slate-300 md:w-[30vw] flex text-black flex-col gap-2 m-auto justify-center p-10 md:border rounded-xl "
              : "md:w-[30vw] flex flex-col gap-2 m-auto justify-center p-10 md:border rounded-xl "
          }
        >
          {erroMessage && <AlertAuth content={erroMessage} />}
          <label htmlFor="email">Email:</label>
          <input
            value={user.email}
            onChange={handleChange}
            className="text-white py-3 border-0 focus:invalid:border-2 focus:invalid:border-red-700"
            type="email"
            name="email"
            id="email"
            placeholder="Digite seu email"
            autoComplete="true"
            required
          />
          <label htmlFor="password">Senha:</label>
          <input
            value={user.password}
            onChange={handleChange}
            className=" text-white py-3 focus:invalid:border-2 focus:invalid:border-red-700"
            type={showPassword ? "password" : "text"}
            name="password"
            id="password"
            placeholder="Digite sua senha"
            required
          />
          <div onClick={() => setShowPassword((state) => !state)}>
            <ShowPassword />
          </div>
          <div className="w-full flex mb-3 mt-3 text-sm ">
            <p>
              Ainda não tem uma conta?
              <Link to="/register" className="underline font-bold ml-2">
                Cadastre-se
              </Link>
            </p>
          </div>
          <button
            className="bg-blue-600 text-white w-1/2 p-2 rounded"
            type="submit"
          >
            Entrar
          </button>
        </form>
      </motion.main>
    </div>
  );
}
