
import './Input.scss';

const Input = ({type, placeholder, value, onChange}) => (
    <div>
    <input
    className="input"
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    />
    </div>
);

export default Input;