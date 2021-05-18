import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import "./register.scss"

import { userActions } from '../_actions';

import { useAlert } from 'react-alert'
function RegisterPage() {

    const [inputs, setInputs] = useState({
        username: '',
        password: '',
        fullname
    });
    const [submitted, setSubmitted] = useState(false);
    const { username, password, fullname } = inputs;
    const loggingIn = useSelector(state => state.authentication.loggingIn);
    const dispatch = useDispatch();
    const alert = useAlert()
    const state = useSelector(state => state);

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    useEffect(() => {
        if (state.alert.type == "alert-danger") {
            alert.show('Usuário não disponível')
        }
    }, [state.alert])


    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {

        setSubmitted(true);
        if (username && password && fullname) {
            // get return url from location state or default to home page
            
            dispatch(userActions.register(username, password, fullname));
        } else {
            alert.show('Insira usuário, nome e senha válidos')
        }
        e.preventDefault();

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
                        <label>Nome</label>
                        <input type="text" name="fullname" value={fullname} onChange={handleChange} className={'form-control' + (submitted && !fullname ? ' is-invalid' : '')} />
                        {submitted && !fullname &&
                            <div className="invalid-feedback">Nome é obrigatório</div>
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
                            Registrar
                        </button>
                        <br />
                        <Link to="/login" className="btn btn-link"> {"< Voltar"} </Link>

                    </div>

                </form>
            </div>

        </div >
    );
}

export { RegisterPage };