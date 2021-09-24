import React, { Component } from "react";
import Registration from "./Registration";
import Button from "../ReusableComponents/Button";
import Login from "./Login";

class LoginRegister extends Component{
    constructor(props){
        super();
        this.state={
            openForm:'registration'
        }
       
        this.toggleBox=this.toggleBox.bind(this);
    }
    toggleBox(event){
        var currentState=this.state.openForm
        
        if('reg'==event.currentTarget.name){
        currentState='Login'
        this.setState({openForm:currentState})
        }
        if('login'==event.currentTarget.name){
            currentState='registration'
        this.setState({openForm:currentState})
        }
    }
    render(){
        var toRender=this.state.openForm
        if(toRender=='registration'){
        return(
            <div>
             <Button name='reg' onClick={this.toggleBox} label='Go to Login'/>
            <Registration />
            </div> 
        )
        }else if(toRender=='Login'){
            return(
                <div>
             <Button name='login' onClick={this.toggleBox} label='Go to Registration'/>
            <Login />
            </div> 
            )
        }
    }

}
export default LoginRegister