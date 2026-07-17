import { useState } from "react";
import React, { useEffect, useRef } from 'react';
import "./launch.css";
import Journey from "./Journey";
import ConnectSection from "../../components/ConnectSection/ConnectSection";


import launchpadImg from "../../assets/logos/academia/Launch_img.png";
import vit from "../../assets/logos/academia/vit.webp";
import arunachala from "../../assets/logos/academia/a_arunachala.webp";
import sns from "../../assets/logos/academia/a_3.webp";
import hindi from "../../assets/logos/academia/a_4.png";
import telugu from "../../assets/logos/academia/a_5.png";
import sit from "../../assets/logos/academia/a_6.png";
import christ from "../../assets/logos/academia/Christ.webp";
import fatima from "../../assets/logos/academia/fatima.webp";
import fx from "../../assets/logos/academia/fx.webp";
import sm from "../../assets/logos/academia/sm.webp";
import niche from "../../assets/logos/academia/Niche.webp";
import xavier from "../../assets/logos/academia/xavier.webp";
import dmi from "../../assets/logos/academia/dmi.webp";
import mt from "../../assets/logos/academia/mt.webp";
import scad from "../../assets/logos/academia/scad.webp";
import appa from "../../assets/logos/academia/appa.webp";
import av from "../../assets/logos/academia/av.webp";
import sree from "../../assets/logos/academia/sree.webp";

import event1 from "../../assets/launchpad_reviews/events/Launch-event1.webp";
import event2 from "../../assets/launchpad_reviews/events/Launch-event2.webp";
import event3 from "../../assets/launchpad_reviews/events/Launch-event3.webp";
import event4 from "../../assets/launchpad_reviews/events/Launch-event4.webp";
import event5 from "../../assets/launchpad_reviews/events/launch-event5.webp";
import event6 from "../../assets/launchpad_reviews/events/Launch-event6.webp";
import event7 from "../../assets/launchpad_reviews/events/launch-event7.webp";
import event8 from "../../assets/launchpad_reviews/events/Launch-event8.webp";

import achieve1 from "../../assets/launchpad_reviews/achieved/Achieve1.webp";
import achieve2 from "../../assets/launchpad_reviews/achieved/Achieve2.webp";
import achieve3 from "../../assets/launchpad_reviews/achieved/Achieve3.webp";

import review1 from "../../assets/launchpad_reviews/review_1_1x.webp";
import review2 from "../../assets/launchpad_reviews/review_2_1x.webp";
import review3 from "../../assets/launchpad_reviews/review_3_1x.webp";
import review4 from "../../assets/launchpad_reviews/review_4_1x.webp";
import review5 from "../../assets/launchpad_reviews/review_5_1x.webp";
import review6 from "../../assets/launchpad_reviews/review_6_1x.webp";
import review7 from "../../assets/launchpad_reviews/review_7_1x.webp";
import review8 from "../../assets/launchpad_reviews/review_8_1x.webp";
import review9 from "../../assets/launchpad_reviews/review_9_1x.webp";
import review10 from "../../assets/launchpad_reviews/review_10_1x.webp";
import review11 from "../../assets/launchpad_reviews/review_11_1x.webp";
import review12 from "../../assets/launchpad_reviews/review_12_1x.webp";
import review13 from "../../assets/launchpad_reviews/review_13_1x.webp";
import review14 from "../../assets/launchpad_reviews/review_14_1x.webp";
import review15 from "../../assets/launchpad_reviews/review_15_1x.webp";
import Courses from "../../components/Courses/Courses";

