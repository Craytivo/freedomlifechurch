import React from 'react';

export default function EventsDebug() {
  const [date, setDate] = React.useState(() => new Date().toISOString().slice(0,10));
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const load = async () => {
    setLoading(true); setError(null);
    try {
      const res = await fetch(`/api/events?fresh=1`);
      const json = await res.json();
      setData(json);
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => { load(); }, []);

  const events = data?.events || [];
  const byDate = events.filter(e => e.date === date);

  return (
    <div style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      <h1>Events Debug</h1>
      <div style={{ margin: '8px 0' }}>
        <label>
          Date:{' '}
          <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        </label>
        <button onClick={load} style={{ marginLeft: 8, padding: '4px 8px' }}>Refresh (fresh)</button>
      </div>
      {loading && <div>Loading…</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div style={{ marginTop: 12, fontSize: 12, color: '#555' }}>
        <div>Fetched at: {data?.fetchedAt}</div>
        <div>Fresh: {String(data?.fresh)}</div>
        <div>Total events: {events.length}</div>
      </div>
      <h2 style={{ marginTop: 16 }}>Events on {date}</h2>
      {byDate.length === 0 ? (
        <div>No events found for this date.</div>
      ) : (
        <ul>
          {byDate.map(e => (
            <li key={e.id}>
              <strong>{e.time}</strong> — {e.title} <em>({e.category})</em>
            </li>
          ))}
        </ul>
      )}
      <h3 style={{ marginTop: 16 }}>Recent items</h3>
      <ul>
        {events.slice(0, 10).map(e => (
          <li key={`recent-${e.id}`}>{e.date}: {e.title} — {e.time}</li>
        ))}
      </ul>
    </div>
  );
}
