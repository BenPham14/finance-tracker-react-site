import mainCSS from './main.module.css';
import hero from '../../assets/undraw_investor_update_re_qnuu.svg';
import { useState } from 'react';

const CarouselItem = ({id, title, image, text, custom, currentStep}) => {
    return (
        <div className={mainCSS.carouselItem} style={{display: currentStep !== id && 'none'}}>
            <h2>{title}</h2>
            <img src={image} alt={title}/>
            {custom}
            <p>{text}</p>
        </div>
    );
};

const NewUser = () => {
    const items = [
        {id: 1, title: 'Get Started', image: hero, text: 'text', custom: ''},
        {id: 2, title: 'Create Account', image: hero, text: 'text', custom: <input/>},
        {id: 3, title: 'Create Budget', image: hero, text: 'text', custom: <input/>},
        {id: 4, title: 'All Set', image: hero, text: 'text', custom: ''},
    ];

    const [currentStep, setCurrentStep] = useState(1);

    const backCurrentStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        };
    };

    const nextCurrentStep = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        };
    };

    return (
        <main className={mainCSS.newUser}>
            <h1>Welcome</h1>
            <div className={mainCSS.steps}>
                <img src='' alt=''/>
                <img src='' alt=''/>
                <img src='' alt=''/>
                <img src='' alt=''/>
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
                <button onClick={backCurrentStep}>Back</button>
                <button onClick={nextCurrentStep}>Next</button>
            </div>
        </main>
    );
};

export default NewUser;