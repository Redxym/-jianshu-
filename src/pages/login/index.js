import React, { Component } from 'react';
import { LoginWrapper,LoginBox,Input, Button } from './style';
import { connect } from 'react-redux';
import { actionCreators} from './store';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  render() {
    const { loginStatus } = this.props;
    console.log(loginStatus)
    if (!loginStatus) {
      return (
        <LoginWrapper>
          <LoginBox>
            <Input placeholder='帐号' ref={(input) => {this.account = input}}/>
            <Input placeholder='密码' type='password' ref={(input) => {this.password = input}}/>
            <Button onClick={() => this.props.login(this.account, this.password)}>登录</Button>
          </LoginBox>
        </LoginWrapper>
      )
    } else {
      return <Redirect to='/' />
    }
  }
}

const mapState = (state) => ({
  loginStatus: state.getIn(['login', 'login'])
});

const mapDispatch = (dispatch) => ({
  login(accountElem, passwordElem) {
    dispatch(actionCreators.login(accountElem,passwordElem));
  }
});

export default connect(mapState, mapDispatch)(Login);