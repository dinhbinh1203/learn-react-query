import "./DefaultLayout.css";
import { Outlet, Link } from "react-router-dom";
import { Layout, Menu, theme } from "antd";
const { Header, Content } = Layout;

const DefaultLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" >
          <Menu.Item key={0}>
            <Link to="/">Infinite Queries</Link>
          </Menu.Item>
          <Menu.Item key={1}>
            <Link to="/paginated-queries">Paginated Queries</Link>
          </Menu.Item>
          <Menu.Item key={2}>
            <Link to="/dynamic-parallel">Dynamic Parallel</Link>
          </Menu.Item>
          <Menu.Item key={3}>
            <Link to="/dependent-queries">Dependent queries</Link>
          </Menu.Item>
          <Menu.Item key={4}>
            <Link to="/crud-products">CRUD Products</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content
        style={{
          padding: "0 50px",
        }}
      >
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};
export default DefaultLayout;
