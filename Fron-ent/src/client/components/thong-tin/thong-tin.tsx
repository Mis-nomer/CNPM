import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DonHang from './DonHang';

const ThongTinAccount = () => {
  const [auth, setAuth] = useState<any>('');
  const [selectedTab, setSelectedTab] = useState<string>('cap-nhat-thong-tin');
  const user = JSON.parse(localStorage.getItem('userInfo') as string);

  useEffect(() => {
    if (user) {
      setAuth(user);
    } else {
      setAuth('');
    }
    console.log(user);
  }, [JSON.stringify(user)]);

  return (
    <div className="bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg">
        <div className="border-b">
          <div className="flex justify-between items-center px-6 py-4">
            <Link to="/" className="text-gray-600 hover:text-red-600 transition-colors">
              Trang chủ
            </Link>
            <div className="flex space-x-4">
              <div
                className={`cursor-pointer px-4 py-2 rounded-t-lg ${selectedTab === 'cap-nhat-thong-tin'
                  ? 'bg-gray-200 text-red-600'
                  : 'text-gray-600 hover:bg-gray-200 transition-colors'
                  }`}
                onClick={() => setSelectedTab('cap-nhat-thong-tin')}
              >
                Cập nhật thông tin
              </div>
              <div
                className={`cursor-pointer px-4 py-2 rounded-t-lg ${selectedTab === 'don-hang-da-mua'
                  ? 'bg-gray-200 text-red-600'
                  : 'text-gray-600 hover:bg-gray-200 transition-colors'
                  }`}
                onClick={() => setSelectedTab('don-hang-da-mua')}
              >
                Đơn hàng đã mua
              </div>
              {auth && auth?.roleId === 2 && (
                <Link
                  to="/admin"
                  className="cursor-pointer px-4 py-2 rounded-t-lg text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  Trang admin
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="p-6">
          {selectedTab === 'cap-nhat-thong-tin' && (
            <div>
              <h1 className="text-2xl font-bold mb-4">Hiện tại cập nhật người dùng đang dành riêng đối với quyền admin</h1>
            </div>
          )}
          {selectedTab === 'don-hang-da-mua' && (
            <div>
              <DonHang />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThongTinAccount;
