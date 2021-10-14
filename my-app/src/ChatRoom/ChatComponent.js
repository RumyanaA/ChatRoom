import axios from "axios";
import React from "react";
import { Component } from "react";
import {socket} from './../Services/socket';
import CookiesJar from './../CookiesJar'

class ChatComponent extends CookiesJar{
    constructor(props){
        super()
        this.urlParam = props.urlParams
        this.state={
            inputValue:'',
            sentMessages: [],
            idChat:'',
            showButton:'join'
        }
        this.handleChange=this.handleChange.bind(this);
        this.sendMessage=this.sendMessage.bind(this);
        this.handleKeyPress=this.handleKeyPress.bind(this);
        this.joinRoom=this.joinRoom.bind(this);
        this.leaveRoom=this.leaveRoom.bind(this)
        socket.on('updateChat', message=>{
            var allMessages=this.state.sentMessages
            var messageToPush={
                user:message.user,
                message:message.message,
                timeStamp:message.timeStamp
            }
                allMessages.push(messageToPush)
            this.setState({sentMessages: allMessages })
        })
        
    }
    async joinRoom(){
        
        var userToken=this.getCookie('UserToken')
        var userData={
            userId:userToken,
            chatId:this.props.chatId,
            lastActive:null
        }
        var result=await axios.post('http://localhost:8080/UserJoinedChat',userData)
        this.setState({showButton:result.data})
    }
    async leaveRoom(){
        
        var userToken=this.getCookie('UserToken')
        var userData={
            userId:userToken,
            chatId:this.props.chatId,
            lastActive:null
        }
        var result=await axios.post('http://localhost:8080/UserLeftChat',userData)
        this.setState({showButton:result.data})
    }
    handleChange(event){
        var input = this.state
        input[event.target.name]=event.target.value
        this.setState(input)
    }
    sendMessage(){
        var inputData = this.state.inputValue
        if(inputData!=''){
            var messageInfo={
                user: this.urlParam,
                 message:inputData,
                 timeStamp: new Date(),
                  chatID: this.props.chatId,
                }
            
            socket.emit('newMessage', JSON.stringify(messageInfo))
            inputData=''
            this.setState({inputValue:inputData})
        }
        
    }
    handleKeyPress(event){
        if(event.key==='Enter'){
            this.sendMessage()
        }
    }
    async componentDidUpdate(prevProps){
        if(this.props.chatId!=prevProps.chatId){
            var userToken=this.getCookie('UserToken')
            var data={
                chatID:prevProps.chatId,
                user:this.urlParam,
                userId: userToken
            }
            socket.emit('leftRoom', data)
            var joiningInfo={
                chatId:this.props.chatId,
                userId:userToken
            }
        socket.emit('createRoom',joiningInfo)
        const config = {
            headers: { Authorization: `Bearer ${userToken}` },
            params:{
                chatId:this.props.chatId
            }
            
        };
        var isJoined=await axios.get('http://localhost:8080/GetUserParticipant',config)
        var chatHistory = await axios.get('http://localhost:8080/GetChatHistory',{params:{
            id:this.props.chatId
        }})

        var allMessages=this.state.sentMessages
        allMessages=chatHistory.data
        this.setState({ sentMessages: allMessages , idChat:this.props.chatId, showButton:isJoined.data})
        var data={
            username: this.urlParam,
            chatID: this.props.chatId
        }
            socket.emit('newUserConnected', data)
            socket.on('newUserJoined',greeting=>{  
                allMessages.push(greeting)
                this.setState({sentMessages: allMessages})
            })
    }
}
   async componentDidMount(){
    var chatHistory = await axios.get('http://localhost:8080/GetChatHistory',{params:{
        id:this.props.chatId
    }})
    var userToken=this.getCookie('UserToken')
    
    const config = {
        headers: { Authorization: `Bearer ${userToken}` },
        params:{
            chatId:this.props.chatId
        }
        
    };
    var isJoined=await axios.get('http://localhost:8080/GetUserParticipant',config)

    this.setState({idChat:this.props.chatId, showButton:isJoined.data})
    
    var joiningInfo={
        chatId:this.props.chatId,
        userId:userToken
    }
    socket.emit('createRoom',joiningInfo)
    var allMessages=this.state.sentMessages
    allMessages=chatHistory.data
    var data={
        username: this.urlParam,
        chatID: this.props.chatId
    }
        socket.emit('newUserConnected', data)
        socket.on('newUserJoined',greeting=>{
            
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
                {(this.state.showButton==='join')? <button onClick={this.joinRoom}>Join Room</button> : <button onClick={this.leaveRoom}>Leave Room</button>}              
                        {
                        this.state.sentMessages.map((item, index)=>{
                        return(<div className='' key={index}>
                           
                            <p className='message'>{item.message} <br></br>
                            <span className='userAndTime'>{` ${item.user}  ${item.timeStamp}`} </span>
                            </p>
                            </div>
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