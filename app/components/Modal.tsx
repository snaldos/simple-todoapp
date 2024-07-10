import { ImCross } from "react-icons/im";

interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (modalOpen: boolean) => boolean | void;
  children: React.ReactNode;
}

export default function Modal({ modalOpen, setModalOpen, children }: ModalProps) {
  return (
    <div>
      <div className={`modal ${modalOpen ? "modal-open" : ""}`} role="dialog">
        <div className="modal-box relative">
          <label
            onClick={() => setModalOpen(false)}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            <ImCross />
          </label>
          {children}
        </div>
      </div>
    </div>
  );
}
