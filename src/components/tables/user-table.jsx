"use client";

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';


const UserTable = () => {
    const currentUser = useSession().data?.user;
    console.log(1)
    console.log(currentUser);
const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://103.20.96.14:8888/user/get-info/${currentUser.id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${currentUser.accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Trường</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Thông tin</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {Object.entries(userData).map(([key, value]) => (
            <tr key={key}>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                {key === 'dob' ? 'Ngày sinh' :
                 key === 'name' ? 'Họ tên' :
                 key === 'email' ? 'Email' :
                 key === 'phone' ? 'Số điện thoại' :
                 key === 'address' ? 'Địa chỉ' : key}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
