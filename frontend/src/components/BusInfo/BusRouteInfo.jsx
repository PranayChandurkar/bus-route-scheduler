import React, { useContext } from "react";
import { BusInfoContext } from "../../context/BusInfoContext";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

const parseTimeStr = (timeStr) => {
  if (!timeStr) return null;
  let [time, modifier] = timeStr.trim().split(/\s+/);
  let [hours, minutes] = time?.split(':').map(Number) || [0, 0];
  if (modifier) {
    modifier = modifier.toUpperCase();
    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
  }
  return hours * 60 + minutes;
};

const getCurrentISTMinutes = () => {
  const d = new Date();
  const utcOptions = { timeZone: "Asia/Kolkata", hour12: false, hour: 'numeric', minute: 'numeric' };
  const istTimeString = d.toLocaleTimeString('en-US', utcOptions);
  return parseTimeStr(istTimeString);
};

const BusRouteInfo = () => {
  const { busInfo } = useContext(BusInfoContext);
  const { busId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { bus } = location.state || {};
  const [showAllStops, setShowAllStops] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const selectedBus = busInfo.find((b) => b._id === busId);

  if (!busInfo || busInfo.length === 0) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center"><p className="text-slate-500 font-medium">Loading bus data...</p></div>;
  }

  let displayStops = selectedBus?.stops || [];

  if (!showAllStops && bus && bus.from && bus.to && selectedBus) {
    const fromIndex = selectedBus.stops.findIndex(s => s.toLowerCase() === bus.from.toLowerCase());
    const toIndex = selectedBus.stops.findIndex(s => s.toLowerCase() === bus.to.toLowerCase());

    if (fromIndex !== -1 && toIndex !== -1) {
      if (fromIndex <= toIndex) {
        displayStops = selectedBus.stops.slice(fromIndex, toIndex + 1);
      } else {
        displayStops = selectedBus.stops.slice(toIndex, fromIndex + 1).reverse();
      }
    }
  }

  const stops = displayStops.map((stop) => ({ name: stop }));

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const listVariants = {
    hidden: { opacity: 0, x: -20 },
    show: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
    }),
  };

  return (
    <div className="min-h-[100dvh] bg-slate-50 relative overflow-hidden pt-8 pb-32 md:py-12 px-4 md:px-8">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-medium px-4 py-2 rounded-xl hover:bg-slate-200/50 w-fit cursor-pointer"
        >
          <ArrowLeft size={18} /> Back to Search
        </button>

        <div className="mb-10 text-center md:text-left">
          <div className="inline-block px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs sm:text-sm font-bold tracking-wider uppercase mb-4 shadow-sm">
             Selected Route
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-slate-800 mb-4 leading-tight">
            <span className="premium-gradient-text pb-1 inline-block">{selectedBus.route_name}</span>
          </h1>
          {bus && (
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-4 mt-6">
              <span className="font-bold text-slate-800 bg-white px-4 py-1.5 rounded-xl border border-slate-200 shadow-sm text-base">
                {bus.registration_number}
              </span>
              <span className="hidden sm:block w-1 h-1 rounded-full bg-slate-300"></span>
              <div className="flex items-center gap-2 text-[15px] sm:text-lg text-slate-600 font-medium bg-slate-100/70 px-4 py-1.5 rounded-xl border border-slate-200/50">
                <span>{bus.from}</span>
                <span className="text-indigo-400">→</span>
                <span>{bus.to}</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="show"
            className="w-full lg:w-1/2 glass-panel p-4 sm:p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center shadow-sm border border-indigo-100">
                <Clock size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">
                Bus Schedule
              </h2>
            </div>

            {bus?.schedule?.length > 0 ? (() => {
              const currentISTMinutes = getCurrentISTMinutes();
              const [showTomorrow, setShowTomorrow] = React.useState(false);
              
              const todaySchedule = bus.schedule.filter(trip => {
                const onwardStart = parseTimeStr(trip.origin_departure_time);
                const returnStart = parseTimeStr(trip.destination_departure_time);
                // Keep the schedule if either onward or return journey starts after the current time
                const isOnwardFuture = onwardStart !== null && onwardStart >= currentISTMinutes;
                const isReturnFuture = returnStart !== null && returnStart >= currentISTMinutes;
                
                // If we don't have valid times to parse, default to showing it to be safe
                if (onwardStart === null && returnStart === null) return true;
                
                return isOnwardFuture || isReturnFuture;
              });

              const tomorrowSchedule = bus.schedule;

              return (
                <div className="space-y-8 w-full">
                  {/* Today's Schedule */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                      Today's Upcoming Schedule
                    </h3>
                    {todaySchedule.length === 0 ? (
                      <div className="text-center py-8 bg-slate-50 rounded-2xl border border-slate-100 w-full">
                        <p className="text-slate-500 font-medium">No more schedules available for the rest of today.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {todaySchedule.map((trip, idx) => (
                          <motion.div
                            key={`today-${idx}`}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: idx * 0.15 + 0.3 }}
                            className="flex flex-col sm:flex-row gap-4 p-4 sm:p-5 rounded-2xl border border-slate-100 bg-white/60 hover:bg-white shadow-sm transition-all duration-300"
                          >
                            <div className="flex-1 bg-slate-50 rounded-xl p-4 border border-slate-100">
                              <p className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-2">Onward</p>
                              <div className="flex justify-between items-center">
                                <span className="text-lg font-bold text-slate-800">{trip.origin_departure_time}</span>
                                <ArrowRight size={14} className="text-slate-400" />
                                <span className="text-lg font-bold text-slate-800">{trip.destination_arrival_time}</span>
                              </div>
                            </div>
                            <div className="flex-1 bg-slate-50 rounded-xl p-4 border border-slate-100">
                              <p className="text-xs font-bold text-purple-500 uppercase tracking-wider mb-2">Return</p>
                              <div className="flex justify-between items-center">
                                <span className="text-lg font-bold text-slate-800">{trip.destination_departure_time}</span>
                                <ArrowRight size={14} className="text-slate-400" />
                                <span className="text-lg font-bold text-slate-800">{trip.origin_arrival_time}</span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Tomorrow's Schedule */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-slate-700 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                        Tomorrow's Schedule
                      </h3>
                      <button 
                        onClick={() => setShowTomorrow(!showTomorrow)}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                      >
                        {showTomorrow ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    
                    {showTomorrow && (
                      <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                        {tomorrowSchedule.map((trip, idx) => (
                          <motion.div
                            key={`tomorrow-${idx}`}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: idx * 0.1 }}
                            className="flex flex-col sm:flex-row gap-4 p-4 sm:p-5 rounded-2xl border border-slate-100 bg-white/60 hover:bg-white shadow-sm transition-all duration-300 opacity-80 hover:opacity-100"
                          >
                            <div className="flex-1 bg-slate-50 rounded-xl p-4 border border-slate-100">
                              <p className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-2">Onward</p>
                              <div className="flex justify-between items-center">
                                <span className="text-lg font-bold text-slate-800">{trip.origin_departure_time}</span>
                                <ArrowRight size={14} className="text-slate-400" />
                                <span className="text-lg font-bold text-slate-800">{trip.destination_arrival_time}</span>
                              </div>
                            </div>
                            <div className="flex-1 bg-slate-50 rounded-xl p-4 border border-slate-100">
                              <p className="text-xs font-bold text-purple-500 uppercase tracking-wider mb-2">Return</p>
                              <div className="flex justify-between items-center">
                                <span className="text-lg font-bold text-slate-800">{trip.destination_departure_time}</span>
                                <ArrowRight size={14} className="text-slate-400" />
                                <span className="text-lg font-bold text-slate-800">{trip.origin_arrival_time}</span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })() : (
              <div className="text-center py-10 bg-slate-50 rounded-2xl border border-slate-100 w-full">
                <p className="text-slate-500 font-medium">No schedule available for this bus.</p>
              </div>
            )}
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.2 }}
            className="w-full lg:w-1/2 glass-panel p-4 sm:p-6 md:p-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center shadow-sm border border-purple-100">
                  <MapPin size={24} />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">
                  Route Details
                </h2>
              </div>
              {bus && bus.from && bus.to && (
                <button
                  onClick={() => setShowAllStops(!showAllStops)}
                  className="text-xs sm:text-sm font-bold text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 px-4 py-2 rounded-xl transition-all duration-300 shadow-sm border border-purple-100/50 cursor-pointer"
                >
                  {showAllStops ? "Show My Journey" : "View Full Route"}
                </button>
              )}
            </div>

            <div className="relative wrap overflow-hidden p-2 pl-4">
              <div className="absolute border-l-2 border-indigo-100 border-dashed h-full left-6 top-4"></div>

              <ul className="space-y-8 relative">
                {stops.map((stop, index) => {
                  const isFirst = index === 0;
                  const isLast = index === stops.length - 1;

                  return (
                    <motion.li
                      key={index}
                      custom={index}
                      variants={listVariants}
                      initial="hidden"
                      animate="show"
                      className="flex items-start gap-4 relative z-10"
                    >
                      <div className={`w-5 h-5 rounded-full flex-shrink-0 mt-0.5 border-4 border-white shadow-sm
                        ${isFirst ? 'bg-indigo-500 scale-125' : isLast ? 'bg-purple-500 scale-125' : 'bg-slate-300'}`}
                      ></div>

                      <div className="flex-1 pt-0.5">
                        <h3 className={`font-semibold ${isFirst || isLast ? 'text-slate-800 text-lg' : 'text-slate-600'}`}>{stop.name}</h3>
                        {(isFirst || isLast) && (
                          <p className="text-xs font-semibold uppercase tracking-wider mt-1 text-slate-400">
                            {isFirst ? 'Origin Stop' : 'Final Destination'}
                          </p>
                        )}
                      </div>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BusRouteInfo;
