import React, { Fragment, useState, useRef } from 'react';
import useAuth from '../../hooks/useAuth';
import { getUserInfo } from '../../modules/helpers';

export default ({ updateUser }) => {
	const [showLogin, setLogin] = useState(false);
	const { login, logout, isAuthenticated } = useAuth();

	const email = useRef();
    const password = useRef();

	const handleLoginDisplay = () => showLogin ? setLogin(false) : setLogin(true);

	const handleLogin = e => {
        const userInfo = {
            email: email.current.value,
            password: password.current.value
        };

        login(userInfo);
        updateUser(getUserInfo());
    };

    const handleLogout = () => {
    	logout();
    	updateUser(getUserInfo());
    	// window.location.reload(false);
    };

	const form = type => {
		return (
			<form className="fr ml6 mv3 pa3 br2 shadow-1 w-70">
				<label className="cream dib f6 b db mb2" htmlFor='email'>Email</label>
				<input
					className="dib fr f7 w-70 pa1 outline-0"
                    type="email"
                    required
                    ref={email}
                    id="email"
                    autoFocus
                    placeholder=""
				/>
				<label className="cream dib f6 b db mb2" htmlFor='password'>Password</label>
				<input
					className="dib fr f7 w-70 pa1 outline-0"
                    type="password"
                    required
                    ref={password}
                    id="password"
                    placeholder=""
				/>
				<button
					className="f6 fw5 bg-white dim pointer pa2 pv1 mt2 fr br2"
					type="submit"
					onClick={handleLogin}>
						Submit
				</button>
			</form>
		);
	};

	return (
		<section className='fr'>
			{isAuthenticated()
				? (
					<Fragment>
						<h5 className='dib cream i fw5 pr1'>{getUserInfo().firstName} is THERE</h5>
						<h4 className='dib cream' onClick={handleLogout}>
							<span className='fw1 f4 ph2'>|</span>
							<a className='cream fw6 f6 pr1 dim pointer no-underline' href='.'>Sign out</a>
						</h4>
					</Fragment>
				)
				: (
					<Fragment>
						<div className='fr'>
							<h4 className='dib cream fw6 f6 pr1' onClick={handleLoginDisplay}>
								<span className='fw6 f6 pr1 dim pointer'>Sign In</span>
								<span className='fw1 f4 ph2'>|</span>
							</h4>
							<h4 className='dib dim pointer cream fw6 f6'>
								Register
							</h4>
						</div>
						{showLogin ? form('login') : null}
					</Fragment>
				)
			}
		</section>
	);
};