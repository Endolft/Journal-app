import { useMemo } from "react";

export const useDateString = (date)=> {
 const dateString= useMemo(() => {
    const  newDate = new Date(date);

    return newDate.toLocaleString("es-AR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [date]);

  return dateString

} 
  