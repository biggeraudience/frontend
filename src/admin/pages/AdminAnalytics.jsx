// src/admin/pages/AdminAnalytics.jsx
import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    LineChart, Line
} from 'recharts';

const AdminAnalytics = () => {
    // Dummy data for auction status
    const auctionStatusData = [
        { name: 'Active', count: 12 },
        { name: 'Upcoming', count: 8 },
        { name: 'Ended', count: 35 },
    ];

    // Dummy data for inquiries over time (monthly)
    const inquiriesTrendData = [
        { month: 'Jan', new: 10, responded: 8 },
        { month: 'Feb', new: 15, responded: 12 },
        { month: 'Mar', new: 18, responded: 15 },
        { month: 'Apr', new: 20, responded: 18 },
        { month: 'May', new: 25, responded: 20 },
        { month: 'Jun', new: 30, responded: 25 },
    ];

    // Dummy data for vehicle types
    const vehicleTypeData = [
        { name: 'Sedan', count: 40 },
        { name: 'SUV', count: 30 },
        { name: 'Sports', count: 15 },
        { name: 'Truck', count: 10 },
        { name: 'Motorcycle', count: 5 },
    ];


    return (
        <div className="admin-page admin-analytics-page">
            <h2 className="orbitron-font">Analytics & Reports</h2>
            <p>Gain insights into platform performance and user engagement.</p>

            <div className="analytics-grid">
                <div className="chart-card">
                    <h3 className="urbanist-font">Auction Status Overview</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            data={auctionStatusData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                            <XAxis dataKey="name" tick={{ fill: '#666' }} />
                            <YAxis tick={{ fill: '#666' }} />
                            <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ backgroundColor: '#333', border: 'none', color: '#fff' }} />
                            <Legend wrapperStyle={{ fontFamily: 'Urbanist', fontSize: '0.9rem', color: '#333' }} />
                            <Bar dataKey="count" fill="#E10600" name="Number of Auctions" barSize={30} radius={[5, 5, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-card">
                    <h3 className="urbanist-font">Monthly Inquiries Trend</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart
                            data={inquiriesTrendData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                            <XAxis dataKey="month" tick={{ fill: '#666' }} />
                            <YAxis tick={{ fill: '#666' }} />
                            <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ backgroundColor: '#333', border: 'none', color: '#fff' }} />
                            <Legend wrapperStyle={{ fontFamily: 'Urbanist', fontSize: '0.9rem', color: '#333' }} />
                            <Line type="monotone" dataKey="new" stroke="#E10600" activeDot={{ r: 8 }} name="New Inquiries" strokeWidth={2} />
                            <Line type="monotone" dataKey="responded" stroke="#333333" name="Responded Inquiries" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-card">
                    <h3 className="urbanist-font">Vehicle Types Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            layout="vertical"
                            data={vehicleTypeData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                            <XAxis type="number" tick={{ fill: '#666' }} />
                            <YAxis type="category" dataKey="name" tick={{ fill: '#666' }} width={100} />
                            <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ backgroundColor: '#333', border: 'none', color: '#fff' }} />
                            <Legend wrapperStyle={{ fontFamily: 'Urbanist', fontSize: '0.9rem', color: '#333' }} />
                            <Bar dataKey="count" fill="#333333" name="Number of Vehicles" barSize={25} radius={[0, 5, 5, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminAnalytics;
