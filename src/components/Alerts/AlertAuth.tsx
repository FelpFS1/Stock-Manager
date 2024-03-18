import { useState } from "react"
import { motion } from "framer-motion"


export default function AlertAuth({ content }: { content: string }) {
    const [showAlert, setShowAlert] = useState(true)
    setTimeout(() => {
        setShowAlert(false)
    }, 5500)
    return (
        <motion.div
            initial={{ translateX: -1000, opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0], translateX: [-1000, 0, 0, -1000], }}
            transition={{ duration: 5.6, ease: "easeInOut" }}
            exit={{ translateX: -100, opacity: 0 }}
            className={showAlert ? " relative  flex justify-center z-50  bg-red-400  p-5 rounded-2xl font-bold" : ""}>
            <p>{content}</p>
        </motion.div>
    )

}