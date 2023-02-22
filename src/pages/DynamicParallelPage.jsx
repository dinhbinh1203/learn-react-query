import React from "react";
import axios from "axios";
import { useQueries } from "react-query";
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

export const DynamicParallelPage = ({ productIds }) => {
  const queryResults = useQueries(
    productIds.map((id) => {
      return {
        queryKey: ["dynamic-parallel", id],
        queryFn: () => fetchListComment(id),
      };
    })
  );

  return (
    <>
      <h3>Fetch 3 list comment a time</h3>
      <div>
        {queryResults?.map((result, index) => {
          const newData = result?.data?.data.map((item) => ({
            ...item,
            key: item.id,
          }));

          return (
            <div key={index}>
              <h4>Result {index + 1}</h4>
              <Table
                columns={columnsTitle}
                dataSource={newData}
                pagination={false}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};
