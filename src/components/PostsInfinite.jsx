import { useInfiniteQuery } from "react-query";
import axios from "axios";
import { Space, Table, Button, Spin } from "antd";
import { Link } from "react-router-dom";

const fetchPosts = ({ pageParam = 1 }) => {
  return axios.get(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageParam}`
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
    render: (_, record) => {
      return (
        <Space size="middle">
          <Link to={`/post/comments/${record.id}`}>View people comment</Link>
        </Space>
      );
    },
  },
];

export const PostsInfinite = () => {
  const { isLoading, isError, error, data, fetchNextPage, hasNextPage } =
    useInfiniteQuery(["posts"], fetchPosts, {
      getNextPageParam: (_lastPage, pages) => {
        if (pages.length < 4) {
          return pages.length + 1;
        } else {
          return undefined;
        }
      },
    });

  if (isLoading) {
    return <Spin />;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  const getNewData = () => {
    const newData = data?.pages.flatMap((page) =>
      page.data.map((item) => ({
        ...item,
        key: item.id,
      }))
    );
    return newData;
  };

  return (
    <>
      <div>
        <Table columns={columns} dataSource={getNewData()} pagination={false} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
          Load more
        </Button>
      </div>
    </>
  );
};
