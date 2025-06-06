import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, defaults } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import api from "../../../../API/Api"
import { handleError } from '../../../../notifications/Notification';

defaults.responsive = true;
defaults.plugins.legend.position = 'top';
defaults.plugins.title.display = true;
if(window.innerWidth < 587) {
    defaults.aspectRatio = 15/20;
}
defaults.plugins.title.font = { size: 20 };

const Revenue = () => {
    const [revenueData, setRevenueData] = useState({
        totalAmountByMonth: {}
    });

    const getRevenue = async () => {
        try {
            const response = await api.get('tithe-welfare');
            const { message, monthlyTotals, totalAmountByMonth, } = response?.data;
            if(message){
                setRevenueData({
                    totalAmountByMonth
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
                    labels: Object.keys(revenueData.totalAmountByMonth).map(formatMonthLabel),
                    datasets: [
                        {
                            label: 'Total Revenue',
                            data: Object.values(revenueData.totalAmountByMonth),
                            backgroundColor: (context) => {
                                const chart = context.chart;
                                const {ctx, chartArea} = chart;
                                
                                if (!chartArea) return null;
                                
                                const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                                gradient.addColorStop(0, '#004cff');
                                gradient.addColorStop(1, '#0e07a8');
                                
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
                            text: 'Monthly Revenue Breakdown',
                            font: {
                                size: 18
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.dataset.label}: GH¢${context.raw.toLocaleString()}.00`;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return 'GH¢' + value.toLocaleString();
                                }
                            }
                        }
                    }
                }}
            />                     
        </div>
    )
}

export default Revenue;