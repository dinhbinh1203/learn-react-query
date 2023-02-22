import { Space, Table, Pagination, Spin } from "antd";
import { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

const fetchPosts = (pageNumber) => {
  return axios.get(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNumber}`
  );
};

const columns = [
  {
    title: "STT",
    dataIndex: "id",
    key: "id",
    render: (text) => <p>{text}</p>,
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
          <Link to={`/post/comments/${record.id}`}>View people comment</Link>
        </Space>
    ),
  },
];

const PostsPaginated = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { isLoading, isError, error, data } = useQuery(
    ["posts", currentPage],
    () => fetchPosts(currentPage),
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) {
    return <Spin />;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  const newData = data?.data.map((item) => ({
    ...item,
    key: item.id,
  }));

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Table columns={columns} dataSource={newData} pagination={false} />
      <Pagination
        defaultCurrent={1}
        total={50}
        onChange={handlePageChange}
        style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}
      />
      ;
    </>
  );
};
export default PostsPaginated;
