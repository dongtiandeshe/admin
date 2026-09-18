/*
 * @Author: Duanyt
 * @Date: 2026-09-15 08:52:44
 * @LastEditTime: 2026-09-15 09:04:17
 * @LastEditors: Duanyt
 * @Description: 
 */
import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // 1. 读取 Token
  const token = localStorage.getItem('token');
  
  // 2. 获取当前访问的路径（用于登录后跳回原页面）
  const location = useLocation();
  console.log(token===null || token === undefined);
  

  // 3. 🔥 你的任务：判断逻辑
  // 如果没有 token，重定向到 /login，并把当前路径通过 state 传过去
  // 提示：<Navigate to="/login" state={{ from: location.pathname }} replace />
  if(token===null || token === undefined){
    console.log("跳转");
    return <Navigate to="/login" state={{from: location.pathname}} replace></Navigate>
  }
  // 如果有 token，直接渲染 children
  return <>{children}</>;
};

export default ProtectedRoute;