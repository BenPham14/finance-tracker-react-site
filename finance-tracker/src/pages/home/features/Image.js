import homeCSS from '../home.module.css';

const Image = ({id, bkgImage, popupImage}) => {
    return (
        <div className={homeCSS.imageDiv} id={id}>
            <img id={homeCSS.imageBkg} src={bkgImage} alt=''/> {/*Screenshot 1440x700*/}
            <img id={homeCSS.imagePopUp} src={popupImage} alt=''/>
        </div>
    );
};

export default Image;