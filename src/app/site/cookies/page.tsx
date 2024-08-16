import SectionHeading from "@/app/_components/common/Text/Heading";
import TextInfo from "@/app/_components/common/Text/TextInfo";
import Textbox from "@/app/_components/common/Text/Textbox";

export default function page() {
   return (
      <section className="container mx-auto px-2">
         <SectionHeading title="Cookies Notice" />
         <TextInfo content="this cookies notice is effective of december 10, 2023" />
         <TextInfo content="this notice specifically explains how we deploy and administer cookies on our website https:/fintechfusion.net (the site), as well as the options you have to control them. for further information on how we process your personal data, see our privacy notice ." />
         <Textbox titleClass="text-xl" title="What are cookies?" description="cookies are small pieces of data stored in text files that are stored on your computer or other devices when websites are loaded in a browser. they are widely used to remember you and your preferences, either for a single visit (“session cookie”) or for multiple repeat visits (“persistent cookie”). they ensure a consistent and efficient experience for visitors and perform essential functions such as allowing users to register and remain logged in. cookies may be set by the site that you are visiting (“first party cookies”) or by third parties, such as those who serve content or provide advertising or analytics services on the website (“third party cookies”). the types of cookies we use" />
         <Textbox titleClass="text-xl" title="How to control cookies" description="where you have consented to our use of cookies through the consent banner, apart from necessary cookies, you agree to our use of cookies as per this notice. you may at any time change or withdraw your cookie consent by clicking a shield icon on our website, which opens the cookie consent banner.most browsers provide ways to control cookie behavior, such as the time they are stored – either through built-in functionality or by utilizing third-party plugins.if you would prefer to opt-out of cookies, you should be aware that you might lose some features and functionality of the website. cookies, including those which have already been set, can be deleted from your device. you can also change the preferences in your web browser to control cookies. some internet browsers have a „do not track“ or „dnt“ setting - this sends a signal to websites asking them not to track your browsing." />
         <TextInfo content="for more information on how to control cookies, check your browser or device’s settings for how you can control or reject cookies, or visit the support pages for your browser." />
         <Textbox titleClass="text-xl" title="Contact us" description="if you have any questions about our use of cookies, please send to our email." />
      </section>
   )
}
