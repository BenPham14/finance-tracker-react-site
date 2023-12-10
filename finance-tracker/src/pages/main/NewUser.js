import mainCSS from './main.module.css';
import hero from '../../assets/undraw_investor_update_re_qnuu.svg';
import { useState } from 'react';

const CarouselItem = ({id, title, image, text, custom, currentStep}) => {
    return (
        <div className={mainCSS.carouselItem} style={{display: currentStep !== id && 'none'}}>
            <h2>{title}</h2>
            <img src={image} alt={title}/>
            <p>{text}</p>
            {custom}
        </div>
    );
};

const NewUser = () => {
    const items = [
        {id: 1, title: 'Get Started', image: hero, text: "Hi, welcome to the Fintracker site! Let's get you set up. In the next steps, you will be creating your first account and budget.", custom: ''},
        {id: 2, title: 'Create Account', image: hero, text: "Enter a name for your first account:", custom: <input/>},
        {id: 3, title: 'Create Budget', image: hero, text: "Enter a name for your first budget:", custom: <input/>},
        {id: 4, title: 'All Set', image: hero, text: 'You are all set! Let the budgeting begin!', custom: ''},
    ];

    const [currentStep, setCurrentStep] = useState(1);

    const decrementStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        };
    };

    const incrementStep = () => {
        if (currentStep < items.length) {
            setCurrentStep(currentStep + 1);
        };
    };

    return (
        <main className={mainCSS.newUser}>
            {/* <h1>Steps here . . . .</h1> */}
            <div className={mainCSS.steps}>
                {
                    items.map((item) => (
                        <>
                            <p id={item.id} style={{backgroundColor: currentStep >= item.id && '#6C63FF', color: currentStep >= item.id && 'white'}}>{item.id}</p>
                            <hr/>
                        </>
                    ))
                }
                {/* <p>1</p>
                <hr/>
                <p>2</p>
                <hr/>
                <p>3</p>
                <hr/>
                <p>4</p> */}
            </div>
            <div className={mainCSS.carousel}>
                {
                    items.map((item) => (
                        <CarouselItem key={item.id}
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            text={item.text}
                            custom={item.custom}
                            currentStep={currentStep}
                        />
                    ))
                }
            </div>
            <div className={mainCSS.carouselNav}>
                <button onClick={decrementStep} style={{backgroundColor: currentStep === 1 && '#6b63ff80'}}>Back</button>
                <button onClick={incrementStep}>Next</button>
            </div>
        </main>
    );
};

export default NewUser;