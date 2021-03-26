import './User.scss';

const User = ({pseudo, logOut}) => (
  <div>
    <div className="user">
    {pseudo}
    </div>
    <div className="user--logout">
        <div onClick={logOut}>déconnexion</div>
    </div>
    </div>
)

export default User;