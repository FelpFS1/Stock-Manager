import { motion } from "framer-motion";

export default function AlertDelete({
  name,
  handleDelete,
  setShowAlert,
}: {
  name?: string;
  handleDelete: () => void;
  setShowAlert: (value: boolean) => void;
}) {
  const handleClickDelete = () => {
    handleDelete();
  };
  const hancleClickCancel = () => {
    setShowAlert(false);
  };

  return (
    <motion.div
      initial={{ translateX: -1000, opacity: 0 }}
      animate={{ opacity: [0, 1], translateX: [-1000, 0] }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className={
        "absolute w-10/12 -left-2/4 -right-2/4 py-10  bg-white text-center m-auto md:w-2/5 rounded-md"
      }
    >
      <div>
        <p className="text-black">
          Você está prestes a deletar esse produto:{" "}
          <span className="font-bold text-red-500">{name}</span>
        </p>
      </div>
      <div className="flex gap-5 md:gap-10 justify-center mt-10">
        <button
          onClick={() => handleClickDelete()}
          className="bg-blue-600 p-2 font-bold rounded-md "
        >
          Deletar
        </button>
        <button
          onClick={() => hancleClickCancel()}
          className="bg-red-600 p-2 font-bold rounded-md"
        >
          Cancelar
        </button>
      </div>
    </motion.div>
  );
}
