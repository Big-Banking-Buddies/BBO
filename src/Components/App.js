import NavBar from '../NavBar';
import Footer from '../Footer';
import 'semantic-ui-css/semantic.min.css';
import LandingPage from '../LandingPage';
import Signup from './Signup';
import Login from './Login';
import Dashboard from '../Dashboard';
import ManageFunds from '../ManageFunds';
import Profile from './Profile';
import ForgotPassword from './ForgotPassword';
import { AuthProvider } from '../Context/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import UpdateProfile from './UpdateProfile';


function App() {
  return (
      <>
        <NavBar/>


          <Router>
            <AuthProvider>
              <Switch>
                <Route path="/landing" component={LandingPage}/>
                <PrivateRoute exact path="/" component={Profile}/>
                <PrivateRoute path="/update-profile" component={UpdateProfile}/>
                <Route path="/dash" component={Dashboard}/>
                <Route path="/funds" component={ManageFunds}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/login" component={Login}/>
                <Route path="/forgot-password" component={ForgotPassword}/>
              </Switch>
            </AuthProvider>
          </Router>
        <Footer/>
      </>
  );
}

export default App;
