import PropTypes from "prop-types";

type TFeedContainerProps = {
  children: React.ReactNode;
};

const FeedContainer: React.FC<TFeedContainerProps> = ({ children }) => {
  return <div className="flex flex-col gap-6">{children}</div>;
};

FeedContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FeedContainer;
