const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://mailblast:Aparaitech2129@ac-rl6rdwo-shard-00-00.kmi9oku.mongodb.net:27017,ac-rl6rdwo-shard-00-01.kmi9oku.mongodb.net:27017,ac-rl6rdwo-shard-00-02.kmi9oku.mongodb.net:27017/?ssl=true&replicaSet=atlas-3ebffw-shard-0&authSource=admin&appName=Cluster0';
const DB_NAME = process.env.DB_NAME || 'novatax_db';
const COLLECTION_NAME = process.env.COLLECTION_NAME || 'customer_enquiries';

let clientPromise = null;

async function getCollection() {
  if (!clientPromise) {
    const client = new MongoClient(MONGODB_URI, {
      serverSelectionTimeoutMS: 8000
    });
    clientPromise = client.connect();
  }
  const client = await clientPromise;
  return client.db(DB_NAME).collection(COLLECTION_NAME);
}

// Health check
app.get('/api/health', async (req, res) => {
  try {
    const col = await getCollection();
    const count = await col.countDocuments();
    res.json({
      status: 'online',
      database: 'connected',
      cluster: 'atlas-3ebffw-shard-0',
      totalEnquiries: count,
      timestamp: new Date()
    });
  } catch (err) {
    res.status(500).json({ status: 'error', database: 'disconnected', message: err.message });
  }
});

// GET all customer enquiries from MongoDB
app.get('/api/leads', async (req, res) => {
  try {
    const col = await getCollection();
    const docs = await col.find({}).sort({ createdAt: -1 }).toArray();

    const formatted = docs.map((doc) => ({
      id: doc.leadId || doc._id.toString(),
      _id: doc._id.toString(),
      date: doc.dateFormatted || (doc.createdAt ? new Date(doc.createdAt).toLocaleString('en-IN') : 'Recent'),
      name: doc.name || 'Anonymous',
      phone: doc.phone || '',
      email: doc.email || 'Not Provided',
      service: doc.service || 'General Business Compliance',
      message: doc.message || 'No specific note',
      source: doc.source || 'Website Contact Form'
    }));

    res.json({ success: true, leads: formatted });
  } catch (err) {
    console.error('Error fetching leads from MongoDB:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST new customer enquiry
app.post('/api/leads', async (req, res) => {
  try {
    const { name, phone, email, service, message, source } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ success: false, error: 'Name and phone are required.' });
    }

    const col = await getCollection();
    const count = await col.countDocuments();
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

    const leadId = `NT-${1000 + count + 1}`;

    const newDoc = {
      leadId,
      name: name.trim(),
      phone: phone.trim(),
      email: (email || 'Not Provided').trim(),
      service: (service || 'General Business Compliance').trim(),
      message: (message || 'No specific note entered').trim(),
      source: source || 'Website Contact Form',
      createdAt: now,
      dateFormatted: formattedDate
    };

    const insertResult = await col.insertOne(newDoc);

    res.status(201).json({
      success: true,
      lead: {
        id: leadId,
        _id: insertResult.insertedId.toString(),
        date: formattedDate,
        ...newDoc
      }
    });
  } catch (err) {
    console.error('Error saving lead to MongoDB:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE customer enquiry
app.delete('/api/leads/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const col = await getCollection();

    let query = {};
    if (ObjectId.isValid(id)) {
      query = { $or: [{ _id: new ObjectId(id) }, { leadId: id }] };
    } else {
      query = { leadId: id };
    }

    await col.deleteOne(query);
    res.json({ success: true, message: `Lead ${id} removed.` });
  } catch (err) {
    console.error('Error deleting lead from MongoDB:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Export CSV directly from MongoDB
app.get('/api/leads/export', async (req, res) => {
  try {
    const col = await getCollection();
    const docs = await col.find({}).sort({ createdAt: -1 }).toArray();

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

    const rows = docs.map(l => [
      `"${l.leadId || ''}"`,
      `"${l.dateFormatted || (l.createdAt ? new Date(l.createdAt).toLocaleString('en-IN') : '')}"`,
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${(l.phone || '').replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${(l.service || '').replace(/"/g, '""')}"`,
      `"${(l.source || '').replace(/"/g, '""')}"`,
      `"${(l.message || '').replace(/"/g, '""').replace(/\r?\n/g, ' ')}"`
    ]);

    const csvContent = '\uFEFF' + [
      headers.join(','),
      ...rows.map(r => r.join(','))
    ].join('\r\n');

    const filename = `NovaTax_Leads_${new Date().toISOString().slice(0, 10)}.csv`;
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(csvContent);
  } catch (err) {
    console.error('Error exporting leads from MongoDB:', err);
    res.status(500).send('Error generating export');
  }
});

module.exports = app;
