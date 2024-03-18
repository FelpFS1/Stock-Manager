import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/RootLayout";
import Dashboard from "../pages/Dashboard";
import StockItems from "../pages/StockItems";
import NewItem from "../pages/NewItem";
import StockLayout from "../components/StockLayout";
import EditItem from "../pages/EditItem";
import InfoItem from "../pages/infoItem";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

const router = createBrowserRouter([{
    path: "/",
    element: <RootLayout />,
    children: [{
        index: true,
        element: <Dashboard />
    },
    {
        path: 'items',
        element: <StockLayout />,
        children: [
            {
                index: true,
                element: <StockItems />,
            },
            {
                path: 'new-item',
                element: <NewItem />
            }, {
                path: 'update-item/:id',
                element: <EditItem />
            },{
                path:'info-item/:id',
                element:<InfoItem/>
            }
        ]
    }


    ]
}
,{
    path:"/login",
    element:<Login/>
},
{
    path:"/register",
    element:<Register/>
}

])


export default router