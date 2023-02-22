import axios from "axios";
import { useQuery } from "react-query";
import { Table, Spin } from "antd";

const columnsTitle = [
  {
    title: "STT",
    dataIndex: "id",
    key: "id",
    render: (text) => <p>{text}</p>,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
];

const fetchListComment = (postId) => {
  return axios.get(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  );
};

export const ListComment = ({ postId }) => {
  const { isLoading, data, isError, error } = useQuery(
    ["list-comment", postId],
    () => fetchListComment(postId)
  );

  const newData = data?.data.map((item) => ({
    ...item,
    key: item.id,
  }));

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "40px",
        }}
      >
        <Spin />
      </div>
    );
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div>
      <Table columns={columnsTitle} dataSource={newData} pagination={false} />
    </div>
  );
};
