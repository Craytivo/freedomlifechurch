import React, { useState, useEffect } from 'react';
import SEO from '../src/components/seo/SEO';
import SectionHeader from '../src/components/SectionHeader';

const LiveStreamPage = () => {
  const [currentStream, setCurrentStream] = useState(null);
  const [recentStreams, setRecentStreams] = useState([]);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if we're currently live and get recent streams
  useEffect(() => {
    const checkLiveStatus = async () => {
      try {
        // Try to get recent streams first
        const recentResponse = await fetch('/api/youtube/recent');
        if (recentResponse.ok) {
          const recentData = await recentResponse.json();
          setRecentStreams(recentData.videos || []);
          
          // Check if the most recent video is a live stream
          if (recentData.videos && recentData.videos.length > 0) {
            const mostRecent = recentData.videos[0];
            setCurrentStream(mostRecent);
            // Simple check for live status - you might want to enhance this
            setIsLive(mostRecent.snippet?.liveBroadcastContent === 'live');
          }
        }

        // Also try to get the latest video
        const latestResponse = await fetch('/api/youtube/latest');
        if (latestResponse.ok) {
          const latestData = await latestResponse.json();
          if (latestData.videoId && !currentStream) {
            setCurrentStream({
              id: { videoId: latestData.videoId },
              snippet: {
                title: 'Latest Message',
                description: 'Our most recent message from Freedom Life Church',
                thumbnails: {
                  high: { url: `https://img.youtube.com/vi/${latestData.videoId}/hqdefault.jpg` }
                }
              }
            });
          }
        }
      } catch (error) {
        console.error('Error fetching stream data:', error);
        // Fallback to default video
        setCurrentStream({
          id: { videoId: 'X5K8Wk7pBGw' },
          snippet: {
            title: 'Latest Message',
            description: 'Our most recent message from Freedom Life Church',
            thumbnails: {
              high: { url: 'https://img.youtube.com/vi/X5K8Wk7pBGw/hqdefault.jpg' }
            }
          }
        });
      } finally {
        setLoading(false);
      }
    };

    checkLiveStatus();
    
    // Check for live status every 2 minutes
    const interval = setInterval(checkLiveStatus, 120000);
    return () => clearInterval(interval);
  }, []);

  const upcomingServices = [
    {
      title: 'Sunday Service',
      time: 'Sundays at 12:00 PM MST',
      description: 'Join us for worship, teaching, and community every Sunday',
      type: 'service'
    },
    {
      title: 'Prayer Gathering',
      time: 'Fridays at 7:00 AM & 7:00 PM MST',
      description: 'Weekly prayer gatherings for intercession and spiritual growth',
      type: 'prayer'
    }
  ];

  if (loading) {
    return (
      <>
        <SEO title="Live Stream | Freedom Life Church" />
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-flc-500/30 border-t-flc-500 rounded-full animate-spin" />
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Live Stream | Freedom Life Church"
        description="Watch Freedom Life Church live or catch up on recent messages. Join our online community for worship, teaching, and connection."
        keywords={[ 'live stream','church online','Freedom Life Church Edmonton','worship','sermons' ]}
      />

      {/* Hero Section with Live Stream */}
      <section className="relative py-16 md:py-24 bg-white overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0" style={{
            background: [
              'radial-gradient(circle at 15% 25%, rgba(235,167,62,0.06), rgba(235,167,62,0) 70%)',
              'radial-gradient(circle at 85% 75%, rgba(235,167,62,0.04), rgba(235,167,62,0) 60%)',
              'linear-gradient(135deg, rgba(235,167,62,0.02) 0%, rgba(235,167,62,0) 50%)'
            ].join(', ')
          }} />
          <div className="absolute top-20 right-10 w-24 h-24 bg-red-500/5 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-20 left-16 w-20 h-20 bg-flc-500/4 rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Live Status Banner */}
          {isLive && (
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500 text-white text-sm font-semibold shadow-lg animate-pulse">
                <div className="w-3 h-3 bg-white rounded-full animate-ping" />
                LIVE NOW
              </div>
            </div>
          )}

          <SectionHeader
            badge={isLive ? "Live Now" : "Watch Online"}
            title={isLive ? "We're Live!" : "Latest Message"}
            subtitle={isLive ? "Join us live for worship and teaching" : "Catch up on our most recent message or watch previous services"}
            alignment="center"
            size="large"
            className="mb-12"
          />

          {/* Main Video Player */}
          <div className="max-w-5xl mx-auto mb-16">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                {currentStream ? (
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${currentStream.id.videoId}?rel=0&autoplay=${isLive ? 1 : 0}`}
                    title={currentStream.snippet?.title || 'Live Stream'}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-neutral-900">
                    <div className="text-center text-white">
                      <svg className="w-16 h-16 mx-auto mb-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                      </svg>
                      <h3 className="text-xl font-semibold mb-2">No Stream Available</h3>
                      <p className="text-neutral-400">Check back during our scheduled service times</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Video Info */}
            {currentStream && (
              <div className="mt-6 text-center">
                <h2 className="text-2xl font-bold text-primary-900 mb-2">
                  {currentStream.snippet?.title}
                </h2>
                {currentStream.snippet?.description && (
                  <p className="text-neutral-600 leading-relaxed max-w-3xl mx-auto">
                    {currentStream.snippet.description.length > 200 
                      ? `${currentStream.snippet.description.substring(0, 200)}...`
                      : currentStream.snippet.description
                    }
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <a
              href="https://www.youtube.com/@FLCEdmonton"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
              </svg>
              Subscribe on YouTube
            </a>
            <a
              href="/visit"
              className="inline-flex items-center gap-2 px-6 py-3 bg-flc-600 hover:bg-flc-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              Visit In Person
            </a>
          </div>
        </div>
      </section>

      {/* Service Schedule */}
      <section className="relative py-16 md:py-20 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="When We're Live"
            subtitle="Join us for our regular live streams and special events"
            alignment="center"
            size="default"
            className="mb-12"
          />

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {upcomingServices.map((service, index) => (
              <div key={index} className="p-6 rounded-2xl bg-white border border-neutral-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className={`flex-none w-12 h-12 rounded-xl flex items-center justify-center ${
                    service.type === 'service' ? 'bg-flc-500/10 text-flc-600' : 'bg-blue-500/10 text-blue-600'
                  }`}>
                    {service.type === 'service' ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-primary-900 mb-2">{service.title}</h3>
                    <p className="text-flc-600 font-semibold mb-2">{service.time}</p>
                    <p className="text-neutral-600 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Notification Settings */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium border border-blue-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-5 5v-5zM12 17H7l5 5v-5zM12 3C9.205 3 7 5.205 7 8c0 2.795 2.205 5 5 5s5-2.205 5-5c0-2.795-2.205-5-5-5z"/>
              </svg>
              Subscribe to our YouTube channel to get notified when we go live
            </div>
          </div>
        </div>
      </section>

      {/* Recent Messages */}
      {recentStreams.length > 0 && (
        <section className="relative py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              title="Recent Messages"
              subtitle="Catch up on previous services and messages"
              alignment="center"
              size="default"
              className="mb-12"
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {recentStreams.slice(1, 7).map((video, index) => (
                <div key={video.id.videoId} className="group cursor-pointer">
                  <div className="relative rounded-xl overflow-hidden shadow-lg mb-4">
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                      <img
                        src={video.snippet.thumbnails?.medium?.url || video.snippet.thumbnails?.default?.url}
                        alt={video.snippet.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-primary-900 mb-2 group-hover:text-flc-600 transition-colors">
                    {video.snippet.title.length > 60 
                      ? `${video.snippet.title.substring(0, 60)}...`
                      : video.snippet.title
                    }
                  </h3>
                  <p className="text-sm text-neutral-600">
                    {new Date(video.snippet.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <a
                href="https://www.youtube.com/@FLCEdmonton/videos"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-neutral-300 text-neutral-700 hover:border-flc-500 hover:text-flc-600 font-semibold rounded-xl transition-all duration-300"
              >
                View All Messages
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </a>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default LiveStreamPage;