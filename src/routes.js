import {Switch, Route} from 'react-router-dom';
import Dashboard from "./Components/Dashboard";
import Auth from './Components/Auth';
import Form from './Components/Form';
import Register from './Components/Register'

export default (
    <Switch>
        <Route exact path='/' component={Dashboard}/>
        <Route path='/auth' component={Auth}/>
        <Route path='/register' component={Register}/>
        <layout>
        <Route path='/form' component={Form}/>
        {/* <Route path='/' component={Dashboard}/> */}
        </layout>
    </Switch>
)