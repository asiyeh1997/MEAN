import React, { Component } from 'react';

class Home extends Component {
    constructor() {
        super()
    }

    render() {
        const imageStyle = {
            width: 400
        }
        return (
            <div>
                <p>Its good to be home</p>
                <img style={imageStyle} src= "https://picsum.photos/1600"></img>
            </div>
        )
    }
}

export default Home;