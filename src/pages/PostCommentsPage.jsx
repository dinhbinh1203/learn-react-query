import React from "react";
import { useParams } from "react-router";
import { ListComment } from "../components/ListComment";

export const PostCommentsPage = () => {
  const { postId } = useParams();
  return (
    <div>
      <ListComment postId={postId} />
    </div>
  );
};
