import React from 'react';
import {Jumbotron} from 'reactstrap'


class Home extends React.Component {
    render() {
            return (
                <div className='container-fluid m-0 p-0 text-center'>
                    <Jumbotron fluid>
                        <h1 className="display-1">Hello, {this.props.username}!</h1>
                        <p className="lead">You at start of discovering of my new project.</p>
                        <hr className="my-2"/>
                    </Jumbotron>
                </div>
            )
    }
}
Home.defaultProps = { username:'unknown user'};
export default Home;


