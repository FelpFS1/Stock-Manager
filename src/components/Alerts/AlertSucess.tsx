import { motion } from "framer-motion"

export default function AlertSucess({message}:{message:string}){
    return(
            <motion.div 
            initial={{ translateX: -1000, opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0], translateX: [-1000, 0, 0, -1000], }}
            transition={{ duration: 3.6, ease: "easeInOut" }}
            exit={{ translateX: -100, opacity: 0 }}
            className="absolute  w-10/12 -left-2/4 -right-2/4  text-center m-auto top-5 bg-green-500 p-5 rounded-2xl font-bold">
                <h1>{message}</h1>
            </motion.div>
    )
}