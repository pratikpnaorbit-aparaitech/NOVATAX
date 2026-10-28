import React, {useState, useEffect} from 'react';
import {Routes, Route, Link, useParams, useLocation, useNavigate} from 'react-router-dom';
import {
  Phone, Mail, Globe2, Menu, X, ChevronDown, ChevronUp, MessageCircle, Send, CheckCircle2,
  Building2, ReceiptText, FileText, Factory, Award, ShieldCheck, Users, MapPin, Clock3, Handshake, LockKeyhole,
  Search, ArrowRight, HelpCircle, Lock
} from 'lucide-react';
import {
  CONTACT,
  navGroups,
  featuredServices,
  serviceMap,
  popularHeroPills,
  allServicesList
} from './data';
import LeadsDashboard from './LeadsDashboard';
import { saveLead } from './leadsStorage';

const IconByIndex = [Building2, FileText, ReceiptText, Factory, Globe2, Award];

function useScrollReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('.reveal');
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
            }
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
      );

      elements.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }, 40);

    return () => clearTimeout(timer);
  }, [pathname]);
}

function Brand() {
  return (
    <Link className="brand" to="/">
      <div className="brandMark">N</div>
      <div><b>NOVATAX</b><small>& Business Consultancy</small></div>
    </Link>
  );
}

