import React, { useEffect, useMemo, useState } from 'react';
import SEO from '../src/components/seo/SEO';
import Heading from '../src/components/Heading';

// Simple local storage helpers (will be swapped for API-backed storage later)
const LS_KEYS = {
  notes: 'myadmin_notes',
  prayers: 'myadmin_prayers',
};

const loadLocal = (key) => {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveLocal = (key, value) => {
  try {
    if (typeof window !== 'undefined') localStorage.setItem(key, JSON.stringify(value));
  } catch {}
};

function EmptyState({ title, subtitle, action }) {
  return (
    <div className="text-center py-12">
      <svg className="w-14 h-14 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v8m4-4H8m13 4V8a2 2 0 00-1-1.732l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.732l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
      </svg>
      <h3 className="text-lg font-semibold text-primary-900">{title}</h3>
      {subtitle ? <p className="text-neutral-500 mt-1">{subtitle}</p> : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

export default function MyFLCPage() {
  // In the next phase, replace with real auth state (e.g., NextAuth/Clerk/Supabase)
  const [isAuthenticated] = useState(false);
  const [tab, setTab] = useState('notes'); // 'notes' | 'prayers'

  // Form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('');
  const [sermonUrl, setSermonUrl] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Data state (device-local for now)
  const [notes, setNotes] = useState([]);
  const [prayers, setPrayers] = useState([]);
  const [search, setSearch] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    setNotes(loadLocal(LS_KEYS.notes));
    setPrayers(loadLocal(LS_KEYS.prayers));
  }, []);

  // Persist on change
  useEffect(() => { saveLocal(LS_KEYS.notes, notes); }, [notes]);
  useEffect(() => { saveLocal(LS_KEYS.prayers, prayers); }, [prayers]);

  const list = tab === 'notes' ? notes : prayers;
  const setList = tab === 'notes' ? setNotes : setPrayers;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return list;
    return list.filter(item =>
      (item.title || '').toLowerCase().includes(q) ||
      (item.content || '').toLowerCase().includes(q) ||
      (item.tag || '').toLowerCase().includes(q)
    );
  }, [list, search]);

  const resetForm = () => {
    setTitle('');
    setContent('');
    setTag('');
    setSermonUrl('');
    setEditingId(null);
  };

  const handleSave = () => {
    const now = new Date().toISOString();
    if (editingId) {
      setList(prev => prev.map(it => it.id === editingId ? { ...it, title, content, tag, sermonUrl, updatedAt: now } : it));
    } else {
      const id = `${tab}-${Date.now()}`;
      setList(prev => [{ id, title, content, tag, sermonUrl, createdAt: now, updatedAt: now }, ...prev]);
    }
    resetForm();
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setTitle(item.title || '');
    setContent(item.content || '');
    setTag(item.tag || '');
    setSermonUrl(item.sermonUrl || '');
  };

  const handleDelete = (id) => setList(prev => prev.filter(it => it.id !== id));

  const emptyTitle = tab === 'notes' ? 'No notes yet' : 'No prayers yet';
  const emptySubtitle = tab === 'notes' ? 'Capture thoughts, key Scriptures, and next steps from messages.' : 'Write prayer requests and answered prayers to build faith.';

  return (
    <>
      <SEO title="MyFLC – Notes & Prayers" description="Write and save your sermon notes and prayers. Sign in soon to sync across your devices." />

      {/* Hero */}
      <section className="relative py-14 md:py-20 bg-white">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0" style={{
            background: [
              'radial-gradient(circle at 20% 25%, rgba(235,167,62,0.06), rgba(235,167,62,0) 62%)',
              'radial-gradient(circle at 80% 70%, rgba(235,167,62,0.04), rgba(235,167,62,0) 55%)',
            ].join(', ')
          }} />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-flc-500/10 text-flc-700 text-[11px] font-semibold uppercase tracking-wider">MyAdmin</div>
            <Heading as="h1" size="md" className="mt-3">Church Leadership Portal</Heading>
            <p className="mt-2 text-neutral-600 max-w-2xl">A secure space for church leaders to organize, coordinate, and access resources. Sign in to manage events, groups, and communications.</p>
            <div className="mt-4">
              <a href="/admin/login" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-flc-500 hover:bg-flc-600 text-white font-semibold">
                Admin Login
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 17v-6m0 0V7m0 4a4 4 0 100-8 4 4 0 000 8zm6 4v2a2 2 0 01-2 2H8a2 2 0 01-2-2v-2"/></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Workspace */}
      <section className="py-8 md:py-12 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="mb-6">
            <div className="inline-flex rounded-xl border border-neutral-200 bg-white p-1">
              {['notes','prayers'].map(t => (
                <button
                  key={t}
                  onClick={() => { setTab(t); resetForm(); }}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${tab === t ? 'bg-flc-500 text-white' : 'text-neutral-700 hover:bg-neutral-100'}`}
                >
                  {t === 'notes' ? 'Notes' : 'Prayers'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-6">
            {/* Editor */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-neutral-200 bg-white p-5 md:p-6 shadow-sm">
                <h2 className="font-heading text-xl font-bold text-primary-900 mb-3">{editingId ? 'Edit' : 'Add'} {tab === 'notes' ? 'Note' : 'Prayer'}</h2>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-1">Title</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={tab === 'notes' ? 'e.g., Faith That Moves' : 'e.g., Healing for a friend'} className="w-full rounded-lg border border-neutral-300 focus:border-flc-500 focus:ring-2 focus:ring-flc-500/20 px-3 py-2 bg-neutral-50 focus:bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-1">{tab === 'notes' ? 'Notes' : 'Prayer'}</label>
                    <textarea rows={8} value={content} onChange={(e) => setContent(e.target.value)} placeholder={tab === 'notes' ? 'Key points, Scriptures, next steps…' : 'Write your request or thanksgiving…'} className="w-full rounded-lg border border-neutral-300 focus:border-flc-500 focus:ring-2 focus:ring-flc-500/20 px-3 py-2 bg-neutral-50 focus:bg-white" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-1">Tag (optional)</label>
                      <input value={tag} onChange={(e) => setTag(e.target.value)} placeholder={tab === 'notes' ? 'Series, theme…' : 'Family, healing…'} className="w-full rounded-lg border border-neutral-300 focus:border-flc-500 focus:ring-2 focus:ring-flc-500/20 px-3 py-2 bg-neutral-50 focus:bg-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-1">Sermon link (optional)</label>
                      <input value={sermonUrl} onChange={(e) => setSermonUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." className="w-full rounded-lg border border-neutral-300 focus:border-flc-500 focus:ring-2 focus:ring-flc-500/20 px-3 py-2 bg-neutral-50 focus:bg-white" />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button onClick={handleSave} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-flc-500 hover:bg-flc-600 text-white font-semibold">
                      {editingId ? 'Update' : 'Save'}
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                    </button>
                    {editingId && (
                      <button onClick={resetForm} className="px-4 py-2 rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-100">Cancel</button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* List */}
            <div className="lg:col-span-7">
              <div className="mb-3 flex items-center gap-3">
                <div className="relative flex-1 max-w-lg">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                  <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search title, content, tag…" className="w-full pl-10 pr-3 py-2 rounded-lg border border-neutral-300 focus:border-flc-500 focus:ring-2 focus:ring-flc-500/20 bg-white" />
                </div>
              </div>

              <div className="space-y-3">
                {filtered.length === 0 ? (
                  <div className="rounded-xl border border-neutral-200 bg-white">
                    <EmptyState title={emptyTitle} subtitle={emptySubtitle} />
                  </div>
                ) : (
                  filtered.map(item => (
                    <div key={item.id} className="rounded-xl border border-neutral-200 bg-white p-4 md:p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="font-semibold text-primary-900 truncate">{item.title || '(Untitled)'}</h3>
                          <div className="mt-1 text-xs text-neutral-500">{new Date(item.updatedAt || item.createdAt).toLocaleString()}</div>
                          {item.tag && (
                            <span className="mt-2 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-flc-500/10 text-[12px] font-semibold text-flc-700">#{item.tag}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {item.sermonUrl && (
                            <a href={item.sermonUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-neutral-300 text-sm text-neutral-700 hover:bg-neutral-100">
                              Watch
                              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                            </a>
                          )}
                          <button onClick={() => handleEdit(item)} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-neutral-300 text-sm text-neutral-700 hover:bg-neutral-100">Edit</button>
                          <button onClick={() => handleDelete(item.id)} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-red-200 text-sm text-red-700 hover:bg-red-50">Delete</button>
                        </div>
                      </div>
                      {item.content && (
                        <p className="mt-3 text-neutral-700 whitespace-pre-wrap">{item.content}</p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
