import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, User, Route, Navigation, Home, School, Filter, Download, RefreshCw, ChevronDown, Zap, TrendingUp } from 'lucide-react';
import { Table, Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Add, Delete, Edit, ArrowBack } from "@material-ui/icons";

const LocationHistory = () => {
    const headerCellStyle = {
        backgroundColor: "#036672",
        color: "#fff",
    };


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

    const getRoutePathColor = (index) => {
        const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
        return colors[index % colors.length];
    };

    return (
        <>
            <div className="container-fluid">
                <div
                    className="card m-3"
                    style={{ boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)" }}
                >
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card-header">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <h4 className="card-title fw-bold">Location History</h4>
                                    </div>
                                    <div className="col-auto d-flex flex-wrap">
                                        <div className="form-check form-switch mt-2 pt-1">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="flexSwitchCheckDefault"
                                            // checked={toggleActive}
                                            // onChange={() => setToggleActive(!toggleActive)}
                                            />
                                        </div>
                                        <div className="btn btn-add" title="Add New">
                                            <Button
                                                // onClick={handleShow}
                                                // onClick={() => {
                                                //   resetForm();
                                                //   handleShow();
                                                // }}
                                                style={headerCellStyle}
                                            >
                                                <Add />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body pt-3">
                                <div className="row">
                                    <div className="col-lg-3 col-md-3 d-flex justify-content-center justify-content-lg-start justify-content-md-start">
                                        <h6 className="mt-2">Show</h6>&nbsp;&nbsp;
                                        <select
                                            style={{ height: "35px" }}
                                            className="form-select w-auto"
                                            aria-label="Default select example"
                                        // value={selectedItemsPerPage}
                                        // onChange={handleChange}
                                        >
                                            <option value="10">10</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                        </select>
                                        &nbsp;&nbsp;
                                        <h6 className="mt-2">entries</h6>
                                    </div>
                                    <div className="col-lg-6 col-md-6 d-flex justify-content-center justify-content-lg-end"></div>
                                    <div className="col-lg-3 col-md-3 d-flex justify-content-center justify-content-lg-end mt-lg-0 mt-md-0 mt-3">
                                        <input
                                            className="form-control"
                                            placeholder="Search here"
                                        // value={searchData}
                                        // onChange={handleSearch}
                                        />
                                    </div>
                                </div>
                                <br />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-blue-600 rounded-lg">
                                    <Navigation className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-semibold text-gray-900">Location History</h1>
                                    <p className="text-sm text-gray-500">Track student movement and routes</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                    <Download className="h-4 w-4" />
                                    <span>Export</span>
                                </button>
                                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                    <RefreshCw className="h-4 w-4" />
                                    <span>Refresh</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Filter Section */}
                    <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                        <div className="flex items-center space-x-2 mb-4">
                            <Filter className="h-5 w-5 text-gray-500" />
                            <h2 className="text-lg font-semibold text-gray-900">Filter Options</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Student Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <User className="inline h-4 w-4 mr-1" />
                                    Select Student
                                </label>
                                <select
                                    value={selectedStudent}
                                    onChange={handleStudentChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Choose a student...</option>
                                    {students.map(student => (
                                        <option key={student.id} value={student.id}>
                                            {student.name} - {student.class} (Roll: {student.rollNo})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Date Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Calendar className="inline h-4 w-4 mr-1" />
                                    Select Date
                                </label>
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    {selectedStudent && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Map Section */}
                            <div className="lg:col-span-2">
                                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                                    <div className="p-4 border-b bg-gray-50">
                                        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                                            <Route className="h-5 w-5 mr-2 text-blue-600" />
                                            Route Map - {students.find(s => s.id.toString() === selectedStudent)?.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Date: {new Date(selectedDate).toLocaleDateString('en-IN', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>

                                    {/* Mock Map with Route */}
                                    <div className="relative h-96 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
                                        {isLoading ? (
                                            <div className="flex items-center space-x-2">
                                                <RefreshCw className="h-6 w-6 animate-spin text-blue-600" />
                                                <span className="text-gray-600">Loading route...</span>
                                            </div>
                                        ) : (
                                            <div className="relative w-full h-full">
                                                {/* Mock Map Background */}
                                                <div className="absolute inset-0 bg-gray-100 rounded-lg">
                                                    <div className="h-full w-full bg-gradient-to-br from-green-100 via-blue-100 to-gray-100 relative overflow-hidden">
                                                        {/* Road lines */}
                                                        <div className="absolute top-1/4 left-0 w-full h-2 bg-gray-300 transform rotate-12"></div>
                                                        <div className="absolute top-1/2 left-0 w-full h-2 bg-gray-300 transform -rotate-6"></div>
                                                        <div className="absolute top-3/4 left-0 w-full h-2 bg-gray-300 transform rotate-3"></div>

                                                        {/* Route Points */}
                                                        {locationHistory.map((point, index) => (
                                                            <div
                                                                key={point.id}
                                                                className={`absolute w-4 h-4 rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 ${point.type === 'departure' ? 'bg-orange-500' :
                                                                    point.type === 'arrival' ? 'bg-green-500' :
                                                                        'bg-blue-500'
                                                                    }`}
                                                                style={{
                                                                    left: `${20 + (index * 12)}%`,
                                                                    top: `${30 + (index % 2 === 0 ? 0 : 20)}%`
                                                                }}
                                                            >
                                                                {/* Route path line */}
                                                                {index < locationHistory.length - 1 && (
                                                                    <div
                                                                        className="absolute w-20 h-0.5 bg-blue-500 opacity-70"
                                                                        style={{
                                                                            left: '16px',
                                                                            top: '6px',
                                                                            background: getRoutePathColor(index)
                                                                        }}
                                                                    />
                                                                )}
                                                            </div>
                                                        ))}

                                                        {/* Location Labels */}
                                                        <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-medium border shadow-sm">
                                                            <Home className="inline h-3 w-3 mr-1" />
                                                            Home
                                                        </div>
                                                        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-xs font-medium border shadow-sm">
                                                            <School className="inline h-3 w-3 mr-1" />
                                                            School
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Route Summary */}
                                    <div className="p-4 bg-gray-50 border-t">
                                        <div className="grid grid-cols-3 gap-4 text-center">
                                            <div>
                                                <div className="text-2xl font-bold text-blue-600">8.5 km</div>
                                                <div className="text-sm text-gray-500">Total Distance</div>
                                            </div>
                                            <div>
                                                <div className="text-2xl font-bold text-green-600">45 min</div>
                                                <div className="text-sm text-gray-500">Travel Time</div>
                                            </div>
                                            <div>
                                                <div className="text-2xl font-bold text-orange-600">6</div>
                                                <div className="text-sm text-gray-500">Checkpoints</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Timeline Section */}
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-lg shadow-sm border">
                                    <div className="p-4 border-b bg-gray-50">
                                        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                                            <Clock className="h-5 w-5 mr-2 text-blue-600" />
                                            Location Timeline
                                        </h3>
                                    </div>

                                    <div className="p-4 max-h-96 overflow-y-auto">
                                        {isLoading ? (
                                            <div className="flex items-center justify-center py-8">
                                                <RefreshCw className="h-6 w-6 animate-spin text-blue-600" />
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                {locationHistory.map((entry, index) => {
                                                    const IconComponent = entry.icon;
                                                    return (
                                                        <div key={entry.id} className="relative">
                                                            {/* Timeline line */}
                                                            {index < locationHistory.length - 1 && (
                                                                <div className="absolute left-6 top-12 w-0.5 h-12 bg-gray-200" />
                                                            )}

                                                            <div className="flex items-start space-x-3">
                                                                {/* Icon */}
                                                                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${entry.type === 'departure' ? 'bg-orange-100' :
                                                                    entry.type === 'arrival' ? 'bg-green-100' :
                                                                        'bg-blue-100'
                                                                    }`}>
                                                                    <IconComponent className={`h-5 w-5 ${entry.type === 'departure' ? 'text-orange-600' :
                                                                        entry.type === 'arrival' ? 'text-green-600' :
                                                                            'text-blue-600'
                                                                        }`} />
                                                                </div>

                                                                {/* Content */}
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="flex items-center justify-between">
                                                                        <h4 className="text-sm font-medium text-gray-900">{entry.location}</h4>
                                                                        <span className="text-xs text-gray-500">{entry.time}</span>
                                                                    </div>
                                                                    <p className="text-xs text-gray-500 mt-1">{entry.address}</p>
                                                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 ${getStatusColor(entry.status)}`}>
                                                                        {entry.status}
                                                                    </span>
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

                    {/* Empty State */}
                    {!selectedStudent && (
                        <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
                            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <User className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Student</h3>
                            <p className="text-gray-500 max-w-md mx-auto">
                                Choose a student from the dropdown above to view their location history and travel route for the selected date.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>

    );
};

export default LocationHistory;