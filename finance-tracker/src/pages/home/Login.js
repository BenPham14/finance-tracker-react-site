import { useEffect, useRef } from 'react';
import homeCSS from './home.module.css';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const Login = ({loginOpen, setLoginOpen, signInWithGoogle}) => {
    const loginRef = useRef(null);

    useEffect(() => {
        if (loginOpen) {
            loginRef.current.showModal();
            window.addEventListener('keydown', (event) => {
                if (event.code === 'Escape') {
                    setLoginOpen(false);
                };
            });
            // Disable scrolling when modal is open
            document.body.style.overflow = 'hidden';
        } else {
            loginRef.current.close();
            // Enable scrolling when modal is open
            document.body.style.overflow = 'auto';
        }
    },[loginOpen]);

    return (
        <dialog ref={loginRef} className={homeCSS.login}>
            <AiOutlineCloseCircle id={homeCSS.loginClose} onClick={() => setLoginOpen(false)}/>
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
            <button id={homeCSS.google} onClick={signInWithGoogle}>
                <FcGoogle/>
                Continue with Google
            </button>
        </dialog>
    );
};

export default Login;