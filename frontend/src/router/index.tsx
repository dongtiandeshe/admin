/*
 * @Author: Duanyt
 * @Date: 2026-08-27 14:48:32
 * @LastEditTime: 2026-09-15 08:54:57
 * @LastEditors: Duanyt
 * @Description: 
 */
import BasicLayout from "@/layouts/BasicLayout";
import Login from "@/login";
import Dashboard from "@/pages/Dashboard";
import UserList from "@/pages/UserList";
import { createBrowserRouter } from "react-router";
import ProtectedRoute from "./ProtectRoute";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: '/',
    element: 
      <ProtectedRoute>
        <BasicLayout />
      </ProtectedRoute>,
    children: [
      {
        index: true,
        element: <Dashboard/>
      },
      {
        path: 'users',
        element: <UserList/>
      }
    ]
  },
  {
    path: '*',
    element: <div>404-页面未找到</div>
  }
]);     


export default router;