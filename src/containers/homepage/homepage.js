import React, { Component } from 'react';
import { Button, Icon } from 'react-materialize';

class Homepage extends Component {
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
                    <Button floating icon={<Icon />} className="green" />
                    <Button floating icon={<Icon />} className="blue" />
                </Button>

            </div>
        )
    }
}

export default Homepage;