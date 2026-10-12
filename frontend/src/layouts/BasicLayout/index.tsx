import { Link, Outlet } from "react-router";

export default function BasicLayout() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* 简陋侧边栏，后续可以换成 Antd 的 Menu */}
      <div
        style={{
          width: 200,
          background: "#001529",
          color: "#fff",
          padding: "20px",
        }}
      >
        <h2>管理系统</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <Link to="/" style={{ color: "#fff" }}>
              仪表盘
            </Link>
          </li>
          <li>
            <Link to="/users" style={{ color: "#fff" }}>
              用户管理
            </Link>
          </li>
          <li>
            <Link to="/practice" style={{ color: "#fff" }}>
              学习笔记
            </Link>
          </li>
        </ul>
      </div>
      <div style={{ flex: 1, padding: "20px", background: "#f0f2f5" }}>
        {/* 这里就是子路由渲染的位置 */}
        <Outlet />
      </div>
    </div>
  );
}
