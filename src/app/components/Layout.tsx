// components/Layout.js
import React, { Component } from 'react';
import Header from './Header';

class Layout extends Component {
    render () {
        const { children } = this.props
        return (
        <div className='layout'>
            <Header links={children.links}/>
            {children}
        </div>
        );
    }
}