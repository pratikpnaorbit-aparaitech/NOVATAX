/**
 * NovaTax Leads Database & MongoDB Atlas Synchronization Engine
 * Persists customer enquiries directly to MongoDB Atlas cluster and local storage.
 * Only authorized administrators (aparaitech@gmail.com) can access and export customer leads.
 */

const STORAGE_KEY = 'novatax_customer_leads';
const AUTH_KEY = 'novatax_admin_auth_session';

// Official Administrator Credentials
export const ADMIN_CREDENTIALS = {
  email: 'info@novatax.in',
  alternativeEmail: 'aparaitech@gmail.com',
  password: 'Aparaitech123@'
};

// Initial demonstration data used when database has no records yet
const INITIAL_DEMO_LEADS = [
  {
    id: 'NT-1001',
    date: '2026-09-04 11:30 AM',
    name: 'Rajesh Sharma',
    phone: '+91 98230 45678',
    email: 'rajesh.sharma@example.com',
    service: 'Private Limited Company',
    message: 'Need urgent incorporation assistance for our tech startup in Mumbai.',
    source: 'Website Contact Form'
  },
  {
    id: 'NT-1002',
    date: '2026-09-04 03:45 PM',
    name: 'Pooja Verma',
    phone: '+91 94220 89123',
    email: 'pooja.verma@example.com',
    service: 'GST Registration',
    message: 'Expanding retail business to multiple states, need GST registration & LUT filing.',
    source: 'Website Contact Form'
  },
  {
    id: 'NT-1003',
    date: '2026-09-05 09:15 AM',
    name: 'Vikram Mehta',
    phone: '+91 98901 23456',
    email: 'vikram.mehta@exports.in',
    service: 'IEC Registration & AD Code',
    message: 'Exporting agro-commodities to Gulf countries, need fast IEC issuance and ICEGATE setup.',
    source: 'Website Contact Form'
  }
];

/* ==========================================================================
   Admin Authentication
   ========================================================================== */

export function checkAdminAuth() {
  try {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  } catch {
    return false;
  }
}

export function loginAdmin(email, password) {
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanPass = (password || '').trim();

  if (
    (cleanEmail === ADMIN_CREDENTIALS.email.toLowerCase() ||
     cleanEmail === (ADMIN_CREDENTIALS.alternativeEmail || '').toLowerCase()) &&
    cleanPass === ADMIN_CREDENTIALS.password
  ) {
    try {
      sessionStorage.setItem(AUTH_KEY, 'true');
      sessionStorage.setItem('novatax_admin_user', ADMIN_CREDENTIALS.email);
    } catch (e) {
      console.error('Session storage error:', e);
    }
    return { success: true };
  }

  return {
    success: false,
    message: 'Invalid email or password. Access restricted to authorized NovaTax administrators.'
  };
}

export function logoutAdmin() {
  try {
    sessionStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem('novatax_admin_user');
  } catch (e) {
    console.error('Session clear error:', e);
  }
}

/* ==========================================================================
   MongoDB Atlas Lead Synchronization
   ========================================================================== */

export async function checkMongoHealth() {
  try {
    const res = await fetch('/api/health');
    if (!res.ok) return { connected: false, error: 'Server error' };
    const data = await res.json();
    return { connected: data.database === 'connected', count: data.totalEnquiries };
  } catch {
    return { connected: false, error: 'Offline / Standalone' };
  }
}

export async function fetchLeadsFromMongo() {
  try {
    const res = await fetch('/api/leads');
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.leads)) {
        // Cache in localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data.leads));
        return data.leads;
      }
    }
  } catch (err) {
    console.warn('Could not fetch from MongoDB directly, falling back to local cache:', err);
  }
  return getAllLeads();
}

export function getAllLeads() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_LEADS));
      return INITIAL_DEMO_LEADS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_DEMO_LEADS;
  } catch {
    return INITIAL_DEMO_LEADS;
  }
}

export async function saveLead({ name, phone, email, service, message, source = 'Website Contact Form' }) {
  const leadPayload = {
    name: (name || '').trim(),
    phone: (phone || '').trim(),
    email: (email || 'Not Provided').trim(),
    service: (service || 'General Business Compliance').trim(),
    message: (message || 'No specific note entered').trim(),
    source
  };

  // 1. Asynchronously persist to MongoDB Atlas via backend API
  try {
    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadPayload)
    }).then(async (res) => {
      if (res.ok) {
        const json = await res.json();
        console.log('Customer Enquiry successfully persisted in MongoDB Atlas:', json.lead);
      }
    }).catch((e) => {
      console.warn('MongoDB sync deferred, saved to local cache:', e);
    });
  } catch (e) {
    console.warn('API POST failed:', e);
  }

  // 2. Synchronously save in browser local storage as resilient backup
  try {
    const leads = getAllLeads();
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }) + ' ' + now.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const nextId = `NT-${1000 + leads.length + 1}`;

    const newLead = {
      id: nextId,
      date: formattedDate,
      ...leadPayload
    };

    const updated = [newLead, ...leads];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newLead;
  } catch (err) {
    console.error('Failed to save lead locally:', err);
    return null;
  }
}

export async function deleteLead(leadId) {
  // Try deleting from MongoDB
  try {
    fetch(`/api/leads/${leadId}`, { method: 'DELETE' }).catch(() => {});
  } catch (err) {
    console.warn('MongoDB delete deferred:', err);
  }

  // Update local cache
  try {
    const leads = getAllLeads();
    const updated = leads.filter(l => l.id !== leadId && l._id !== leadId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    return getAllLeads();
  }
}

export function clearAllLeads() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  } catch (err) {
    console.error('Failed to clear leads:', err);
  }
}

/* ==========================================================================
   Excel (.CSV with UTF-8 BOM) Export
   ========================================================================== */

export function convertLeadsToCsv(leads = getAllLeads()) {
  const headers = [
    'Lead ID',
    'Date & Time',
    'Customer Name',
    'Phone / WhatsApp',
    'Email Address',
    'Service Required',
    'Source Channel',
    'Inquiry Message'
  ];

  const rows = leads.map(l => [
    `"${l.id || l.leadId || ''}"`,
    `"${l.date || ''}"`,
    `"${(l.name || '').replace(/"/g, '""')}"`,
    `"${(l.phone || '').replace(/"/g, '""')}"`,
    `"${(l.email || '').replace(/"/g, '""')}"`,
    `"${(l.service || '').replace(/"/g, '""')}"`,
    `"${(l.source || '').replace(/"/g, '""')}"`,
    `"${(l.message || '').replace(/"/g, '""').replace(/\r?\n/g, ' ')}"`
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(r => r.join(','))
  ].join('\r\n');

  // \uFEFF Byte Order Mark ensures Microsoft Excel & Google Sheets display proper Unicode
  return '\uFEFF' + csvContent;
}

export function downloadLeadsExcel(filename = `NovaTax_Leads_${new Date().toISOString().slice(0, 10)}.csv`) {
  // If backend is running, use direct stream from MongoDB
  const directLink = document.createElement('a');
  directLink.href = '/api/leads/export';
  directLink.download = filename;
  document.body.appendChild(directLink);
  directLink.click();
  document.body.removeChild(directLink);

  // Fallback in-browser generation in case fetch fails
  setTimeout(() => {
    const csvData = convertLeadsToCsv();
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 100);
}
