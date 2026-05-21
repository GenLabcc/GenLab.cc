import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './VoiceAgent.module.css';

// Import category images
import marketingImg from '@/assets/images/ai_agents/marketing_card.png';
import customerImg from '@/assets/images/ai_agents/customer_card.png';
import collectionsImg from '@/assets/images/ai_agents/collections_card.png';
import hiringImg from '@/assets/images/ai_agents/hiring_card.png';

// Import phone frame assets
import titaniumFrame from '@/assets/images/capabilities/phone/titanium-frame.svg';
import screenFrame from '@/assets/images/capabilities/phone/screen-frame.svg';
import sideButtons from '@/assets/images/capabilities/phone/side-buttons.svg';
import screenHere from '@/assets/images/capabilities/phone/screen-here.svg';
import voiceBg from '@/assets/images/capabilities/phone/background_voice.jpg';

const VoiceAgent = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isExpanding, setIsExpanding] = useState(false);
  const [activeCategoryName, setActiveCategoryName] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  // Update mobile status on resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categories = [
    {
      id: 'marketing',
      title: 'MARKETING & SALES',
      points: [
        'Tamil sales calls convert 3x faster',
        'Auto-lead qualification + follow-ups',
        '24/7 objection handling in local slang'
      ],
      image: marketingImg
    },
    {
      id: 'customer_experience',
      title: 'CUSTOMER EXPERIENCE',
      points: [
        'Personalized Tamil/English support',
        'Zero wait times, instant resolutions',
        'NPS boost from human-like conversations'
      ],
      image: customerImg
    },
    {
      id: 'collections',
      title: 'COLLECTIONS',
      points: [
        'Polite Tamil reminders recover 35% more',
        'Payment negotiations without agents',
        'Auto-schedule rescheduling calls'
      ],
      image: collectionsImg
    },
    {
      id: 'hiring',
      title: 'HIRING PROCESS',
      points: [
        'Interview screening at scale',
        'Culture-fit voice assessments',
        'Schedule interviews across time zones'
      ],
      image: hiringImg
    }
  ];

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat.id);
    setActiveCategoryName(cat.title);
    setIsExpanding(true);
    
    const phoneSection = document.getElementById('voice-ai-section');
    if (phoneSection) {
      phoneSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Reset island expansion after some time
    setTimeout(() => {
      setIsExpanding(false);
    }, 4500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.mobile || !selectedCategory) {
      alert('Please fill all fields and select a category.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setIsExpanding(true); // Show island during submission

    // Find full category name for the spreadsheet
    const catName = categories.find(c => c.id === selectedCategory)?.title || selectedCategory;

    try {
      const scriptUrl = import.meta.env.VITE_USER_voice_DATA_COLLECTION_URL;
      
      if (!scriptUrl) {
        throw new Error('Submission URL missing');
      }

      // Using URLSearchParams for Google Apps Script GET request (common for simple backends)
      const params = new URLSearchParams({
        action: 'agentEnquiry',
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        category: catName,
        timestamp: new Date().toISOString()
      });

      const response = await fetch(`${scriptUrl}?${params.toString()}`, {
        method: 'GET', // Apps Script often works best with GET for simple data entry
        mode: 'no-cors' // Use no-cors if the Apps Script doesn't have CORS headers enabled
      });

      // Since 'no-cors' doesn't return success/fail info, we assume success after the fetch succeeds
      setSubmitStatus('success');
      setActiveCategoryName('Request Received!');
      
      // Reset form after success
      setTimeout(() => {
        setFormData({ name: '', email: '', mobile: '' });
        setSelectedCategory('');
        setSubmitStatus(null);
        setIsExpanding(false);
      }, 5000);

    } catch (error) {
      console.error('Submission Error:', error);
      setSubmitStatus('error');
      setActiveCategoryName('Retrying...');
      
      setTimeout(() => {
        setSubmitStatus(null);
        setIsExpanding(false);
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Responsive Island Values
  const islandWidthConst = isMobile ? (isExpanding ? 280 : 120) : (isExpanding ? 440 : 180);
  const islandHeightConst = isMobile ? (isExpanding ? 56 : 32) : (isExpanding ? 84 : 52);
  const islandYOffset = isMobile ? (isExpanding ? 8 : 0) : (isExpanding ? 12 : 0);

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <p className={styles.whatsNew}>WHAT'S NEW</p>
        <h2 className={styles.mainTitle}>AI Agents for Enterprises</h2>
      </div>

      <div className={styles.categoriesGrid}>
        {categories.map((cat, index) => (
          <motion.div 
            key={cat.id} 
            className={styles.categoryCard}
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleCategoryClick(cat)}
            style={{ cursor: 'pointer' }}
          >
            <div className={styles.imageWrapper}>
              <img src={cat.image} alt={cat.title} className={styles.cardImage} />
            </div>
            <div className={styles.catContent}>
              <h3 className={styles.catTitle}>{cat.title}</h3>
              <ul className={styles.points}>
                {cat.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      <div 
         id="voice-ai-section"
         className={styles.voiceAIContainer}
         style={{ backgroundImage: `url(${voiceBg})` }}
      >
        <div className={styles.voiceAIHeader}>
          <h2 className={styles.voiceTitle}>Try our Voice AI</h2>
          <p className={styles.voiceSubtitle}>
            Automate your telecalling operations with an enterprise-grade AI voice agent that speaks like a human and handles both inbound and outbound calls independently.
          </p>
        </div>

        <div className={styles.phoneAssembly}>
          <img src={titaniumFrame} alt="" className={styles.titaniumFrame} />
          <img src={sideButtons} alt="" className={styles.sideButtons} />
          <img src={screenFrame} alt="" className={styles.screenFrame} />
          
          <div className={styles.screenArea}>
             <img src={screenHere} alt="" className={styles.screenBg} />
             
             <div className={styles.phoneContent}>
                {/* Dynamic Island Notch */}
                <motion.div 
                   className={styles.phoneNotch}
                   initial={false}
                   animate={{
                     width: islandWidthConst,
                     height: islandHeightConst,
                     borderRadius: islandHeightConst / 2,
                     y: islandYOffset,
                     x: "-50%",
                     backgroundColor: submitStatus === 'success' ? '#32CD32' : '#000'
                   }}
                   transition={{ 
                     type: "spring", 
                     stiffness: 260, 
                     damping: 20 
                   }}
                   onClick={() => setIsExpanding(!isExpanding)}
                   style={{ cursor: 'pointer' }}
                >
                  <AnimatePresence mode="wait">
                    {isExpanding && (
                      <motion.div 
                        key="island-content-expanded"
                        className={styles.islandContent}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        style={{ 
                          scale: isMobile ? 0.75 : 1,
                          padding: isMobile ? "0 10px" : "0 24px",
                          gap: isMobile ? "10px" : "20px"
                        }}
                      >
                        <div className={styles.islandPulse} style={{ backgroundColor: submitStatus === 'success' ? '#fff' : '#d9ff00' }}></div>
                        <div className={styles.islandText}>
                          <span>{submitStatus === 'success' ? 'Confirmed' : (isSubmitting ? 'Processing' : 'Selected Agent')}</span>
                          <strong style={{ color: submitStatus === 'success' ? '#fff' : '#fff' }}>
                            {submitStatus === 'success' ? 'Call Scheduled' : (activeCategoryName || 'Wait...')}
                          </strong>
                        </div>
                        <div className={styles.islandIcon}>
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                            <path d="M20 6L9 17L4 12" stroke={submitStatus === 'success' ? '#fff' : '#d9ff00'} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
               
                <form className={styles.phoneForm} onSubmit={handleFormSubmit}>
                  <div className={styles.phoneInputGroup}>
                    <label>Name</label>
                    <input 
                      type="text" 
                      name="name"
                      placeholder="Enter Name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className={styles.phoneInputGroup}>
                    <label>Email</label>
                    <input 
                      type="email" 
                      name="email"
                      placeholder="Enter Email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className={styles.phoneInputGroup}>
                    <label>Mobile Number</label>
                    <div className={styles.phoneField}>
                      <span className={styles.phonePrefix}>+91 |</span>
                      <input 
                        type="tel" 
                        name="mobile"
                        placeholder=" " 
                        value={formData.mobile}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.phoneInputGroup}>
                    <label>Category</label>
                    <div className={styles.phoneSelectWrapper}>
                      <select 
                        value={selectedCategory} 
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        required
                      >
                        <option value="">Select</option>
                        <option value="marketing">Marketing & Sales</option>
                        <option value="customer_experience">Customer Experience</option>
                        <option value="collections">Collections</option>
                        <option value="hiring">Hiring Process</option>
                      </select>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className={styles.phoneStartBtn}
                    disabled={isSubmitting}
                  >
                     {isSubmitting ? 'Connecting...' : 'Start Call'}
                     <div className={styles.phoneIcon}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                           <path d="M12 4L13.5 9.5L19 11L13.5 12.5L12 18L10.5 12.5L5 11L10.5 9.5L12 4Z" fill="black" />
                        </svg>
                     </div>
                  </button>
                </form>
             </div>
          </div>
        </div>
      </div>

      <div className={styles.footerRow}>
        <p className={styles.footerText}>
          Our multilingual AI agents detect intent, trigger workflows, and close loops across voice, chat, WhatsApp, and email. Scaling service with authentic Tamil/English conversations.
        </p>
        <button className={styles.bookDemoBtn}>Book a Demo</button>
      </div>
    </section>
  );
};

export default VoiceAgent;
