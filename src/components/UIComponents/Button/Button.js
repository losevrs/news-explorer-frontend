import './Button.css';

export default function Button(props) {
  let classes = 'button ';
  classes += props.className !== '' ? props.className : '';

  return (
    <button className={classes}>
      {props.children}
    </button>
  );
}