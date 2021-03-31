import './NotFound.scss';
import Title from '../Title/Title';

const NotFound = () => (
    <div>
        <Title />
    <h1 className="not-found">Il semblerait que vous ne soyez pas au bon endroit !</h1>
    <p><a href='/' className="link">Ramenez-moi en lieu sûr</a></p>
    </div>
)

export default NotFound;