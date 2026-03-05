import { Children, createContext, useState } from "react";

export const context = createContext();

const ContextProvider = ({ children }) => {
    const [expression, setExpression] = useState("neutral");

    return <context.Provider value={{expression, setExpression}}>
        {children}
    </context.Provider>
}

export default ContextProvider;