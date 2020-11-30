import './App.css';
import {withRouter} from 'react-router-dom'
import Header from './Components/Header'
import routes from './routes'

function App(props) {
  return (
    <div className="App">
     <Header/>
      {routes}
      </div>
  );
}

export default withRouter(App);
