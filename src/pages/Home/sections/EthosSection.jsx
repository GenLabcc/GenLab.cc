import React from 'react';
import styles from './HeroSection.module.css';
import { useState, useEffect } from "react";

const style = `
  @import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  /*
    Canvas: 1920 × 1080
    Padding: 200px all sides
    Content area: 1520 × 680px
    Background: light grey — matches screenshot exactly
  */
  .ethos-page {
    font-family: 'Clash Display Variable', 'Clash Display', sans-serif;
    background: #e8e8e4;
    width: 100vw;
    height: 100dvh;
    position: relative;
    overflow: hidden;
    opacity: 1;
    transform: rotate(0deg);
  }

  /* Content area */
  .content {
    position: absolute;
    top: clamp(40px, 10%, 200px);
    left: clamp(24px, 10%, 200px);
    right: clamp(24px, 10%, 200px);
    bottom: clamp(40px, 10%, 200px);
    width: auto;
    height: auto;
  }

  /* ─────────────────────────────────────────
     OUR ETHOS
     Exact spec: w:1520 h:38  |  400 Regular  56px  lh:38  uppercase
     Position: top-left of content area
  ───────────────────────────────────────── */
  .label {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .label.visible { opacity: 1; transform: translateY(0); }

  .label-text {
    font-family: 'Clash Display Variable', 'Clash Display', sans-serif;
    font-weight: 400;
    font-size: clamp(28px, 4vw, 56px);
    line-height: 1.1;
    letter-spacing: 0px;
    color: rgba(16, 16, 16, 1);
    text-transform: uppercase;
    vertical-align: middle;
    white-space: nowrap;
  }

  /* ─────────────────────────────────────────
     BODY COPY
     Exact spec: w:660.984375  h:190
     400 Regular  36px  lh:38  ls:0
     No background (transparent — light bg shows through, matching screenshot)
     Positioned: horizontally center-right (matches screenshot: starts ~30% from left)
     Vertically: center of content area
  ───────────────────────────────────────── */
  .body-wrap {
    position: absolute;
    top: 50%;
    left: 12%; /* Starts roughly at the center of 'OUR ETHOS' */
    right: 18%; /* Ends roughly at the center of 'From India To The World' */
    transform: translateY(-50%) translateY(12px);
    width: auto;
    height: auto;
    display: flex;
    align-items: center;
    opacity: 0;
    transition: opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s;
  }
  .body-wrap.visible { opacity: 1; transform: translateY(-50%); }

  .body-copy {
    font-family: 'Clash Display Variable', 'Clash Display', sans-serif;
    font-weight: 400;
    font-size: clamp(16px, 2.2vw, 36px);
    line-height: 1.4;
    letter-spacing: 0px;
    color: rgba(16, 16, 16, 1);
    vertical-align: middle;
  }

  .body-copy .keyword {
    font-weight: 500;
    color: rgba(16, 16, 16, 1);
  }

  /* ─────────────────────────────────────────
     FROM INDIA TO THE WORLD
     Exact spec: w:1520  h:128
     600 Semibold  62px  lh:64  ls:2%  text-align:right
     No background (transparent — matches screenshot)
     Pinned to bottom of content area
  ───────────────────────────────────────── */
  .tagline-wrap {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.7s ease 0.38s, transform 0.7s ease 0.38s;
  }
  .tagline-wrap.visible { opacity: 1; transform: translateY(0); }

  .tagline-inner {
    text-align: right;
  }

  .tagline-line {
    font-family: 'Clash Display Variable', 'Clash Display', sans-serif;
    font-weight: 600;
    font-size: clamp(28px, 4.5vw, 62px);
    line-height: 1.1;
    letter-spacing: 0.02em;
    color: rgba(16, 16, 16, 1);
    text-align: right;
    vertical-align: middle;
    display: block;
  }
`;

export default function OurEthos() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{style}</style>
      <div className="ethos-page">
        <div className="content">

          {/* OUR ETHOS — top left, w:1520 h:38, 400 56px uppercase */}
          <div className={`label ${visible ? "visible" : ""}`}>
            <span className="label-text">Our Ethos</span>
          </div>

          {/* BODY COPY — center, w:660.984 h:190, 400 36px */}
          <div className={`body-wrap ${visible ? "visible" : ""}`}>
            <p className="body-copy">
              We transform and create{" "}
              <span className="keyword">(IMPACTFUL)</span> brands &amp; AI
              solutions. With over{" "}
              <span className="keyword">(10+COMPANIES)</span> having already
              partnered with us to turn up their brand &amp; achieve{" "}
              <span className="keyword">(GROWTH)</span>
            </p>
          </div>

          {/* FROM INDIA TO THE WORLD — bottom right, w:1520 h:128, 600 62px ls:2% right-aligned */}
          <div className={`tagline-wrap ${visible ? "visible" : ""}`}>
            <div className="tagline-inner">
              <span className="tagline-line">From India</span>
              <span className="tagline-line">To The World.</span>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}