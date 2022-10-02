import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";

const Crypto = createContext();
const ContextApi = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  console.log(currency, 'in context')
  const [symbol, setsymbol] = useState("#");
  useEffect(() => {
    if (currency === "INR") {
      setsymbol("₹");
    } else if (currency === "USD") {
      setsymbol("$");
    }
  }, [currency]);
  return (
    <Crypto.Provider value={{ currency, setCurrency, symbol, setsymbol }}>
      {children}
    </Crypto.Provider>
  );
};

export default ContextApi;

export const CryptoState = () => {
  return useContext(Crypto);
};
