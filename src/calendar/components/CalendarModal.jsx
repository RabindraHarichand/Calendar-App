import { useState } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "45%",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const CalendarModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  const onCloseModal = () => {
    console.log("cerrando modal");
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1>Hola Mundo</h1>
      <hr />
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat, sint
        perspiciatis laudantium optio excepturi omnis aut. Magni temporibus nam
        ea, obcaecati odit facilis adipisci dolor tempore aut autem facere
        perferendis.
      </p>
    </Modal>
  );
};
