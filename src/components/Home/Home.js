import React, {useContext} from 'react';

import Card from '../UI/Card/Card';
import classes from './Home.module.css';
import Button from  '../UI/Button/Button'
import AuthContext from "../../store/authContext";


const Home = (props) => {
    const context = useContext(AuthContext);
    return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
        {context.isLoggedIn ? <Button onClick={context.onLogout} >Log Out</Button> : null}
    </Card>
  );
};

export default Home;
