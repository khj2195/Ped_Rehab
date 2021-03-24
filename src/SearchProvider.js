import React, { createContext, useState } from 'react';
import {Alert} from 'react-native';

export const SearchContext= createContext();

export const SearchProvider = ({children}) => {
    const [centerType, setCenterType] = useState("병원");
    const [location, setLocation] = useState("서울시");
    return(
        <SearchContext.Provider
            value={{
                centerType,
                setCenterType,
                location, 
                setLocation,
            }}
            >
            {children}
        </SearchContext.Provider>
    )
}