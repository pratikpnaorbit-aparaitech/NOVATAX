import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FileSpreadsheet, Download, MessageCircle, Phone, Mail, CheckCircle2,
  Trash2, RefreshCw, ArrowLeft, ShieldCheck, Users, Database, LogOut,
  Search, Lock, Calendar, Filter, Server
} from 'lucide-react';
import {
  checkAdminAuth, logoutAdmin, getAllLeads, fetchLeadsFromMongo, checkMongoHealth,
  downloadLeadsExcel, deleteLead, clearAllLeads, ADMIN_CREDENTIALS
} from './leadsStorage';
import AdminLogin from './AdminLogin';

export default function LeadsDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(checkAdminAuth());
  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedServiceFilter, setSelectedServiceFilter] = useState('ALL');
  const [mongoStatus, setMongoStatus] = useState('checking');
  const [loading, setLoading] = useState(false);

  const loadLeads = async () => {
    setLoading(true);
    // 1. Initial cached records
    setLeads(getAllLeads());

    // 2. Fetch live records directly from MongoDB Atlas
    try {
      const liveLeads = await fetchLeadsFromMongo();
      if (Array.isArray(liveLeads)) {
        setLeads(liveLeads);
      }
      const health = await checkMongoHealth();
      setMongoStatus(health.connected ? 'connected' : 'offline');
    } catch {
      setMongoStatus('offline');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadLeads();
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
  };

  const handleDownload = () => {
    downloadLeadsExcel();
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to remove lead for ${name} (${id}) from MongoDB?`)) {
      const updated = await deleteLead(id);
      setLeads(updated);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all leads? This action cannot be undone.')) {
      clearAllLeads();
      setLeads([]);
    }
  };

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  // Filter leads based on search term & service
  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      (l.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (l.phone || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (l.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (l.service || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (l.message || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      selectedServiceFilter === 'ALL' ||
      (l.service || '').toLowerCase().includes(selectedServiceFilter.toLowerCase());

    return matchesSearch && matchesFilter;
  });

  const uniqueServices = Array.from(new Set(leads.map((l) => l.service).filter(Boolean)));

  return (
    <div className="leadsDashboardPage">
      {/* Protected Admin Topbar */}
      <header className="leadsNav">
        <Link to="/" className="backLink">
          <ArrowLeft size={16} /> Back to Website
        </Link>
        <div className="navAdminInfo">
          <div className="adminTag">
            <Lock size={14} />
            <span>Admin: <b>{ADMIN_CREDENTIALS.email}</b></span>
          </div>
          <button className="btn outline logoutBtn" onClick={handleLogout} title="Sign Out of Admin Portal">
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      <main className="leadsContainer">
        {/* Header Hero */}
        <div className="leadsHeader">
          <div>
            <div className="eyebrow">NOVATAX & BUSINESS CONSULTANCY • SECURE MONGODB CLUSTER</div>
            <h1>Customer Enquiries & Excel Export</h1>
            <p>
              Confidential administration dashboard connected to <b>MongoDB Atlas</b>. All client submissions are automatically stored in the database.
            </p>
          </div>
          <div className="headerCtaGroup">
            <button className="btn green largeBtn" onClick={handleDownload} title="Download Excel CSV from MongoDB">
              <FileSpreadsheet size={18} />
              <span>Download Live Excel (.CSV)</span>
            </button>
            <button className="btn outline" onClick={loadLeads} title="Reload inquiries from MongoDB" disabled={loading}>
              <RefreshCw size={16} className={loading ? 'spin' : ''} />
              <span>{loading ? 'Syncing...' : 'Sync MongoDB'}</span>
            </button>
          </div>
        </div>

        {/* Database Connection Banner */}
        <div className="mongoConnectionBanner" style={{
          background: mongoStatus === 'connected' ? '#f0fdf4' : '#fefce8',
          border: `1px solid ${mongoStatus === 'connected' ? '#86efac' : '#fde047'}`,
          borderRadius: '10px',
          padding: '12px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '22px',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Server size={18} color={mongoStatus === 'connected' ? '#16a34a' : '#ca8a04'} />
            <span style={{ fontSize: '13.5px', color: '#1e293b' }}>
              Database: <b>novatax_db</b> • Collection: <b>customer_enquiries</b> • Replica Set: <b>atlas-3ebffw-shard-0</b>
            </span>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: mongoStatus === 'connected' ? '#15803d' : '#854d0e' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: mongoStatus === 'connected' ? '#22c55e' : '#eab308' }} />
            {mongoStatus === 'connected' ? 'MongoDB Atlas Online' : 'Local Storage Fallback'}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="leadsMetricsGrid">
          <div className="metricCard">
            <div className="metricIcon blue"><Users size={22} /></div>
            <div>
              <span className="metricLabel">Total Captured Enquiries</span>
              <b className="metricVal">{leads.length}</b>
            </div>
          </div>
          <div className="metricCard">
            <div className="metricIcon green"><MessageCircle size={22} /></div>
            <div>
              <span className="metricLabel">Auto WhatsApp Dispatched</span>
              <b className="metricVal">{leads.length}</b>
            </div>
          </div>
          <div className="metricCard">
            <div className="metricIcon purple"><ShieldCheck size={22} /></div>
            <div>
              <span className="metricLabel">Active Service Categories</span>
              <b className="metricVal">{uniqueServices.length}</b>
            </div>
          </div>
          <div className="metricCard">
            <div className="metricIcon orange"><Database size={22} /></div>
            <div>
              <span className="metricLabel">MongoDB Storage</span>
              <b className="metricVal" style={{ fontSize: '17px', color: '#16a34a' }}>● Active Sync</b>
            </div>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="adminToolbarCard">
          <div className="searchBox">
            <Search size={18} className="searchIcon" />
            <input
              type="text"
              placeholder="Search by customer name, phone number, email or notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="clearSearchBtn" onClick={() => setSearchTerm('')}>×</button>
            )}
          </div>
          <div className="filterBox">
            <Filter size={16} />
            <select
              value={selectedServiceFilter}
              onChange={(e) => setSelectedServiceFilter(e.target.value)}
              aria-label="Filter inquiries by service"
            >
              <option value="ALL">All Services ({leads.length})</option>
              {uniqueServices.map((srv) => (
                <option key={srv} value={srv}>{srv}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Leads Table Card */}
        <div className="leadsTableCard">
          <div className="tableCardHead">
            <div>
              <h3>Customer Enquiries ({filteredLeads.length} of {leads.length})</h3>
              <p>Records automatically saved to MongoDB Atlas when client submits form</p>
            </div>
            <div className="tableHeadBtns">
              <button className="btn textBtn smallBtn dangerText" onClick={handleClearAll} title="Clear all records">
                <Trash2 size={15} /> Clear All
              </button>
            </div>
          </div>

          <div className="tableWrapper">
            <table className="leadsTable">
              <thead>
                <tr>
                  <th>Lead ID</th>
                  <th>Date & Time</th>
                  <th>Customer Name</th>
                  <th>Contact Details</th>
                  <th>Service Required</th>
                  <th>Source</th>
                  <th>Requirement Notes</th>
                  <th>Direct Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="emptyRow">
                      {searchTerm || selectedServiceFilter !== 'ALL'
                        ? 'No inquiries match your current search criteria.'
                        : 'No customer inquiries in database yet. Submit the contact form on the home page to create your first record!'}
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => {
                    const cleanPhone = (lead.phone || '').replace(/[^0-9]/g, '');
                    const waLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hello ${lead.name}, thank you for contacting NOVATAX & Business Consultancy regarding ${lead.service}. Our compliance specialist is here to assist you.`)}`;

                    return (
                      <tr key={lead.id || lead._id}>
                        <td>
                          <span className="leadIdBadge">{lead.id || lead.leadId}</span>
                        </td>
                        <td className="dateCell">{lead.date}</td>
                        <td className="nameCell">
                          <b>{lead.name}</b>
                        </td>
                        <td className="contactCell">
                          <div className="contactSubItem">
                            <Phone size={13} />
                            <span>{lead.phone}</span>
                          </div>
                          {lead.email && lead.email !== 'Not Provided' && (
                            <div className="contactSubItem">
                              <Mail size={13} />
                              <small>{lead.email}</small>
                            </div>
                          )}
                        </td>
                        <td>
                          <span className="servicePill">{lead.service}</span>
                        </td>
                        <td>
                          <span className="sourceBadge form">{lead.source}</span>
                        </td>
                        <td className="notesCell" title={lead.message}>
                          <p>{lead.message}</p>
                        </td>
                        <td className="actionCell">
                          <a
                            href={waLink}
                            target="_blank"
                            rel="noreferrer"
                            className="tableActionBtn wa"
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle size={15} />
                          </a>
                          <a
                            href={`tel:${cleanPhone}`}
                            className="tableActionBtn call"
                            title="Call Customer"
                          >
                            <Phone size={15} />
                          </a>
                          {lead.email && lead.email !== 'Not Provided' && (
                            <a
                              href={`mailto:${lead.email}?subject=${encodeURIComponent(`NOVATAX & Business Consultancy - ${lead.service}`)}`}
                              className="tableActionBtn mail"
                              title="Email Customer"
                            >
                              <Mail size={15} />
                            </a>
                          )}
                          <button
                            type="button"
                            className="tableActionBtn delete"
                            title="Delete from MongoDB"
                            onClick={() => handleDelete(lead.id || lead._id, lead.name)}
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Excel & MongoDB Instructions */}
        <div className="googleSheetInfoCard">
          <div className="infoIcon"><CheckCircle2 size={24} /></div>
          <div>
            <h4>MongoDB Atlas & Excel Export Integration:</h4>
            <p>
              • <b>Database Storage:</b> Every client form submission is written in real time to MongoDB Atlas (<code>novatax_db.customer_enquiries</code>).<br />
              • <b>Live Excel Export:</b> Clicking <b>"Download Live Excel (.CSV)"</b> pulls the latest records directly from MongoDB with UTF-8 BOM encoding for Microsoft Excel & Google Sheets.<br />
              • <b>Data Privacy:</b> Protected behind your admin authentication (<code>{ADMIN_CREDENTIALS.email}</code>).
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
