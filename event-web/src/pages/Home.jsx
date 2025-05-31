import AllTimeCollection from "../components/AllTimeCollection";
import BestSeller from "../components/BestSeller";
import Hero from "../components/Hero";
import OurPolicies from "../components/OurPolicies";

const Home = () => {
  return (
    <div>
      <Hero />
      <AllTimeCollection />
      <BestSeller />
      <OurPolicies />
    </div>
  );
};

export default Home;
