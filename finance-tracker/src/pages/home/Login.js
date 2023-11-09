import { useEffect, useRef } from 'react';
import homeCSS from './home.module.css';
import { FcGoogle } from 'react-icons/fc';

const Login = ({loginOpen, setLoginOpen}) => {
    const loginRef = useRef(null);

    useEffect(() => {
        if (loginOpen) {
            loginRef.current.showModal();
            window.addEventListener('keydown', (event) => {
                if (event.code === 'Escape') {
                    setLoginOpen(false);
                };
            });
        } else {
            loginRef.current.close();
        }
    },[loginOpen]);

    return (
        <dialog ref={loginRef} className={homeCSS.login}>
            <form>
                <label>
                    <p>Email Address</p>
                    <input name="email" type="email" required/>
                </label>
                <label>
                    <p>Password</p>
                    <input name="password" type="password" required/>
                </label>
                <a href=''>Forgot password?</a>
                <button type='submit' id={homeCSS.signIn}>Sign in</button>
                <p id={homeCSS.signUp}>Don't have an account?<span><a href=''>Sign up</a></span></p>
            </form>
            <p id={homeCSS.divider}><span></span> Or <span></span></p>
            <button id={homeCSS.google}>
                <FcGoogle/>
                Continue with Google
            </button>
        </dialog>
    );
};

export default Login;