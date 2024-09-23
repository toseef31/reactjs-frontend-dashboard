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
        books: null,
        ephemera: null,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Construct the API query based on the parameter
        const fetchData = async () => {
            try {
                let url = constants.BASE_URL + "/dashboard";
                if (parameter) {
                    url += `?${parameter.split(',').map(param => `${param}=1`).join('&')}`; // For example: ?users=1&books=1
                }
                const response = await axios.get(url);
                setWidgetData(response.data.data); // Assuming API returns data in `data` object
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
                {/* Users Widget */}
                {widgetData.users && (
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">Users</h2>
                        <p className="text-gray-700 text-2xl font-semibold">
                            Count: {widgetData.users.count}
                        </p>
                    </div>
                )}

                {/* Hardy Reels Widget */}
                {widgetData.hardy_reels && (
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">Hardy Reels</h2>
                        <p className="text-gray-700 text-2xl font-semibold">
                            Count: {widgetData.hardy_reels.count}
                        </p>
                        <p className="text-gray-600">
                            Total Cost Price: ${widgetData.hardy_reels.total_cost_price}
                        </p>
                        <p className="text-gray-600">
                            Total Valuation Price: ${widgetData.hardy_reels.total_valuation_price}
                        </p>
                        <p className="text-gray-600">Next ID: {widgetData.hardy_reels.next_id}</p>
                    </div>
                )}

                {/* Books Widget */}
                {widgetData.books && (
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">Books</h2>
                        <p className="text-gray-700 text-2xl font-semibold">
                            Count: {widgetData.books.count}
                        </p>
                        <p className="text-gray-600">
                            Total Cost Price: ${widgetData.books.total_cost_price}
                        </p>
                        <p className="text-gray-600">
                            Total Valuation Price: ${widgetData.books.total_valuation_price}
                        </p>
                        <p className="text-gray-600">Next ID: {widgetData.books.next_id}</p>
                    </div>
                )}

                {/* Ephemera Widget */}
                {widgetData.ephemera && (
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">Ephemera</h2>
                        <p className="text-gray-700 text-2xl font-semibold">
                            Count: {widgetData.ephemera.count}
                        </p>
                        <p className="text-gray-600">
                            Total Cost Price: ${widgetData.ephemera.total_cost_price}
                        </p>
                        <p className="text-gray-600">
                            Total Valuation Price: ${widgetData.ephemera.total_valuation_price}
                        </p>
                        <p className="text-gray-600">Next ID: {widgetData.ephemera.next_id}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WidgetCard;
