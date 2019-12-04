import React, { Component } from 'react';
import SideLayout from '../../hoc/sidelayout/sidelayout';
import api from '../../utils/axios';

class AWS extends Component {
    state = {  
        
    }

    async componentDidMount() {
        try {
            const res = await api.get('api/engine', { headers: { "auth-token": `Bearer ${localStorage.getItem('AUTH_TOKEN')}` } }); 
            console.log(res.data);
        } catch(e) {
            console.log(e);
        }
    }

    render() { 
        return (  
            <React.Fragment>
                <SideLayout>
                    <div>hi</div>
                </SideLayout>
            </React.Fragment>
        );
    }
}
 
export default AWS;