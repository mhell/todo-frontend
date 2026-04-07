import { useRef } from "react";
import { Alert } from "bootstrap";

const AlertBar = ({message}) => {
  const alertRef = useRef(null);

  const handleClose = () => {
    const alertEl = Alert.getOrCreateInstance(alertRef.current);
    alertEl.close();
  }

  return (
    <div className="alertBar">
      <div className="alert alert-danger alert-dismissible fade show rounded-0 mb-0" role="alert" ref={alertRef}>
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        {message}
        <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
      </div>
    </div>
  );
};

export default AlertBar;