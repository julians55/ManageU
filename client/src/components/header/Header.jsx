import './Header.css';
import 'font-awesome/css/font-awesome.min.css';

function Header(){
    return(
        <nav>
            <div class="logo">
            ManageU
            </div>
            <input type="checkbox" id="click" />
            <label for="click" class="menu-btn">
            <i class="fas fa-bars"></i>
            </label>
            <ul>
            <li><a class="active" href="#">Home</a></li>
            <li><a href="#">All my moves</a></li>
            <li><a href="#">Register move</a></li>
            <li><a href="#">Add move</a></li>
            </ul>
        </nav>
    )
}

export default Header;
