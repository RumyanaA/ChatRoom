import React, { Fragment } from "react";
function Button(props) {
    return (
      <button  name={props.name} id={props.id} className={props.className} data-toggle={props.datatoggle} onClick={props.onClick}>
        {props.label}
      </button>
    );
   }
   export default Button;