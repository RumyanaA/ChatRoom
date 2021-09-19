import React from "react";
import { Component } from "react";
class Chat extends Component{
    constructor(props){
        super()
        this.urlParam = props.match.params.username;
    }
    render(){
        return(
            <h>{this.props.match.params.username}</h>
        )
    
        
    }

}
export default Chat;