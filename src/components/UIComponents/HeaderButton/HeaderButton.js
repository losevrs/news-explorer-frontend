import './HeaderButton.css';
import Button from '../Button/Button';

import bLogout from '../../../images/Header/logoutb.jpg';
import wLogout from '../../../images/Header/logout.svg';
import { useUserContext } from '../../../contexts/UserContext';

export default function HeaderButton(props) {
  const classes = `hederbutton ${props.headerStyle === 'white' ? 'hederbutton_white' : ''} ${props.show ? 'hederbutton_show' : ''}`
  const context = useUserContext();

  const clickHandler = () => {
    if (props.onButtonClick) {
      props.onButtonClick();
    }
  }

  return (
    <Button className={classes}
      onClick={clickHandler}>
      {props.loggedIn
        ? <><span className='hederbutton__text'>{context.name}</span>
          <img className='hederbutton__image'
            src={(props.headerStyle === 'white' && !props.show) ? bLogout : wLogout}
            alt='logout'
          /></>
        : <span className='hederbutton__text'>Авторизоваться</span>
      }
    </Button>
  );
}
