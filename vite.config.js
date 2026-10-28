import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://mailblast:Aparaitech2129@ac-rl6rdwo-shard-00-00.kmi9oku.mongodb.net:27017,ac-rl6rdwo-shard-00-01.kmi9oku.mongodb.net:27017,ac-rl6rdwo-shard-00-02.kmi9oku.mongodb.net:27017/?ssl=true&replicaSet=atlas-3ebffw-shard-0&authSource=admin&appName=Cluster0';
const DB_NAME = process.env.DB_NAME || 'novatax_db';
const COLLECTION_NAME = process.env.COLLECTION_NAME || 'customer_enquiries';

let dbClient = null;
let collection = null;

async function getMongoCollection() {
  if (collection) return collection;
  try {
    dbClient = new MongoClient(MONGODB_URI, { serverSelectionTimeoutMS: 8000 });
    await dbClient.connect();
    const db = dbClient.db(DB_NAME);
    collection = db.collection(COLLECTION_NAME);
    console.log(`[Vite API] Connected to MongoDB Atlas (${DB_NAME}.${COLLECTION_NAME})`);
    return collection;
  } catch (e) {
    console.error('[Vite API] MongoDB connection error:', e.message);
    throw e;
  }
}

// Custom Vite plugin to handle /api/leads in dev server directly
function mongoApiPlugin() {
  return {
    name: 'mongo-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url.split('?')[0];

        // Health Check
        if (url === '/api/health' && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json');
          try {
            const col = await getMongoCollection();
            const count = await col.countDocuments();
            res.end(JSON.stringify({ status: 'online', database: 'connected', totalEnquiries: count }));
          } catch (e) {
            res.statusCode = 500;
            res.end(JSON.stringify({ status: 'error', error: e.message }));
          }
          return;
        }

        // GET /api/leads
        if (url === '/api/leads' && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json');
          try {
            const col = await getMongoCollection();
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
            res.end(JSON.stringify({ success: true, leads: formatted }));
          } catch (e) {
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false, error: e.message }));
          }
          return;
        }

        // POST /api/leads
        if (url === '/api/leads' && req.method === 'POST') {
          res.setHeader('Content-Type', 'application/json');
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            try {
              const data = JSON.parse(body || '{}');
              const { name, phone, email, service, message, source } = data;

              if (!name || !phone) {
                res.statusCode = 400;
                res.end(JSON.stringify({ success: false, error: 'Name and phone required' }));
                return;
              }

              const col = await getMongoCollection();
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

              const result = await col.insertOne(newDoc);
              console.log(`[Vite API] Saved enquiry to MongoDB Atlas [${leadId}]: ${name}`);

              res.statusCode = 201;
              res.end(JSON.stringify({
                success: true,
                lead: {
                  id: leadId,
                  _id: result.insertedId.toString(),
                  date: formattedDate,
                  ...newDoc
                }
              }));
            } catch (err) {
              res.statusCode = 500;
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
          return;
        }

        // DELETE /api/leads/:id
        if (url.startsWith('/api/leads/') && req.method === 'DELETE') {
          res.setHeader('Content-Type', 'application/json');
          const id = url.replace('/api/leads/', '');
          try {
            const col = await getMongoCollection();
            let query = {};
            if (ObjectId.isValid(id)) {
              query = { $or: [{ _id: new ObjectId(id) }, { leadId: id }] };
            } else {
              query = { leadId: id };
            }
            await col.deleteOne(query);
            res.end(JSON.stringify({ success: true, message: `Lead ${id} removed` }));
          } catch (e) {
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false, error: e.message }));
          }
          return;
        }

        // GET /api/leads/export
        if (url === '/api/leads/export' && req.method === 'GET') {
          try {
            const col = await getMongoCollection();
            const docs = await col.find({}).sort({ createdAt: -1 }).toArray();
            const headers = ['Lead ID', 'Date & Time', 'Customer Name', 'Phone / WhatsApp', 'Email Address', 'Service Required', 'Source Channel', 'Inquiry Message'];
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
            const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
            const filename = `NovaTax_Leads_${new Date().toISOString().slice(0, 10)}.csv`;
            res.setHeader('Content-Type', 'text/csv; charset=utf-8');
            res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
            res.end(csvContent);
          } catch (e) {
            res.statusCode = 500;
            res.end('Error generating CSV');
          }
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), mongoApiPlugin()],
  server: {
    port: 5173
  }
});
