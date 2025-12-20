import axios from "axios";
import { useState , createContext, useEffect } from "react"

export const BusInfoContext = createContext();

export const BusInfoProvider = ({ children }) => {
  
  const [busInfo, setBusInfo] = useState([]);

  const fetchBusInfo = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/bus/get-all-buses`);
      setBusInfo(response.data.buses);
    } catch (error) {
      console.error("Error fetching bus info:", error);
    }
  };

  useEffect(() => {
    fetchBusInfo();
  }, []);

  return (
    <BusInfoContext.Provider value={{ busInfo, setBusInfo }}>
      {children}
    </BusInfoContext.Provider>
  );
};