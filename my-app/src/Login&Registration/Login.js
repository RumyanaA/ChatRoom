import React from "react";
import CookiesJar from "../CookiesJar";
import InputField from "../ReusableComponents/InputField";
import Button from "../ReusableComponents/Button";
import axios from "axios";
import { withRouter } from 'react-router-dom';

class Login extends CookiesJar{
    constructor(props){
        super();
        this.state={
            username:'',
            password:'',
            errormsg:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    handleChange(event) {
        var userData = this.state;
        userData[event.target.name] = event.target.value;
        this.setState(userData);
    }
    async submit(){
        var loginData={
            username: this.state.username,
            password: this.state.password
        }
        var token = await axios.post('http://localhost:8080/Login', loginData)
        if(token.data=='-1'){
            this.setState({errormsg:'Wrong username or password'})
            
        }else{
            this.setCookie('UserToken', token.data,'')
            this.props.history.push(`/Chat/${loginData.username}`);
        }
    }
    render(){
        return(
            <div className='registration-form'>
                
                <h><b>Login</b></h>
                <InputField  className='nameField' type='text' name='username' onChange={this.handleChange}/>
                <InputField  className='nameField' type='password' name='password'onChange={this.handleChange}/>
                <span>{this.state.errormsg}</span>
                <Button onClick={this.submit} label='Login'/>
            </div>
        )
    }
}
export default withRouter(Login);