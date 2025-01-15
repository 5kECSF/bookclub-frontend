import React, { useState } from "react";

export function Child1({ modalOpen, setModalOpen }: any) {
  return (
    <div>
      <p>Modal is {modalOpen ? "Open" : "Closed"}</p>
      <button onClick={() => setModalOpen(modalOpen + "1")}>
        Toggle Modal, {modalOpen}
      </button>
    </div>
  );
}
export function Parent({ children }: any) {
  const [modalOpen, setModalOpen] = useState("12");

  return (
    <>
      <div>Some data</div>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { modalOpen, setModalOpen }),
      )}
    </>
  );
}
export function Child2({ modalOpen }: any) {
  return <p>Child2 sees modal: {modalOpen ? "Open" : "Closed"}</p>;
}
