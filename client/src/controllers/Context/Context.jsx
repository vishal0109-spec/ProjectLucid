import { createContext, useReducer } from "react";
import { dnsReducer,initialDns } from "./dnsReducer";

const AppContext=createContext(null);
const AppProvider=({children})=>{
const [DnsData,DispatchDns]=useReducer(dnsReducer,initialDns);

return <AppContext.Provider value={{...DnsData,DnsData,DispatchDns}}>
    {children}
</AppContext.Provider>
}
export {AppContext,AppProvider};