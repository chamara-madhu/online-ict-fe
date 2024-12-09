import { Dialog } from "evergreen-ui";
import PropTypes from "prop-types";

const CommonModel = ({
  isOpen,
  onClose,
  hasFooter = false,
  hasHeader = false,
  children,
}) => {
  return (
    <Dialog
      isShown={isOpen}
      title="Dialog title"
      onCloseComplete={onClose}
      confirmLabel="Custom Label"
      hasFooter={hasFooter}
      hasHeader={hasHeader}
      //   width="100%"
      //   minHeightContent="100vh"
    >
      {children}
    </Dialog>
  );
};

CommonModel.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  hasFooter: PropTypes.bool,
  hasHeader: PropTypes.bool,
  children: PropTypes.node,
};

export default CommonModel;
