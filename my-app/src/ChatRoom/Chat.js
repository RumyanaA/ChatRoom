import React from "react";
import { Component } from "react";
import ChatComponent from "./ChatComponent";
import {socket} from './../Services/socket'
import Button from "../ReusableComponents/Button";
import AddChatComponent from "./AddChatModal";
class Chat extends Component{
    constructor(props){
        super()
        this.urlParams=props.match.params.username;
        this.state={
            roomNames:['General chat'],
            show:false,
            toRender:<ChatComponent urlParams={this.urlParams} chatName='General chat'/>
        }
        this.ModalShow=this.ModalShow.bind(this);
        this.handleClose=this.handleClose.bind(this);
        this.getName=this.getName.bind(this);
        this.changeToRender=this.changeToRender.bind(this)
    }
    ModalShow(){
        this.setState({show:true})
    }
    handleClose(data){
        this.setState({show:data})
    }
    getName(data){
        var oldRoomNames=this.state.roomNames
        oldRoomNames.push(data)
        this.setState({roomNames:oldRoomNames})
    }
    changeToRender(event){
        this.setState({toRender:<ChatComponent urlParams={this.urlParams} chatName={event.currentTarget.name}/>})
    }
    render(){
        return(
            <div className='chat'>
                <Button label='Add Chat' onClick={this.ModalShow}/>
                <AddChatComponent showModal={this.state.show} handleClose={this.handleClose} getName={this.getName}/>
                 {this.state.toRender}
                <div className='chatRooms'>{this.state.roomNames.map((item)=>{
                    return(<ul>
                        <li className='buttonLis'> <Button className='openChatButton' type='button' name={item} onClick={this.changeToRender} label={item}/></li>
                    </ul>
                            
                    )
                })}
          
           </div>
            </div>
        )
    
        
    }

}
export default Chat;