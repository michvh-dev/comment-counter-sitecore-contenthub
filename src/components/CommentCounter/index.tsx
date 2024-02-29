import ReactDOM from "react-dom";
import CommentCounter from "./CommentCounter";
import { waitForElement } from "../../utils/waitForElement";

const COMMENTS_ID = "tab-comments";

export default function createExternalRoot() {
  const container = document.getElementById(COMMENTS_ID);
  return {
    render(context: any) {
      const renderComp = (c: HTMLElement) => {
        ReactDOM.render(
          <CommentCounter assetId={context.options.entityId} />,
          c
        );
      };
      // Because we try to render an element that is not the container but another one "tab-comments" added logic to wait on component
      if (container) {
        renderComp(container);
      } else {
        waitForElement(`#${COMMENTS_ID}`).then(renderComp);
      }
    },
    unmount() {
      if (container) {
        ReactDOM.unmountComponentAtNode(container);
      }
    },
  };
}
