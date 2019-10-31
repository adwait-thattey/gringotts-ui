import React, { Component } from 'react';
import { Button, Icon } from 'react-materialize';
import axios from 'axios';

class Homepage extends Component {

    async componentDidMount() {
        // const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
        // this.setState({ posts: res.data })
    }

    state = {
        posts: null
    }

    render() {

        return (
            <div>
                <Button
                    floating
                    fab
                    className="red"
                    large
                >
                    <Button floating icon={<Icon>cloud</Icon>} className="red" />
                    <Button floating icon={<Icon>check</Icon>} className="yellow darken-1" />
                    <Button floating icon={<Icon>android</Icon>} className="green" />
                    <Button floating icon={<Icon>check</Icon>} className="blue" />
                </Button>
            </div>
        )
    }
}

export default Homepage;