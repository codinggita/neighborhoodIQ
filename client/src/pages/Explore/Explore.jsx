import React, { useState, useEffect } from 'react';
import ExploreHero from './ExploreHero';
import ExploreFilters from './ExploreFilters';
import NeighborhoodCard from './NeighborhoodCard';
import IntelligenceSection from './IntelligenceSection';
import ExploreMap from './ExploreMap';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Explore = () => {
  const navigate = useNavigate();
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [focusLocation, setFocusLocation] = useState(null);

  const viewMode = window.location.pathname.includes('grid') ? 'grid' : 'map';
  const setViewMode = (mode) => navigate(`/explore/${mode}`);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'}/areas`);
        
        // Transform backend data to frontend format
        const transformedData = response.data.map(area => ({
          id: area._id,
          name: area.name,
          location: `${area.city}, ${area.state}`,
          score: area.score || 0,
          price: area.metrics?.rentRange || '₹ --', // Fallback if missing
          growth: area.metrics?.growth || '0%',
          aqi: area.metrics?.aqi?.value || 0,
          aqiStatus: getAqiStatus(area.metrics?.aqi?.value),
          grade: getGrade(area.score),
          trend: 'Stable',
          tags: area.amenities?.hospitals > 10 ? ['Healthcare Hub'] : ['Residential'],
          image: area.image || `https://images.unsplash.com/photo-1595658658481-d53d3f999875?q=80&w=800&auto=format&fit=crop`,
          lat: area.location?.coordinates[1],
          lng: area.location?.coordinates[0]
        }));

        setNeighborhoods(transformedData);
        setError(null);
      } catch (err) {
        console.error('Error fetching areas:', err);
        setError('Failed to load neighborhoods. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAreas();
  }, []);

  const getAqiStatus = (val) => {
    if (!val) return 'Unknown';
    if (val <= 1) return 'Excellent';
    if (val <= 2) return 'Good';
    if (val <= 3) return 'Moderate';
    if (val <= 4) return 'Poor';
    return 'Unhealthy';
  };

  const getGrade = (score) => {
    if (score >= 90) return 'A+ Grade';
    if (score >= 80) return 'A Grade';
    if (score >= 70) return 'B+ Grade';
    if (score >= 60) return 'B Grade';
    return 'C Grade';
  };

  const handleSearchSelect = (area) => {
    if (area.location?.coordinates) {
      setFocusLocation({
        lat: area.location.coordinates[1],
        lng: area.location.coordinates[0],
        zoom: 14
      });
      // Switch to map view if not already there
      if (viewMode !== 'map') setViewMode('map');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#11B573] animate-spin mb-4" />
        <p className="text-slate-500 font-medium">Fetching real-time intelligence...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <ExploreHero onSearchSelect={handleSearchSelect} />
      <ExploreFilters viewMode={viewMode} setViewMode={setViewMode} />

      {error ? (
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <p className="text-red-500 font-bold mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-[#11B573] text-white rounded-full font-bold"
          >
            Retry
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="flex justify-between items-center mb-6 md:mb-8">
            <div>
              <h2 className="text-[20px] md:text-[28px] font-bold text-slate-900 tracking-tight leading-tight">Top Neighborhoods</h2>
              <p className="text-slate-500 text-[11px] md:text-sm font-medium">{neighborhoods.length} areas analyzed across India</p>
            </div>
            <button className="text-[#11B573] text-xs md:text-sm font-bold flex items-center gap-1 hover:underline transition-all">
              View All <ArrowRight size={14} className="md:w-4 md:h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-9 gap-3 md:gap-4">
            {neighborhoods.slice(0, 7).map((neighborhood, index) => {
              const isFeatured = index === 0;
              return (
                <div key={neighborhood.id} className={isFeatured ? 'lg:col-span-3 lg:row-span-2' : 'lg:col-span-2'}>
                  <NeighborhoodCard neighborhood={neighborhood} isFeatured={isFeatured} />
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <button className="px-8 py-2.5 border border-[#11B573] text-[#11B573] bg-transparent font-bold text-sm rounded-full hover:bg-[#11B573]/5 transition-colors">
              Load More Neighborhoods
            </button>
          </div>
        </main>
      ) : (
        <ExploreMap neighborhoods={neighborhoods} focusLocation={focusLocation} />
      )}

      <IntelligenceSection />
    </div>
  );
};

export default Explore;
