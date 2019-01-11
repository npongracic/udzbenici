import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

class Modal extends Component {
    constructor(props) {
        super(props);

        this.rootSelector = document.getElementById("modal-root");
        this.container = document.createElement("div");
    }

    componentDidMount() {
        this.rootSelector.appendChild(this.container);
    }

    componentWillUnmount() {
        this.rootSelector.removeChild(this.container);
    }

  render() {
    return this.props.open ? (ReactDOM.createPortal(
      <div>
        <div className="modal-background" />
        <div role="dialog" className="modal-dialog">
          <header>
            <span>{this.props.header}</span>
            <button
              onClick={() => this.props.onClose()}
              type="button"
              aria-label="close">
              CLOSE
            </button>
          </header>
          <div className="modal-content">{this.props.children}</div>
        </div>
      </div>, this.container
    )) : null;
  }
}

export default Modal;