import useAuth from '../../auth/hooks/useAuth'

export default function Home() {
    const { user, logoutHandler } = useAuth();
    return <>
        <div className="dashboard-content">
            <div className="navbar">
                <span>{user.username}</span>
                <button className="button button--ghost" onClick={logoutHandler}>
                    Logout
                </button>
            </div>

            <main className="dashboard-main">
                <div className="card">
                    <h2>Welcome, {user.username}</h2>
                    <p>Email: {user.email}</p>
                </div>
            </main>
        </div>
    </>
}