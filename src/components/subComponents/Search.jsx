import React, { useState } from "react";
import ModalComponent from "./ModalComponent";
import Buttons from "./Buttons";

const Search = () => {
  const [show, setShow] = useState(false);
  const [modalId, setModalId] = useState(null);

  return (
    <>
      <div className="container my-4">
        <h1>Where to?</h1>
        <Buttons setModalId={setModalId} show={show} setShow={setShow} />
        <ModalComponent modalId={modalId} show={show} setShow={setShow} />
      </div>
    </>
  );
};

export default Search;
