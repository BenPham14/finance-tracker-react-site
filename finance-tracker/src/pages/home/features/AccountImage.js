import homeCSS from '../home.module.css';
import mainScreen from '../../../assets/main-account-bkg.png';
import mainAccount from '../../../assets/main-account.png';

const AccountImage = () => {
    return (
        <div className={homeCSS.imageDiv} id={homeCSS.accountImg}>
            <img id={homeCSS.imageBkg} src={mainScreen} alt=''/> {/*Screenshot 1440x700*/}
            <img id={homeCSS.imagePopUp} src={mainAccount} alt=''/>
        </div>
    );
};

export default AccountImage;