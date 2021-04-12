import NavBar from './NavBar';
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
import TransactionHistory from "../TransactionHistory";
import WishList from '../WishList';

function App() {
  return (
      <>
        <Router>
          <AuthProvider>
            <NavBar/>
            <Switch>
              <Route exact path="/" component={LandingPage}/>
              <PrivateRoute path="/profile" component={Profile}/>
              <PrivateRoute path="/update-profile" component={UpdateProfile}/>
              <PrivateRoute path="/dash" component={Dashboard}/>
                <PrivateRoute path="/history" component={TransactionHistory}/>
              <PrivateRoute path="/funds" component={ManageFunds}/>
              <PrivateRoute path="/wish-list" component={WishList}/>
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
