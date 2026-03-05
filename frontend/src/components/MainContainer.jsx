import { useContext } from "react";
import "../styles/mainContainer.scss";
import { context } from "../Context";

const songs = [
    {
        title: "Electric Dreams",
        artist: "Neon Horizon",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBwo2yNB0jWtob5bgeQFbuYydseUZhm-YSTM3aVDxJFwXDsy-MMKRixL5eYNnViqW_beZ-Hy-mpMS_SrIW4PkNnxmqpw9MoK8yBtbwlZLPljLwGifUAOm4AIDzl1ixk-_ReKSUdwAgCZB4K1rqscGeiZD2vo6uRI5FnAHRt9T53UtnHcIcvmdnCcZT1O5Eyxg3oS-rkLMZfpGWhKfIGpyf6_KvlacgOiZe2ESNRub2OFOIcw9_flApbBvMZVo_qzIeNLmGS2U8QCVM",
    },
    {
        title: "Sunlight Beats",
        artist: "Vibe Collective",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDorTdyMM8MoWzrzx0a2qS32KE3VE5U6pq86vVWEb03YrwbVjZ8xTM8qbikqPl-PgDw_uA3vnGVoT5qNopJ9B9PIHzLFVjPr7QxKdpipxpvtFoTWhh32R2PWR50rBGp6GYe7F4rJqqT4y3R4P_SdfMEd47WDTFJaNAfr58-XbE22s5Im-a3Ginzw5l2It5q-RTyJ5hSmSVkyd30f7Gs8X7MLxFZtYtLvNBoMddfroJRHsHKbKqseUAORXBGim9iw4smS2231R6hX0M",
    },
    {
        title: "Euphoric High",
        artist: "Nova Flow",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCQvKB-iIGsk5HaHeAaL7PEdB0T2f2ajxAAFoaSyj8RW_c8cnYylqHup5vjcgdTQmCK9-C89wc-4FoLHFcnTtKhBq-qBxX1bKgzUhLIiZU1WFPEmDWFpYFL-CMFi8DBeRU_kLKgho9aeQHe5PsollvoEBAxun_tRnu_yTJ44aZiGhDSCAGYHfeoPdzi654Y1qLtdVW5ey92t-adHvpVU4bAO-mNRuG98JPIX9KoftWxI8CO5lxVUjgEqk3YhQv2ViG0dHY_Uu07x8s",
    },
    {
        title: "Golden Hour",
        artist: "Aether Soul",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDqVjvUHDvReCYwWjHrz9sauG1jT4BM__gYl4lrsJTW25WqmoaWw1Mc5DvTdN2NjGeMYv7Sk7ntNE_a8dGs9D8-dgfxRbog2c0oNOXimHJOZjRu7s26ZRKjyw8lGNmwr73Tonj-3gpc2qMJf0KF8Hfp_uyHCgGciN_QysArcDjJHujcSRx26KDpkbQt8OFaphsnfQQxPREEaHDXEuixqRvagVVmvDK36d26xp8n7D-gBtMUP8xxEIZjtZcDZoPhk5F9_-b6_tRwRBg",
    },
];

