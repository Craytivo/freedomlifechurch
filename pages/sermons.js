import React, { useState, useEffect } from 'react';
import SermonGrid from '../src/components/sermons/SermonGrid';
import SEO from '../src/components/seo/SEO';
import SectionHeader from '../src/components/SectionHeader';

const SermonsPage = () => {
  const [sermons, setSermons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const sermonsPerPage = 12;

  // Fetch sermons from server-side YouTube feed proxy
  useEffect(() => {
    const fetchSermons = async () => {
      try {
        setLoading(true);
        
        // Use internal recent videos endpoint (Atom feed proxy)
        const response = await fetch('/api/youtube/recent?limit=36');
        
        if (!response.ok) {
          throw new Error('Failed to fetch sermons');
        }
        
        const data = await response.json();
        
        // Transform Atom feed entries into sermon format
        const sermonsData = data.items?.map(entry => ({
          id: entry.id,
          title: entry.title || 'Untitled Sermon',
          description: entry.description || '',
          date: new Date(entry.published || Date.now()),
          speaker: extractSpeaker(entry.title || ''),
          series: extractSeries(entry.title || ''),
          category: categorizeSermon(entry.title || '', entry.description || ''),
          thumbnail: entry.thumbnail || `https://img.youtube.com/vi/${entry.id}/hqdefault.jpg`,
          duration: 'Unknown',
          viewCount: 0,
          tags: []
        })) || [];
        
        setSermons(sermonsData);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching sermons:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSermons();
  }, []);

  // Helper functions to extract metadata from video titles
  const extractSpeaker = (title) => {
    // Common patterns for speaker names in titles
    const patterns = [
      /Pastor\s+([A-Za-z\s]+)/i,
      /Rev\.?\s+([A-Za-z\s]+)/i,
      /Dr\.?\s+([A-Za-z\s]+)/i,
      /by\s+([A-Za-z\s]+)/i
    ];
    
    for (const pattern of patterns) {
      const match = title.match(pattern);
      if (match) return match[1].trim();
    }
    
    return 'Pastor Mike'; // Default speaker
  };

  const extractSeries = (title) => {
    // Look for series indicators
    if (title.includes('Series:')) {
      return title.split('Series:')[1].split('|')[0].trim();
    }
    if (title.includes(' - ')) {
      const parts = title.split(' - ');
      if (parts.length > 1) return parts[0].trim();
    }
    return null;
  };

  const categorizeSermon = (title, description) => {
    const content = (title + ' ' + description).toLowerCase();
    
    if (content.includes('worship') || content.includes('praise')) return 'worship';
    if (content.includes('prayer') || content.includes('intercession')) return 'prayer';
    if (content.includes('prophecy') || content.includes('prophetic')) return 'prophecy';
    if (content.includes('healing') || content.includes('miracle')) return 'healing';
    if (content.includes('youth') || content.includes('young')) return 'youth';
    if (content.includes('family') || content.includes('marriage')) return 'family';
    if (content.includes('leadership') || content.includes('pastor')) return 'leadership';
    if (content.includes('evangelism') || content.includes('outreach')) return 'evangelism';
    
    return 'teaching';
  };

  const categories = [
    { value: 'all', label: 'All Sermons', icon: '📖' },
    { value: 'teaching', label: 'Teaching', icon: '🎓' },
    { value: 'worship', label: 'Worship', icon: '🎵' },
    { value: 'prayer', label: 'Prayer', icon: '🙏' },
    { value: 'prophecy', label: 'Prophetic', icon: '⚡' },
    { value: 'healing', label: 'Healing', icon: '✨' },
    { value: 'youth', label: 'Youth', icon: '🌟' },
    { value: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦' },
    { value: 'leadership', label: 'Leadership', icon: '👑' },
    { value: 'evangelism', label: 'Evangelism', icon: '🌍' }
  ];

  // Filter sermons based on category and search
  const filteredSermons = sermons.filter(sermon => {
    const matchesCategory = selectedCategory === 'all' || sermon.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sermon.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (sermon.series && sermon.series.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredSermons.length / sermonsPerPage);
  const startIndex = (currentPage - 1) * sermonsPerPage;
  const currentSermons = filteredSermons.slice(startIndex, startIndex + sermonsPerPage);

  // Formatting moved into SermonCard component

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600 font-medium">Loading sermons...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Sermons | Freedom Life Church"
        description="Watch and listen to powerful sermons from Freedom Life Church. Access our complete library of messages, teachings, and worship services."
        keywords={[
          'sermons','messages','teachings','Freedom Life Church Edmonton','Pastor Mike','church services','online church'
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-20 right-10 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-20 left-16 w-24 h-24 bg-purple-400/6 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-blue-600/4 rounded-full blur-lg animate-pulse" style={{ animationDelay: '4s' }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            badge="Messages"
            title="Sermons & Teachings"
            subtitle="Discover life-changing messages from God's Word. Access our complete library of sermons, teachings, and worship services to grow in your faith journey."
            alignment="center"
            size="large"
            className="mb-12"
          />

          {error && (
            <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              <p className="font-medium">Unable to load sermons</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/30">
              <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">{sermons.length}+</div>
              <div className="text-sm text-neutral-600 font-medium">Total Messages</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/30">
              <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-1">52</div>
              <div className="text-sm text-neutral-600 font-medium">Weeks of Content</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/30">
              <div className="text-2xl md:text-3xl font-bold text-green-600 mb-1">HD</div>
              <div className="text-sm text-neutral-600 font-medium">Video Quality</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/30">
              <div className="text-2xl md:text-3xl font-bold text-amber-600 mb-1">Free</div>
              <div className="text-sm text-neutral-600 font-medium">Always Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b border-neutral-200 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <input
                type="text"
                placeholder="Search sermons, speakers, series..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-end">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => {
                    setSelectedCategory(category.value);
                    setCurrentPage(1);
                  }}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.value
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span className="hidden sm:inline">{category.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sermons Grid */}
      <section className="py-12 md:py-16 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {currentSermons.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-neutral-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <h3 className="text-xl font-semibold text-neutral-600 mb-2">No sermons found</h3>
              <p className="text-neutral-500">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <>
              <SermonGrid sermons={currentSermons} categories={categories} />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 rounded-lg border border-neutral-300 text-neutral-600 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                    </svg>
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-blue-500 text-white'
                          : 'text-neutral-600 hover:bg-neutral-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 rounded-lg border border-neutral-300 text-neutral-600 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Featured Series Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Featured Series"
            subtitle="Dive deeper into God's Word with our sermon series"
            alignment="center"
            size="default"
            className="mb-12"
          />

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
              <div className="w-16 h-16 bg-blue-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold text-primary-900 mb-2">Biblical Foundations</h3>
              <p className="text-neutral-600 text-sm">Essential truths from Scripture for every believer</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
              <div className="w-16 h-16 bg-purple-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold text-primary-900 mb-2">Life & Relationships</h3>
              <p className="text-neutral-600 text-sm">Practical wisdom for family, marriage, and friendships</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
              <div className="w-16 h-16 bg-green-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold text-primary-900 mb-2">Spirit & Power</h3>
              <p className="text-neutral-600 text-sm">Walking in the supernatural power of God</p>
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500 text-white rounded-2xl mb-6">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-900 mb-4">
              Never Miss a Message
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-8">
              Subscribe to our YouTube channel to get notified when new sermons and teachings are available. Join thousands of others who are growing in their faith through God's Word.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.youtube.com/@FreedomLifeChurchEdmonton"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:bg-red-700 transform hover:-translate-y-0.5 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Subscribe to YouTube
              </a>
              <a
                href="/live"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/80 backdrop-blur-sm border border-blue-200/40 text-blue-700 font-semibold rounded-xl shadow-md hover:shadow-lg hover:bg-white/90 hover:border-blue-300/60 transform hover:-translate-y-0.5 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
                Watch Live Services
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SermonsPage;