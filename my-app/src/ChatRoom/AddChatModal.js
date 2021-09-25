import Modal from 'react-bootstrap/Modal'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'
import { Component } from 'react'
import Button from 'react-bootstrap/Button'
import CloseButton from 'react-bootstrap/esm/CloseButton'
import InputField from '../ReusableComponents/InputField'
import axios from 'axios'
import CookiesJar from '../CookiesJar'


class AddChatComponent extends CookiesJar{
    constructor(props){
        super();
       this.state={
           
           chatName:''
       }
       this.setClose=this.setClose.bind(this)
       this.handleChange= this.handleChange.bind(this)
       this.saveChatName= this.saveChatName.bind(this)
    }
    setClose(){
        this.props.handleClose(false)
    }
    handleChange(event){
        var oldState=this.state
        oldState[event.target.name] = event.target.value
        this.setState(oldState)
    }
   async saveChatName(){
       var token=this.getCookie('UserToken')
       var newChatRoom={
           chatName: this.state.chatName,
           messages:[],
           createdby: token
       }
       var result = await axios.post('http://localhost:8080/CreateChatRoom', newChatRoom);
       var newChatData={
           chatName: this.state.chatName,
           id: result.data
       }
        this.props.getName(newChatData)
        this.props.handleClose(false)
    }
    render(){
        return(
            <>
            <Modal show={this.props.showModal} onHide={this.setClose}>
            <Modal.Header closeButton>
              <Modal.Title>Create new Chat Room</Modal.Title>
            </Modal.Header>
            <Modal.Body> <InputField type='text' name='chatName' onChange={this.handleChange}/> </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.setClose}>
                Close
              </Button>
              <Button variant="primary" onClick={this.saveChatName}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
          </>
        )
    }
}
export default AddChatComponent;