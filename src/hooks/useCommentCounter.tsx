import * as React from "react";

const useCommentCounter = ({ entityId }: { entityId: number }) => {
  const [commentCount, setCommentCount] = React.useState(0);

  const handleFetchComments = React.useCallback(() => {
    fetch(`/api/entities/${entityId}/relations/AssetToDiscussion`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setCommentCount(data.children.length);
      })
      .catch((error) => {
        console.error("Error fetching discussion count:", error);
      });
  }, [entityId]);
  React.useEffect(() => {
    const handleCheckForRefetchComments = (evt: Event): void => {
      const { definitionName } = (
        evt as CustomEvent<{ definitionName: string; id: number }>
      ).detail;
      if (definitionName === "M.Discussion") {
        handleFetchComments();
      }
    };
    // ENTITY_CREATED didn't work
    window.addEventListener("ENTITY_SAVED", handleCheckForRefetchComments);
    window.addEventListener("ENTITY_DELETED", handleCheckForRefetchComments);

    return () => {
      window.removeEventListener("ENTITY_SAVED", handleCheckForRefetchComments);
      window.removeEventListener(
        "ENTITY_DELETED",
        handleCheckForRefetchComments
      );
    };
  }, [handleFetchComments]);
  React.useEffect(() => {
    handleFetchComments();
  }, [handleFetchComments]);

  return commentCount;
};

export default useCommentCounter;
