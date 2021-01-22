import './NotFound.css';
import imgNotFound from '../../images/Main/not-found.png';

export default function NotFound(props) {
    return (
        <div className='not-found'>
            <img src={imgNotFound} alt='not-found' className='not-found__image'/>
            <p className='not-found__text'>{props.showMessage}</p>
            <p className='not-found__description'>К сожалению по вашему запросу ничего не найдено.</p>
        </div>
    )
}