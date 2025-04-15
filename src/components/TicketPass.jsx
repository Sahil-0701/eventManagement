import React from "react";

const TicketPass = ({ ticket }) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-2xl rounded-xl overflow-hidden border border-purple-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center py-5 px-4">
        <h2 className="text-2xl font-extrabold tracking-wide">{ticket.eventName}</h2>
        <p className="text-sm mt-1">{ticket.eventDate} • {ticket.location}</p>
      </div>

      {/* Body */}
      <div className="p-6 space-y-5">
        <div className="text-gray-700 space-y-2">
          <p><span className="font-semibold">🎟️ Ticket Holder:</span> {ticket.userName}</p>
          <p><span className="font-semibold">📧 Email:</span> {ticket.email}</p>
          <p><span className="font-semibold">🆔 Ticket ID:</span> <span className="text-purple-700 font-mono">{ticket.ticketId}</span></p>
        </div>

        <div className="flex justify-between items-center pt-5 border-t">
          <div>
            <p className="text-sm text-gray-500">Issued on</p>
            <p className="text-md font-medium">{ticket.issuedDate}</p>
          </div>

          <div className="w-20 h-20 bg-gray-100 border border-purple-200 rounded-lg flex items-center justify-center shadow-sm">
            {/* Replace with QR Code later */}
            <span className="text-xs text-gray-500">QR CODE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketPass;
