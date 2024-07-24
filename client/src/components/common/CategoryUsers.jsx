import React, { useState } from 'react';
import axios from 'axios';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { motion } from 'framer-motion'; // Import motion from Framer Motion for animations
import { apiStart } from '../../const';

const CategoryUsers = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const docCategory = ["Dental", "Nutritionist", "Physiotherapy", "GeneralPhysician"];

  const fetchUsersByCategory = async (category) => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiStart}/api/v1/admin/getbyCategory/${category}`);
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    await fetchUsersByCategory(category);
  };

  const exportToExcel = () => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    // Prepare data for export
    const exportData = users.map(user => ({
      'Unique ID': user.uniqueId,
      'Full Name': user.fullName, // Added fullName to export data
      ...user.formData,
      'Created At': new Date(user.createdAt).toLocaleString()
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    // Convert buffer to Blob and save the file
    const data = new Blob([excelBuffer], { type: fileType });
    saveAs(data, 'users_data' + fileExtension);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold mb-4 text-white"
        >
          Category Users
        </motion.h1>
        <div className="flex flex-wrap lg:flex-row space-y-2 items-baseline lg:space-y-0 lg:space-x-4 space-x-1 mb-4 justify-start">
          {docCategory.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-4 py-2 rounded-md focus:outline-none 
                    ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-yellow-500 text-white hover:bg-yellow-600 hover:text-white'}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto" id="printable-content">
        {loading && <p className="text-white">Loading...</p>}
        {!loading && users.length === 0 && <p className="text-white">No users found for {selectedCategory}</p>}
        {users.length > 0 && (
          <Table className="w-full divide-y divide-gray-700 bg-gray-900 text-white">
            <Thead>
              <Tr>
                <Th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Unique ID
                </Th>
                <Th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Full Name
                </Th>
                {Object.keys(users[0].formData).map((key) => (
                  <Th key={key} scope="col" className="px-6 py-3 text-left text-xs font-medium  tracking-wider capitalize">
                    {key}
                  </Th>
                ))}
                <Th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Created At
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user, index) => (
                <React.Fragment key={index}>
                  <Tr className="border-t border-dotted border-gray-600 sm:border-none">
                    <Td className="px-6 py-4 whitespace-nowrap">{user.uniqueId}</Td>
                    <Td className="px-6 py-4 whitespace-nowrap">{user.fullName}</Td>
                    {Object.keys(user.formData).map((key) => (
                      <Td key={key} className="px-6 py-4 whitespace-nowrap">{user.formData[key]}</Td>
                    ))}
                    <Td className="px-6 py-4 whitespace-nowrap">{new Date(user.createdAt).toLocaleString()}</Td>
                  </Tr>
                  {index !== users.length - 1 && <tr className="sm:hidden"><td colSpan="100"><div className="bg-yellow-100 h-1 border-dashed border-t border-gray-400"></div></td></tr>}
                </React.Fragment>
              ))}
            </Tbody>
          </Table>
        )}
      </div>

      {users.length > 0 && (
        <div className="mt-4">
          <motion.button
            onClick={exportToExcel}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Export to Excel
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default CategoryUsers;
