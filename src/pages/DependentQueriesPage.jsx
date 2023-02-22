import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Spin, Table } from "antd";

const fetchPost = (postId) => {
  return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
};

const fetchListComment = (postId) => {
  return axios.get(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  );
};

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

export const DependentQueriesPage = ({ postId }) => {
  const { data: post } = useQuery(["post", postId], () => fetchPost(postId));

  const userId = post?.data.userId;

  const { data: listComment, isLoading: isFetchListCommentLoading } = useQuery(
    ["courses", userId],
    () => fetchListComment(userId),
    {
      enabled: !!userId,
    }
  );

  const newData = listComment?.data.map((item) => ({
    ...item,
    key: item.id,
  }));

  return (
    <div>
      <h2>Fetch list comment from userId of post</h2>
      {isFetchListCommentLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <Spin />
        </div>
      ) : (
        <Table columns={columnsTitle} dataSource={newData} pagination={false} />
      )}
    </div>
  );
};
