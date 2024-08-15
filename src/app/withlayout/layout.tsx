// app/withlayout/layout.tsx
import Header from "../_components/common/Header/Header";
import Footer from "../_components/common/Footer/Footer";

type WithLayoutProps = {
   children: React.ReactNode;
   show?: boolean; // Add a show prop to control Header/Footer rendering
};

export default function WithLayout({ children, show = true }: WithLayoutProps) {
   return (
      <>
         <Header />
         <main>{children}</main>
          <Footer />
      </>
   );
}
