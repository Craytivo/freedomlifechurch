// Tiny cache of known venue coordinates to avoid geocoding.
// Add new venues here as needed.
export const KNOWN_VENUES = [
  {
    name: 'Freedom Life Church',
    // Full civic address as typically present in ICS entries
    address: '14970 114 Ave NW, Edmonton, AB T5M 4G4',
    lat: 53.5695,
    lng: -113.5860,
    // Optional regex pattern to match flexible address strings
    pattern: /14970\s*114\s*Ave/i
  }
  // Example for adding more:
  // { name: 'Common Venue Name', address: '123 Main St, City, ST', lat: 00.0000, lng: -00.0000, pattern: /123\s*Main\s*St/i }
];
