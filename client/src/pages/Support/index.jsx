import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  BarChart3,
  ShieldCheck,
  Clock,
  FileEdit,
  Activity,
  HelpCircle,
  Briefcase,
  Rocket,
  ChevronRight,
  Upload,
  User,
  Mail,
  Phone,
  MessageSquare,
  FileText,
  Zap,
  Database,
  Code,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const Support = () => {
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    requestType: 'Report Incorrect Data',
    priority: 'Medium',
    shortSummary: '',
    metric: '',
    location: '',
    city: '',
    issueDescription: '',
    dateObserved: '',
    dataSource: '',
    name: '',
    email: '',
    phone: '',
    reachOutMethod: 'Email',
    additionalDetails: '',
    intent: 'Report Incorrect Data'
  });

  const features = [
    {
      icon: <Heart className="text-[#11B573]" size={24} />,
      title: "We care",
      desc: "Your feedback helps us improve"
    },
    {
      icon: <BarChart3 className="text-[#11B573]" size={24} />,
      title: "Data-driven",
      desc: "Powered by 6+ trusted data sources"
    },
    {
      icon: <ShieldCheck className="text-[#11B573]" size={24} />,
      title: "Secure & Private",
      desc: "Your data is safe with us"
    },
    {
      icon: <Clock className="text-[#11B573]" size={24} />,
      title: "Quick Response",
      desc: "We usually reply within 24 hours"
    }
  ];

  const systemStatus = [
    { name: "Data Sync Services", status: "Operational" },
    { name: "API Services", status: "Operational" },
    { name: "Database (MongoDB)", status: "Operational" },
    { name: "Cache (Redis)", status: "Operational" },
    { name: "External Data Sources", status: "Operational" }
  ];

  const faqs = [
    "Why is my crime data showing old?",
    "Why is water quality data unavailable?",
    "How is the NeighborhoodIQ Score calculated?",
    "Where does your data come from?",
    "How often is the data updated?"
  ];

  const forProfessionals = [
    { title: "API Access Request", desc: "Apply for API access", icon: <FileEdit size={18} /> },
    { title: "Bulk Data Inquiry", desc: "Request bulk data or reports", icon: <Database size={18} /> },
    { title: "Partnership Opportunities", desc: "Work with us", icon: <Briefcase size={18} /> }
  ];

  const roadmap = [
    { name: "Commute Time Calculator", votes: 128 },
    { name: "Noise Pollution Metric", votes: 95 },
    { name: "School Rating & Reviews", votes: 82 },
    { name: "Property Price Predictions", votes: 67 },
    { name: "Traffic Congestion Index", votes: 45 }
  ];

  const devResources = [
    { title: "API Documentation", desc: "View API docs", icon: <FileText size={20} /> },
    { title: "Scoring Methodology", desc: "Understand our scoring", icon: <Zap size={20} /> },
    { title: "Data Sources", desc: "Explore our data", icon: <Database size={20} /> },
    { title: "GitHub Repository", desc: "View on GitHub", icon: <Code size={20} /> }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-[72px]">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
            alt="Support Background"
            className="w-full h-full object-cover brightness-[0.3]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 bg-[#11B573] text-white rounded text-[10px] font-bold uppercase tracking-widest mb-4">
              SUPPORT CENTER
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">How can we help you?</h1>
            <p className="text-lg text-white/80 max-w-2xl leading-relaxed">
              We're here to help you make better real estate decisions with accurate,
              transparent, and data-driven insights.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4 hover:shadow-md transition-shadow cursor-default"
            >
              <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{feature.title}</h3>
                <p className="text-xs text-slate-500">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Left Column - Support Form */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex items-center space-x-3 bg-gradient-to-r from-emerald-50/30 to-transparent">
              <div className="w-10 h-10 bg-white text-[#11B573] rounded-lg flex items-center justify-center shadow-sm border border-slate-100">
                <FileEdit size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Send us a message</h2>
                <p className="text-sm text-slate-500">Fill out the form below and we'll get back to you as soon as possible.</p>
              </div>
            </div>

            <div className="p-8 space-y-10">
              {/* Step 1: Request Details */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-7 h-7 bg-[#11B573] text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg shadow-emerald-200">1</div>
                  <h3 className="font-bold text-slate-900">Tell us about your request</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">Request Type <span className="text-red-500 font-bold">*</span></label>
                    <select
                      name="requestType"
                      value={formData.requestType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#11B573] focus:ring-4 focus:ring-emerald-500/10 text-sm transition-all appearance-none cursor-pointer"
                    >
                      <option>Report Incorrect Data</option>
                      <option>Feature Request</option>
                      <option>General Inquiry</option>
                      <option>Technical Support</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">Priority</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                        <div className={`w-2 h-2 rounded-full mr-2 ${formData.priority === 'Urgent' ? 'bg-red-500' :
                          formData.priority === 'High' ? 'bg-amber-500' :
                            formData.priority === 'Medium' ? 'bg-emerald-500' : 'bg-slate-400'
                          }`}></div>
                      </div>
                      <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#11B573] text-sm appearance-none cursor-pointer"
                      >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                        <option>Urgent</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">Short Summary <span className="text-red-500 font-bold">*</span></label>
                  <input
                    type="text"
                    name="shortSummary"
                    value={formData.shortSummary}
                    onChange={handleInputChange}
                    placeholder="Briefly describe your issue or request"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#11B573] focus:ring-4 focus:ring-emerald-500/10 text-sm transition-all"
                  />
                </div>
              </div>

              {/* Step 2: Data Details */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-7 h-7 bg-[#11B573] text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg shadow-emerald-200">2</div>
                  <h3 className="font-bold text-slate-900">Data-specific details <span className="text-xs font-medium text-slate-400 ml-1">(If applicable)</span></h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">Metric / Category</label>
                    <select
                      name="metric"
                      value={formData.metric}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#11B573] text-sm appearance-none cursor-pointer"
                    >
                      <option value="">Select metric</option>
                      <option>Safety Score</option>
                      <option>Livability</option>
                      <option>Connectivity</option>
                      <option>Air Quality</option>
                      <option>Water Availability</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">Location / Neighborhood</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g., Koramangala"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#11B573] text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g., Bangalore"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#11B573] text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">What seems to be the issue? <span className="text-red-500 font-bold">*</span></label>
                  <textarea
                    rows={4}
                    name="issueDescription"
                    value={formData.issueDescription}
                    onChange={handleInputChange}
                    placeholder="Please describe the problem in detail..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#11B573] focus:ring-4 focus:ring-emerald-500/10 text-sm resize-none transition-all"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">When did you notice this issue?</label>
                    <input
                      type="date"
                      name="dateObserved"
                      value={formData.dateObserved}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#11B573] text-sm cursor-pointer"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">Data Source <span className="text-xs font-medium text-slate-300 ml-1">(If known)</span></label>
                    <select
                      name="dataSource"
                      value={formData.dataSource}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#11B573] text-sm appearance-none cursor-pointer"
                    >
                      <option value="">Select source</option>
                      <option>Open Government Data</option>
                      <option>Google Maps</option>
                      <option>User Report</option>
                      <option>Local News</option>
                    </select>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="p-8 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 flex flex-col items-center justify-center space-y-3 cursor-pointer hover:border-[#11B573] hover:bg-emerald-50/20 transition-all group"
                >
                  <div className="w-12 h-12 bg-white shadow-sm rounded-full flex items-center justify-center text-slate-400 group-hover:text-[#11B573] group-hover:shadow-md transition-all">
                    <Upload size={24} />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-slate-900">Upload Evidence <span className="font-normal text-slate-500">(Optional)</span></p>
                    <p className="text-[10px] text-slate-400 mt-1">Supports JPG, PNG, PDF (Max 10MB)</p>
                  </div>
                  <button className="px-6 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm">Choose Files</button>
                </motion.div>
              </div>

              {/* Step 3: Contact Info */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-7 h-7 bg-[#11B573] text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg shadow-emerald-200">3</div>
                  <h3 className="font-bold text-slate-900">Additional Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">Your Name <span className="text-red-500 font-bold">*</span></label>
                    <div className="relative group">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#11B573] focus:ring-4 focus:ring-emerald-500/10 text-sm transition-all"
                      />
                      <User size={16} className="absolute left-3.5 top-3.5 text-slate-400 group-focus-within:text-[#11B573] transition-colors" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">Email Address <span className="text-red-500 font-bold">*</span></label>
                    <div className="relative group">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#11B573] focus:ring-4 focus:ring-emerald-500/10 text-sm transition-all"
                      />
                      <Mail size={16} className="absolute left-3.5 top-3.5 text-slate-400 group-focus-within:text-[#11B573] transition-colors" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">Phone Number <span className="font-normal text-slate-300">(Optional)</span></label>
                    <div className="relative group">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter phone number"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#11B573] focus:ring-4 focus:ring-emerald-500/10 text-sm transition-all"
                      />
                      <Phone size={16} className="absolute left-3.5 top-3.5 text-slate-400 group-focus-within:text-[#11B573] transition-colors" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">How can we reach you? <span className="text-red-500 font-bold">*</span></label>
                    <select
                      name="reachOutMethod"
                      value={formData.reachOutMethod}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#11B573] text-sm appearance-none cursor-pointer"
                    >
                      <option>Email</option>
                      <option>Phone Call</option>
                      <option>WhatsApp</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">Any other details?</label>
                    <input
                      type="text"
                      name="additionalDetails"
                      value={formData.additionalDetails}
                      onChange={handleInputChange}
                      placeholder="Anything else we should know?"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#11B573] text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Step 4: Intent */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-7 h-7 bg-[#11B573] text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg shadow-emerald-200">4</div>
                  <h3 className="font-bold text-slate-900">What would you like to do?</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { id: 'Report Incorrect Data', icon: <AlertCircle size={20} />, color: 'bg-emerald-50 text-[#11B573]', border: 'border-emerald-100' },
                    { id: 'Request a Feature', icon: <Rocket size={20} />, color: 'bg-amber-50 text-amber-500', border: 'border-amber-100' },
                    { id: 'General Inquiry', icon: <MessageSquare size={20} />, color: 'bg-blue-50 text-blue-500', border: 'border-blue-100' }
                  ].map((item) => (
                    <motion.button
                      key={item.id}
                      whileHover={{ y: -3 }}
                      onClick={() => setFormData(prev => ({ ...prev, intent: item.id }))}
                      className={`p-5 rounded-2xl border-2 transition-all text-left flex flex-col space-y-4 ${formData.intent === item.id
                        ? 'border-[#11B573] bg-emerald-50/40 ring-4 ring-emerald-500/5 shadow-md shadow-emerald-100'
                        : 'border-slate-100 hover:border-slate-200 bg-white'
                        }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${item.color} ${item.border} border`}>
                        {item.icon}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{item.id}</div>
                        <p className="text-[10px] text-slate-500 mt-1.5 leading-relaxed">
                          {item.id === 'Report Incorrect Data' && 'Report inaccurate or outdated data'}
                          {item.id === 'Request a Feature' && 'Suggest a new feature or improvement'}
                          {item.id === 'General Inquiry' && 'Ask a question or get general help'}
                        </p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-8 border-t border-slate-50 space-y-6">
                <div className="flex items-start space-x-3 group cursor-pointer">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      id="tos"
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-slate-200 bg-slate-50 checked:bg-[#11B573] checked:border-[#11B573] transition-all"
                    />
                    <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-opacity">
                      <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z" /></svg>
                    </div>
                  </div>
                  <label htmlFor="tos" className="text-xs text-slate-500 leading-relaxed cursor-pointer select-none">
                    I agree to the <a href="#" className="text-[#11B573] font-bold hover:underline">Privacy Policy</a> and <a href="#" className="text-[#11B573] font-bold hover:underline">Terms of Service</a>.
                  </label>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full py-4.5 bg-[#11B573] text-white rounded-xl font-bold flex items-center justify-center space-x-3 hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-100"
                >
                  <Rocket size={20} />
                  <span className="text-base">Submit Request</span>
                </motion.button>

                <div className="flex items-center justify-center space-x-2 text-[10px] text-slate-400 font-medium">
                  <ShieldCheck size={14} className="text-[#11B573]" />
                  <span>Your information is safe with us. We respect your privacy.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* System Status */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-3 text-slate-900">
                <div className="w-9 h-9 bg-emerald-50 text-[#11B573] rounded-lg flex items-center justify-center">
                  <Activity size={18} />
                </div>
                <h3 className="font-bold">System Status</h3>
              </div>
              <div className="flex items-center space-x-2 px-2 py-1 bg-emerald-50 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-[#11B573] animate-pulse"></div>
                <span className="text-[9px] font-bold text-[#11B573] uppercase tracking-wider">All Systems Operational</span>
              </div>
            </div>

            <div className="space-y-4">
              {systemStatus.map((item, i) => (
                <div key={i} className="flex justify-between items-center py-1 group cursor-default">
                  <span className="text-sm text-slate-600 flex items-center space-x-3 group-hover:text-slate-900 transition-colors">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    <span>{item.name}</span>
                  </span>
                  <span className="text-[10px] font-bold text-[#11B573]">{item.status}</span>
                </div>
              ))}
            </div>

            <button className="w-full mt-8 flex items-center justify-center space-x-2 text-[11px] font-bold text-[#11B573] hover:text-emerald-600 group transition-all">
              <span>View detailed status</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Quick Help / FAQs */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 text-slate-900 mb-6">
              <div className="w-9 h-9 bg-indigo-50 text-indigo-500 rounded-lg flex items-center justify-center">
                <HelpCircle size={18} />
              </div>
              <h3 className="font-bold">Quick Help</h3>
            </div>

            <div className="space-y-1">
              {faqs.map((faq, i) => (
                <button key={i} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 group text-left transition-all border border-transparent hover:border-slate-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-400 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-all">
                      <HelpCircle size={12} />
                    </div>
                    <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{faq}</span>
                  </div>
                  <ChevronRight size={14} className="text-slate-300 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>

            <button className="w-full mt-4 flex items-center justify-center space-x-2 text-[11px] font-bold text-[#11B573] hover:text-emerald-600 group transition-all">
              <span>View all FAQs</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* For Professionals */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 text-slate-900 mb-6">
              <div className="w-9 h-9 bg-amber-50 text-amber-500 rounded-lg flex items-center justify-center">
                <Briefcase size={18} />
              </div>
              <h3 className="font-bold">For Professionals</h3>
            </div>

            <div className="space-y-4">
              {forProfessionals.map((item, i) => (
                <button key={i} className="w-full flex items-start space-x-4 p-4 rounded-xl border border-slate-50 bg-slate-50/30 hover:bg-white hover:border-amber-200 hover:shadow-sm group text-left transition-all">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm text-amber-500 flex items-center justify-center shrink-0 border border-slate-100 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{item.title}</div>
                    <div className="text-[11px] text-slate-500 mt-1 leading-tight">{item.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Feature Roadmap */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 text-slate-900 mb-2">
              <div className="w-9 h-9 bg-rose-50 text-rose-500 rounded-lg flex items-center justify-center">
                <Rocket size={18} />
              </div>
              <h3 className="font-bold">Feature Roadmap</h3>
            </div>
            <p className="text-[10px] text-slate-400 mb-6 ml-12">Vote for features you want to see next!</p>

            <div className="space-y-5">
              {roadmap.map((item, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-700 group-hover:text-slate-900 transition-colors">{item.name}</span>
                    <div className="w-32 h-1 bg-slate-100 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-rose-400 rounded-full" style={{ width: `${(item.votes / 150) * 100}%` }}></div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <button className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all shadow-sm border border-slate-100 group-hover:scale-110">
                      <ChevronRight size={16} className="-rotate-90" />
                    </button>
                    <span className="text-[10px] font-bold text-slate-900 mt-1">{item.votes}</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-8 flex items-center justify-center space-x-2 text-[11px] font-bold text-[#11B573] hover:text-emerald-600 group transition-all">
              <span>View full roadmap</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Developer Resources */}
      <section className="bg-white border-t border-slate-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-5 mb-12">
            <div className="w-14 h-14 bg-emerald-50 text-[#11B573] rounded-2xl flex items-center justify-center shadow-inner border border-emerald-100">
              <Zap size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Developer Resources</h2>
              <p className="text-slate-500 mt-1 font-medium">Everything you need to integrate and build with NeighborhoodIQ.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {devResources.map((item, i) => (
              <motion.button
                key={i}
                whileHover={{ y: -5, scale: 1.02 }}
                className="flex items-center justify-between p-6 rounded-2xl border border-slate-100 bg-white hover:border-[#11B573] hover:shadow-xl hover:shadow-emerald-500/5 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-50/50 rounded-bl-[100%] translate-x-10 -translate-y-10 group-hover:translate-x-5 group-hover:-translate-y-5 transition-transform duration-500"></div>

                <div className="flex items-center space-x-5 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-emerald-500 group-hover:text-white transition-all flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div className="text-left">
                    <div className="text-[15px] font-bold text-slate-900 group-hover:text-[#11B573] transition-colors">{item.title}</div>
                    <div className="text-[11px] text-slate-500 mt-1 font-medium group-hover:text-slate-600 transition-colors">{item.desc}</div>
                  </div>
                </div>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-[#11B573] group-hover:translate-x-1 transition-all relative z-10" />
              </motion.button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Support;
