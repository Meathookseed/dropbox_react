import React from "react"
import {Button} from 'reactstrap'
import {Redirect} from 'react-router-dom'

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
            <div>
                <Button onClick={event=>{this.handleLogout(event)}}>sad</Button>
            </div>
        )

    }
}
export default Logout;