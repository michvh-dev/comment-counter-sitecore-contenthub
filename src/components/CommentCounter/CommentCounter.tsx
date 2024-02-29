import * as React from "react";
import useCommentCounter from "../../hooks/useCommentCounter";

interface CommentCounterProps {
  assetId: number;
}

const CommentCounter: React.FC<CommentCounterProps> = ({ assetId }) => {
  const commentCount = useCommentCounter({ entityId: assetId });

  return (
    <>{commentCount ? <span>Comments ({commentCount})</span> : "Comments"}</>
  );
};

export default CommentCounter;
