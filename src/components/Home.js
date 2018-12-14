import React from 'react';
import {Jumbotron, Button} from 'reactstrap'
import Navigation from '../components/Navigation'
class Home extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            token:localStorage.getItem('token'),
            id:localStorage.getItem('id')
        }
    }
    render() {
        return (
            <div>
            <Navigation/>
            <Jumbotron fluid>
                <h1 className="display-1">Hello, new user!</h1>
                <p className="lead">This is a simple dropbox like application where communication of server and client based on REST API mechanism. Using Flask on back and ReactJs on front.</p>
                <hr className="my-2" />
                <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                <h2 className='text-justify'><a href='/register'>Registration</a></h2>
                <h2 className='text-justify'><a href='/login'>SigIn</a></h2>
            </Jumbotron>
            </div>
        )
            }
}
export default Home;


