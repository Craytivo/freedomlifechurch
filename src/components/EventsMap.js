/* global Promise */
import { useEffect, useRef, useState } from 'react';
import { KNOWN_VENUES } from '../data/venues';

// Minimal client-only Leaflet map via CDN that plots event markers.
// Props: events: Array<{ id, title, date, time, address, locationName }>
// Known location fallback (FLC address)
const FLC = { lat: 53.5695, lng: -113.5860, name: 'Freedom Life Church' };

export default function EventsMap({ events = [], height = 360 }) {
  const mapRef = useRef(null);
  const containerRef = useRef(null);
  const [ready, setReady] = useState(false);

  // Ensure Leaflet CSS/JS from CDN is present
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const ensure = async () => {
      const haveCss = !!document.querySelector('link[data-leaflet]');
      if (!haveCss) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        link.setAttribute('data-leaflet', 'true');
        document.head.appendChild(link);
      }
      if (!window.L) {
        await new Promise((resolve, reject) => {
          const s = document.createElement('script');
          s.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
          s.async = true;
          s.onload = resolve;
          s.onerror = reject;
          document.body.appendChild(s);
        });
      }
      setReady(true);
    };
    ensure().catch((e) => { console.warn('Leaflet load failed', e); });
  }, []);

  // Basic client-side geocoder using Nominatim with localStorage cache
  async function geocode(address) {
    try {
      if (!address) return null;
      const key = `geo:${address}`;
      const cached = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
      if (cached) return JSON.parse(cached);
      const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(address)}`;
      const resp = await fetch(url, { headers: { 'Accept': 'application/json' } });
      if (!resp.ok) return null;
      const data = await resp.json();
      if (Array.isArray(data) && data[0]) {
        const pt = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
        try { window.localStorage.setItem(key, JSON.stringify(pt)); } catch (e) { /* ignore quota */ }
        return pt;
      }
    } catch (e) {
      console.warn('Geocode failed', e);
    }
    return null;
  }

  // Initialize map and plot markers
  useEffect(() => {
    if (!ready || !containerRef.current) return;
    const L = window.L;
    if (!L) return;

    if (!mapRef.current) {
      mapRef.current = L.map(containerRef.current, { zoomControl: true, scrollWheelZoom: false }).setView([FLC.lat, FLC.lng], 12);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapRef.current);
    }

    const map = mapRef.current;
    const layer = L.layerGroup().addTo(map);
    let disposed = false;

    const addMarker = (pt, e) => {
      if (!pt) return;
      const marker = window.L.marker([pt.lat, pt.lng]);
      const html = `
        <div style="min-width:180px">
          <div style="font-weight:600;margin-bottom:2px">${e.title || 'Event'}</div>
          <div style="font-size:12px;color:#555">${new Date(e.date).toLocaleDateString(undefined,{ month:'short', day:'numeric' })} · ${e.time}</div>
          ${e.locationName ? `<div style="font-size:12px;color:#666;margin-top:2px">${e.locationName}</div>` : ''}
          <div style="margin-top:6px"><a href="/events/${e.id}" style="color:#b6720c;font-weight:600">Details</a></div>
        </div>`;
      marker.bindPopup(html);
      marker.addTo(layer);
      return marker;
    };

    (async () => {
      const points = [];
      for (const e of events) {
        if (!e || !e.address) {
          // heuristic for church location
          if (e?.locationName && /freedom\s*life\s*church/i.test(e.locationName)) {
            points.push({ pt: FLC, e });
          }
          continue;
        }
        let pt = null;
        // First, try known venues
        const hit = KNOWN_VENUES.find(v => v.pattern?.test(e.address) || e.address.toLowerCase().includes((v.address || '').toLowerCase()) || (v.name && e.address.toLowerCase().includes(v.name.toLowerCase())));
        if (hit) {
          pt = { lat: hit.lat, lng: hit.lng };
        } else if (/freedom\s*life\s*church/i.test(e.address)) {
          pt = FLC;
        } else {
          // Fallback to geocoding
          pt = await geocode(e.address);
        }
        if (pt) points.push({ pt, e });
      }
      if (disposed) return;
      const bounds = window.L.latLngBounds([]);
      for (const p of points) {
        addMarker(p.pt, p.e);
        bounds.extend([p.pt.lat, p.pt.lng]);
      }
      if (points.length > 0 && bounds.isValid()) {
        map.fitBounds(bounds.pad(0.2));
      } else {
        map.setView([FLC.lat, FLC.lng], 12);
      }
    })();

    return () => {
      disposed = true;
      layer.remove();
    };
  }, [ready, events]);

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-3">
      <div ref={containerRef} style={{ width: '100%', height }} />
    </div>
  );
}
