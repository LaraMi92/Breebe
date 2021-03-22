
import './Input.scss';

const Input = ({type, placeholder}) => (
    <div>
    <input
    className="input"
    type={type}
    placeholder={placeholder}
    />
    </div>
);

export default Input;