import './HeaderButton.css';
import Button from '../Button/Button';

import bLogout from '../../../images/Header/logoutb.jpg';
import wLogout from '../../../images/Header/logout.svg';
import { useDataContext } from '../../../contexts/DataContext';

export default function HeaderButton(props) {
  const classes = `hederbutton ${props.headerStyle === 'white' ? 'hederbutton_white' : ''} ${props.show ? 'hederbutton_show' : ''}`
  const context = useDataContext();

  return (
    <Button className={classes}>
      {props.loggedIn
        ? <><span className='hederbutton__text'>{context.user.name}</span>
          <img className='hederbutton__image'
            src={(props.headerStyle === 'white' && !props.show) ? bLogout : wLogout}
            alt='logout'
          /></>
        : <span className='hederbutton__text'>Авторизоваться</span>
      }
    </Button>
  );
}
