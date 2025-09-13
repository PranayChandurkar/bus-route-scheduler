import React, { useContext } from 'react'
import { Pencil, Trash2 } from "lucide-react";
import { BusInfoContext } from '../../context/BusInfoContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ManageBus = () => {

    const { busInfo } = useContext(BusInfoContext)

    const handleDeleteBus = async (busId) => {
        console.log(busId);
        
        const deletBus = await axios.delete(`http://localhost:3000/bus/delete-bus/${busId}`);

        console.log("Delete bus with ID:", deletBus);
    }

    return (
        <div className="bg-white rounded-lg shadow p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Manage Buses</h2>
                <Link to="/admin/buses/add">
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Add New Bus
                </button>
                </Link>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b text-gray-600">
                            <th className="py-3 px-4">Bus Number Plate</th>
                            <th className="py-3 px-4">Assigned Route</th>
                            <th className="py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {busInfo.map((bus, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4">{bus.numberPlate}</td>
                                <td className="py-3 px-4">{bus.startPoint}</td>
                                <td className="py-3 px-4 flex gap-3">
                                    <Link to={`/admin/buses/edit/${bus._id}`}  >
                                        <button className="text-blue-600 hover:text-blue-800">
                                            <Pencil size={18} />
                                        </button>
                                    </Link>
                                        <button className="text-red-600 hover:text-red-800 "
                                            onClick={() => handleDeleteBus(bus._id)}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManageBus