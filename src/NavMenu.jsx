// NavMenu.jsx
import { Link } from 'react-router-dom';
import './NavMenu.css'; // Make sure to import the CSS file for styling

function NavMenu() {
    return (
        <header className="sticky-header">
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/admin">Admin Panel</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default NavMenu;
