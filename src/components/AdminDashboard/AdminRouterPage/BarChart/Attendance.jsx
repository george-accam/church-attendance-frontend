import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, defaults } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import api from "../../../../API/Api"
import { handleError, handleSuccess } from '../../../../notifications/Notification';

defaults.responsive = true;
defaults.plugins.legend.position = 'top';
defaults.plugins.title.display = true;
defaults.plugins.title.font = { size: 20 };

const Attendance = () => {
    const [revenueData, setRevenueData] = useState({
        checkInsByMonth: {}
    });

    const getRevenue = async () => {
        try {
            const response = await api.get('all-check-ins');
            const { message, checkInsByMonth } = response?.data;
            if(message){
                setRevenueData({
                    checkInsByMonth
                });
            }
        } catch (error) {
            if (error.response?.data?.message) {
                handleError(error.response.data.message);
            }
            else if(error.request){
                handleError(`Network error: ${error.request}`);
            }
            else{
                handleError(`Error: ${error.message}`);
            }
        }
    };

    useEffect(() => {
        getRevenue();
    }, []);

    // Format month labels for better readability
    const formatMonthLabel = (monthYear) => {
        const [year, month] = monthYear.split('-');
        const date = new Date(year, month - 1);
        return date.toLocaleString('default', { month: 'short', year: 'numeric' });
    };

    return (
        <div className='revenue-bar-container'>
            <Bar
                data={{
                    labels: Object.keys(revenueData.checkInsByMonth).map(formatMonthLabel),
                    datasets: [
                        {
                            label: 'Total Check ins',
                            data: Object.values(revenueData.checkInsByMonth),
                            backgroundColor: (context) => {
                                const chart = context.chart;
                                const {ctx, chartArea} = chart;
                                
                                if (!chartArea) return null;
                                
                                const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                                gradient.addColorStop(0, '#1aff00');  // Start color (bottom)
                                gradient.addColorStop(1, '#04c00d');  // End color (top)
                                
                                return gradient;
                            },
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1,
                            borderRadius: 4,
                        }
                    ]
                }}
                options={{
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Monthly Check ins Breakdown',
                            font: {
                                size: 18
                            },
                            color: "black",
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.dataset.label}: ${context.raw.toLocaleString()}`;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return  value.toLocaleString();
                                }
                            }
                        }
                    }
                }}
            />                     
        </div>
    )
}

export default Attendance;