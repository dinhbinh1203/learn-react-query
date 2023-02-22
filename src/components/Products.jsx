import { Spin, Space, Table, Card } from "antd";
import { ModalDeleteProduct } from "./ModalDeleteProduct";
import ModalAddEditProduct from "./ModalAddEditProduct";
import { useProductsData } from "../hooks/useProductsData";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Prev Price",
    dataIndex: "prevPrice",
    key: "prevPrice",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => {
      return (
        <Space size="middle">
          <ModalDeleteProduct product={record} />
          <ModalAddEditProduct product={record} />
        </Space>
      );
    },
  },
];

export const Products = () => {
  const { isLoading, isError, error, data } = useProductsData();

  if (isLoading) {
    return <Spin />;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  const newData = data?.data?.map((item) => ({
    ...item,
    key: item?.id,
  }));

  console.log("newData", newData);

  return (
    <div>
      <Card title="Dashboard" bordered={false} extra={<ModalAddEditProduct />}>
        <Table columns={columns} dataSource={newData} />
      </Card>
    </div>
  );
};
