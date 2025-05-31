import { createContext, useEffect, useState } from "react";
import axiosInstance from "../api/ApiService";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [allEvents, setAllEvents] = useState([]);        
  const [allEventsFull, setAllEventsFull] = useState([]); 
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 16;

  const fetchPaginatedEvents = async (page, limit) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `api/event/all?page=${page}&limit=${limit}`
      );
      setAllEvents(response.data.events);
      setTotalCount(response.data.totalCount);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllEventsFull = async () => {
    try {
      const response = await axiosInstance.get(`api/event/all?all=true`);
      setAllEventsFull(response.data.events);
    } catch (err) {
      console.error("Failed to fetch full events list", err);
    }
  };


  useEffect(() => {
    fetchPaginatedEvents(page, limit);
  }, [page]);

 
  useEffect(() => {
    fetchAllEventsFull();
  }, []);

 

  return (
    <EventContext.Provider
      value={{
        allEvents,
        allEventsFull,
        totalCount,
        loading,
        error,
        page,
        setPage,
        limit,
        refetchPaginated: fetchPaginatedEvents,
        refetchAll: fetchAllEventsFull,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
