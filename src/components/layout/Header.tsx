import './Header.css';

const Header: React.FC = () => {
    const handleClick = () => {
        if (window.scrollY !== 0) {
            window.scrollTo({ top: 0 });
        }
    }

    return (
        <header className="app-header" onClick={handleClick}>
            <nav className="app-header__wrapper">
                <h1 className="app-header__project-name">
                    colorify
                </h1>
            </nav>
        </header>
    );
}

export default Header;
