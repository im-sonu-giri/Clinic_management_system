import { createContext } from "react";
import { doctors } from "../assets/assets_frontend/assets";


export const  AppContext= createContext()
const AppContextProvider= (props) =>{

    const value = {
        doctors

    }
    // This makes doctors available to ALL components inside your app
    return <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
}

export default AppContextProvider