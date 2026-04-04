import { useRef, useState, useEffect } from "react";
import Modal from 'bootstrap/js/dist/modal';

const OPT = {
  title: "Confirm",
  message: "Are you sure?",
  confirmText: "Yes",
  cancelText: "Cancel",
}

export function useConfirmation() {
  const [isOpen, setIsOpen] = useState(false);
  const callbackRef = useRef(null);
  const modalRef = useRef(null);

  const confirm = (callback) => {
    callbackRef.current = callback;
    setIsOpen(true);
  };

  const close = (result) => {
    setIsOpen(false);
    if (callbackRef.current) {
      callbackRef.current(result);
      callbackRef.current = null;
    }
  };

  useEffect(() => {
    if (isOpen) {
      Modal.getOrCreateInstance(modalRef.current)?.show();
    } else {
      Modal.getInstance(modalRef.current)?.hide();
    }
  }, [isOpen]);

  useEffect(() => {
    const modalEl = modalRef.current;
    modalEl?.addEventListener("hidden.bs.modal", () => close(false));
    return () => {
      modalEl?.removeEventListener("hidden.bs.modal", () => close(false));
    };
  }, []);

  const confirmModal = (
    <div className="modal fade" tabIndex="-1" ref={modalRef}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{OPT.title}</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={() => close(false)}></button>
          </div>
          <div className="modal-body">
            <p>{OPT.message}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => close(true)}>{OPT.confirmText}</button>
            <button type="button" className="btn btn-primary" onClick={() => close(false)}>{OPT.cancelText}</button>
          </div>
        </div>
      </div>
    </div>
  );

  return { confirm, confirmModal };
}