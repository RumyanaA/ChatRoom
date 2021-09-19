import React, { Component } from 'react';
import Chat from './Chat';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default class ChatRoom extends Component {
    render = () => {
        return (
            <div className='layout'>
                
            <Switch>
                
                <Route  path="/Chat/:username" component={Chat} />
            </Switch>
           
         
        </div>
    );
           
        
    }
}