import { useEffect, useState } from "react";
import connectIcon from "@/assets/icons/connect.webp";
import chatIcon from "@/assets/icons/chat.webp";
import createIcon from "@/assets/icons/create.webp";

const style = `
  * { box-sizing: border-box; margin: 0; padding: 0; }

  .ce-page {
    height: 75dvh;
    width: 100%;
    background: #0a0a0a;
    font-family: 'Clash Display', sans-serif;
    position: relative;
    overflow: hidden;
  }

  .ce-content {
    position: absolute;
    top: clamp(40px, 10%, 200px);
    left: clamp(24px, 8%, 150px);
    right: clamp(24px, 8%, 150px);
    bottom: clamp(40px, 10%, 200px);
    width: auto;
    height: auto;
    display: flex;
    flex-direction: column;
    gap: clamp(28px, 4vh, 56px);
  }

  .ce-title {
    font-weight: 400;
    font-size: clamp(24px, 3vw, 40px);
    letter-spacing: 0.08em;
    color: rgba(240, 240, 240, 1);
    text-transform: uppercase;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .ce-title.visible { opacity: 1; transform: translateY(0); }

  .ce-subtitle {
    font-weight: 400;
    font-size: 14px;
    line-height: 1.35;
    color: rgba(180, 180, 180, 1);
    max-width: 560px;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.6s ease 0.06s, transform 0.6s ease 0.06s;
  }
  .ce-subtitle.visible { opacity: 1; transform: translateY(0); }

  .ce-cards {
    display: flex;
    gap: 34px;
    align-items: stretch;
    flex: 1;
    min-height: 0;
  }

  .ce-card {
    flex: 1;
    min-width: 0;
    border-radius: 18px;
    padding: 34px;
    background: rgba(0, 0, 0, 0.62);
    border: 1px solid rgba(255, 255, 255, 0.16);
    box-shadow:
      0 18px 40px rgba(0,0,0,0.55),
      inset 0 1px 0 rgba(255,255,255,0.06);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: clamp(280px, 45vh, 460px);
    opacity: 0;
    transform: translateY(18px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .ce-card.visible { opacity: 1; transform: translateY(0); }
  .ce-card:nth-child(1) { transition-delay: 0.14s; }
  .ce-card:nth-child(2) { transition-delay: 0.22s; }
  .ce-card:nth-child(3) { transition-delay: 0.30s; }

  .ce-icon {
    width: 60px;
    height: 60px;
    border-radius: 8px;
    background: var(--accent-color, #c2e600);
    display: grid;
    place-items: center;
    overflow: hidden;
  }

  .ce-icon-fallback {
    font-size: 28px;
    font-weight: 600;
    color: rgba(0,0,0,0.55);
    line-height: 1;
    user-select: none;
  }

  .ce-icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .ce-card-title {
    font-weight: 400;
    font-size: clamp(36px, 3.3vw, 50px);
    color: rgba(240, 240, 240, 1);
    letter-spacing: -0.01em;
    line-height: 2;
  }

  .ce-card-desc {
    font-weight: 400;
    font-size: 15px;
    line-height: 1;
    color: rgba(175, 175, 175, 1);
    max-width: 360px;
    line-height: 0.95;
  }

  @media (max-width: 900px) {
    .ce-page {
      height: auto;
      min-height: 75vh;
      overflow: visible;
      padding-bottom: 40px;
      padding-right: 40px;  
    }
    .ce-content {
      position: relative;
      top: auto;
      left: auto;
      right: auto;
      bottom: auto;
      width: calc(100% - 32px);
      margin: 35px;
    }
    .ce-cards {
      flex-direction: column;
      gap: 20px;
      flex: initial;
    }
    .ce-card {
      min-height: 340px;
      padding: 28px;
    }
  }
`;

const cards = [
  {
    icon: connectIcon,
    title: "Connect",
    desc: "We decode your brand, audience and goals to find where design and AI can hit hardest.",
  },
  {
    icon: chatIcon,
    title: "Chat",
    desc: "We jam with your team in real time to shape sharp, Gen Z-ready ideas and flows.",
  },
  {
    icon: createIcon,
    title: "Create",
    desc: "We turn strategy into visuals, content and automations built to launch and scale.",
  },
];

export default function CreativityEngine() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{style}</style>
      <section className="ce-page">
        <div className="ce-content">
          <div>
            <div className={`ce-title ${visible ? "visible" : ""}`}>
              OUR CREATIVITY ENGINE
            </div>
            <div className={`ce-subtitle ${visible ? "visible" : ""}`}>
              The world's sharpest view of
              <br />
              The Gen Z creativity powered by our 3C engine
            </div>
          </div>

          <div className="ce-cards">
            {cards.map((card, i) => (
              <div key={card.title} className={`ce-card ${visible ? "visible" : ""}`}>
                <div className="ce-icon">
                  <img src={card.icon} alt={`${card.title} icon`} />
                </div>

                <div>
                  <div className="ce-card-title">{card.title}</div>
                  <div className="ce-card-desc">{card.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
