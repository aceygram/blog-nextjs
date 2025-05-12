import Blog from "@/components/Blog";
import ContactForm from "@/components/ContactForm";
import Hero from "@/components/Hero";
import Quote from "@/components/Quote";


export default function Home() {
  return (
    <main>
      <Hero />
      <Blog />
      <Quote />
      <ContactForm />   
    </main>
  );
}
