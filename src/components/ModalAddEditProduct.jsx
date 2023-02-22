import { Button, Modal, Form, Input } from "antd";
import { useState } from "react";
import { useForm } from "antd/es/form/Form";
import {
  useUpdateProductData,
  useAddProductData,
} from "../hooks/useProductsData";

const ModalAddEditProduct = (product) => {
  const item = product.product;
  const [form] = useForm();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const { mutate: addProduct } = useAddProductData();
  const { mutate: updateProduct } = useUpdateProductData();

  const onFinish = (values) => {
    if (item) {
      let result = { ...values, id: item.id, key: item.id };
      updateProduct(result);
    } else {
      addProduct(values);
      form.resetFields(["name", "price", "prevPrice"]);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const showModal = () => {
    setOpen(true);
    if (item) {
      form.setFieldValue("name", item.name);
      form.setFieldValue("price", item.price);
      form.setFieldValue("prevPrice", item.prevPrice);
    }
  };

  const handleOk = () => {
    form.submit();
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {!item ? "Add" : "Edit"}
      </Button>
      <Modal
        title={!item ? "Add Product" : "Edit Product"}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={!item ? "Add Product" : "Edit Product"}
        confirmLoading={confirmLoading}
      >
        <div>
          <Form
            form={form}
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Name Product"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input name of Product!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              type="number"
              rules={[
                {
                  required: true,
                  message: "Please input price of product!",
                },
                {
                  pattern: new RegExp(/^[0-9]+$/),
                  message: "Please input number",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Prev Price"
              name="prevPrice"
              rules={[
                {
                  pattern: new RegExp(/^[0-9]+$/),
                  message: "Please input number",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};
export default ModalAddEditProduct;
