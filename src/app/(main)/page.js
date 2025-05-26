import Blog from "../../components/RecentBlog";
import ContactForm from "../../components/ContactForm";
import Hero from "../../components/Hero";
import Quote from "../../components/Quote";


export default function Home() {
  return (
    <main>
      <Hero />
      <Blog postToShow='3' sectionClassName="home-blog px-4 px-xl-5" columnClassName="col-lg-4 col-md-6"/>
      <Quote />
      <ContactForm />   
    </main>
  );
}
