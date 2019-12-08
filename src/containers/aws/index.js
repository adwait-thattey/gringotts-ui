import React, { Component } from 'react';
import SideLayout from '../../hoc/sidelayout/sidelayout';
import Layout from '../../hoc/Layout/Layout';
import ConfigModal from '../../components/AWS/ConfigModal';
import ConfigMessage from '../../components/AWS/ConfigMessage';
import RolesCard from '../../components/AWS/RolesCard';
import RoleInfo from '../../components/AWS/RoleInfo';
import M from 'materialize-css';
import './style.css'
import API from '../../utils/axios';

class AWS extends Component {
    state = {  
        formFields: {
			selectedInstance: 'EC2',
			roleName: '',
		},
        configModalInstance: null,
        revealCredModalInstance: null,
        selectedRole: "",
        engineName: null,
        roles: [],
        status: 1,
        
    }

    async componentDidMount() {

        let modalOptions = {
            inDuration: 300,
            outDuration: 500
        };

        let revealCredModal = document.getElementById('credModal');
        revealCredModal = M.Modal.init(revealCredModal, modalOptions);
        this.setState({ revealCredModalInstance: revealCredModal });

        let configAWSEngineModal = document.getElementById('configModal');
        configAWSEngineModal = M.Modal.init(configAWSEngineModal, modalOptions);
        this.setState({ configModalInstance: configAWSEngineModal, 
                        engineName : this.getEngineNameFromUrl(this.props.location.pathname)  });

        try {
            const res = await API.get('api/engine', { headers: { "auth-token": `Bearer ${localStorage.getItem('AUTH_TOKEN')}` } }); 
            const engName = this.getEngineNameFromUrl(this.props.location.pathname);
            const desiredEngine = res.data.filter(eng => (eng.name === engName && eng.type === 'aws'));
            this.setState({roles: desiredEngine.categories, status: desiredEngine.flag, engineName: engName})
            console.log(res.data);
        } catch(e) {
            console.log(e);
        }
    }

    getEngineNameFromUrl = (url) => {
        const locationSplitBySlash = url.split('/');
        return locationSplitBySlash[locationSplitBySlash.length - 1];
    }

    configModalOpen = () => {
        this.state.configModalInstance.open()
    }

    rolesFormInputHandler = (event, id) => {
        const formFields = {...this.state.formFields};
        switch(id) {
            case 1: 
                formFields.selectedInstance = event.target.value;
                break;
            case 2:
                formFields.roleName = event.target.value;
                break;
            default:
        }
        this.setState({formFields})
        console.log(formFields);
    }

    roleClickedHandler = (role) => {
        this.setState({ selectedRole: role.name});
    };

    configureAWSEngine = async () => {
        const newAccessKey = document.getElementById('access-key-input').value;
        const newSecretKey = document.getElementById('secret-key-input').value;
        const newAccountName = document.getElementById('account-name-input').value;
        this.setState({ status: 1})

        try {
            const res = await API.post(`/api/dynamic/aws/${this.getEngineNameFromUrl(this.props.location.pathname)}/config`, {
                "accessKey": newAccessKey,
                "secretKey": newSecretKey,
                "accountName": newAccountName
            }, { headers: { "auth-token": `Bearer ${localStorage.getItem("AUTH_TOKEN")}` } })
            console.log(res.data);  

            
        } catch (e) {
            console.log(e);
        }
    }

    createRole = async () => {
        const newRoleName = this.state.formFields.roleName ;
        const selectedInstance = this.state.formFields.selectedInstance;
        console.log(newRoleName);
        if (newRoleName === '' || selectedInstance === '') {
            console.log("No name given");
            return
        }
        const currentRoles = this.state.roles;
        const existingRoles = currentRoles.filter(role => role.name === newRoleName);
        if (existingRoles.length > 0) {
            console.log("Role Already Exists")
            return
        }
        else {
            const newRole = {
                name: newRoleName,
                generatedCreds: []
            }
            currentRoles.push(newRole);
            this.setState({ roles: currentRoles, formFields: { selectedInstance: 'EC2', roleName: ''} });
            // call API to create role
            try {
                const res = await API.post(`/api/dynamic/aws/${this.getEngineNameFromUrl(this.props.location.pathname)}/add_new_role`,
                            {
                                "roleName": newRoleName, 
                                "PolicyName": selectedInstance
                            }, 
                            { 
                                headers: { "auth-token": `Bearer ${localStorage.getItem("AUTH_TOKEN")}` } 
                            })
                this.setState({ status: 2});
                console.log(res.data);

            } catch (e) {
                console.log(e);
            }
        }
    }

    generateTheSecret = () =>{

        const allRoles = this.state.roles;
        const reqRole = this.state.roles.filter(role => role.name === this.state.selectedRole)[0];
        const reqRoleIndex = allRoles.indexOf(reqRole)
        allRoles[reqRoleIndex].generatedCreds.push({
             access_key: "AKIAJELUDIANQGRXCTZQ", 
             secret_key: "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", 
             lease_duration: "768h", 
            })
        console.log(allRoles);
        this.setState({ categories: allRoles })

        try{
            const res = API.get(`/api/dynamic/aws/${this.getEngineNameFromUrl(this.props.location.pathname)}/${reqRole.name}/user`, {

            }, { headers: { "auth-token": `Bearer ${localStorage.getItem("AUTH_TOKEN")}` } } )
            console.log(res.data);

        }catch (e) {
            console.log(e)
        }
    }
    
    
    render() { 
        let content = null; let roleInfo = null;
        if(this.state.selectedRole){ 
            roleInfo = (
                <RoleInfo 
                    role={this.state.roles.filter(r => r.name === this.state.selectedRole)[0]}
                    genCreds    ={this.generateTheSecret}
                />
            )
        }
        if (this.state.status === 0){
            content = <ConfigMessage configure={this.configModalOpen} />
        }
        else{
            content = (
            <React.Fragment>
                <RolesCard 
                    roles={this.state.roles}
                    roleClicked={this.roleClickedHandler}
                    createRole={this.createRole}
                    formFields={this.state.formFields}
                    select={(event) => this.rolesFormInputHandler(event, 1)}
                    roleName={(event) => this.rolesFormInputHandler(event, 2)}
                    create={this.createRole}
                />
            </React.Fragment>
            )
        }       
        return (  
            <Layout>
                <SideLayout>
                    {content}
                    {roleInfo}
                </SideLayout>
                <ConfigModal 
                    configure={this.configureAWSEngine} 
                    engName={this.state.engineName} />
            </Layout>
        );
    }
}
 
export default AWS;