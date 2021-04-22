import React, {createContext, useState} from 'react';
import {Alert} from 'react-native';

export const SearchContext = createContext(); // 전역변수 개념인 context를 선언, 정의

export const SearchProvider = ({children}) => {
  const [centerType, setCenterType] = useState('병원');
  const [location, setLocation] = useState('서울시');
  const [treatment, setTreatment] = useState([]);
  return (
    <SearchContext.Provider
      value={{
        centerType,
        setCenterType,
        location,
        setLocation,
        treatment,
        setTreatment,
      }}>
      {children}
    </SearchContext.Provider>
  );
};
