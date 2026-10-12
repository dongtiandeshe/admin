/*
 * @Author: Duanyt
 * @Date: 2026-08-27 14:48:32
 * @LastEditTime: 2026-10-12 11:28:05
 * @LastEditors: Duanyt
 * @Description: 
 */
import BasicLayout from "@/layouts/BasicLayout";
import Login from "@/login";
import Dashboard from "@/pages/Dashboard";
import UserList from "@/pages/UserList";
import { createBrowserRouter } from "react-router";
import ProtectedRoute from "./ProtectRoute";
import Practice from "@/pages/Practice";

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
      },
      {
        path: 'practice',
        element: <Practice/>
      }
    ]
  },
  {
    path: '*',
    element: <div>404-页面未找到</div>
  }
]);     


export default router;