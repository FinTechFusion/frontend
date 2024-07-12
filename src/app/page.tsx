"use client"
import Textbox from "@/components/common/Text/Textbox";
import Hero from "./(roots)/(Home)/page";
import SectionHeading from "@/components/common/Text/Heading";
import Featurecard from "@/components/FeatureCard";
import { tradingPlatformData } from "@/utils/data";

export default function Component() {
  return (
    <div className="px-3">
      <Hero />
      <div className="container mx-auto">
        <Textbox title="FinTechFusion: Profit in Any Market Condition"
          description="In every market scenario, there's an opportunity to thrive.
          FinTechFusion's trading bots excel in optimizing your entry points,
          boosting your profits from each transaction. Whether the market is up or down, our bots are designed to enhance your trading outcomes, ensuring you gain an edge in all conditions." />
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grdi-cols-1 gap-5 mb-12">
          <Textbox title="Bear markets" description="Make gains when prices fall. Use our bots to sell high now and buy back lower." />
          <Textbox title="Sideways markets" description="Profit as prices rise. Our bots buy on dips and sell on highs for better profits." />
          <Textbox title="Bear markets" description="Earn in stable markets. Our bots trade between support and resistance levels for steady gains." />
        </div>
        <SectionHeading title="Crypto is hard, but FinTechFusion makes it easier" />
        <div className="grid md:grid-cols-2 grdi-cols-1 gap-5 mb-12">
          <Featurecard title="Advanced Trading Made Easy" description="With FinTechFusion's SmartTrade, set your trades ahead of time with specific triggers. Just set it up and let FinTechFusion do the rest. Trading has never been this straightforward." buttonContent="register" altText="cardImage-1" />
          <Featurecard title="Streamline Your Exchange Investments" description="Easily manage your exchange trades with FinTechFusion. Connect your exchange account, then track and manage your investments all in one place. Simplify your trading experience." buttonContent="Creat Portfolio" altText="cardImage-2" />
          <Featurecard title="Bot Strategies at Your Fingertips" description="New to trading bots? Use FinTechFusion's strategy presets inspired by experienced traders to bypass the initial learning phase and start optimizing your trades right away." buttonContent="Select a Trading Bot" altText="cardImage-3" />
          <Featurecard title="Harness the Power of AI" description="Maximize your trading potential with FinTechFusion's AI bot. Leverage advanced algorithms and the collective wisdom of seasoned traders to refine your strategy and enhance your market position." buttonContent="Select a Trading Bot" altText="cardImage-4" />
        </div>
        {/* <SectionHeading title="The right tools for every kind of market" /> */}
        <Textbox mainClass="capitalize" title="why choose our crypto trading platform ? " description="discover the key features that make our platform the best choise for your crypto trading needs" />
        <section className="trading-platform">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
            {tradingPlatformData.map((item, index) => {
              return (
                <div className="shadow rounded-md bg-secondary p-4" key={index}>
                  <div className="title flex items-center">
                    <span className="text-4xl text-primary-700">{<item.icon />}</span>
                    <h2 className="text-2xl font-bold mx-3 hover:text-primary-700">{item.title}</h2>
                  </div>
                  <div className="description">
                    <p className="text-gray-500 py-3 text-lg">{item.description}</p>
                  </div>
                </div>
              )
            })}
        </div>
        </section>
      </div>

    </div>
  );
}
