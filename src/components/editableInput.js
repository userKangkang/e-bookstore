import {EditTwoTone} from "@ant-design/icons";
import {SaveTwoTone} from "@ant-design/icons";
import {useState} from "react";
import "../css/editable_input.css";

export default function EditableInput({pre_info, icon, ipt, func1, func2}) {
  const [state, setState] = useState(true);
  const child_1 = (
    <EditTwoTone
      onClick={() => {
        func1();
        setChild(child_2);
      }}
      style={{fontSize: 20}}
    />
  );
  const child_2 = (
    <SaveTwoTone
      onClick={() => {
        func2();
        setChild(child_1);
      }}
      style={{fontSize: 20}}
    />
  );
  const [cur_child, setChild] = useState(child_1);

  return (
    <div className={"editable_input"}>
      <div className={"pre_info"}>
        {icon}&nbsp;&nbsp;{pre_info}:
      </div>
      <div className={"input_box"}>{ipt}</div>
      <div className={"edit_icon"}>{cur_child}</div>
    </div>
  );
}