export default function Launchpad() {
    const imgRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!imgRef.current || !imgRef.current.parentElement) return;

            // Use parent element for bounds to avoid jitter from transform scaling
            const rect = imgRef.current.parentElement.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calculate distance from center of screen to center of element
            const elementCenterY = rect.top + rect.height / 2;
            const screenCenterY = windowHeight / 2;

            // Max scale is 1.25 (since image is 80% width, 80% * 1.25 = 100%)
            // Distance threshold for when the animation starts/ends
            const maxDistance = windowHeight / 1.2;
            const distance = Math.abs(screenCenterY - elementCenterY);

            // Calculate scale: max at center, smoothly approaches 1 at edges
            let scale = 1.25 - (distance / maxDistance) * 0.25;
            scale = Math.min(Math.max(scale, 1), 1.25);

            imgRef.current.style.transform = `scale(${scale})`;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Trigger once on mount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const [activeTab, setActiveTab] = useState('Hackathon');

    return (
        <>
            <div className='launchpad-page'>
                <div className='launch-title'>
                    <h1>Launchpad</h1>
                    <a href="https://gen-system.vercel.app" className="onboarding_sys">
                    Onboarding
                    </a>
                </div>
                <div className='launch-dis'>
                    <div className='launch-left'>
                        <h2>OUR <br /> CAPABILITIES</h2>
                        <h4>We're a Gen Z team of strategists,<br />
                            designers and AI builders.</h4>
                    </div>
                    <div className='launch-right'>
                        <h3 className={activeTab === 'Bootcamp' ? 'active' : ''} onClick={() => setActiveTab('Bootcamp')}>• Bootcamp •</h3>
                        <h3 className={activeTab === 'Hackathon' ? 'active' : ''} onClick={() => setActiveTab('Hackathon')}>• Hackathon •</h3>
                        <h3 className={activeTab === 'Incubation' ? 'active' : ''} onClick={() => setActiveTab('Incubation')}>• Incubation •</h3>
                    </div>
                </div>
            </div>

            <div className='launch-img'>
                <img ref={imgRef} src={launchpadImg} alt="Launchpad" />
            </div>

            <Journey/>
            <Courses/>

            <div className='launch-white'>
                <div className='launch-colleges'>
                    <h2>Our College Partners</h2>
                </div>

                <div className='launch-partners'>
                    <div className='partner-one'>
                        <img src={vit} alt='VIT'></img>
                        <img src={arunachala} alt='Arunachala'></img>
                        <img src={sns} alt='SNS'></img>
                        <img src={hindi} alt='Hindi'></img>
                        <img src={telugu} alt='Telugu'></img>
                        <img src={sit} alt='SIT'></img>
                        <img src={christ} alt='Christ' className="logo-size"></img>
                        <img src={fatima} alt='Fatima' className="logo-size"></img>
                        <img src={fx} alt='FX' className="logo-size"></img>
                        <img src={sm} alt='SM' className="logo-size"></img>
                        <img src={niche} alt='Niche'></img>
                        <img src={xavier} alt='Xavier'></img>
                        <img src={dmi} alt='DMI' className="logo-size"></img>
                        <img src={mt} alt='MT'></img>
                        <img src={scad} alt='SCAD' className="logo-size"></img>
                        <img src={appa} alt='APPA' className="logo-size"></img>
                        <img src={av} alt='AV' className="logo-size"></img>
                        <img src={sree} alt='Sree' className="logo-size"></img>
                    </div>
                </div>

                <div className="launch-event">
                    <h2>Our Events</h2>
                    <div className="launch-ev-img">
                        <div className="ev-row ev-row-left">
                            <img className="ev-img ev-img-small" src={event1} alt="event1" />
                            <img className="ev-img ev-img-big" src={event2} alt="event2" />
                            <div className="ev-text">
                                <h3>AI Summit</h3>
                                <p>We bring our AI Summit to cities like Bengaluru, Coimbatore, and beyond to accelerate developer and student adoption across India's growing AI future.</p>
                            </div>
                        </div>

                        <div className="ev-row ev-row-right">
                            <img className="ev-img ev-img-big" src={event3} alt="event3" />
                            <img className="ev-img ev-img-small" src={event4} alt="event4" />
                            <div className="ev-text">
                                <h3>Hackathon</h3>
                                <p>Our Hackathons bring together students across cities in India to develop innovative AI solutions that define the next era of Indian tech.</p>
                            </div>
                        </div>

                        <div className="ev-row ev-row-left">
                            <img className="ev-img ev-img-small" src={event5} alt="event5" />
                            <img className="ev-img ev-img-big" src={event6} alt="event6" />
                            <div className="ev-text">
                                <h3>Bootcamp</h3>
                                <p>Our Bootcamps are built for beginners!
                                    We take you from zero to job-ready through hands-on training in Web Development, App Development, UI/UX, Data Science, AI programs and more..</p>
                            </div>
                        </div>

                        <div className="ev-row ev-row-right">
                            <img className="ev-img ev-img-big" src={event7} alt="event7" />
                            <img className="ev-img ev-img-small" src={event8} alt="event8" />
                            <div className="ev-text">
                                <h3>Incubation</h3>
                                <p>We support early-stage student startups by providing funding, mentorship, infrastructure, and networking opportunities to help great ideas grow into real businesses.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="launch-achieve">
                <div className="achieve-img">
                    <img src={achieve1} alt='achieve1'></img>
                    <img src={achieve2} alt='achieve2'></img>
                    <img src={achieve3} alt='achieve3' ></img>
                </div>
            </div>

            <div className="launch-review">
                <div className="review-marquee-container">
                    <div className="review-gallery-wrapper">
                        {[
                            [review1, review6, review11],
                            [review2, review7, review12],
                            [review3, review8, review13],
                            [review4, review9, review14],
                            [review5, review10, review15]
                        ].map((colImages, index) => (
                            <div key={index} className="review-col">
                                <div className={`review-col-inner ${index % 2 === 0 ? 'scroll-up' : 'scroll-down'}`}>
                                    <div className="review-col-part">
                                        {colImages.map((img, i) => <img key={i} src={img} alt={`review${index}-${i}`} />)}
                                    </div>
                                    <div className="review-col-part">
                                        {colImages.map((img, i) => <img key={i + 3} src={img} alt={`review-dup${index}-${i}`} />)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <ConnectSection></ConnectSection>
        </>
    )
}