function Header() {
  const [mobile, setMobile] = useState(false);
  return (
    <header className="navbar">
      <Brand />
      <nav className={mobile ? 'navlinks mobileOpen' : 'navlinks'}>
        <Link to="/" onClick={() => setMobile(false)}>HOME</Link>
        {navGroups.map((group) => (
          <div className="drop" key={group.label}>
            <button>{group.label}<ChevronDown size={14} /></button>
            <div className="dropdown">
              {group.items.map(([title, path]) => (
                <Link key={path} to={path} onClick={() => setMobile(false)}>{title}</Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
      <button className="hamburger" onClick={() => setMobile(!mobile)} aria-label="Toggle navigation menu">
        {mobile ? <X /> : <Menu />}
      </button>
    </header>
  );
}

function ContactForm({ defaultService }) {
  const [f, setF] = useState({
    name: '',
    email: '',
    phone: '',
    service: defaultService || '',
    message: defaultService
      ? `Hello NOVATAX & Business Consultancy, I am interested in ${defaultService}. Please guide me on required documents and pricing.`
      : ''
  });

  const [submitMode, setSubmitMode] = useState('form'); // 'form' | 'whatsapp'
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    if (defaultService) {
      setF((prev) => ({
        ...prev,
        service: defaultService,
        message: `Hello NOVATAX & Business Consultancy, I am interested in ${defaultService}. Please guide me on required documents and pricing.`
      }));
    }
  }, [defaultService]);

  const submit = (e) => {
    e.preventDefault();

    const selectedService = f.service || defaultService || 'General Business Compliance';
    const waText = `*New Enquiry from NOVATAX & Business Consultancy Website*

👤 *Name:* ${f.name}
📞 *Phone / WhatsApp:* ${f.phone}
✉️ *Email:* ${f.email}
📋 *Service Required:* ${selectedService}
💬 *Message:* ${f.message}

_Auto-forwarded to NOVATAX & Business Consultancy Team (${CONTACT.phoneDisplay}) and ${CONTACT.email}_`;

    const sourceTag = submitMode === 'whatsapp' ? 'WhatsApp Direct Chat' : 'Website Form Submission';

    // Save lead into persistent local storage and MongoDB Atlas
    saveLead({
      name: f.name,
      phone: f.phone,
      email: f.email,
      service: selectedService,
      message: f.message,
      source: sourceTag
    });

    const waUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(waText)}`;

    if (submitMode === 'whatsapp') {
      window.open(waUrl, '_blank');
    }

    setModalData({
      mode: submitMode,
      name: f.name,
      phone: f.phone,
      email: f.email,
      service: selectedService,
      waUrl
    });

    setShowModal(true);

    // Reset form fields
    setF({
      name: '',
      email: '',
      phone: '',
      service: defaultService || '',
      message: defaultService
        ? `Hello NOVATAX & Business Consultancy, I am interested in ${defaultService}. Please guide me on required documents and pricing.`
        : ''
    });
  };

  return (
    <>
      <form className="contactForm" onSubmit={submit}>
        <h3>{defaultService ? `Enquire About ${defaultService}` : 'Send Us A Message'}</h3>
        <div className="formLine" />
        {defaultService && (
          <div className="selectedServiceBadge">
            <span>Selected Service:</span> <b>{defaultService}</b>
          </div>
        )}
        <div className="twoCol">
          <input
            placeholder="Your Full Name"
            value={f.name}
            onChange={(e) => setF({ ...f, name: e.target.value })}
            required
          />
          <input
            placeholder="Email Address"
            type="email"
            value={f.email}
            onChange={(e) => setF({ ...f, email: e.target.value })}
            required
          />
        </div>
        <div className="twoCol">
          <input
            placeholder="Contact / WhatsApp Number"
            value={f.phone}
            onChange={(e) => setF({ ...f, phone: e.target.value })}
            required
          />
          <input
            placeholder="Specific Requirement or City"
            value={f.service}
            onChange={(e) => setF({ ...f, service: e.target.value })}
          />
        </div>
        <textarea
          placeholder="Write your requirement or questions here..."
          value={f.message}
          onChange={(e) => setF({ ...f, message: e.target.value })}
          required
        />

        <div className="enquirySubmitRow">
          <button
            className="btn green enquirySubmitBtn"
            type="submit"
            onClick={() => setSubmitMode('form')}
            title="Submit enquiry form and receive instant on-screen confirmation"
          >
            <CheckCircle2 size={18} />
            <span>Submit Form</span>
          </button>

          <button
            className="btn whatsappOptionBtn"
            type="submit"
            onClick={() => setSubmitMode('whatsapp')}
            title={`Send requirement directly via WhatsApp to ${CONTACT.phoneDisplay}`}
          >
            <MessageCircle size={18} />
            <span>Send via WhatsApp</span>
          </button>
        </div>
      </form>

      {/* Success Popup Modal */}
      {showModal && modalData && (
        <div className="enquiryModalOverlay" onClick={() => setShowModal(false)}>
          <div className="enquiryModalCard" onClick={(e) => e.stopPropagation()}>
            <button
              className="enquiryModalClose"
              onClick={() => setShowModal(false)}
              aria-label="Close"
              type="button"
            >
              <X size={20} />
            </button>

            <div className="enquiryModalIconWrap">
              <CheckCircle2 size={54} className="enquirySuccessCheck" />
            </div>

            <h3>{modalData.mode === 'whatsapp' ? 'WhatsApp Chat Connected!' : 'Successfully Submitted!'}</h3>
            <p className="enquiryModalMessage">
              {modalData.mode === 'whatsapp' ? (
                <>Thank you, <b>{modalData.name}</b>! Your enquiry for <b>{modalData.service}</b> has been saved and WhatsApp chat has been initiated.</>
              ) : (
                <>Thank you, <b>{modalData.name}</b>! Your enquiry for <b>{modalData.service}</b> has been successfully submitted and saved in our database.</>
              )}
            </p>

            <div className="enquiryModalSummary">
              <div className="modalSummaryRow">
                <span>Client Name:</span>
                <b>{modalData.name}</b>
              </div>
              <div className="modalSummaryRow">
                <span>Contact Number:</span>
                <b>{modalData.phone}</b>
              </div>
              <div className="modalSummaryRow">
                <span>Email Address:</span>
                <b>{modalData.email}</b>
              </div>
              <div className="modalSummaryRow">
                <span>Requirement:</span>
                <b>{modalData.service}</b>
              </div>
            </div>

            <p className="enquiryModalNotice">
              {modalData.mode === 'whatsapp'
                ? `Connecting you directly with our compliance specialist on WhatsApp (${CONTACT.phoneDisplay}).`
                : `Our senior compliance advisor will review your requirement and call you back at ${modalData.phone}.`}
            </p>

            <div className="enquiryModalBtns">
              {modalData.mode === 'whatsapp' ? (
                <a
                  href={modalData.waUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn green fullWidth"
                >
                  <MessageCircle size={18} /> Reopen WhatsApp Chat
                </a>
              ) : (
                <a
                  href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(`Hello NOVATAX & Business Consultancy, I just submitted an enquiry for ${modalData.service}. (Name: ${modalData.name}, Phone: ${modalData.phone})`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn outline fullWidth waQuickAltBtn"
                >
                  <MessageCircle size={17} /> Also Chat on WhatsApp ({CONTACT.phoneDisplay})
                </a>
              )}
              <button
                type="button"
                className="btn textBtn fullWidth"
                onClick={() => setShowModal(false)}
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ContactSection({ defaultService }) {
  return (
    <section className="contact section" id="contact">
      <div className="contactInfo reveal">
        <div className="eyebrow">CONTACT US</div>
        <h2>Let's Discuss Your <span>Business Requirements</span></h2>
        <p>
          Need assistance with registration, tax, compliance, certification, or import-export services? Contact NOVATAX & Business Consultancy for a quick, requirement-based consultation.
        </p>
        <div className="contactLine">
          <div className="contactRound"><MapPin /></div>
          <div><small>Office Address</small><b>{CONTACT.address}</b></div>
        </div>
        <div className="contactLine">
          <div className="contactRound"><Phone /></div>
          <div><small>Call Us Directly</small><b>{CONTACT.phoneDisplay}</b></div>
        </div>
        <div className="contactLine">
          <div className="contactRound"><Mail /></div>
          <div><small>Email Our Compliance Team</small><b>{CONTACT.email}</b></div>
        </div>
        <div className="contactLine">
          <div className="contactRound"><Globe2 /></div>
          <div><small>Official Domain</small><b>{CONTACT.domain}</b></div>
        </div>
      </div>
      <div className="reveal delay-200">
        <ContactForm defaultService={defaultService} />
      </div>
    </section>
  );
}

function HeroServiceSearch() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const filtered = query.trim()
    ? allServicesList.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.group.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 7)
    : [];

  const handleSelect = (path) => {
    setQuery('');
    setShowDropdown(false);
    navigate(path);
  };

  return (
    <div className="heroSearchContainer">
      <div className="heroSearchBar">
        <Search size={18} className="searchIcon" />
        <input
          type="text"
          placeholder="Search any service (e.g. Pvt Ltd, GST, IEC, ISO 9001, Trademark)..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
        />
        {query && (
          <button className="clearSearchBtn" onClick={() => setQuery('')} type="button">
            ✕
          </button>
        )}
      </div>

      {showDropdown && filtered.length > 0 && (
        <div className="heroSearchDropdown">
          {filtered.map((item) => (
            <div
              key={item.path}
              className="searchResultItem"
              onClick={() => handleSelect(item.path)}
            >
              <div>
                <b>{item.title}</b>
                <small>{item.group}</small>
              </div>
              <ArrowRight size={14} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Home() {
  const reasons = [
    [Users, 'Experienced Professionals', 'Practical assistance for tax, registration and compliance requirements.'],
    [Clock3, 'Timely Coordination', 'Clear updates and structured document follow-up.'],
    [Award, 'Business Focused', 'Solutions designed for startups, SMEs and growing companies.'],
    [Users, 'Client First', 'Simple communication and a clear service journey.'],
    [Handshake, 'Personal Assistance', 'Requirement-based guidance instead of one-size-fits-all advice.'],
    [ShieldCheck, 'Transparent Process', 'Clear scope and step-by-step support.'],
    [MapPin, 'PAN India Support', 'Remote service support for clients across India.'],
    [LockKeyhole, 'Confidential Handling', 'Business information handled with care and privacy.']
  ];

  const reviews = [
    ['Aarav Enterprises', 'Quick communication and a clear document checklist made the process easy to understand.'],
    ['Nexa Traders', 'The service flow was simple and the team coordinated our compliance requirement smoothly.'],
    ['Urban Works', 'Good support for business documentation and clear status updates.'],
    ['Brightline Exports', 'Helpful guidance for our import-export paperwork and registration process.'],
    ['Mitra Foods', 'Responsive support and straightforward explanations throughout the process.']
  ];

  const scrollToServices = (e) => {
    e.preventDefault();
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section className="hero">
        <div className="heroCopy">
          <div className="eyebrow heroEyebrow">NOVATAX • BUSINESS CONSULTANCY</div>
          <h1 className="heroTitle">
            Simple Tax &<br /><span>Compliance Support</span><br />for Growing Businesses
          </h1>
          <p className="heroDesc">
            Business registration, GST filings, income tax, import-export codes, ISO certifications, and corporate compliance — all under one roof.
          </p>

          <HeroServiceSearch />

          <div className="heroPopularPills">
            <span className="pillsLabel">Popular Services:</span>
            <div className="pillsTrack">
              {popularHeroPills.map((p) => (
                <Link key={p.path} to={p.path} className="heroPill">
                  <span>{p.title}</span>
                  <small>{p.tag}</small>
                </Link>
              ))}
            </div>
          </div>

          <div className="heroBtns">
            <a className="btn green" href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer">
              <MessageCircle size={20} /> WHATSAPP NOW
            </a>
            <a className="btn outline" href="#services" onClick={scrollToServices}>
              Explore All Services ↓
            </a>
            <a className="btn outline telBtn" href={`tel:${CONTACT.phoneRaw}`}>
              <Phone size={16} /> Call Specialist
            </a>
          </div>

          <div className="trustMini heroTrust">
            <b>Professional support</b><span>•</span><b>Clear process</b><span>•</span><b>PAN India</b>
          </div>
        </div>

        <div className="heroVisual originalVisual">
          <div className="heroVisualWrapper">
            <div className="heroGlowOrb" />
            <img
              src="/assets/novatax-hero-professional.png"
              alt="NOVATAX & Business Consultancy professional tax and compliance support"
              className="heroProfessionalImage"
            />
            <div className="heroFloatingBadge badgeTop">
              <div className="badgeIconStar">★</div>
              <div>
                <b>4.9 / 5 Rating</b>
                <small>500+ Growing Businesses</small>
              </div>
            </div>
            <div className="heroFloatingBadge badgeBottom">
              <div className="badgeIconShield"><ShieldCheck size={20} /></div>
              <div>
                <b>100% Tax Compliant</b>
                <small>PAN India Remote Support</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stats">
        {[
          ['BUSINESS SETUP', 'Registration assistance', '/services/private-limited-company'],
          ['GST & TAX', 'Compliance support', '/services/gst-registration'],
          ['IMPORT EXPORT', 'Documentation support', '/services/iec-registration'],
          ['ISO & LICENSES', 'Certification guidance', '/services/iso-9001-2015'],
          ['PAN INDIA', 'Remote assistance', '/services/msme-udyam-registration']
        ].map(([a, b, linkPath], i) => (
          <Link
            to={linkPath}
            className={`stat reveal delay-${(i % 5 + 1) * 100}`}
            key={a}
            style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
            title={`Explore ${a}`}
          >
            <div className="statIcon"><ShieldCheck /></div>
            <div><b>{a}</b><small>{b}</small></div>
          </Link>
        ))}
      </section>

      <section className="section" id="services">
        <div className="sectionHead reveal">
          <div className="eyebrow">OUR SERVICES</div>
          <h2>Practical Solutions for Your Business</h2>
          <p>Explore our main service categories. Every card opens a dedicated, fully customized subpage with checklists and timelines.</p>
        </div>
        <div className="serviceGrid">
          {featuredServices.map(([tag, title, text, path, image], i) => {
            const I = IconByIndex[i];
            return (
              <Link
                to={path}
                className={`serviceCard reveal delay-${((i % 3) + 1) * 150}`}
                key={title}
                title={`Open ${title} page`}
                style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}
              >
                <div className="cardImgWrapper">
                  <img src={image} alt={title} className="cardImage" loading="lazy" />
                  <span className="cardTagOverlay">{tag}</span>
                </div>
                <div className="serviceCardBody">
                  <div className="cardTop">
                    <I />
                    <span>{tag}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <div className="serviceLink">
                    <span>LEARN MORE & APPLY</span> <span className="arrow">→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section about">
        <div className="aboutGrid">
          <div className="reveal">
            <div className="eyebrow">ABOUT NOVATAX & BUSINESS CONSULTANCY</div>
            <h2>Your Business Compliance Partner</h2>
            <p>
              NOVATAX & Business Consultancy is a premier corporate advisory and compliance firm focused on straightforward communication, organized document handling, and practical business support.
            </p>
            {['Business-focused assistance', 'Clear document checklist', 'Transparent service flow', 'Prompt communication'].map((x) => (
              <div className="check" key={x}><CheckCircle2 /> {x}</div>
            ))}
          </div>
          <div className="aboutArtwork reveal delay-200">
            <Link
              to="/services/private-limited-company"
              className="complianceCard"
              title="Open Business Compliance service page"
              style={{ textDecoration: 'none', color: 'inherit', display: 'block', cursor: 'pointer' }}
            >
              <img
                src="/assets/business-compliance.jpg"
                alt="NOVATAX & Business Consultancy Team"
                className="complianceCardImg"
              />
              <div className="complianceOverlay" />
              <div className="complianceCardBadge">
                <ShieldCheck size={18} />
                <span>100% Verified Business Compliance</span>
              </div>
              <div className="complianceInfo">
                <div className="complianceBrandBadge">
                  <b>NOVA</b><span>TAX</span>
                </div>
                <div className="complianceText">
                  <b>Business Consultancy</b>
                  <span>Registration • Tax • Hinjawadi, Pune • PAN India</span>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="eyebrow center reveal">WHY CHOOSE US?</div>
        <div className="reasonGrid">
          {reasons.map(([Icon, title, text], i) => (
            <div className={`reason reveal delay-${((i % 2) + 1) * 150}`} key={title}>
              <div className="reasonIcon"><Icon /></div>
              <div><h4>{title}</h4><p>{text}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="section marqueeSection reveal">
        <div className="sectionHead">
          <div className="eyebrow">BUSINESS CATEGORIES WE SUPPORT</div>
          <h2>Built for Different Types of Businesses</h2>
        </div>
        <div className="marquee">
          <div className="marqueeTrack">
            {['STARTUPS', 'TRADERS', 'EXPORTERS', 'SMEs', 'PROFESSIONALS', 'MANUFACTURERS', 'E-COMMERCE', 'SERVICE FIRMS', 'STARTUPS', 'TRADERS', 'EXPORTERS', 'SMEs', 'PROFESSIONALS', 'MANUFACTURERS', 'E-COMMERCE', 'SERVICE FIRMS'].map((x, i) => (
              <div className="clientChip" key={i}>{x}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="section reviewSection reveal">
        <div className="sectionHead">
          <div className="eyebrow">CLIENT FEEDBACK</div>
          <h2>What Clients Say</h2>
          <p>Sample feedback from businesses across India who use NOVATAX & Business Consultancy for their tax and compliance requirements.</p>
        </div>
        <div className="marquee reviewMarquee">
          <div className="marqueeTrack slow">
            {[...reviews, ...reviews].map(([n, t], i) => (
              <div className="reviewCard" key={i}>
                <div className="stars">★★★★★</div>
                <p>{t}</p>
                <b>{n}</b>
                <small>Client</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}

function FaqAccordion({ faqs }) {
  const [openIdx, setOpenIdx] = useState(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="faqList">
      {faqs.map((f, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div key={f.q} className={`faqItem ${isOpen ? 'open' : ''}`}>
            <button
              className="faqQuestion"
              onClick={() => setOpenIdx(isOpen ? -1 : idx)}
              type="button"
            >
              <span>{f.q}</span>
              {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            {isOpen && <div className="faqAnswer"><p>{f.a}</p></div>}
          </div>
        );
      })}
    </div>
  );
}

function ServicePage() {
  const { slug } = useParams();
  const s = serviceMap[slug];

  if (!s) {
    return (
      <div className="notFound">
        <h2>Service not found</h2>
        <p>The requested service page does not exist or has moved.</p>
        <Link to="/" className="btn green">Back to Home</Link>
      </div>
    );
  }

  const scrollToContact = (e) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="subpageBreadcrumbs">
        <div className="breadcrumbsInner">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>{s.group}</span>
          <span>/</span>
          <b>{s.title}</b>
        </div>
      </div>

      <section className="serviceHero customServiceHero">
        <div className="serviceHeroInner reveal">
          <div className="serviceHeroContent">
            <div className="badgeGroup">
              <span className="categoryBadge">{s.group}</span>
              <span className="turnaroundBadge">⏱️ {s.turnaround}</span>
            </div>
            <h1>{s.title}</h1>
            <p className="heroLeadText">{s.intro}</p>
            <p className="heroSummaryText">{s.summary}</p>

            <div className="heroPillFeatures">
              <div className="pillFeature"><CheckCircle2 size={16} /> 100% Online Filing</div>
              <div className="pillFeature"><CheckCircle2 size={16} /> Expert Chartered Review</div>
              <div className="pillFeature"><CheckCircle2 size={16} /> Pan India Support</div>
            </div>

            <div className="serviceHeroBtns">
              <a className="btn green" href="#contact" onClick={scrollToContact}>
                Get Free Checklist & Quote
              </a>
              <a
                className="btn outline whatsappSubBtn"
                href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(`Hello NOVATAX & Business Consultancy, I am enquiring about ${s.title}. Please provide checklist and timeline.`)}`}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={18} /> WhatsApp Specialist
              </a>
              <a className="btn outline telBtn" href={`tel:${CONTACT.phoneRaw}`}>
                <Phone size={16} /> {CONTACT.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="serviceHeroCard reveal delay-200">
            {s.image && (
              <div className="subpageCardImg">
                <img src={s.image} alt={s.title} className="subpageHeroImage" />
                <span className="subpageImageBadge">{s.badge}</span>
              </div>
            )}
            <div className="cardHeader">
              <div className="badgeIcon"><ShieldCheck size={28} /></div>
              <div>
                <b>NOVATAX Verified</b>
                <small>Official Assistance</small>
              </div>
            </div>
            <div className="cardMetrics">
              <div className="metricRow">
                <span>Service Category:</span>
                <b>{s.group}</b>
              </div>
              <div className="metricRow">
                <span>Avg Turnaround:</span>
                <b>{s.turnaround}</b>
              </div>
              <div className="metricRow">
                <span>Mode:</span>
                <b>100% Remote & Digital</b>
              </div>
              <div className="metricRow">
                <span>Liaison:</span>
                <b>Dedicated Compliance Mgr</b>
              </div>
            </div>
            <div className="cardCta">
              <a className="btn green fullWidth" href="#contact" onClick={scrollToContact}>
                Start {s.title} Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section subpageBody">
        <div className="subpageGrid">
          <div className="mainCol">
            {/* Section 1: Deliverables */}
            <div className="contentCard reveal">
              <div className="cardEyebrow">DELIVERABLES & SCOPE</div>
              <h2>What You Receive With {s.title}</h2>
              <p>When you initiate your application through NOVATAX & Business Consultancy, our team ensures complete verification and timely delivery of the following milestones:</p>
              <ul className="deliverablesList">
                {s.deliverables.map((item) => (
                  <li key={item}>
                    <div className="checkIcon"><CheckCircle2 size={18} /></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 2: Documents Required Checklist */}
            <div className="contentCard docsCard reveal delay-150">
              <div className="cardEyebrow">DOCUMENT CHECKLIST</div>
              <h2>Documents Required for {s.title}</h2>
              <p>Keep scanned soft copies ready. Our team will verify and format them according to government portal requirements:</p>
              <div className="docsChecklistGrid">
                {s.documents.map((doc, idx) => (
                  <div key={doc} className="docItem">
                    <span className="docNumber">0{idx + 1}</span>
                    <p>{doc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Step-by-Step Processing Timeline */}
            <div className="contentCard processCard reveal delay-200">
              <div className="cardEyebrow">EXECUTION ROADMAP</div>
              <h2>Step-by-Step Service Process</h2>
              <p>A transparent, 4-step workflow from initial enquiry to final certificate delivery:</p>
              <div className="processStepsGrid">
                {s.steps.map((step, idx) => (
                  <div key={step} className="processStepBox">
                    <div className="stepHead">
                      <div className="stepBadge">Step {idx + 1}</div>
                      <small>Stage {idx + 1} of 4</small>
                    </div>
                    <h4>{step}</h4>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4: Frequently Asked Questions */}
            <div className="contentCard faqCard reveal delay-250">
              <div className="cardEyebrow">FAQS & CLEAR GUIDANCE</div>
              <h2>Frequently Asked Questions</h2>
              <FaqAccordion faqs={s.faqs} />
            </div>

            {/* Section 5: Related Category Services */}
            {s.related && s.related.length > 0 && (
              <div className="contentCard relatedCard reveal delay-300">
                <div className="cardEyebrow">EXPLORE MORE IN {s.group}</div>
                <h2>Related Services You Might Need</h2>
                <div className="relatedPillsTrack">
                  {s.related.map((rel) => (
                    <Link key={rel.path} to={rel.path} className="relatedPill">
                      <span>{rel.title}</span>
                      <ArrowRight size={14} />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="sidebarCol">
            <div className="stickySidebarCard reveal delay-200">
              <h3>Need Immediate Help?</h3>
              <p>Speak directly with our senior compliance advisor for instant requirement scoping.</p>
              <div className="sidebarContactItem">
                <Phone size={18} />
                <div>
                  <small>Direct Call</small>
                  <b>{CONTACT.phoneDisplay}</b>
                </div>
              </div>
              <div className="sidebarContactItem">
                <Mail size={18} />
                <div>
                  <small>Email Helpdesk</small>
                  <b>{CONTACT.email}</b>
                </div>
              </div>
              <div className="sidebarDivider" />
              <a
                className="btn green fullWidth"
                href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(`Hi NOVATAX & Business Consultancy, I need assistance with ${s.title}`)}`}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={18} /> Chat on WhatsApp
              </a>
              <a
                className="btn outline fullWidth"
                href="#contact"
                onClick={scrollToContact}
              >
                Fill Online Enquiry
              </a>
            </div>
          </div>
        </div>
      </section>

      <ContactSection defaultService={s.title} />
    </>
  );
}

function Footer() {
  return (
    <footer>
      <div className="footerGrid">
        <div className="footerBrand">
          <Brand />
          <p>
            NOVATAX & Business Consultancy provides complete corporate registration, taxation, certification and business compliance services across India.
          </p>
          <h5>OFFICE & CONTACT</h5>
          <div className="footerContactList">
            <p className="footerAddress" style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', margin: '6px 0' }}>
              <MapPin size={16} style={{ color: '#2ad06a', flexShrink: 0, marginTop: '3px' }} />
              <span><b>{CONTACT.address}</b></span>
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '6px 0' }}>
              <Phone size={15} style={{ color: '#2ad06a', flexShrink: 0 }} />
              <a href={`tel:${CONTACT.phoneRaw}`}>{CONTACT.phoneDisplay}</a>
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '6px 0' }}>
              <MessageCircle size={15} style={{ color: '#2ad06a', flexShrink: 0 }} />
              <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer">Chat on WhatsApp ({CONTACT.phoneDisplay})</a>
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '6px 0' }}>
              <Mail size={15} style={{ color: '#2ad06a', flexShrink: 0 }} />
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '6px 0' }}>
              <Globe2 size={15} style={{ color: '#2ad06a', flexShrink: 0 }} />
              <a href={`https://${CONTACT.domain}`} target="_blank" rel="noreferrer">{CONTACT.domain}</a>
            </p>
          </div>
        </div>
        {navGroups.map((g) => (
          <div className="footerCol" key={g.label}>
            <h5>{g.label}</h5>
            {g.items.slice(0, 6).map(([t, p]) => (
              <Link to={p} key={p}>{t}</Link>
            ))}
          </div>
        ))}
      </div>
      <div className="copyright">
        <span>© 2026 NOVATAX & Business Consultancy. All rights reserved.</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <span>Secure Cloud & Database Protected</span>
          <Link
            to="/admin"
            title="Administrator Login for Customer Enquiries & Excel Export"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              color: '#94a3b8',
              fontSize: '12px',
              textDecoration: 'none',
              padding: '3px 8px',
              borderRadius: '4px',
              border: '1px solid rgba(255,255,255,0.12)',
              transition: 'all 0.2s ease'
            }}
          >
            <Lock size={12} /> Admin Portal
          </Link>
        </div>
      </div>
    </footer>
  );
}

function App() {
  useScrollReveal();

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services/:slug" element={<ServicePage />} />
        <Route path="/admin" element={<LeadsDashboard />} />
        <Route path="/leads" element={<LeadsDashboard />} />
      </Routes>
      <Footer />
      <a
        className="whatsappFloat"
        href={`https://wa.me/${CONTACT.whatsapp}`}
        target="_blank"
        rel="noreferrer"
        title={`Chat with ${CONTACT.companyName} on WhatsApp`}
      >
        <MessageCircle />
        <span>Chat with us</span>
      </a>
    </>
  );
}

export default App;
