import { Spinner } from "@chakra-ui/spinner";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
export default function AwaitAnimation({content}:{content:string}) {
    const navigate = useNavigate();
    const {pathname} = useLocation()
  useEffect(() => {
    setTimeout(() => {
      if(pathname === '/login' || pathname === '/register'){
          navigate('/')
          return
      }
      navigate("/login");
    }, 4000);  
  },[navigate, pathname])
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="absolute z-50 w-screen h-screen -left-2/4 -right-2/4 -2 py-10 text-center m-auto flex flex-col justify-center items-center bg-slate-900"
    >
      <Spinner
        thickness="5px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
      <h1 className="text-blue-600 font-bold">{content}</h1>
    </motion.div>
  );
}
