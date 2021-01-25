import React,{Component} from 'react';
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import Home from './components/Pages/Home';
import Admin from './components/Pages/Admin';
import CS from './components/Pages/CsPage';
import LAW from './components/Pages/LawPage';
import './App.css';

class App extends Component {
  render(){
    return (
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/admin" component={Admin} />
          <Route path="/CS" component={CS} />
          <Route path="/LAW" component={LAW} />

        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default App;
