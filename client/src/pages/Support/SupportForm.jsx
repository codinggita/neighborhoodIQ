import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MessageCircle,
  AlertTriangle,
  Calendar,
  Upload,
  User,
  Mail,
  Phone,
  AlertCircle,
  Lightbulb,
  HelpCircle,
  Send,
  Lock
} from 'lucide-react';

const SupportForm = () => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const InputLabel = ({ label, required, optionalText }) => (
    <label className="block text-[11px] font-bold text-slate-900 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
      {optionalText && <span className="text-slate-400 font-medium ml-1">({optionalText})</span>}
    </label>
  );

  return (
    <div className="lg:col-span-8">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        
        {/* Header */}
        <div className="p-8 border-b border-slate-100 flex items-start space-x-4">
          <div className="w-12 h-12 bg-[#11B573] rounded-[14px] flex items-center justify-center text-white shrink-0 mt-1 shadow-sm">
            <MessageCircle size={24} />
          </div>
          <div>
            <h2 className="text-[22px] font-bold text-slate-900 leading-tight">Submit a Request</h2>
            <p className="text-[13px] text-slate-500 mt-1">Please provide details so we can assist you better.</p>
          </div>
        </div>

        <div className="p-8 space-y-10">
          
          {/* Step 1: Tell us about your request */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-6 h-6 bg-[#11B573] text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
              <h3 className="text-[15px] font-bold text-slate-900">Tell us about your request</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <InputLabel label="Request Type" required />
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-red-400 pointer-events-none">
                    <AlertTriangle size={14} />
                  </div>
                  <select
                    name="requestType"
                    value={formData.requestType}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-8 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#11B573] text-[13px] text-slate-700 appearance-none shadow-sm"
                  >
                    <option>Report Incorrect Data</option>
                    <option>Feature Request</option>
                    <option>General Inquiry</option>
                  </select>
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L5 5L9 1" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div>
                <InputLabel label="Priority" required />
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none flex items-center">
                    <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                  </div>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full pl-8 pr-8 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#11B573] text-[13px] text-slate-700 appearance-none shadow-sm"
                  >
                    <option>Medium</option>
                    <option>High</option>
                    <option>Urgent</option>
                  </select>
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L5 5L9 1" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <InputLabel label="Short Summary" required />
              <input
                type="text"
                name="shortSummary"
                value={formData.shortSummary}
                onChange={handleInputChange}
                placeholder="Briefly describe your issue or request"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#11B573] text-[13px] placeholder:text-slate-400 shadow-sm"
              />
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Step 2: Data-specific details */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-6 h-6 bg-[#11B573] text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
              <h3 className="text-[15px] font-bold text-slate-900">Data-specific details <span className="text-[13px] font-medium text-slate-500 ml-1">(If applicable)</span></h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <InputLabel label="Metric / Category" required />
                <div className="relative">
                  <select
                    name="metric"
                    value={formData.metric}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 pr-8 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#11B573] text-[13px] text-slate-500 appearance-none shadow-sm"
                  >
                    <option value="">Select metric</option>
                    <option>Safety Score</option>
                    <option>Livability</option>
                  </select>
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L5 5L9 1" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div>
                <InputLabel label="Location / Neighborhood" required />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., Koramangala, Bangalore"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#11B573] text-[13px] placeholder:text-slate-400 shadow-sm"
                />
              </div>
              
              <div>
                <InputLabel label="City" required />
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="e.g., Bangalore"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#11B573] text-[13px] placeholder:text-slate-400 shadow-sm"
                />
              </div>
            </div>

            <div>
              <InputLabel label="What seems to be the issue?" required />
              <textarea
                rows={4}
                name="issueDescription"
                value={formData.issueDescription}
                onChange={handleInputChange}
                placeholder="Please describe the problem in detail..."
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#11B573] text-[13px] placeholder:text-slate-400 resize-none shadow-sm"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <InputLabel label="When did you notice this issue?" />
                <div className="relative">
                  <input
                    type="text"
                    name="dateObserved"
                    value={formData.dateObserved}
                    onChange={handleInputChange}
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => { if(!e.target.value) e.target.type = "text" }}
                    placeholder="Select date"
                    className="w-full px-3.5 py-2.5 pr-8 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#11B573] text-[13px] text-slate-700 shadow-sm appearance-none"
                  />
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <Calendar size={16} />
                  </div>
                </div>
              </div>
              
              <div>
                <InputLabel label="Data Source" optionalText="If known" />
                <div className="relative">
                  <select
                    name="dataSource"
                    value={formData.dataSource}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 pr-8 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#11B573] text-[13px] text-slate-500 appearance-none shadow-sm"
                  >
                    <option value="">Select source</option>
                    <option>Open Government Data</option>
                    <option>Google Maps</option>
                  </select>
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L5 5L9 1" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Upload Evidence */}
            <div className="border border-dashed border-[#11B573]/50 rounded-xl bg-emerald-50/30 p-5 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-[#11B573] shrink-0">
                  <Upload size={18} />
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-slate-900">Upload Evidence <span className="font-normal text-slate-500">(Optional)</span></h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Upload photos, documents, or reports that support your feedback.</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Supports JPG, PNG, PDF (Max 10MB)</p>
                </div>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-[13px] font-bold text-[#11B573] shadow-sm hover:bg-slate-50 transition-colors shrink-0">
                <Upload size={14} />
                <span>Upload Files</span>
              </button>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Step 3: Contact Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-6 h-6 bg-[#11B573] text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
              <h3 className="text-[15px] font-bold text-slate-900">Additional information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <InputLabel label="Your Name" required />
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full px-3.5 py-2.5 pr-8 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#11B573] text-[13px] placeholder:text-slate-400 shadow-sm"
                  />
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <User size={16} />
                  </div>
                </div>
              </div>
              
              <div>
                <InputLabel label="Email Address" required />
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className="w-full px-3.5 py-2.5 pr-8 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#11B573] text-[13px] placeholder:text-slate-400 shadow-sm"
                  />
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <Mail size={16} />
                  </div>
                </div>
              </div>
              
              <div>
                <InputLabel label="Phone Number" optionalText="Optional" />
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className="w-full px-3.5 py-2.5 pr-8 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#11B573] text-[13px] placeholder:text-slate-400 shadow-sm"
                  />
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <Phone size={16} />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <InputLabel label="How can we reach you?" required />
                <div className="relative">
                  <select
                    name="reachOutMethod"
                    value={formData.reachOutMethod}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 pr-8 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#11B573] text-[13px] text-slate-700 appearance-none shadow-sm"
                  >
                    <option>Email</option>
                    <option>Phone</option>
                  </select>
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L5 5L9 1" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div>
                <InputLabel label="Any other details?" />
                <input
                  type="text"
                  name="additionalDetails"
                  value={formData.additionalDetails}
                  onChange={handleInputChange}
                  placeholder="Anything else we should know?"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#11B573] text-[13px] placeholder:text-slate-400 shadow-sm"
                />
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Step 4: Intent */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-6 h-6 bg-[#11B573] text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
              <h3 className="text-[15px] font-bold text-slate-900">What would you like to do?</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { 
                  id: 'Report Incorrect Data', 
                  title: 'Report Incorrect Data', 
                  desc: 'Report inaccurate or outdated data', 
                  icon: <AlertCircle size={20} />, 
                  iconBg: 'bg-emerald-50 text-[#11B573]'
                },
                { 
                  id: 'Suggest a Feature', 
                  title: 'Suggest a Feature', 
                  desc: 'Suggest a new feature or improvement', 
                  icon: <Lightbulb size={20} />, 
                  iconBg: 'bg-orange-50 text-orange-500'
                },
                { 
                  id: 'General Inquiry', 
                  title: 'General Inquiry', 
                  desc: 'Ask a question or get general help', 
                  icon: <HelpCircle size={20} />, 
                  iconBg: 'bg-blue-50 text-blue-500'
                }
              ].map((item) => {
                const isSelected = formData.intent === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setFormData(prev => ({ ...prev, intent: item.id }))}
                    className={`flex items-start space-x-3 p-4 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-[#11B573] bg-emerald-50/20 ring-1 ring-[#11B573]'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${item.iconBg}`}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-slate-900">{item.title}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">{item.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="space-y-5 pt-4">
            <div className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                id="tos"
                className="w-4 h-4 rounded border-slate-300 text-[#11B573] focus:ring-[#11B573] cursor-pointer"
                defaultChecked
              />
              <label htmlFor="tos" className="text-[13px] text-slate-600 cursor-pointer select-none">
                I agree to the <a href="#" className="text-[#11B573] font-bold hover:underline">Privacy Policy</a> and <a href="#" className="text-[#11B573] font-bold hover:underline">Terms of Service</a>.
              </label>
            </div>

            <button className="w-full py-3 bg-[#0f9761] hover:bg-[#0d8555] text-white rounded-lg font-bold flex items-center justify-center space-x-2 transition-colors shadow-sm">
              <Send size={16} />
              <span className="text-[15px]">Submit Request</span>
            </button>

            <div className="flex items-center justify-center space-x-1.5 text-[11px] text-slate-500">
              <Lock size={12} />
              <span>Your information is safe with us. We respect your privacy.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportForm;
