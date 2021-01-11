import './Button.css';

export default function Button(props) {
  let classes = 'button ';
  classes += props.className !== '' ? props.className : '';

  return (
    <button className={classes}
      onClick={props.onClick}>
      {props.children}
    </button>
  );
}