import React, {Fragment} from 'react'
function InputField(props){
    return(
        <input className={props.className} label={props.label} name={props.name} id={props.id}
         type={props.type} placeholder={props.placeholder} value={props.value} onChange={props.onChange}>
        </input>
    )
}
export default InputField;