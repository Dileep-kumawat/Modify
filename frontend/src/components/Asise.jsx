import "../styles/aside.scss";
import FaceExpression from "./FaceExpression";

const Aside = () => {
    return (
        <aside className="aside">
            <div className="scanner">

                <div className="scanner-header">
                    <h3>Mood Scanner</h3>

                    <span className="status-indicator">
                        <span className="ping"></span>
                        <span className="dot"></span>
                    </span>
                </div>

                <FaceExpression />
            </div>

            <nav className="aside-nav">

                <a className="nav-item active">
                    <span className="material-symbols-outlined">dashboard</span>
                    <span>Dashboard</span>
                </a>

                <a className="nav-item">
                    <span className="material-symbols-outlined">history</span>
                    <span>Mood History</span>
                </a>

                <a className="nav-item">
                    <span className="material-symbols-outlined">playlist_play</span>
                    <span>Playlists</span>
                </a>

                <a className="nav-item">
                    <span className="material-symbols-outlined">album</span>
                    <span>Albums</span>
                </a>

            </nav>
        </aside>
    );
};

export default Aside;