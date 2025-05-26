import ContainerBorder from "../../../components/ContainerBorder";
import Subscribe from "../../../components/Subscribe";
import Link from "next/link";
import Image from "next/image"; // Added import

export default function Bio() {
    return (
        <>
            <ContainerBorder className="about flex-column align-items-center pt-5 pb-5 text-md-center">
                        <div className="img-container">
                            <Image 
                                src="/images/about-img-1.png" 
                                alt="Author portrait" 
                                width={500} // Add appropriate width
                                height={500} // Add appropriate height
                            />
                        </div>
                        <div className="about-header p-0 mt-4 mb-4 mb-md-5">
                            <span>Hey!</span> So Glad You&apos;re Here.
                        </div>
                        <div className="about-content px-18 p-0 blue-text">
                            <p>I&apos;m a 62-year-old political commentator — Norwegian by birth, but for the past 30+ years, I&apos;ve called sunny Spain my home. With roots in the cool north and decades of life experience in the vibrant south, I bring a truly European perspective to the global political conversation. 🌍</p>
                            <p>Outspoken and extroverted, I thrive on real dialogue. I love talking to people — in cafés, on the street, online — because every conversation has the power to reveal something deeper about our society and the forces shaping it. I&apos;m a Gemini (yes, I own it!) with a touch of ADHD, which means I&apos;m relentlessly curious, constantly digging, always connecting the dots — often before others even notice the lines.</p>
                            <p>My commentary is bold, honest, and unfiltered. I don&apos;t shy away from difficult truths, and I don&apos;t sit quietly when injustice rears its head. I fight for what&apos;s right, for the silenced voices, and for political transparency. 🗳️ I believe that hypocrisy — whether in parliaments or pressrooms — must be exposed, and I do it with clarity, humor, and conviction.</p>
                            <p>In a world clouded by misinformation and selective outrage, my mission is to bring clarity, context, and courage back to political discourse. If you&apos;re tired of the spin and looking for someone who tells it like it is — with both fire and fairness — you&apos;re in the right place.</p>
                            <p>Let&apos;s keep asking the hard questions and demanding better from those in power. The fight for truth is never over — and I&apos;m not done talking. 🎤</p>
                        </div>
                        <div className="d-flex d-md-content justify-content-center">
                            <Link href='#' className="justify-self-center btn btn-outline-success subscribe">
                              Visit My Portfolio Website
                            </Link>
                        </div>
            </ContainerBorder>
            <Subscribe sectionClassName="p-5" inputClassName="bg-light"/>       
        </>
    )
}