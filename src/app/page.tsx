"use client"
import Textbox from "@/components/common/Text/Textbox";
import Hero from "./(roots)/(Home)/page";
import SectionHeading from "@/components/common/Text/Heading";
import Featurecard from "@/components/FeatureCard";

export default function Component() {

  return (
    <div className="px-3 mt-16">
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
          <Featurecard title="Advanced Trading Made Easy" description="With FinTechFusion's SmartTrade, set your trades ahead of time with specific triggers. Just set it up and let FinTechFusion do the rest. Trading has never been this straightforward." buttonContent="sign up" />
          <Featurecard title="Streamline Your Exchange Investments" description="Easily manage your exchange trades with FinTechFusion. Connect your exchange account, then track and manage your investments all in one place. Simplify your trading experience." buttonContent="Creat Portfolio" />
          <Featurecard title="Bot Strategies at Your Fingertips" description="New to trading bots? Use FinTechFusion's strategy presets inspired by experienced traders to bypass the initial learning phase and start optimizing your trades right away." buttonContent="Select a Trading Bot" />
          <Featurecard title="Harness the Power of AI" description="Maximize your trading potential with FinTechFusion's AI bot. Leverage advanced algorithms and the collective wisdom of seasoned traders to refine your strategy and enhance your market position." buttonContent="Select a Trading Bot" />
        </div>
        <SectionHeading title="The right tools for every kind of market" />
      </div>

    </div>
  );
}
