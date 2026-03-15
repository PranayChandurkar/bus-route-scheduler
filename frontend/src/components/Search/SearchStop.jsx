import React, { useContext, useState, useRef, useEffect } from "react";
import { BusInfoContext } from "../../context/BusInfoContext";
import axios from "axios";
import BusList from "../BusInfo/BusList";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";

const SearchStop = ({ stops }) => {
  const { busInfo } = useContext(BusInfoContext);
  const [bus, setBus] = useState(null);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const busListRef = useRef(null);

  if (!stops) {
    return <p className="text-center text-slate-500 mt-6 font-medium">No stops available for the selected route.</p>;
  }

  let stopList = [];
  busInfo?.forEach((bus) => {
    if (stops === bus.route_name) stopList = bus.stops;
  });

  const onSearch = async (from, to) => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/bus/search-bus`, { from, to });
    setBus(response.data);
  };

  const handleSearch = () => {
    if (!from || !to) {
      alert("Please select both From and To stops.");
      return;
    }
    if (from === to) {
      alert("From and To cannot be the same stop.");
      return;
    }
    onSearch(from, to);
  };

  useEffect(() => {
    if (bus && bus.length > 0 && busListRef.current) {
      setTimeout(() => {
        busListRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [bus]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="w-full mt-6 flex flex-col items-center"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full flex flex-col md:flex-row md:items-end gap-4"
      >
        <div className="flex-1 w-full">
          <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-slate-700">
            <MapPin size={16} className="text-indigo-500" /> From
          </label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="premium-input"
          >
            <option value="" className="text-slate-500 cursor-pointer">Select Start Stop</option>
            {stopList.map((stop, idx) => (
              <option key={idx} value={stop} className="text-slate-800">{stop}</option>
            ))}
          </select>
        </div>

        <div className="hidden md:flex items-center justify-center pb-3 px-2">
          <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center border border-indigo-100 shadow-sm">
            <ArrowRight className="text-indigo-500" size={20} />
          </div>
        </div>

        <div className="flex-1 w-full mt-4 md:mt-0">
          <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-slate-700">
            <MapPin size={16} className="text-purple-500" /> To
          </label>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="premium-input"
          >
            <option value="" className="text-slate-500 cursor-pointer">Select End Stop</option>
            {stopList.map((stop, idx) => (
              <option key={idx} value={stop} className="text-slate-800">{stop}</option>
            ))}
          </select>
        </div>

        <motion.button
          onClick={handleSearch}
          className="premium-button w-full md:w-auto px-8 py-3 mt-6 md:mt-0 h-[50px] cursor-pointer"
        >
          Search Buses
        </motion.button>
      </motion.div>

      <div ref={busListRef} className="w-full mt-8">
        <AnimatePresence>
          {bus && <BusList bus={bus} />}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SearchStop;
