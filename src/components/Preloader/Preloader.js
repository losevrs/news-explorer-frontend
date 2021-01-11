import './Preloader.css';

export default function Preloader(props) {
    return (
        <div className='preloader'>
            <i className='preloader__circle'></i>
            <p className='preloader__text'>Идет поиск новостей...</p>
        </div>
    )
}
