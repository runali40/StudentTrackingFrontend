import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, User, Route, Navigation, Home, School, Filter, Download, RefreshCw, ChevronDown, Zap, TrendingUp } from 'lucide-react';

const LocationHistory= () => {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedDate, setSelectedDate] = useState('2024-01-15');
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock data for students
  const students = [
    { id: 1, name: 'Arjun Sharma', class: '10-A', rollNo: '001', avatar: '👦' },
    { id: 2, name: 'Priya Patel', class: '9-B', rollNo: '015', avatar: '👧' },
    { id: 3, name: 'Rahul Kumar', class: '10-A', rollNo: '023', avatar: '👦' },
    { id: 4, name: 'Sneha Singh', class: '8-C', rollNo: '045', avatar: '👧' },
    { id: 5, name: 'Karan Mehta', class: '9-A', rollNo: '032', avatar: '👦' }
  ];

  // Mock location history data
  const locationHistory = [
    {
      id: 1,
      time: '07:45 AM',
      location: 'Home',
      address: '123 Gandhi Nagar, Sector 12, Mumbai',
      coordinates: { lat: 19.0760, lng: 72.8777 },
      type: 'departure',
      icon: Home,
      status: 'departed',
      duration: '5 min'
    },
    {
      id: 2,
      time: '08:15 AM',
      location: 'Bus Stop - Gandhi Nagar',
      address: 'Gandhi Nagar Main Road, Mumbai',
      coordinates: { lat: 19.0780, lng: 72.8790 },
      type: 'transit',
      icon: MapPin,
      status: 'waiting',
      duration: '10 min'
    },
    {
      id: 3,
      time: '08:25 AM',
      location: 'School Bus Route',
      address: 'Moving towards Linking Road',
      coordinates: { lat: 19.0820, lng: 72.8850 },
      type: 'transit',
      icon: Route,
      status: 'traveling',
      duration: '20 min'
    },
    {
      id: 4,
      time: '08:45 AM',
      location: 'Bright Future School',
      address: 'Linking Road, Bandra West, Mumbai',
      coordinates: { lat: 19.0900, lng: 72.8900 },
      type: 'arrival',
      icon: School,
      status: 'arrived',
      duration: '7 hrs'
    },
    {
      id: 5,
      time: '03:30 PM',
      location: 'Bright Future School',
      address: 'Linking Road, Bandra West, Mumbai',
      coordinates: { lat: 19.0900, lng: 72.8900 },
      type: 'departure',
      icon: School,
      status: 'departed',
      duration: '15 min'
    },
    {
      id: 6,
      time: '04:15 PM',
      location: 'Home',
      address: '123 Gandhi Nagar, Sector 12, Mumbai',
      coordinates: { lat: 19.0760, lng: 72.8777 },
      type: 'arrival',
      icon: Home,
      status: 'arrived',
      duration: '-'
    }
  ];

  const handleStudentChange = (e) => {
    setSelectedStudent(e.target.value);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'departed': return 'text-amber-700 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200';
      case 'traveling': return 'text-blue-700 bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200';
      case 'waiting': return 'text-yellow-700 bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200';
      case 'arrived': return 'text-green-700 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200';
      default: return 'text-gray-700 bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced Header */}
      <div className="bg-white shadow-lg border-b border-gray-100 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
                  <Navigation className="h-7 w-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Location History
                </h1>
                <p className="text-sm text-gray-500 font-medium">Advanced GPS Student Tracking System</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <Download className="h-4 w-4" />
                <span className="font-medium">Export Data</span>
              </button>
              <button className="flex items-center space-x-2 px-6 py-3 border border-gray-200 bg-white rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-md hover:shadow-lg">
                <RefreshCw className="h-4 w-4 text-gray-600" />
                <span className="font-medium text-gray-700">Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Filter Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8 backdrop-blur-sm">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
              <Filter className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Filter & Search</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Enhanced Student Selection */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <User className="inline h-4 w-4 mr-2 text-indigo-500" />
                Select Student
              </label>
              <div className="relative">
                <select 
                  value={selectedStudent} 
                  onChange={handleStudentChange}
                  className="w-full px-4 py-4 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm text-gray-900 font-medium appearance-none cursor-pointer transition-all duration-200"
                >
                  <option value="">Choose a student...</option>
                  {students.map(student => (
                    <option key={student.id} value={student.id}>
                      {student.avatar} {student.name} - {student.class} (Roll: {student.rollNo})
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Enhanced Date Selection */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <Calendar className="inline h-4 w-4 mr-2 text-indigo-500" />
                Select Date
              </label>
              <input 
                type="date" 
                value={selectedDate}
                onChange={handleDateChange}
                className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm text-gray-900 font-medium transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Enhanced Main Content */}
        {selectedStudent && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Enhanced Map Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-6 border-b bg-gradient-to-r from-gray-50 to-blue-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 flex items-center">
                        <Route className="h-6 w-6 mr-3 text-blue-600" />
                        Live Route Tracking
                      </h3>
                      <p className="text-sm text-gray-600 mt-1 flex items-center">
                        <span className="text-2xl mr-2">{students.find(s => s.id.toString() === selectedStudent)?.avatar}</span>
                        {students.find(s => s.id.toString() === selectedStudent)?.name} • {new Date(selectedDate).toLocaleDateString('en-IN', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-medium text-green-600">Live</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Mock Map */}
                <div className="relative h-[500px] bg-gradient-to-br from-blue-50 via-green-50 to-purple-50">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-3" />
                        <span className="text-gray-600 font-medium">Loading route data...</span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full h-full">
                      {/* Enhanced Map Background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-blue-100 to-purple-100 rounded-b-2xl overflow-hidden">
                        {/* Animated Road Network */}
                        <div className="absolute inset-0">
                          <svg className="w-full h-full" viewBox="0 0 800 500">
                            {/* Road paths */}
                            <path d="M50 150 Q200 100 400 150 T750 200" stroke="#e2e8f0" strokeWidth="6" fill="none" className="drop-shadow-sm" />
                            <path d="M50 250 Q300 200 500 250 T750 300" stroke="#e2e8f0" strokeWidth="6" fill="none" className="drop-shadow-sm" />
                            <path d="M50 350 Q250 300 450 350 T750 400" stroke="#e2e8f0" strokeWidth="6" fill="none" className="drop-shadow-sm" />
                            
                            {/* Route path */}
                            <path d="M100 180 Q250 150 400 180 Q550 210 700 240" stroke="#3b82f6" strokeWidth="4" fill="none" className="animate-pulse" strokeDasharray="10,5" />
                          </svg>
                        </div>
                        
                        {/* Enhanced Route Points */}
                        {locationHistory.map((point, index) => (
                          <div key={point.id} className="absolute transform -translate-x-1/2 -translate-y-1/2 group">
                            <div
                              className={`relative w-6 h-6 rounded-full border-3 border-white shadow-lg transition-all duration-300 hover:scale-125 cursor-pointer ${
                                point.type === 'departure' ? 'bg-gradient-to-r from-orange-500 to-red-500' :
                                point.type === 'arrival' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                                'bg-gradient-to-r from-blue-500 to-indigo-500'
                              }`}
                              style={{
                                left: `${15 + (index * 14)}%`,
                                top: `${35 + (index % 2 === 0 ? 0 : 15)}%`
                              }}
                            >
                              {/* Pulse animation */}
                              <div className={`absolute inset-0 rounded-full animate-ping ${
                                point.type === 'departure' ? 'bg-orange-400' :
                                point.type === 'arrival' ? 'bg-green-400' :
                                'bg-blue-400'
                              }`} />
                              
                              {/* Tooltip */}
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <div className="bg-gray-900 text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap">
                                  {point.location} - {point.time}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {/* Enhanced Location Labels */}
                        <div className="absolute top-6 left-6 bg-white px-4 py-2 rounded-full text-sm font-semibold border shadow-lg backdrop-blur-sm">
                          <Home className="inline h-4 w-4 mr-2 text-orange-500" />
                          Home Base
                        </div>
                        <div className="absolute top-6 right-6 bg-white px-4 py-2 rounded-full text-sm font-semibold border shadow-lg backdrop-blur-sm">
                          <School className="inline h-4 w-4 mr-2 text-green-500" />
                          School Zone
                        </div>
                        
                        {/* Live indicator */}
                        <div className="absolute bottom-6 left-6 flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-lg border">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium text-green-600">Live Tracking Active</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Enhanced Route Summary */}
                <div className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 border-t">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="text-center group hover:bg-white hover:shadow-md rounded-lg p-4 transition-all duration-200">
                      <div className="text-3xl font-bold text-blue-600 mb-1">8.5 km</div>
                      <div className="text-sm text-gray-600 font-medium">Total Distance</div>
                      <TrendingUp className="h-4 w-4 text-blue-500 mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="text-center group hover:bg-white hover:shadow-md rounded-lg p-4 transition-all duration-200">
                      <div className="text-3xl font-bold text-green-600 mb-1">45 min</div>
                      <div className="text-sm text-gray-600 font-medium">Travel Time</div>
                      <Clock className="h-4 w-4 text-green-500 mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="text-center group hover:bg-white hover:shadow-md rounded-lg p-4 transition-all duration-200">
                      <div className="text-3xl font-bold text-purple-600 mb-1">6</div>
                      <div className="text-sm text-gray-600 font-medium">Checkpoints</div>
                      <MapPin className="h-4 w-4 text-purple-500 mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Timeline Section */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-6 border-b bg-gradient-to-r from-gray-50 to-purple-50">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center">
                    <Clock className="h-6 w-6 mr-3 text-purple-600" />
                    Live Timeline
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">Real-time location updates</p>
                </div>
                
                <div className="p-6 max-h-[600px] overflow-y-auto custom-scrollbar">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="text-center">
                        <RefreshCw className="h-8 w-8 animate-spin text-purple-600 mx-auto mb-3" />
                        <span className="text-gray-600 font-medium">Loading timeline...</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {locationHistory.map((entry, index) => {
                        const IconComponent = entry.icon;
                        return (
                          <div key={entry.id} className="relative group">
                            {/* Enhanced Timeline line */}
                            {index < locationHistory.length - 1 && (
                              <div className="absolute left-8 top-16 w-0.5 h-16 bg-gradient-to-b from-gray-300 to-gray-200" />
                            )}
                            
                            <div className="flex items-start space-x-4 hover:bg-gray-50 rounded-xl p-3 transition-all duration-200">
                              {/* Enhanced Icon */}
                              <div className={`flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center shadow-lg transform transition-all duration-200 group-hover:scale-105 ${
                                entry.type === 'departure' ? 'bg-gradient-to-r from-orange-500 to-red-500' :
                                entry.type === 'arrival' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                                'bg-gradient-to-r from-blue-500 to-indigo-500'
                              }`}>
                                <IconComponent className="h-6 w-6 text-white" />
                              </div>
                              
                              {/* Enhanced Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="text-sm font-bold text-gray-900">{entry.location}</h4>
                                  <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                    {entry.time}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-600 mb-3 leading-relaxed">{entry.address}</p>
                                <div className="flex items-center justify-between">
                                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(entry.status)}`}>
                                    <div className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 animate-pulse"></div>
                                    {entry.status}
                                  </span>
                                  <span className="text-xs text-gray-500 font-medium">{entry.duration}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Empty State */}
        {!selectedStudent && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-16 text-center">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-6 shadow-lg">
              <User className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Select a Student to Begin</h3>
            <p className="text-gray-600 max-w-md mx-auto text-lg leading-relaxed">
              Choose a student from the dropdown above to view their real-time location history and detailed travel route for the selected date.
            </p>
            <div className="mt-8">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <Zap className="h-4 w-4 text-blue-500" />
                <span>Live GPS tracking powered by advanced technology</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #7c3aed);
        }
      `}</style>
    </div>
  );
};

export default LocationHistory;