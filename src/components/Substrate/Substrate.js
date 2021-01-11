import './Substrate.css';

export default function Substrate(props) {
  return (
    <section
      className={`substrate ${props.show ? 'substrate_show' : ''}`}
      onClick={props.onClick}
    />
  );
}