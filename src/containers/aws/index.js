import React, { Component } from 'react';
import Layout from '../../hoc/Layout/Layout';
import SideLayout from '../../hoc/sidelayout/sidelayout';
import ConfigMessage from '../../components/AWS/ConfigMessage';
import ConfigModal from '../../components/AWS/ConfigModal';
import RolesCard from '../../components/AWS/RolesCard';
import RoleInfo from '../../components/AWS/RoleInfo';
// import API from '../../utils/axios';
import M from 'materialize-css';
import './style.css'
import axios from '../../utils/axios';

class AWS extends Component {
    state = {  
        formFields: {
			selectedInstance: 'EC2',
			roleName: '',
		},
        configModalInstance: null,
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

        let configAWSEngineModal = document.getElementById('configModal');
        configAWSEngineModal = M.Modal.init(configAWSEngineModal, modalOptions);
        this.setState({ configModalInstance: configAWSEngineModal, 
                        engineName : this.getEngineNameFromUrl(this.props.location.pathname)  });
 
        try {
            const res = await axios.get('http://10.0.54.43:8000/api/engine', { headers: { "auth-token": `Bearer ${localStorage.getItem('AUTH_TOKEN')}` } }); 
            const engName = this.getEngineNameFromUrl(this.props.location.pathname);
            const desiredEngine = res.data.filter(eng => (eng.name === engName && eng.type === 'aws'))[0];
            this.setState({roles: desiredEngine.categories, status: desiredEngine.status, engineName: desiredEngine.name})
            // console.log(this.state.roles);
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
        this.setState({ selectedRole: role.roleName});
    };

    configureAWSEngine = async () => {
        const newAccessKey = document.getElementById('access-key-input').value;
        const newSecretKey = document.getElementById('secret-key-input').value;
        const newAccountName = document.getElementById('account-name-input').value;
        this.setState({ status: 1})

        try {
            const res = await axios.post(`http://10.0.54.43:8000/api/dynamic/aws/${this.getEngineNameFromUrl(this.props.location.pathname)}/config`, {
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
        const existingRoles = currentRoles.filter(role => role.roleName === newRoleName);
        if (existingRoles.length > 0) {
            console.log("Role Already Exists")
            return
        }
        else {
            const newRole = {
                roleName: newRoleName,
                generatedCreds: []
            }
            currentRoles.push(newRole);
            this.setState({ roles: currentRoles, formFields: { selectedInstance: 'EC2', roleName: ''} });
            // call API to create role
            
            axios.post(`http://10.0.54.43:8000/api/dynamic/aws/${this.getEngineNameFromUrl(this.props.location.pathname)}/add_new_role`,
                    {
                        "roleName": newRoleName, 
                        "PolicyName": selectedInstance
                    }, 
                    { 
                        headers: { "auth-token": `Bearer ${localStorage.getItem("AUTH_TOKEN")}` } 
                    })
                .then(res => {
                    console.log(res.data);
                    this.setState({ status: 2});

                })
                .catch (e =>  {
                console.log(e);
                })
        }
    }

    generateTheSecret = () =>{

        const allRoles = this.state.roles;
        const reqRole = this.state.roles.filter(role => role.roleName === this.state.selectedRole)[0];
        const roleName = reqRole.roleName; 
        const engineName = this.state.engineName;
        const reqRoleIndex = allRoles.indexOf(reqRole)        

        
        axios.get(`http://10.0.54.43:8000/api/dynamic/aws/${engineName}/${roleName}/user`, { headers: { "auth-token": `Bearer ${localStorage.getItem("AUTH_TOKEN")}` } })               
            .then(res => {
                console.log(res.data)
                allRoles[reqRoleIndex].generatedCreds.push({
                    accessKey: res.data.accessKey, 
                    generatedOn: res.data.generatedOn, 
                    expiresOn: res.data.expiresOn, 
                })
                this.setState({ roles: allRoles });
            })
            .catch(e => {
                console.log(e);
            })
    }
       
    render() { 
        let content = null; let roleInfo = null;
        if(this.state.selectedRole){ 
            roleInfo = (
                <RoleInfo 
                    role={this.state.roles.filter(r => r.roleName === this.state.selectedRole)[0]}
                    genCreds={this.generateTheSecret}
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