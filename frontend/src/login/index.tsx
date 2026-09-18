import { Navigate } from "react-router";
import "./login.css";

/*
 * @Author: Duanyt
 * @Date: 2026-08-27 14:45:54
 * @LastEditTime: 2026-09-15 08:52:21
 * @LastEditors: Duanyt
 * @Description:
 */
export default function Login() {
  const token = localStorage.getItem('token');
  if (token) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="login-container">
      <h2>登录</h2>
      <div className="login-form">
        <div className="form-group">
          <label>账号</label>
          <input type="text" className="form-control" name="username" />
        </div>
        <div className="form-group">
          <label>密码</label>
          <input type="password" className="form-control" name="password" />
        </div>
        <button type="submit" className="btn-primary">
          登录
        </button>
      </div>
    </div>
  );
}
