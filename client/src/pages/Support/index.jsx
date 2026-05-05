import React from 'react';
import SupportHero from './SupportHero';
import SupportFeatures from './SupportFeatures';
import SupportForm from './SupportForm';
import SupportSidebar from './SupportSidebar';
import SupportDevResources from './SupportDevResources';

const Support = () => {
  return (
    <div className="bg-slate-50 min-h-screen pt-[72px]">
      <SupportHero />
      <SupportFeatures />
      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        <SupportForm />
        <SupportSidebar />
      </section>

      <SupportDevResources />
    </div>
  );
};

export default Support;
