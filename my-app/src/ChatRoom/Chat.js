import React from "react";
import { Component } from "react";
import ChatComponent from "./ChatComponent";
import {socket} from './../Services/socket'
import Button from "../ReusableComponents/Button";
import AddChatComponent from "./AddChatModal";
import axios from "axios";

class Chat extends Component{
    constructor(props){
        super()
        this.urlParams=props.match.params.username;
        this.state={
            roomNames:[{chatName: 'General chat', _id: '614db8ed4c94aedcb67c3501'}],
            show:false,
            toRender:<ChatComponent urlParams={this.urlParams} chatName='General chat' chatId={'614db8ed4c94aedcb67c3501'} />
        }
        this.ModalShow=this.ModalShow.bind(this);
        this.handleClose=this.handleClose.bind(this);
        this.getName=this.getName.bind(this);
        this.changeToRender=this.changeToRender.bind(this)
        socket.on('addNewChatRoom', data=>{
            var allChatRooms=this.state.roomNames
            allChatRooms.push(data)
            this.setState({roomNames:allChatRooms})
        })
    }
    ModalShow(){
        this.setState({show:true})
    }
    handleClose(data){
        this.setState({show:data})
    }
    getName(data){
        socket.emit('newChatRoom',data)
    }
    changeToRender(event){
        this.setState({toRender:<ChatComponent urlParams={this.urlParams} chatName={event.currentTarget.name} chatId={event.currentTarget.id} />})
    }
    async componentDidMount(){
        var allChatRooms = await axios.get('http://localhost:8080/getChatRooms')
        var oldState=this.state.roomNames
        oldState=allChatRooms.data
        this.setState({roomNames:oldState})
    }
    render(){
        return(
            <div className='chat'>
                <Button label='Add Chat' onClick={this.ModalShow}/>
                <AddChatComponent urlParams={this.urlParams} showModal={this.state.show} handleClose={this.handleClose} getName={this.getName}/>
                 {this.state.toRender}
                <div className='chatRooms'>{this.state.roomNames.map((item)=>{
                    return(<ul>
                        <li className='buttonLis'> <Button className='openChatButton' id={item._id} type='button' name={item.chatName} onClick={this.changeToRender} label={item.chatName}/></li>
                    </ul>
                            
                    )
                })}
          
           </div>
            </div>
        )
    
        
    }

}
export default Chat;