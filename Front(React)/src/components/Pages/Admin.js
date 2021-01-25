import React from 'react';
import SignIn from '../SignIn/SignIn';
import SendBookPage from '../SendBookPage/SendBookPage';
class Admin extends React.Component{
    constructor(){
        super ();
        this.state={
            route:'signIn'
        }
    }

    onRouteChange=(route)=>{
        this.setState({route: route});
    }
    render(){
        return(
            <div className="App">
                {this.state.route === 'signImn'
                    ? <SignIn onRouteChange={this.onRouteChange}/>
                    : <div><SendBookPage /></div>
                }
            </div>
        )
    }
};

export default Admin;