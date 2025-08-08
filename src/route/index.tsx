import {createBrowserRouter} from "react-router-dom";
import {lazy} from "react";

const Home = lazy(() => import('../pages/App.tsx'))
const ChatPage = lazy(() => import('../pages/Chat/index.tsx'))

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>,
    },
    {
        path: '/chat/:id',
        element: <ChatPage/>
    }
]);


export default router;