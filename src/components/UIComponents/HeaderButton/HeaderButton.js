import './HeaderButton.css';
import Button from '../Button/Button';

import bLogout from '../../../images/Header/logoutb.jpg';
import wLogout from '../../../images/Header/logout.svg';

export default function HeaderButton(props) {
  let classes = '';

  props.show
    ? classes = `hederbutton ${props.headerStyle === 'white' && 'hederbutton_white'}`
    : classes = 'hederbutton_hide';

  return (
    <Button className={classes}>
      {props.loggedIn
        ? <><span className='hederbutton__text'>Грета</span>
          <img className='hederbutton__image'
            src={props.headerStyle === 'white' ? bLogout : wLogout}
            alt='logout'
          /></>
        : <span className='hederbutton__text'>Авторизоваться</span>
      }
    </Button>
  );
}
