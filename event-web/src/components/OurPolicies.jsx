import { RiExchangeFundsFill } from "react-icons/ri";
import { FaRegCheckCircle } from "react-icons/fa";
import { LuHeadset } from "react-icons/lu";

const OurPolicies = () => {
  const policies = [
    {
      icon: <RiExchangeFundsFill className="text-4xl m-auto my-4" />,
      title: "Ranked No.1",
      description:
        "Top-rated event management platform three years in a row across the country.",
    },
    {
      icon: <FaRegCheckCircle className="text-4xl m-auto my-4" />,
      title: "Enterprise-Grade Security",
      description:
        "3-level secure portal ensures safe transactions, data protection, and privacy for organizers and attendees.",
    },
    {
      icon: <LuHeadset className="text-4xl m-auto my-4" />,
      title: "Unmatched Support",
      description:
        "24/7 dedicated customer support to assist you at every stage — from setup to post-event wrap-up.",
    },
  ];

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-12 sm:gap-4 text-center px-5 py-10 text-md sm:text-md md:text-xl text-gray-700">
      {policies.map((policy, index) => (
        <div key={index} className="max-w-lg">
          {policy.icon}
          <p className="font-semibold mb-1">{policy.title}</p>
          <p className="text-gray-500">{policy.description}</p>
        </div>
      ))}
    </div>
  );
};

export default OurPolicies;
