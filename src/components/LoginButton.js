import React, { Component } from 'react';
import {withAuth} from '@okta/okta-react';

class LoginButton extends Component {

    state = {
        authenticated: null,
        user: null
    }

    componentDidUpdate() {
        this.checkAuthentication();
    }

    componentDidMount() {
        this.checkAuthentication();
    }

    async checkAuthentication() {
        const authenticated = await this.props.auth.isAuthenticated();
        if (authenticated !== this.state.authenticated) {
            const user = await this.props.auth.getUser();
            this.setState({user, authenticated})
        }
    }

    login = () => this.props.auth.login();
    logout = () => this.props.auth.logout();

    render() {

        const {authenticated, user } = this.state;

        if (authenticated == null) return null;
        if (!authenticated) return <button onClick = {this.login}>Login</button>

        return (

            <div>
                <button onClick = {this.logout}>Logout</button>
            </div>
        )
    }
}

export default withAuth(LoginButton);