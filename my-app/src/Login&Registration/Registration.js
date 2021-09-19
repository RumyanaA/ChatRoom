import React, { Component } from 'react';
import InputField from '../ReusableComponents/InputField';
import Button from '../ReusableComponents/Button';
import axios from 'axios'
import CookiesJar from '../CookiesJar';
import { withRouter } from 'react-router-dom';

class Registration extends CookiesJar{
    constructor(props){
        super()
        this.state={
            username:'',
            email:'',
            password: ''
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
          var userData={
              username: this.state.username,
              email: this.state.email,
              password: this.state.password
          }
        var res = await axios.post('http://localhost:8080/Register', userData);
        var response = res.data;
        this.setCookie('UserToken', response,'')
        alert('registration completed')
        this.props.history.push(`/Chat/${userData.username}`);
      }
    render(){
        return(
            <div>
                <label><b>Registration</b></label>
                <label>Username</label>
                <InputField type='text' name='username' onChange={this.handleChange}/>
                <label>Email</label>
                <InputField type='text' name='email' onChange={this.handleChange}/>
                <label>Password</label>
                <InputField type='password' name='password' onChange={this.handleChange}/>
                <Button type='submit' label='Register' onClick={this.submit}/>
            </div>
        )
    }
}
export default withRouter(Registration);