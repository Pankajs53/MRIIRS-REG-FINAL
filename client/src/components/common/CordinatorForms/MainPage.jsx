import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { apiStart } from "../../../const";

const MainPage = () => {
  const [activeTab, setActiveTab] = useState('search');
  const [searchId, setSearchId] = useState('');
  const [users, setUsers] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      console.log("searchId is", searchId);

      const response = await axios.post(`${apiStart}/api/v1/form/findUser`, {
        id: searchId,
      });

      console.log("Search response:", response.data);
      setSearchResults(response.data.data);
    } catch (error) {
      console.error('Error fetching search results:', error.response ? error.response.data : error.message);
      toast.error('Error fetching search results');
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(`${apiStart}/api/v1/form/getAllUsers`);
      setUsers(response.data.data);
    } catch (error) {
      toast.error('Error fetching users');
    }
  };

  const handleEdit = (formCategory, uniqueId) => {
    const lastDigit = uniqueId.split('/').pop(); // Extract the last digit of the uniqueId
    navigate(`/edit/${formCategory}/${lastDigit}`);
  };

  const renderCategory = (category) => {
    const categories = ["Dental", "Nutritionist", "Physiotherapy", "GeneralPhysician"];
    return categories.map((cat) => (
      <span key={cat} className={`inline-block px-2 py-1 text-sm font-medium rounded-full ${category === cat ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'}`}>
        {cat}
      </span>
    ));
  };

  return (
    <div className="container mx-auto p-4 bg-richblack-900 text-white">
      <div className="tabs">
        <div className="flex border-b border-richblack-600">
          <button
            className={`py-2 px-4 ${activeTab === 'search' ? 'border-b-2 border-blue-500' : 'text-richblack-100'}`}
            onClick={() => {
              setActiveTab('search');
              setSearchResults(null);
            }}
          >
            Search User
          </button>
          <button
            className={`py-2 px-4 ${activeTab === 'allUsers' ? 'border-b-2 border-blue-500' : 'text-richblack-100'}`}
            onClick={() => {
              setActiveTab('allUsers');
              fetchAllUsers();
            }}
          >
            All Users
          </button>
        </div>

        {activeTab === 'search' && (
          <div className="mt-4">
            <div className="flex items-center mb-4">
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Enter email or unique ID (e.g., example@example.com or MRIIRS/H/001)"
                className="p-2 border border-richblack-600 rounded bg-richblack-800 text-white placeholder-gray-400 flex-1"
              />
              <button
                onClick={handleSearch}
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Search
              </button>
            </div>

            {searchResults && (
              <div className="mt-4 p-4 border border-richblack-600 rounded bg-richblack-800">
                <h2 className="text-lg font-bold mb-4">Search Results</h2>
                <div className="space-y-2 mb-4">
                  <p><strong>Name:</strong> {searchResults.fullName}</p>
                  <p><strong>Email:</strong> {searchResults.email}</p>
                  <p><strong>Unique ID:</strong> {searchResults.uniqueId}</p>
                  <p><strong>Category:</strong> {renderCategory(searchResults.formCategory)}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleEdit('Dental', searchResults.uniqueId)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    Edit Dental
                  </button>
                  <button
                    onClick={() => handleEdit('Nutritionist', searchResults.uniqueId)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    Edit Nutritionist
                  </button>
                  <button
                    onClick={() => handleEdit('Physiotherapy', searchResults.uniqueId)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    Edit Physiotherapy
                  </button>
                  <button
                    onClick={() => handleEdit('GeneralPhysician', searchResults.uniqueId)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    Edit GeneralPhysician
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'allUsers' && (
          <div className="mt-4">
            <h2 className="text-lg font-bold mb-4">All Users</h2>
            <Table className="w-full border-collapse bg-richblack-800">
              <Thead>
                <Tr>
                  <Th className="p-2 border-b border-richblack-600">Name</Th>
                  <Th className="p-2 border-b border-richblack-600">Unique ID</Th>
                  <Th className="p-2 border-b border-richblack-600">Email</Th>
                  <Th className="p-2 border-b border-richblack-600">Dental</Th>
                  <Th className="p-2 border-b border-richblack-600">Nutritionist</Th>
                  <Th className="p-2 border-b border-richblack-600">Physiotherapy</Th>
                  <Th className="p-2 border-b border-richblack-600">GeneralPhysician</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users.map((user) => (
                  <Tr key={user._id}>
                    <Td className="p-2 border-b border-richblack-600">{user.fullName}</Td>
                    <Td className="p-2 border-b border-richblack-600">{user.uniqueId}</Td>
                    <Td className="p-2 border-b border-richblack-600">{user.email}</Td>
                    <Td className="p-2 border-b border-richblack-600">
                      <button
                        onClick={() => handleEdit('Dental', user.uniqueId)}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                      >
                        Edit
                      </button>
                    </Td>
                    <Td className="p-2 border-b border-richblack-600">
                      <button
                        onClick={() => handleEdit('Nutritionist', user.uniqueId)}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                      >
                        Edit
                      </button>
                    </Td>
                    <Td className="p-2 border-b border-richblack-600">
                      <button
                        onClick={() => handleEdit('Physiotherapy', user.uniqueId)}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                      >
                        Edit
                      </button>
                    </Td>
                    <Td className="p-2 border-b border-richblack-600">
                      <button
                        onClick={() => handleEdit('GeneralPhysician', user.uniqueId)}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                      >
                        Edit
                      </button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
