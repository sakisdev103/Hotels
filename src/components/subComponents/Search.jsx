import React, { useState } from "react";
import ModalComponent from "./ModalComponent";
import Buttons from "./Buttons";

const Search = () => {
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState({
    id: null,
    title: "",
  });

  return (
    <>
      <div className="container-fluid my-4">
        <h1>Where to?</h1>
        <div className="container-fluid">
          <Buttons setModal={setModal} show={show} setShow={setShow} />
          <ModalComponent modal={modal} show={show} setShow={setShow} />
        </div>
      </div>
    </>
  );
};

export default Search;
