import React from 'react';
import {Jumbotron} from 'reactstrap'


class Home extends React.Component {
    render() {
            return (
                <div className='container-fluid m-0 p-0 text-center'>
                    <Jumbotron fluid>
                        <h1 className="display-1"> {this.props.text1}!</h1>
                        <p className="lead">{this.props.text2}</p>
                        <hr className="my-2"/>
                    </Jumbotron>
                </div>
            )
    }
}
export default Home;


