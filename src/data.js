export const CONTACT = {
  companyName: 'NOVATAX & Business Consultancy',
  shortName: 'NOVATAX',
  phoneDisplay: '+91 82618 40199',
  phoneRaw: '+918261840199',
  email: 'info@ai.aparaitech.org',
  domain: 'www.novatax.aparaitech.org',
  whatsapp: '918261840199',
  address: 'Gera Imperium Phase 2, Hinjawadi, Pune'
};

export const navGroups = [
  {
    label: 'BUSINESS SETUP',
    badge: 'Entity Formation',
    icon: 'Building2',
    turnaround: '5 - 7 Working Days',
    summary: 'Incorporate your business in India with complete legal documentation, name approval, PAN, TAN, and startup compliance assistance.',
    documents: [
      'PAN Card and Aadhaar Card of all Promoters / Directors',
      'Passport-size photographs of Directors / Partners',
      'Proof of Registered Office Address (Electricity Bill / Property Tax Receipt)',
      'NOC from the property owner and Rent Agreement (if rented)',
      'Bank Statement or Cancelled Cheque with updated address'
    ],
    deliverables: [
      'Certificate of Incorporation / Registration Deed',
      'Permanent Account Number (PAN) and Tax Deduction Number (TAN)',
      'Director Identification Numbers (DIN) and Digital Signature (DSC)',
      'Drafted MOA & AOA / Partnership Agreement',
      'Bank Account Opening Resolution & Startup Compliance Kit'
    ],
    steps: [
      'Consultation & Name Reservation',
      'Document Scrutiny & Legal Drafting',
      'Filing with Regulatory Authorities (MCA / Registrar)',
      'Certificate Issuance & Post-Setup Guidance'
    ],
    faqs: [
      {
        q: 'How many people are required to start a company in India?',
        a: 'For a Private Limited Company, a minimum of 2 directors and shareholders is required. An LLP requires at least 2 designated partners, while a One Person Company (OPC) can be registered with a single founder.'
      },
      {
        q: 'Is my physical presence required at government offices?',
        a: 'No. The entire incorporation workflow managed by NOVATAX & Business Consultancy is 100% digital and paperless. Documents are uploaded online.'
      },
      {
        q: 'Can I register my company at a residential address?',
        a: 'Yes, you can register using a residential address as long as you provide a recent utility bill and an NOC from the property owner.'
      }
    ],
    items: [
      ['Proprietorship Firm Registration', '/services/proprietorship-firm-registration'],
      ['Partnership Firm Registration', '/services/partnership-firm-registration'],
      ['LLP Registration', '/services/llp-registration'],
      ['Private Limited Company', '/services/private-limited-company'],
      ['One Person Company', '/services/one-person-company'],
      ['Startup India', '/services/startup-india']
    ]
  },
  {
    label: 'DIGITAL SIGNATURE',
    badge: 'Class 3 DSC',
    icon: 'LockKeyhole',
    turnaround: '2 - 4 Working Hours',
    summary: 'Obtain Class 3 Signing and Encryption Digital Signatures for e-tendering, MCA filings, GST, Income Tax, and DGFT portals.',
    documents: [
      'Applicant PAN Card (original scan)',
      'Aadhaar Card with active mobile number for OTP eKYC',
      'Recent passport-size photograph (clean white background)',
      'Active Email ID and mobile phone for rapid video verification',
      'Company Incorporation Certificate & Board Resolution (for Organisation DSC)'
    ],
    deliverables: [
      'Class 3 Digital Signature Certificate (Signing + Encryption)',
      'FIPS-Compliant Cryptographic USB Hardware Token',
      '2 or 3 Years Validity across all Indian Govt Portals',
      'Driver Installation Support & Remote Token Setup'
    ],
    steps: [
      'Online eKYC Submission with PAN & Aadhaar',
      '30-Second Mobile Video Verification & OTP Confirmation',
      'Certifying Authority Approval & Certificate Generation',
      'Token Configuration & Ready-to-Use Delivery'
    ],
    faqs: [
      {
        q: 'What is the difference between Signing and Combo DSC?',
        a: 'A Signing DSC is used for authenticating MCA, GST, and Income Tax documents. A Combo DSC contains both Signing and Encryption certificates, which is mandatory for government e-Tenders, IREPS, and DGFT.'
      },
      {
        q: 'How fast will my DSC be issued?',
        a: 'Once your video verification and Aadhaar OTP are completed, the DSC is issued within 1 to 2 hours.'
      }
    ],
    items: [
      ['Class 3 Individual Signature', '/services/class-3-individual-signature'],
      ['Class 3 Individual Encryption', '/services/class-3-individual-encryption'],
      ['Class 3 Individual Combo', '/services/class-3-individual-combo'],
      ['Organisation Signature', '/services/organisation-signature'],
      ['Organisation Combo', '/services/organisation-combo'],
      ['E-Tender DSC', '/services/e-tender-dsc'],
      ['DGFT DSC', '/services/dgft-dsc'],
      ['Trademark DSC', '/services/trademark-dsc']
    ]
  },
  {
    label: 'LMPC',
    badge: 'Legal Metrology',
    icon: 'ReceiptText',
    turnaround: '7 - 10 Working Days',
    summary: 'Legal Metrology Packaged Commodities (LMPC) certification for importers, e-commerce sellers, and packaging manufacturers.',
    documents: [
      'Importer Exporter Code (IEC) Certificate',
      'GST Registration Certificate & PAN of Entity',
      'Sample Product Label / Packaging Artwork with required declarations',
      'Premises Proof (Warehouse / Office Rent Deed or Ownership Proof)',
      'Product Specification Sheet and Net Weight / Pack Dimensions'
    ],
    deliverables: [
      'Official LMPC Certificate issued by Legal Metrology Department',
      'Packaging Label Declaration Compliance Review Report',
      'Customs Clearance Clearance Advisory & Exemption Filing',
      'Nationwide Validity for Import and Retail Distribution'
    ],
    steps: [
      'Packaging Artwork & Label Disclosure Audit',
      'Dossier Preparation & State/Central Fee Deposit',
      'Application Submission on Legal Metrology Portal',
      'Departmental Scrutiny & Grant of LMPC Registration'
    ],
    faqs: [
      {
        q: 'Who is required to obtain an LMPC registration?',
        a: 'Any business importing pre-packaged goods into India or manufacturing packaged items for retail distribution must register under Rule 27 of the Legal Metrology (Packaged Commodities) Rules, 2011.'
      },
      {
        q: 'What mandatory details must be printed on packaging?',
        a: 'Name & address of manufacturer/importer, generic name of commodity, net quantity, month/year of manufacture or import, Maximum Retail Price (MRP), and consumer care contact information.'
      }
    ],
    items: [
      ['LMPC Certificate for Importer', '/services/lmpc-importer'],
      ['LMPC for E-commerce', '/services/lmpc-ecommerce'],
      ['LMPC for Repacker', '/services/lmpc-repacker'],
      ['LMPC for Manufacturer', '/services/lmpc-manufacturer'],
      ['LMPC Manufacturer & Packer', '/services/lmpc-manufacturer-packer']
    ]
  },
  {
    label: 'IMPORT & EXPORT',
    badge: 'Foreign Trade',
    icon: 'Globe2',
    turnaround: '2 - 4 Working Days',
    summary: 'DGFT registrations, IEC code issuance, ICEGATE setup, AD code registration, and cross-border trade compliance support.',
    documents: [
      'PAN Card of the Business Entity / Proprietor',
      'Cancelled Cheque or Banker Certificate bearing Entity Name & Account Number',
      'Proof of Business Premises (Electricity Bill / Lease Agreement)',
      'Identity Proof (Aadhaar / Passport / Voter ID) of Directors or Partners',
      'Active Class 3 Digital Signature (for corporate entities)'
    ],
    deliverables: [
      '10-Digit Alphanumeric IEC Certificate issued by DGFT',
      'DGFT Portal Access & Active Profile Integration',
      'ICEGATE Custom EDI Port Registration Guidance',
      'Authorised Dealer (AD) Code Bank Letter Format & Support'
    ],
    steps: [
      'Bank Validation & Document Scrutiny',
      'Online DGFT Application Submission & Fee Payment',
      'Immediate Automated Scrutiny by Customs Database',
      'Issuance of Lifetime-Valid IEC Certificate'
    ],
    faqs: [
      {
        q: 'Does an IEC number expire?',
        a: 'No, the IEC has lifetime validity. However, DGFT mandates that every holder must electronically revalidate their details annually between April and June.'
      },
      {
        q: 'Is an IEC needed for exporting digital software or services?',
        a: 'Yes, an IEC is required to avail Foreign Trade Policy incentives, RoDTEP benefits, and to clear inward foreign exchange remittances smoothly.'
      }
    ],
    items: [
      ['IEC Registration', '/services/iec-registration'],
      ['IEC Renewal', '/services/iec-renewal'],
      ['IEC Modification', '/services/iec-modification'],
      ['IEC Activation', '/services/iec-activation'],
      ['ICEGATE Registration', '/services/icegate-registration'],
      ['AD Code Registration', '/services/ad-code-registration'],
      ['Duty Drawback / IFSC', '/services/duty-drawback-ifsc'],
      ['RCMC Registration', '/services/rcmc-registration'],
      ['EPR Plastic Packaging', '/services/epr-plastic-packaging'],
      ['EPR for Importers', '/services/epr-importers']
    ]
  },
  {
    label: 'RCMC',
    badge: 'Export Councils',
    icon: 'Award',
    turnaround: '5 - 8 Working Days',
    summary: 'Registration-Cum-Membership Certificates across 37 Export Promotion Councils and Commodity Boards in India.',
    documents: [
      'Valid Importer Exporter Code (IEC) Certificate',
      'GST Registration Certificate & PAN Card',
      'Bank Performance Certificate / Financial Credential Report',
      'Memorandum of Association (MOA) or Partnership Agreement',
      'Past Export Turnover Figures (if applicable)'
    ],
    deliverables: [
      'Official RCMC Certificate issued by designated Export Promotion Council',
      'Eligibility for RoDTEP, Duty Drawback, and Export Remission Schemes',
      'Access to Subsidized International Trade Fairs & Buyer-Seller Meets',
      'Official DGFT e-RCMC Portal Linking'
    ],
    steps: [
      'Product Classification & Council Mapping (APEDA, FIEO, EEPC, etc.)',
      'Application Dossier Filing via DGFT Unified e-RCMC Portal',
      'Council Fee Processing & Officer Query Clarifications',
      'Issuance of Approved RCMC Membership Certificate'
    ],
    faqs: [
      {
        q: 'Which Export Promotion Council should I register with?',
        a: 'Your council depends on your line of products (e.g., APEDA for agri-food, EEPC for engineering, AEPC for garments). For multi-product exporters, FIEO is the designated apex council.'
      },
      {
        q: 'Why is RCMC mandatory for exporters?',
        a: 'Without an RCMC, exporters cannot claim foreign trade duty exemptions, RoDTEP export incentives, zero-duty EPCG licenses, or duty-free import authorisations.'
      }
    ],
    items: [
      ['APEDA Registration', '/services/apeda-registration'],
      ['FIEO Registration', '/services/fieo-registration'],
      ['EEPC Registration', '/services/eepc-registration'],
      ['EPCH Registration', '/services/epch-registration'],
      ['CAPEXIL Registration', '/services/capexil-registration'],
      ['CHEMEXCIL Registration', '/services/chemexcil-registration'],
      ['AEPC Registration', '/services/aepc-registration'],
      ['CEPC Registration', '/services/cepc-registration'],
      ['GJEPC Registration', '/services/gjepc-registration'],
      ['Coffee Board RCMC', '/services/coffee-board-rcmc'],
      ['Spices Board RCMC', '/services/spices-board-rcmc'],
      ['Tea Board RCMC', '/services/tea-board-rcmc']
    ]
  },
  {
    label: 'ISO',
    badge: 'Quality Standards',
    icon: 'ShieldCheck',
    turnaround: '3 - 5 Working Days',
    summary: 'Global ISO 9001, 14001, 22000, 27001 certifications to elevate brand credibility, client trust, and government tender eligibility.',
    documents: [
      'Business Registration Proof (Incorporation Cert, GST, or MSME)',
      'Company Letterhead with Scope of Business Activities',
      'Organization Chart and Process Workflow Description',
      'Sample Invoices of Sales and Purchase',
      'Quality Objectives & Operational Policy Statement'
    ],
    deliverables: [
      'Accredited ISO Quality Standard Certificate',
      'Online QR Code Verification on International Accreditation Portal',
      'High-Resolution ISO Badges for Website, Marketing & Packaging',
      'Quality Manual Templates & Internal Audit Checklists'
    ],
    steps: [
      'Preliminary Gap Analysis & Standard Scope Mapping',
      'Quality Framework & Standard Operating Procedure (SOP) Formulation',
      'Audit Documentation Assessment by Lead Auditor',
      'Issuance of Verifiable ISO Certificate with QR Code'
    ],
    faqs: [
      {
        q: 'How long is an ISO certificate valid?',
        a: 'Standard ISO certificates are issued with 3 years validity, subject to annual surveillance audits.'
      },
      {
        q: 'Can I use this ISO certificate in government tenders?',
        a: 'Yes. Our certificates are issued through globally recognized accreditation boards that satisfy government tender and corporate vendor enlistment criteria.'
      }
    ],
    items: [
      ['ISO 9001:2015', '/services/iso-9001-2015'],
      ['ISO 14001:2015', '/services/iso-14001-2015'],
      ['ISO 22000:2018', '/services/iso-22000-2018'],
      ['ISO 27001:2013', '/services/iso-27001-2013'],
      ['ISO 45001:2018', '/services/iso-45001-2018'],
      ['ISO 13485:2016', '/services/iso-13485-2016'],
      ['CE Certificate', '/services/ce-certificate'],
      ['GMP', '/services/gmp'],
      ['HACCP', '/services/haccp'],
      ['HALAL', '/services/halal']
    ]
  },
  {
    label: 'Income Tax & GST',
    badge: 'Taxation & Returns',
    icon: 'FileText',
    turnaround: '2 - 4 Working Days',
    summary: 'Full spectrum GST registration, monthly/quarterly return filings, refund processing, and corporate & individual Income Tax Returns.',
    documents: [
      'PAN Card of the Business Entity / Individual Taxpayer',
      'Aadhaar Card of Authorized Signatory or Applicant',
      'Proof of Business Premises (Electricity Bill / Rent Deed + NOC)',
      'Bank Account Proof (Cancelled Cheque or Statement with IFSC)',
      'Sales & Purchase Invoices / Form 16 / Profit & Loss Statement (for Returns)'
    ],
    deliverables: [
      '15-Digit GSTIN Registration Certificate or Filed ITR Acknowledgement (ITR-V)',
      'Government Portal Login Credentials & Secure Filing Record',
      'Input Tax Credit (ITC) Reconciliation & Computation Summary',
      'Timely Filing Alerts & Dedicated Chartered Advisory'
    ],
    steps: [
      'Document Collection & Tax Liability / Refund Computation',
      'GSTR-2B / AIS / 26AS Credit Reconciliation & Verification',
      'Portal Submission with OTP or Digital Signature (DSC)',
      'Delivery of Filed Acknowledgement & Challan Receipts'
    ],
    faqs: [
      {
        q: 'When is GST registration mandatory for my business?',
        a: 'GST registration is mandatory if your annual turnover exceeds ₹40 lakhs for goods (₹20 lakhs in special states) or ₹20 lakhs for services, or if you sell inter-state or via e-commerce.'
      },
      {
        q: 'Can NOVATAX & Business Consultancy assist in claiming pending GST and Income Tax refunds?',
        a: 'Yes. We specialize in export GST refunds, inverted duty structure claims, and individual/corporate income tax refund reconciliations.'
      }
    ],
    items: [
      ['GST Registration', '/services/gst-registration'],
      ['GST Modification', '/services/gst-modification'],
      ['GST Surrender', '/services/gst-surrender'],
      ['GST Refund', '/services/gst-refund'],
      ['GST Return', '/services/gst-return'],
      ['LUT', '/services/lut'],
      ['GSTR-10 Final Return', '/services/gstr-10'],
      ['GSTR-9 Annual Return', '/services/gstr-9'],
      ['Income Tax Return', '/services/income-tax-return'],
      ['TDS Return', '/services/tds-return']
    ]
  },
  {
    label: 'OTHERS',
    badge: 'Compliance & IP',
    icon: 'Factory',
    turnaround: '2 - 5 Working Days',
    summary: 'FSSAI Food Licenses, Trademark registration, MSME Udyam registration, and government railway procurement (IREPS) onboarding.',
    documents: [
      'Applicant Identification Proof (PAN & Aadhaar)',
      'Entity Registration Proof (Certificate of Incorporation, Deed, etc.)',
      'Registered Premises Address Proof with Electricity Bill',
      'Brand Logo Artwork & User Affidavit (for Trademark)',
      'Food Product Category List & Facility Blueprint (for FSSAI)'
    ],
    deliverables: [
      'Government Registration Certificate / TM Application Number',
      'Legal Right to Use the ™ / FSSAI / MSME Mark',
      'Access to Subsidies, Collateral-Free Loans & Tender Concessions',
      'Complete Post-Registration Compliance Roadmap'
    ],
    steps: [
      'Trademark / FSSAI Category Search & Feasibility Assessment',
      'Drafting Application Documents & Classification Review',
      'Filing on Government Portal & Challan Generation',
      'Certificate Delivery & Status Tracking'
    ],
    faqs: [
      {
        q: 'How fast can I start using the ™ symbol?',
        a: 'You can begin using the ™ symbol beside your brand name within 24 hours of filing the trademark application with the IP India registry.'
      },
      {
        q: 'What are the benefits of MSME / Udyam registration?',
        a: 'MSME registration provides lower interest rates on bank loans, exemption from tender earnest money deposits (EMD), and 50% discount on government trademark filing fees.'
      }
    ],
    items: [
      ['FSSAI Registration', '/services/fssai-registration'],
      ['FSSAI State License', '/services/fssai-state-license'],
      ['FSSAI Central License', '/services/fssai-central-license'],
      ['FSSAI Modification', '/services/fssai-modification'],
      ['FSSAI Renewal', '/services/fssai-renewal'],
      ['FSSAI Annual Return', '/services/fssai-annual-return'],
      ['Trademark Registration', '/services/trademark-registration'],
      ['Trademark Objection Filing', '/services/trademark-objection-filing'],
      ['MSME Registration', '/services/msme-registration'],
      ['IREPS Registration', '/services/ireps-registration']
    ]
  },
  {
    label: 'PASSPORT',
    badge: 'Passport Seva',
    icon: 'Plane',
    turnaround: '3 - 7 Working Days',
    summary: 'End-to-end Indian Passport application assistance for Fresh Passport, Tatkaal express processing, Renewal/Re-issue, Minor Passport, and Police Clearance Certificate (PCC) with PSK/POPSK appointment scheduling and document verification.',
    documents: [
      'Proof of Identity & Address (Aadhaar Card / Voter ID / Utility Bill / Rent Agreement)',
      'Proof of Date of Birth (Birth Certificate, 10th Standard School Leaving / Passing Certificate, or PAN Card)',
      'Existing / Expired Passport booklet (Mandatory for Renewal, Re-issue, or ECR/ECNR change)',
      'Annexure D and Parent Passports / Consent (for Minor Passport applications)',
      'Recent Passport-sized photographs (clean white background as per MEA guidelines)',
      'Marriage Certificate / Official Gazette Notification (for Name / Spouse / Address Endorsement)',
      'Lost Passport FIR Copy & Notarized Affidavit Form (if applying for Lost / Damaged Passport)'
    ],
    deliverables: [
      'Official Passport Seva Portal Application Filing & ARN Generation',
      'Confirmed PSK / POPSK Appointment Slot Booking at your preferred center',
      'Document Scrutiny, Upload, & Pre-Verification Eligibility Report',
      'Tatkaal Express Priority Escalation & Advisory',
      'Police Verification Guidance & Speed Post Dispatch Tracking'
    ],
    steps: [
      'Applicant Profile Creation & Online Form Submission',
      'Online Government Fee Payment & Slot Appointment Booking',
      'Document Verification & Biometrics at Passport Seva Kendra (PSK)',
      'Police Verification Scrutiny & Speed Post Delivery to Doorstep'
    ],
    faqs: [
      {
        q: 'What is the difference between Normal and Tatkaal Passport applications?',
        a: 'A Normal passport application usually takes 7 to 14 working days post-police verification. Tatkaal passport applications are processed on high priority, typically dispatched within 1 to 3 working days with post-issuance police verification for eligible applicants.'
      },
      {
        q: 'Is physical presence required at Passport Seva Kendra (PSK)?',
        a: 'Yes. While NOVATAX handles all form filings, fee payments, document audits, and slot booking online, the applicant must visit the chosen PSK / POPSK on the scheduled appointment date for photograph and biometric fingerprint capture.'
      },
      {
        q: 'Can NOVATAX help if my passport is expired, damaged, or out of pages?',
        a: 'Yes. We handle Re-issue of Passports due to exhaustion of visa pages, validity expiration, damaged booklets, or lost passports with FIR and affidavit documentation.'
      },
      {
        q: 'What is a Police Clearance Certificate (PCC) and how is it processed?',
        a: 'A Police Clearance Certificate (PCC) is an official document issued to Indian passport holders seeking long-term employment, residential status, immigration, or long-stay visas abroad. We handle complete PCC portal filing and appointment booking.'
      }
    ],
    items: [
      ['Fresh Passport Application', '/services/fresh-passport-application'],
      ['Tatkaal Passport Service', '/services/tatkaal-passport-service'],
      ['Passport Renewal & Re-issue', '/services/passport-renewal-reissue'],
      ['Minor Passport Application', '/services/minor-passport-application'],
      ['Lost / Damaged Passport Re-issue', '/services/lost-damaged-passport'],
      ['Passport Name / Address Change', '/services/passport-name-address-change'],
      ['Police Clearance Certificate (PCC)', '/services/police-clearance-certificate-pcc']
    ]
  }
];

