/*
 * @Author: Duanyt
 * @Date: 2026-08-27 14:48:32
 * @LastEditTime: 2026-08-27 15:30:27
 * @LastEditors: Duanyt
 * @Description: 
 */
import Login from "@/login";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
]);     


export default router;