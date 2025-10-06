export const events = [
  {
    id: 'sun-service',
    title: 'Sunday Worship Experience',
    date: '2025-10-05',
    time: '12:00 PM',
    category: 'Church-wide',
    locationName: 'Freedom Life Church',
    address: '14970 114 Ave NW, Edmonton, AB T5M 4G4',
    blurb: 'Join us for worship, teaching, and community as we gather each Sunday.',
    provides: ['Child Care', 'Parking', 'Restrooms']
  },
  {
    id: 'prayer-friday',
    title: 'Friday Prayer Gathering',
    date: '2025-10-10',
    time: '7:00 AM & 7:00 PM',
    category: 'Prayer',
    locationName: 'Freedom Life Church',
    address: '14970 114 Ave NW, Edmonton, AB T5M 4G4',
    blurb: 'Start and end your Friday in agreement with the house.',
    provides: ['Parking', 'Restrooms']
  },
  {
    id: 'youth-night',
    title: 'Youth Night',
    date: '2025-10-11',
    time: '6:30 PM',
    category: 'NextGen',
    locationName: 'Freedom Life Church',
    address: '14970 114 Ave NW, Edmonton, AB T5M 4G4',
    blurb: 'A high-energy night for grades 6–12 to grow in faith and friendships.',
    provides: ['Parking', 'Restrooms']
  },
  {
    id: 'groups-week',
    title: 'Groups Week',
    date: '2025-10-14',
    time: 'Various',
    category: 'Groups',
    locationName: 'Various Locations',
    address: 'Across the City',
    blurb: 'Find your people and grow spiritually together.',
    provides: []
  },
  {
    id: 'serve-day',
    title: 'Serve Day: Community Outreach',
    date: '2025-10-18',
    time: '9:00 AM',
    category: 'Outreach',
    locationName: 'TBA',
    address: 'Announced at church',
    blurb: 'Be the hands and feet of Jesus in our city.',
    provides: ['Parking']
  }
];

export function getEventById(id) {
  return events.find(e => e.id === id);
}