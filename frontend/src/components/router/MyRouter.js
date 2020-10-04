import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SignupPage from '../SignUpPage'
import Register from '../Register'
import Login from '../Login'
import Dashboard from '../DashBoard'
import Decode from '../Decode'

export default function MyRouter() {
    return (
        <Router>
            <Switch>
                <Route path="/decode" component={Decode} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route exact path="/" component={SignupPage} />
            </Switch>
        </Router>
    )
}