const categoryImageMap = {
  'BUSINESS SETUP': '/assets/card-business-setup.jpg',
  'DIGITAL SIGNATURE': '/assets/card-business-setup.jpg',
  'LMPC': '/assets/card-business-setup.jpg',
  'IMPORT & EXPORT': '/assets/card-import-export.jpg',
  'RCMC': '/assets/card-import-export.jpg',
  'ISO': '/assets/card-iso-cert.jpg',
  'Income Tax & GST': '/assets/card-gst-tax.jpg',
  'OTHERS': '/assets/card-msme.jpg',
  'PASSPORT': '/assets/card-passport.jpg'
};

export const featuredServices = [
  ['Pvt Ltd', 'BUSINESS SETUP', 'Company formation and startup compliance support.', '/services/private-limited-company', '/assets/card-business-setup.jpg'],
  ['GSTIN', 'GST & INDIRECT TAX', 'GST registration, return filing and indirect tax compliance.', '/services/gst-registration', '/assets/card-gst-tax.jpg'],
  ['Passport', 'PASSPORT SEVA', 'Fresh, Tatkaal & Renewal Indian Passport application assistance.', '/services/fresh-passport-application', '/assets/card-passport.jpg'],
  ['ITR', 'INCOME TAX FILING', 'Income tax return filing and practical tax compliance support.', '/services/income-tax-return', '/assets/card-income-tax.jpg'],
  ['MSME', 'MSME REGISTRATION', 'Udyam/MSME registration assistance for eligible businesses.', '/services/msme-registration', '/assets/card-msme.jpg'],
  ['IEC', 'IMPORT EXPORT', 'IEC and import-export documentation support.', '/services/iec-registration', '/assets/card-import-export.jpg'],
  ['ISO', 'ISO CERTIFICATION', 'Support for common ISO certification requirements.', '/services/iso-9001-2015', '/assets/card-iso-cert.jpg']
];

