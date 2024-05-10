import newUserCSS from './newUser.module.css';

const Item = ({id, title, image, text, custom, currentStep}) => {
    return (
        <div className={newUserCSS.carouselItem} style={{display: currentStep !== id && 'none'}}>
            <h2>{title}</h2>
            <img src={image} alt={title}/>
            {
                text !== "" && <p>{text}</p>
            }
            {custom}
        </div>
    );
};

export default Item;