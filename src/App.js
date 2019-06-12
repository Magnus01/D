import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import indexRoutes from "routes/index.jsx";
import { createBrowserHistory } from "history";

const hist = createBrowserHistory();



class App extends React.Component {

    constructor(props) {
        super(props);

        const { auth } = this.props;

        if (!auth.isAuthenticated()) {

            if (/access_token|id_token|error/.test(window.location.hash)) {
                auth.handleAuthentication(this.callback);
            } else {
                auth.login();
            }

        } else {
            auth.getProfile(this.userProfileCallback);
        }
    }

    // userProfileCallback = (error, userProfile) => {
    //     if (error) return;
    //     this.props.readUserProfile(userProfile);
    //
    //     // if in development, don't run the window indentity stuff
    //     if (process.env.NODE_ENV === 'development') return;
    //
    //     window.FS.identify(userProfile.sub);
    // }

    // workaround based on history not rendering new stuff... needs react router debugging
    callback = () => {
        window.location.replace(`${process.env.PUBLIC_URL}/`);
    }

    render() {
        const { auth } = this.props;

        return (

            <Router basename={process.env.PUBLIC_URL} history={hist}>
            <Switch>
            {
        !auth.isAuthenticated() ?
            <React.Fragment>
                <Route exact path={`/`} />
            </React.Fragment>
            :
            <React.Fragment>
                {indexRoutes.map((prop, key) => {
                    return <Route auth={auth} path={prop.path} component={prop.component} key={key} />;
                })}
            </React.Fragment>
    }

    </Switch>
    </Router>
        );
    }
}



export default App;
