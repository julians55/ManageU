import './Header.css';
import 'font-awesome/css/font-awesome.min.css';

function Header(){
    return(
        <><nav>
            <div class="logo">
                ManageU
            </div>
            <input type="checkbox" id="click" />
                <label for="click" class="menu-btn">
                <i className="fa fa-bars" />
                </label>
                <ul>
                    <li><a class="active" href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Gallery</a></li>
                    <li><a href="#">Feedback</a></li>
                </ul>
            </nav>
                <div class="content">
                <div>
                    Responsive Navigation Menu Bar Design
                </div>
                <div>
                    using only HTML & CSS
                </div>
            </div>
            </>
    )
}

export default Header;