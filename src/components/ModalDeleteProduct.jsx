import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal, Space } from "antd";
import { useDeleteProductData } from "../hooks/useProductsData";

const { confirm } = Modal;

export const ModalDeleteProduct = (product) => {
  const item = product.product;

  const { mutate: deleteProduct } = useDeleteProductData();

  const showDeleteConfirm = () => {
    confirm({
      title: `Are you sure delete item "${item.name}"?`,
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteProduct(item.id);
      },
    });
  };

  return (
    <Space wrap>
      <Button onClick={showDeleteConfirm} type="dashed">
        Delete
      </Button>
    </Space>
  );
};
