import React, {useContext} from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from "./store/authContext";

function App() {
    const Contx = useContext(AuthContext)
    return (
        <React.Fragment>
            <MainHeader />
            <main>
                {!Contx.isLoggedIn && <Login />}
                {Contx.isLoggedIn && <Home />}
            </main>
        </React.Fragment>
    );
}

export default App;
