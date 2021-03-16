import React, { createContext, useState } from 'react';
import {Alert} from 'react-native';

export const SearchContext= createContext();

export const SearchProvider = ({children}) => {
    const [centerType, setCenterType] = useState("병원");
    return(
        <SearchContext.Provider
            value={{
                centerType,
                setCenterType
            }}
            >
            {children}
        </SearchContext.Provider>
    )
}