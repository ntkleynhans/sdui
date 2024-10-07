import React from "react";
import UIComponent from "./UIComponent";

class UIForm implements UIComponent {
    type_: string;
    label: string;
    action: {
      id_: string;
      action: string;
    };
    name: string;
    value: string;
  }


const Form = (props: UIForm) => {
    return (
        <div key={props.action.id_}>
          <h3>{props.label}</h3>
          <br />
          <b>Component:</b>
          <p>{props.type_}</p>
          <br />
          <b>Action:</b>
          <p>{props.action.id_}</p>
          <p>{props.action.action}</p>
        </div>
    );
}


export default Form;
