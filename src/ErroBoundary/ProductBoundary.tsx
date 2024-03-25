import { useContext} from "react";
import {
  isRouteErrorResponse,
  useRouteError,
  useNavigate,
} from "react-router-dom";
import { RootContext } from "../Contexts/RootContext";

export default function ProductBoundary() {
  const navigate = useNavigate();
  const { theme } = useContext(RootContext);
  const handleNavigate = () => {
    navigate('/',{replace:true})
  };
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <section
        className={"min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8 "}
      >
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">404</p>
          <h1
            className={
              theme == "dark"
                ? " text-white mt-4 text-3xl font-bold tracking-tight sm:text-5xl"
                : "mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl"
            }
          >
            Produto não encontrado!{" "}
          </h1>
          <p
            className={
              theme == "dark"
                ? "mt-6 text-base leading-7 text-white"
                : "mt-6 text-base leading-7 text-gray-600"
            }
          >
            Lamentamos, mas não conseguimos encontrar o produto que procura.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              onClick={handleNavigate}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </button>
          </div>
        </div>
      </section>
    );
  }
}
