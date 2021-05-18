import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import "./login.scss"
import { userActions } from '../_actions';

import { useAlert } from 'react-alert'



function LoginPage() {

    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { username, password } = inputs;
    const loggingIn = useSelector(state => state.authentication.loggingIn);
    const dispatch = useDispatch();
    const location = useLocation();
    const alert = useAlert()
    const state = useSelector(state => state);

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());

    }, []);


    useEffect(() => {
        if (state.alert.type == "alert-danger") {
            alert.show('Insira usuário e/ou senha válidos')
        }
        if (state.alert.type == "alert-success") {
            alert.show('Usuário cadastrado com sucesso!')
        }
        console.log("ALERT:::", state.alert)
    }, [state.alert])


    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (username && password) {
            // get return url from location state or default to home page
            const { from } = location.state || { from: { pathname: "/" } };
            dispatch(userActions.login(username, password, from));
        } else {
            alert.show('Insira usuário e senha válidos')
        }
    }

    return (


        <div style={{
            width: '100%',
            height: '100%',
        }}>
            <div className="bg"></div>

            <div className="login-box">
                <h2>MadFox.</h2>
                <form name="form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Usuário</label>
                        <input type="text" name="username" value={username} onChange={handleChange} className={'form-control' + (submitted && !username ? ' is-invalid' : '')} />
                        {submitted && !username &&
                            <div className="invalid-feedback">Usuário é obrigatório</div>
                        }
                    </div>
                    <div className="form-group">
                        <label>Senha</label>
                        <input type="password" name="password" value={password} onChange={handleChange} className={'form-control' + (submitted && !password ? ' is-invalid' : '')} />
                        {submitted && !password &&
                            <div className="invalid-feedback">Senha é obrigatória</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary login-button">
                            {loggingIn && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Entrar
                        </button>
                        <br />
                        <Link to="/register" className="btn btn-link">Ainda não possui uma conta ?</Link>
                    </div>
                </form>
            </div>

        </div >
    );
}

export { LoginPage };