export const popularHeroPills = [
  { title: 'Passport Application', path: '/services/fresh-passport-application', tag: 'Fast Track' },
  { title: 'Tatkaal Passport', path: '/services/tatkaal-passport-service', tag: 'Tatkaal' },
  { title: 'Pvt Ltd Company', path: '/services/private-limited-company', tag: 'Fast Setup' },
  { title: 'GST Registration', path: '/services/gst-registration', tag: 'Tax' },
  { title: 'Income Tax Return', path: '/services/income-tax-return', tag: 'Filing' },
  { title: 'IEC Code', path: '/services/iec-registration', tag: 'Export' },
  { title: 'ISO 9001', path: '/services/iso-9001-2015', tag: 'Quality' },
  { title: 'Trademark', path: '/services/trademark-registration', tag: 'Brand IP' },
  { title: 'MSME / Udyam', path: '/services/msme-registration', tag: 'Govt Subsidy' }
];

export const allServicesList = navGroups.flatMap(group =>
  group.items.map(([title, path]) => ({
    title,
    path,
    group: group.label,
    badge: group.badge
  }))
);

export const serviceMap = Object.fromEntries(
  navGroups.flatMap(group =>
    group.items.map(([title, path]) => {
      const slug = path.split('/').pop();
      const related = group.items
        .filter(([t, p]) => p !== path)
        .slice(0, 5)
        .map(([t, p]) => ({ title: t, path: p }));

      let serviceImg = categoryImageMap[group.label] || '/assets/card-business-setup.jpg';
      if (slug === 'income-tax-return' || slug === 'tds-return') {
        serviceImg = '/assets/card-income-tax.jpg';
      }

      return [
        slug,
        {
          title,
          slug,
          group: group.label,
          badge: group.badge,
          turnaround: group.turnaround,
          image: serviceImg,
          intro: `NOVATAX & Business Consultancy provides end-to-end assistance for ${title}. Our dedicated team coordinates document compilation, online portal filing, and government liaison with complete transparency.`,
          summary: group.summary,
          documents: group.documents,
          deliverables: group.deliverables,
          steps: group.steps,
          faqs: group.faqs,
          related
        }
      ];
    })
  )
);
