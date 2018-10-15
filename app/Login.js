import React, { Component } from 'react';
import { Redirect } from 'react-router';

class Login extends Component {

    constructor() {
        super(...arguments);

        this.state = {
            agentCode: "",
            sawonCode: "",
            password: "",
            toGrid: false
        };

        console.log(this);
        this.handleAgent = this.handleAgent.bind(this);
        this.setSawonCode = this.setSawonCode.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.onLoginUser = this.onLoginUser.bind(this);
    }

    handleAgent(e) {
        this.setState({
            agentCode: e.target.value
        })
    }

    setSawonCode(e) {
        this.setState({
            sawonCode: e.target.value
        })
    }

    setPassword(e) {
        console.log(e.target.value);
        this.setState({
            password: e.target.value
        })
    }

    onLoginUser(e) {
        let url = 'login';
        let params = this.state;

        // url.search = new URLSearchParams(params);
        fetch("/login", {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then(res => {
                console.log('return res.json()');
                return res.json()
            })
            .then(res => {
                console.log("recieve data");
                this.setState({
                    toGrid: true,
                    members: res.result
                })
                // return <Link to='/grid'>grid go</Link>
                // if(res.result) {
                //
                // }
            })
        // console.log(this.state);
    }


    render() {
        if (this.state.toGrid) {
            return <Redirect to={{
                pathname: "/grid",
                state: { agentCode: this.state.agentCode }
            }} />

        }
        return (
            <div>
                로그인 페이지
                <label>대리점코드</label>
                <input type="text"
                       onChange={this.handleAgent}
                       value={this.state.agentCode}
                />
                <label htmlFor="sawonCode">사원코드</label>
                <input type="text"
                       onChange={this.setSawonCode}
                       value={this.state.sawonCode}
                />
                <label htmlFor="password">
                    비밀번호
                </label>
                <input type="password"
                       onChange={this.setPassword}
                       value={this.state.password}
                />
                <button onClick={this.onLoginUser}>로그인</button>

                {/*확인*/}
                {/*대리점코드, 사원코드로 조회화면 보내기*/}
            </div>
        )
    }
};

export default Login;