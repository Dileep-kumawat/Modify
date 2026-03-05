import "../styles/navbar.scss";

const Navbar = () => {
    return (
        <header className="navbar">
            <div className="navbar-left">
                <div className="logo">
                    <div className="logo-icon">
                        <img src="modify-logo.png" alt="logo    " />
                    </div>
                    <h2>Modify</h2>
                </div>

                <nav className="nav-links">
                    <a className="active" href="#">Home</a>
                    <a href="#">Explore</a>
                    <a href="#">Library</a>
                    <a href="#">Insights</a>
                </nav>
            </div>

            <div className="search-container">
                <span className="material-symbols-outlined search-icon">search</span>
                <input
                    type="text"
                    placeholder="Search music or artists..."
                />
            </div>

            <div className="navbar-right">
                <button className="notification-btn">
                    <span className="material-symbols-outlined">notifications</span>
                    <span className="dot"></span>
                </button>

                <div className="divider"></div>

                <div className="profile">
                    <div className="profile-text">
                        <p className="name">Alex Rivera</p>
                        <p className="plan">Premium</p>
                    </div>

                    <div className="avatar">
                        <div
                            className="avatar-img"
                            style={{
                                backgroundImage:
                                    "url(https://lh3.googleusercontent.com/aida-public/AB6AXuB8RCvrGvsUcSyh5pZcQ7TOUj0Fwgr_OOfp8JaWuxoQ1tpBLn0Rr_jfoNTREdApvb4jBmVdXSfUUKz4TZEXl1pSs0kIUna9PIVCXnu9IzJklpd8_a83iiARkqeWzT3j27Z9uNqLf_2o6eKgKhw_9CjMkBT_ApsOI4EMH9Mci70YxhS77Lsd1iGN2Jt5ruDNiL3jR6C6e26eX4E3WR8YlERUvtAHfzo0K_DFQVQZCKrBlC7ot4Hc4nZYkgdBZO6CbHkghEnoomvyY0I)"
                            }}
                        ></div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;