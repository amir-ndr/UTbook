import React from 'react';
import './sign.css';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInName: '',
      signInPassword: ''
    }
}

  onNameChange = (event) => {
    this.setState({signInName: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  onSubmitSignIn = () => {
    fetch('http://localhost:3001/signIn', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: this.state.signInName,
        password: this.state.signInPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.onRouteChange('adminPage')
        }
        else{
          window.alert('No such user')
        }
    })
  }

  render() {
    return (
      <div className="sign">
            <div className="input-data">
                <input onChange={this.onNameChange} type="text" name="name" id="email-id" required />
                <label htmlFor="name">نام کاربری</label>
            </div>
            <div className="input-data">
                <input onChange={this.onPasswordChange} type="password" name="password" id="pass" required />
                <label htmlFor="pass">کلمه عبور</label>
            </div>
            <input value="ورود" type="submit" onClick={this.onSubmitSignIn} className="button" id="button-id"></input>
        </div>
    );
  }
}

export default SignIn;