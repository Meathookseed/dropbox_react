import React from 'react';
import {Jumbotron} from 'reactstrap'


class Home extends React.Component {
    render() {
            return (
                <div className='container-fluid m-0 p-0 text-center'>
                    <Jumbotron fluid>
                        <h1 className="display-1">Hello, new user!</h1>
                        <p className="lead">This is a simple dropbox like application where communication of server and
                            client based on REST API mechanism. Using Flask on back and ReactJs on front.</p>
                        <hr className="my-2"/>
                    </Jumbotron>
                </div>
            )
    }
}
export default Home;


