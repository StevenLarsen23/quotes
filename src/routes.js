import {Switch, Route} from 'react-router-dom';
import Dashboard from "./Components/Dashboard";
import Auth from './Components/Auth';
import Form from './Components/Form';

export default (
    <Switch>
        <Route exact path='/' component={Dashboard}/>
        <Route path='/auth' component={Auth}/>
        <Route path='/form' component={Form}/>
    </Switch>
)