const MainContainer = () => {

    const moodIcons = {
        neutral: "sentiment_neutral",
        happy: "sentiment_very_satisfied",
        sad: "sentiment_very_dissatisfied",
        surprised: "sentiment_excited"
    };

    const { expression } = useContext(context);

    return (
        <main className="main-layout">

            {/* MAIN CONTENT */}
            <section className="main-content">

                {/* HERO */}
                <div className="hero">
                    <div className="hero-glow"></div>

                    <div className={`mood-icon ${expression}`}>
                        <span className="material-symbols-outlined">
                            {moodIcons[expression] || "sentiment_neutral"}
                        </span>
                    </div>

                    <div className="hero-text">
                        <p className="tag">Current Detection</p>
                        <h1>{expression}</h1>

                        <div className="stats">
                            <div className="stat">
                                <p className="label">Confidence</p>
                                <div className="value">
                                    <span className="big">87%</span>
                                    <span className="green">+2.4%</span>
                                </div>
                            </div>

                            <div className="stat">
                                <p className="label">Beats Per Minute</p>
                                <p className="big">
                                    128 <span>BPM</span>
                                </p>
                            </div>

                            <div className="stat">
                                <p className="label">Key Profile</p>
                                <p className="big">C Major</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SONG GRID */}
                <div className="recommendations">

                    <div className="section-header">
                        <h2>Recommended for your Mood</h2>
                        <a href="#">View All</a>
                    </div>

                    <div className="song-grid">
                        {songs.map((song, i) => (
                            <div className="song-card" key={i}>
                                <div
                                    className="song-cover"
                                    style={{ backgroundImage: `url(${song.image})` }}
                                >
                                    <div className="overlay">
                                        <button>
                                            <span className="material-symbols-outlined">
                                                play_arrow
                                            </span>
                                        </button>
                                    </div>
                                    <div className="mood-tag">Happy</div>
                                </div>

                                <h4>{song.title}</h4>
                                <p>{song.artist}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* RIGHT SIDEBAR */}
            <aside className="right-sidebar">

                <div className="queue">
                    <h3>Up Next</h3>

                    <div className="queue-item">
                        <div className="thumb">
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmT4KMXiRFZhkqW5DsNGSA5Br_O5duIHTE2yRjHos_8X0jwduuLqB5Qd_FDFZxQ00qWlMCLtFCdFnubnoP05n7L2BFGOMVt7kHllGJwUTKvmj9u-zM1yo-FVioWXcuIK076cmwcbjYStYOIyU3hjZcC38HnBkFelEtTzvgWGXee7kwcpWKM9p8EYlUK_HaGwxTvN_2qntlWNqjxP1hsz-LqrB8fagy9IuD9VZ3ce8_VWLNfrg6Ac9DJ14dO8FPaZSMe3wIH6Aeza8" alt="image" />
                        </div>
                        <div className="info">
                            <p>Digital Serenity</p>
                            <span>Zen Pulse</span>
                        </div>
                    </div>

                    <div className="queue-item">
                        <div className="thumb">
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKVHxX5kfiDTYGTan7cpot-VYzPSrTdw1FJb83R_bT9jg3jz8RrFPLvMoh0s7XU-xvOwEuQP1G313vtq36uXjOyTNn7GtU8-4iNrKpQ-F83ZVQJQI85JAag2oVsfP41t_HoUolIovL6r5XRn4rHCZq2JqnJp_0yeaHB_8UCxVsoT-l4ffyL4OEpwD343mBXftRe4OsxW08ilyInfoAkQ1sM-BuMXU-OpjxK42kRoG3DLMNKggmzM__1rCTz_QIiFjh5Bytn3pB8mo" alt="image" />
                        </div>
                        <div className="info">
                            <p>Blue Ocean</p>
                            <span>Deep Wave</span>
                        </div>
                    </div>
                </div>

                <div className="mood-chart">
                    <h3>Daily Mood Pulse</h3>

                    <div className="bars">
                        <div style={{ height: "40%" }}></div>
                        <div style={{ height: "60%" }}></div>
                        <div style={{ height: "30%" }}></div>
                        <div style={{ height: "85%" }}></div>
                        <div style={{ height: "55%" }}></div>
                        <div style={{ height: "45%" }}></div>
                        <div style={{ height: "20%" }}></div>
                    </div>
                </div>

                <div className="ai-insight">
                    <div className="title">
                        <span className="material-symbols-outlined">auto_awesome</span>
                        <p>AI Insight</p>
                    </div>

                    <p>
                        Your mood has improved by <span>12%</span> since this morning.
                        Based on your current state, we've increased the tempo of your
                        queue.
                    </p>
                </div>

            </aside>

        </main>
    );
};

export default MainContainer;