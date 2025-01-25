import { Calendar, Location } from "@/icons";
import Link from "next/link";
import Image from "next/image";

interface AccountTicketProps {
  title: string;
  date: string;
  location: string;
  tickets: Array<{
    title: string;
    image: string;
    }>;
};

const formatDate = (timestamp: string): string => {
  const date = new Date(Number(timestamp));
  
  // Format the weekday, month, day, hour, and minute
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  // Find the position of the second comma and replace it with " • "
  const firstCommaIndex = formattedDate.indexOf(", ");
  const secondCommaIndex = formattedDate.indexOf(", ", firstCommaIndex + 1);

  if (secondCommaIndex !== -1) {
    // Replace the second comma with " • "
    return formattedDate.slice(0, secondCommaIndex) + " • " + formattedDate.slice(secondCommaIndex + 2);
  }

  return formattedDate;
};

export const AccountTicket = ({ title, date, location, tickets }: AccountTicketProps) => {
  return (
      <article className="bg-[#272727] text-white border border-[#3B3B3B] rounded-2xl w-[280px] md:max-w-sm">
        <div className="px-4 py-6">
          <h3 className="text-base font-bold">{title}</h3>
          <div className="flex items-center mt-1">
            <Calendar />
            <p className="text-sm text-[#BEBEBE] mt-1 ml-1">
              {formatDate(date)}
            </p>
          </div>
          <div className="flex items-center mt-1">
            <Location />
            <p className="text-sm text-[#BEBEBE] mt-1 ml-1">
              {location}
            </p>
          </div>
          
          {/* Tickets Section */}
          <div className="mt-4">
            <p className="text-sm text-[#BEBEBE] mb-2">Your tickets ({tickets.length})</p>
            <div className="grid grid-cols-2 gap-2">
              {tickets.map((ticket, index) => (
                <div key={index} className="relative">
                  <Image
                    src={ticket.image}
                    alt={ticket.title}
                    width={120}
                    height={160}
                    className="rounded-lg object-cover"
                  />
                  <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
  );
};

