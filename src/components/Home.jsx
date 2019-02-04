import React from 'react';
import {Jumbotron} from 'reactstrap'
import PropTypes from 'prop-types'

class Home extends React.Component {
    static defaultProps = {
        username: 'unknown user'
    };
    render() {
            return (
                <div className='container-fluid m-0 p-3 text-center ml-auto'>
                    <Jumbotron fluid>
                        <h1 className="display-1">Hello, {this.props.username}!</h1>
                        <p className="lead">You at start of discovering of my new project.</p>
                        <hr className="my-2"/>
                    </Jumbotron>
                </div>
            )
    }
}
Home.propsTypes = {
    username:PropTypes.string
};
export default Home;


