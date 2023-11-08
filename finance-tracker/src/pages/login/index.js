import loginCSS from './login.module.css';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
    return (
        <main className={loginCSS.login}>
            <h1>Welcome back</h1>
            <div className={loginCSS.form}>
                <button id={loginCSS.google}>
                    <FcGoogle/>
                    Continue with Google
                </button>
                <p id={loginCSS.divider}><span></span> Or <span></span></p>
                <form>
                    <label>
                        <p>Email Address</p>
                        <input name="email" type="email" required/>
                    </label>
                    <label>
                        <p>Password</p>
                        <input name="password" type="password" required/>
                    </label>
                    <button type='submit' id={loginCSS.signIn}>Sign in</button>
                    <p id={loginCSS.signUp}>Don't have an account?<span><a href=''>Sign up</a></span></p>
                </form>
            </div>
        </main>
    );
};

export default Login;