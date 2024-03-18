import { motion, useTime, useTransform } from "framer-motion";

export default function AlertAwait() {
    const time = useTime()
    const rotate = useTransform(
        time,
        [0, 4000],
        [0, 360],
        { clamp: false }
    )
    return (
        <div className="absolutew-10/12 -left-2/4 -right-2/4 -2 py-10 text-center m-auto flex flex-col justify-center items-center bg-slate-500">
            <motion.div
                style={{ rotate }}
                className="border-b-4 border-t-4 border-b-red-700 border-t-red-700 p-10 rounded-full w-10 h-10"
            >


            </motion.div>
            <h1>Adicionando produto!</h1>

        </div>)
}