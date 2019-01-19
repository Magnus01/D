import React from 'react';


class AuthWrapper extends React.Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default AuthWrapper;