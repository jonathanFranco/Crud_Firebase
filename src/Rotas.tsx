import React from "react";
import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import { useCrud } from "./contexts/user";
import Home from "./pages/Home";
import Login from "./pages/Login";

const Rotas = () => {
    const { auth } = useCrud();

    return auth?.user ? (
        <Route path={`/`}>
            <Switch>
                <Route path="/home" exact component={Home} />
                <Redirect to="/home" />
            </Switch>
        </Route>
    ) : (
        <Route path={`/`}>
            <Switch>
                <Route path="/login" exact component={Login} />
                <Redirect to="/login" />
            </Switch>
        </Route>
    )
}
export default Rotas;