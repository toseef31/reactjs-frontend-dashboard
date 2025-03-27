import React, { useEffect, useState } from "react";
import axios from "axios";
import constants from "../../Constants";

interface WidgetCardProps {
    parameter: string; // Assuming a string like 'users,hardy_reels'
}

const WidgetCard = ({ parameter }: WidgetCardProps) => {
    const [widgetData, setWidgetData] = useState({
        users: null,
        hardy_reels: null,
        others_reels: null,
        others_tackle: null,
        use_tackle: null,
        books: null,
        ephemera: null,
        lures: null,
        rods: null,
        penncatalogue: null,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let url = constants.BASE_URL + "/dashboard";
                if (parameter) {
                    url += `?${parameter.split(',').map(param => `${param}=1`).join('&')}`;
                }
                const response = await axios.get(url);
                console.log(response.data.data);
                setWidgetData(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching widget data", error);
                setError("Failed to load data.");
                setLoading(false);
            }
        };

        fetchData();
    }, [parameter]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mx-auto my-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {widgetData.books && (
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">Books</h2>
                        <p className="text-gray-600">
                            Next ID: <span className="text-lg font-bold">{widgetData.books.next_id}</span>
                        </p>
                        <p className="text-gray-700 text-lg font-semibold">
                            Count: {widgetData.books.count || 0}
                        </p>
                        <p className="text-gray-600">
                            Total Cost: ${widgetData.books.total_cost_price?.toLocaleString('en-US', { minimumFractionDigits: 0 }).replace('.', ',') || '0,00'}
                        </p>
                        <p className="text-gray-600">
                            Total Valuation Cost: ${widgetData.books.total_valuation_price?.toLocaleString('en-US', { minimumFractionDigits: 0 }).replace('.', ',') || '0,00'}
                        </p>
                    </div>
                )}

                {widgetData.ephemera && (
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">Ephemera</h2>
                        <p className="text-gray-600">
                            Next ID: <span className="text-lg font-bold">{widgetData.ephemera.next_id}</span>
                        </p>
                        <p className="text-gray-700 text-lg font-semibold">
                            Count: {widgetData.ephemera.count || 0}
                        </p>
                        <p className="text-gray-600">
                            Total Cost: ${widgetData.ephemera.total_cost_price?.toLocaleString('en-US', { minimumFractionDigits: 0 }).replace('.', ',') || '0,00'}
                        </p>
                        <p className="text-gray-600">
                            Total Valuation Cost: ${widgetData.ephemera.total_valuation_price?.toLocaleString('en-US', { minimumFractionDigits: 0 }).replace('.', ',') || '0,00'}
                        </p>
                    </div>
                )}
                {widgetData.hardy_reels && (
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">Hardy Reels</h2>
                        <p className="text-gray-600">
                            Next ID: <span className="text-lg font-bold">{widgetData.hardy_reels.next_id}</span>
                        </p>
                        <p className="text-gray-700 text-lg font-semibold">
                            Count: {widgetData.hardy_reels.count || 0}
                        </p>
                        <p className="text-gray-600">
                            Total Cost: ${widgetData.hardy_reels.total_cost_price?.toLocaleString('en-US', { minimumFractionDigits: 0 }).replace('.', ',') || '0,00'}
                        </p>
                        <p className="text-gray-600">
                            Total Valuation Cost: ${widgetData.hardy_reels.total_valuation_price?.toLocaleString('en-US', { minimumFractionDigits: 0 }).replace('.', ',') || '0,00'}
                        </p>
                    </div>
                )}

                {widgetData.lures && (
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">Lures</h2>
                        <p className="text-gray-600">
                            Next ID: <span className="text-lg font-bold">{widgetData.lures.next_id}</span>
                        </p>
                        <p className="text-gray-700 text-lg font-semibold">
                            Count: {widgetData.lures.count || 0}
                        </p>
                        <p className="text-gray-600">
                            Total Cost: ${widgetData.lures.total_cost_price?.toLocaleString('en-US', { minimumFractionDigits: 0 }).replace('.', ',') || '0,00'}
                        </p>
                        <p className="text-gray-600">
                            Total Valuation Cost: ${widgetData.lures.total_valuation_price?.toLocaleString('en-US', { minimumFractionDigits: 0 }).replace('.', ',') || '0,00'}
                        </p>
                    </div>
                )}

                {widgetData.rods && (
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">Rods</h2>
                        <p className="text-gray-600">
                            Next ID: <span className="text-lg font-bold">{widgetData.rods.next_id}</span>
                        </p>
                        <p className="text-gray-700 text-lg font-semibold">
                            Count: {widgetData.rods.count || 0}
                        </p>
                        <p className="text-gray-600">
                            Total Cost: ${widgetData.rods.total_cost_price?.toLocaleString('en-US', { minimumFractionDigits: 0 }).replace('.', ',') || '0,00'}
                        </p>
                        <p className="text-gray-600">
                            Total Valuation Cost: ${widgetData.rods.total_valuation_price?.toLocaleString('en-US', { minimumFractionDigits: 0 }).replace('.', ',') || '0,00'}
                        </p>
                    </div>
                )}

                
               {widgetData.others_reels && (
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">Other Reels</h2>
                        <p className="text-gray-600">
                            Next ID: <span className="text-lg font-bold">{widgetData.others_reels.next_id}</span>
                        </p>
                        <p className="text-gray-700 text-lg font-semibold">
                            Count: {widgetData.others_reels.count || 0}
                        </p>
                        <p className="text-gray-600">
                            Total Cost: ${widgetData.others_reels.total_cost_price?.toLocaleString('en-US', { minimumFractionDigits: 0 }).replace('.', ',') || '0,00'}
                        </p>
                        <p className="text-gray-600">
                            Total Valuation Cost: ${widgetData.others_reels.total_valuation_price?.toLocaleString('en-US', { minimumFractionDigits: 0 }).replace('.', ',') || '0,00'}
                        </p>
                    </div>
                )}

               {widgetData.others_tackle && (
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">Other Tackles</h2>
                        <p className="text-gray-600">
                            Next ID: <span className="text-lg font-bold">{widgetData.others_tackle.next_id}</span>
                        </p>
                        <p className="text-gray-700 text-lg font-semibold">
                            Count: {widgetData.others_tackle.count || 0}
                        </p>
                        <p className="text-gray-600">
                            Total Cost: ${widgetData.others_tackle.total_cost_price?.toLocaleString('en-US', { minimumFractionDigits: 0 }).replace('.', ',') || '0,00'}
                        </p>
                        <p className="text-gray-600">
                            Total Valuation Cost: ${widgetData.others_tackle.total_valuation_price?.toLocaleString('en-US', { minimumFractionDigits: 0 }).replace('.', ',') || '0,00'}
                        </p>
                    </div>
                )}
                {widgetData.use_tackle && (
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">In Use Tackles</h2>
                        <p className="text-gray-600">
                            Next ID: <span className="text-lg font-bold">{widgetData.use_tackle.next_id}</span>
                        </p>
                        <p className="text-gray-700 text-lg font-semibold">
                            Count: {widgetData.use_tackle.count || 0}
                        </p>
                        <p className="text-gray-600">
                            Total Cost: ${widgetData.use_tackle.total_cost_price?.toLocaleString('en-US', { minimumFractionDigits: 0 }).replace('.', ',') || '0,00'}
                        </p>
                        <p className="text-gray-600">
                            Total Valuation Cost: ${widgetData.use_tackle.total_valuation_price?.toLocaleString('en-US', { minimumFractionDigits: 0 }).replace('.', ',') || '0,00'}
                        </p>
                    </div>
                )}

                {widgetData.penncatalogue && (
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">Penn Catalogues</h2>
                        <p className="text-gray-700 text-lg font-semibold">
                            Count: {widgetData.penncatalogue.count || 0}
                        </p>
                        <p className="text-gray-600">
                            Total Cost: ${widgetData.penncatalogue.total_cost_price?.toLocaleString('en-US', { minimumFractionDigits: 0 }).replace('.', ',') || '0,00'}
                        </p>
                        <p className="text-gray-600">
                            Total Valuation Cost: ${widgetData.penncatalogue.total_valuation_price?.toLocaleString('en-US', { minimumFractionDigits: 0 }).replace('.', ',') || '0,00'}
                        </p>
                    </div>
                )}


                {widgetData.users && (
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">Users</h2>
                        <p className="text-gray-700 text-lg font-semibold">
                            Count: {widgetData.users.count}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WidgetCard;
