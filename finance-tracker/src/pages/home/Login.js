import homeCSS from './home.module.css';
import { useEffect, useRef, useState } from 'react';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth, provider } from '../../config/firebase';
import Cookies from 'universal-cookie';
import { FcGoogle } from 'react-icons/fc';
import { IoMdClose } from 'react-icons/io';

const cookies = new Cookies();

const Login = ({loginOpen, setLoginOpen, setIsAuth}) => {
    const loginRef = useRef(null);
    const [showPasswordInput, setShowPasswordInput] = useState(false);
    const [showCreateInputs, setShowCreateInputs] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [form, setForm] = useState({
        email: '',
        password: '',
        fname: '',
        lname: '',
        createPassword: ''
    });

    useEffect(() => {
        if (loginOpen) {
            const onEscape = (e) => {
                if (e.code === 'Escape') {
                    closeForm();
                };
            };
            loginRef.current.showModal();
            window.addEventListener('keydown', onEscape);
            // Disable scrolling when modal is open
            document.body.style.overflow = 'hidden';
            return () => window.removeEventListener("keydown", onEscape);
        } else {
            loginRef.current.close();
            // Enable scrolling when modal is open
            document.body.style.overflow = 'auto';
        }
    },[loginOpen]);

    const closeForm = () => {
        setLoginOpen(false);
        resetForm();
    };

    const resetForm = () => {
        setShowPasswordInput(false);
        setShowCreateInputs(false);
        setErrorMsg("");
        setForm({
            email: '',
            password: '',
            fname: '',
            lname: '',
            createPassword: ''
        });
    };

    // console.log(auth?.currentUser?.email);

    const signIn = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        try {
            if (!showPasswordInput && !showCreateInputs) { // if only email input showing
                // Check firebase for account
                const result = await fetchSignInMethodsForEmail(auth, form.email);

                if (result.includes("google.com")) {
                    setErrorMsg("This email is already associated with a Google account. Please continue with Google below.")
                } else if (result.length > 0) {
                    setShowPasswordInput(true);
                } else {
                    setShowCreateInputs(true);
                };
            } else if (showPasswordInput) {
                // Login
                const result = await signInWithEmailAndPassword(auth, form.email, form.password);
                cookies.set('auth-token', result.user.refreshToken);
                setIsAuth(true);
                closeForm();
            } else {
                // Create account
                const result = await createUserWithEmailAndPassword(auth, form.email, form.createPassword);
                await updateProfile(result.user, {
                    displayName: `${form.fname} ${form.lname}`
                });
                cookies.set('auth-token', result.user.refreshToken);
                setIsAuth(true);
                closeForm();
            };
        } catch(err) {
            console.error(err);
            switch (err.code) {
                case 'auth/wrong-password':
                    setErrorMsg("The email or password is incorrect. Please try again.");
                    break;
                case 'auth/too-many-requests':
                    setErrorMsg("Too many failed login attempts. Please try again later.")
                default:
                    console.error(err);
                    break;
            };
        };
    };

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            cookies.set('auth-token', result.user.refreshToken);
            setIsAuth(true);
            closeForm();
        } catch(err) {
            console.error(err);
        };
    };

    return (
        <dialog ref={loginRef} className={homeCSS.login}>
            <div className={homeCSS.loginHeader}>
                <h3>Login or Sign Up</h3>
                <IoMdClose id={homeCSS.loginClose} onClick={closeForm}/>
            </div>
            <form onSubmit={signIn}>
                <input name="email" type="email" placeholder='Email Address' required 
                    readOnly={!showPasswordInput && !showCreateInputs ? false : true}
                    style={{backgroundColor: (showPasswordInput || showCreateInputs) && "whitesmoke"}}
                    value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}/>
                {showPasswordInput &&
                    <input name="password" type="password" placeholder="Password" required
                        value={form.password} onChange={(e) => setForm({...form, password: e.target.value})}/>
                }
                {showCreateInputs &&
                    <>
                        <input name="fname" type="text" placeholder='First Name'required
                            value={form.fname} onChange={(e) => setForm({...form, fname: e.target.value})}/>
                        <input name="lname" type="text" placeholder='Last Name' required
                            value={form.lname} onChange={(e) => setForm({...form, lname: e.target.value})}/>
                        <input name="create password" type="password" placeholder='Create Password' minLength='6' required
                            value={form.createPassword} onChange={(e) => setForm({...form, createPassword: e.target.value})}/>
                    </>
                }
                {(showPasswordInput || showCreateInputs || errorMsg === "This email is already associated with a Google account. Please continue with Google below.") &&
                    <button className={homeCSS.loginReset} onClick={resetForm}>Use another account</button>
                }
                {errorMsg !== "" &&
                    <h5>{errorMsg}</h5>
                }
                <button type='submit' id={homeCSS.signIn}>Continue</button>
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