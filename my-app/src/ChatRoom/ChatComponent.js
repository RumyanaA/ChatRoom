import React from "react";
import { Component } from "react";
import {socket} from './../Services/socket'

class ChatComponent extends Component{
    constructor(props){
        super()
        this.urlParam = props.urlParams
        this.state={
            inputValue:'',
            sentMessages:[]
        }
        this.handleChange=this.handleChange.bind(this);
        this.sendMessage=this.sendMessage.bind(this);
        this.handleKeyPress=this.handleKeyPress.bind(this);
        socket.on('updateChat', message=>{
            var allMessages=this.state.sentMessages
            allMessages.push(message)
            this.setState({sentMessages: allMessages})
        })
    }
    handleChange(event){
        var input = this.state
        input[event.target.name]=event.target.value
        this.setState(input)
    }
    sendMessage(){
        var inputData = this.state.inputValue
        if(inputData!=''){
            var messageInfo=`${this.props.match.params.username} : ${inputData}` 
            
            socket.emit('newMessage', messageInfo)
            inputData=''
            this.setState({inputValue:inputData})
        }
        
    }
    handleKeyPress(event){
        if(event.key==='Enter'){
            this.sendMessage()
        }
    }
    componentDidMount(){
        var username=this.urlParam
        socket.emit('newUserConnected', username)
        socket.on('newUserJoined',greeting=>{
            var allMessages=this.state.sentMessages
            allMessages.push(greeting)
            this.setState({sentMessages: allMessages})
        })
    
}
    render(){
        return(
            <div>
            <div >
                
                <div className='messages-box'>
                <h><b>{this.props.chatName}</b></h>
                    {
                        this.state.sentMessages.map((item, index)=>{
                        return(<p key={index}>{item}</p>
                        )})
                    }
                </div>
                <div className='input-button'>
                <input className='inputfield' type='text' name='inputValue' value={this.state.inputValue} onChange={this.handleChange} onKeyPress={this.handleKeyPress} ></input>
                <button className='sendButton' type='button' onClick={this.sendMessage} >Send</button>
                </div>
            </div>
            </div>
        )
    
        
    }
}
export default ChatComponent;