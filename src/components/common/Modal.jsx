import "./Modal.css";
import {useEffect, useRef} from 'react';
import Modal from 'bootstrap/js/dist/modal';

const Edit = ({children, header, isOpen, onCancel}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      Modal.getOrCreateInstance(modalRef.current)?.show();
    } else {
      Modal.getInstance(modalRef.current)?.hide();
    }
  }, [isOpen]);

  useEffect(() => {
    const modalEl = modalRef.current;
    modalEl?.addEventListener("hidden.bs.modal", onCancel);
    return () => {
      modalEl?.removeEventListener("hidden.bs.modal", onCancel);
    };
  }, []);

  return (
    <div id="edit-modal" className="modal fade" tabIndex="-1" aria-hidden="true" ref={modalRef}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{header}</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onCancel}></button>
          </div>
          <div className="modal-body p-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;