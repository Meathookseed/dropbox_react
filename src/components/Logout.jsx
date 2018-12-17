import React from "react"
import {Button} from 'reactstrap'


class Logout extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLogged:null,
            token: localStorage.getItem('token'),
            id: localStorage.getItem('id')
        }
    }
    handleLogout = (event) =>{
        event.preventDefault();
        document.location.href='/';
        this.setState({
            isLogged:false,
            token:localStorage.removeItem('token'),
            id:localStorage.removeItem('id')});
    };

    render() {
        return(
            <div className='row'>
                <div className='col-md-6 col-md-offset-10 '>
                <Button className='mdc-button mdc-button--raised' onClick={event=>{this.handleLogout(event)}}>Log Out</Button>
                </div>
            </div>
        )

    }
}
export default Logout;