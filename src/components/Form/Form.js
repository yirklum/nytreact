import React from "react";

export const Form = props => (
  <button {...props} style={{ float: "right", marginBottom: 10 }} className="btn btn-success">
    {props.children}
  </button>




);

export const Input = props => (
  <div className="form-group">
    <input className="form-control" {...props} />
  </div>
);

export const TextArea = props => (
  <div className="form-group">
    <textarea className="form-control" rows="20" {...props} />
  </div>
);
