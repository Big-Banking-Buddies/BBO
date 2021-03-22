import NavBar from '../NavBar';
import Footer from '../Footer';
import 'semantic-ui-css/semantic.min.css';
import LandingPage from '../LandingPage';
import Signup from './Signup';
import Login from './Login';
import Dashboard from '../Dashboard';
import ManageFunds from '../ManageFunds'
import { AuthProvider } from '../Context/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
      <>
        <NavBar/>


          <Router>
            <AuthProvider>
              <Switch>
                <Route path="/landing" component={LandingPage}/>
                <Route exact path="/" component={Dashboard}/>
                <Route path="/funds" component={ManageFunds}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/login" component={Login}/>
              </Switch>
            </AuthProvider>
          </Router>
        <Footer/>
      </>
  );
}

export default App;
