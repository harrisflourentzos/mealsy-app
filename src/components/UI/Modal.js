import { Fragment } from "react";
import ReactDom from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  const overlaysTarget = document.getElementById("overlays");

  return (
    <Fragment>
      {ReactDom.createPortal(
        <Backdrop onClick={props.onClick} />,
        overlaysTarget
      )}
      {ReactDom.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        overlaysTarget
      )}
    </Fragment>
  );
};

export default Modal;
