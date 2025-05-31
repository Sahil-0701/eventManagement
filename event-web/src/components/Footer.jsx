const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-10 bg-gray-900 text-gray-100 px-6">
      <hr className="border-gray-700" />
      <div className="py-10 grid grid-cols-1 sm:grid-cols-[3fr_1fr_1fr] gap-10">
        <div>
          <h2 className="text-2xl font-semibold mb-4">GET TO KNOW US</h2>
          <p className="text-base leading-relaxed max-w-xl">
            True Events is your all-in-one sports event management platform
            designed to power every stage of your event journey — from
            discovering and promoting trending tournaments, managing team
            registrations, scheduling fixtures, tracking live stats and
            attendance, to delivering immersive fan experiences — all backed by
            real-time insights, secure operations, and a seamless digital
            interface trusted by organizers, athletes, and fans alike.
          </p>
        </div>

        <nav>
          <h2 className="text-2xl font-semibold mb-4">COMPANY</h2>
          <ul className="space-y-3 text-base cursor-pointer">
            {["Home", "About Us", "Contact Us", "Privacy Policy"].map(
              (item, idx) => (
                <li
                  key={idx}
                  onClick={scrollToTop}
                  className="hover:text-orange-400 transition-colors"
                >
                  {item}
                </li>
              )
            )}
          </ul>
        </nav>

        <address className="not-italic">
          <h2 className="text-2xl font-semibold mb-4">GET IN TOUCH</h2>
          <ul className="space-y-3 text-base">
            <li>
              <a
                href="tel:+1234567890"
                className="hover:underline hover:text-orange-400 transition-colors"
              >
                +123 456 7890
              </a>
            </li>
            <li>
              <a
                href="mailto:contact@trueEvents.com"
                className="hover:underline hover:text-orange-400 transition-colors"
              >
                contact@trueEvents.com
              </a>
            </li>
          </ul>
        </address>
      </div>

      <hr className="border-gray-700" />
      <p className="text-center py-6 text-sm text-gray-400">
        © 2025 trueEvents.com — All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
