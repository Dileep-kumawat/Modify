import { createContext, useState } from "react";

export const context = createContext();

const ContextProvider = ({ children }) => {
    const [expression, setExpression] = useState("neutral");
    const [loading, setLoading] = useState(false);
    const [song, setSong] = useState(null);

    return <context.Provider value={{ expression, setExpression, song, setSong, loading, setLoading }}>
        {children}
    </context.Provider>
}

export default ContextProvider;