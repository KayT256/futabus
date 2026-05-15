import { useState } from "react";
import { useNavigate } from "react-router-dom";

const mockStaffData = [
  {
    id: "TX001",
    name: "Nguyễn Văn Minh",
    photo: "https://i.pravatar.cc/150?img=68",
    crewScore: 4.9,
    totalTrips: 2847,
    totalRatings: 2156,
    employeeCode: "FUTA-TX-00123",
    status: "excellent",
    scoreTrend: [4.7, 4.75, 4.8, 4.82, 4.85, 4.88, 4.9],
  },
  {
    id: "TX002",
    name: "Trần Thị Lan",
    photo: "https://i.pravatar.cc/150?img=47",
    crewScore: 4.8,
    totalTrips: 2156,
    totalRatings: 1834,
    employeeCode: "FUTA-TX-00234",
    status: "excellent",
    scoreTrend: [4.6, 4.65, 4.7, 4.72, 4.75, 4.78, 4.8],
  },
  {
    id: "TX003",
    name: "Lê Văn Hùng",
    photo: "https://i.pravatar.cc/150?img=52",
    crewScore: 4.7,
    totalTrips: 1923,
    totalRatings: 1567,
    employeeCode: "FUTA-TX-00345",
    status: "good",
    scoreTrend: [4.5, 4.55, 4.6, 4.62, 4.65, 4.68, 4.7],
  },
  {
    id: "TX004",
    name: "Phạm Thị Mai",
    photo: "https://i.pravatar.cc/150?img=44",
    crewScore: 4.6,
    totalTrips: 1734,
    totalRatings: 1423,
    employeeCode: "FUTA-TX-00456",
    status: "good",
    scoreTrend: [4.4, 4.45, 4.5, 4.52, 4.55, 4.58, 4.6],
  },
  {
    id: "TX005",
    name: "Hoàng Văn Nam",
    photo: "https://i.pravatar.cc/150?img=59",
    crewScore: 4.5,
    totalTrips: 1567,
    totalRatings: 1234,
    employeeCode: "FUTA-TX-00567",
    status: "average",
    scoreTrend: [4.3, 4.35, 4.4, 4.42, 4.45, 4.48, 4.5],
  },
  {
    id: "TX006",
    name: "Đỗ Thị Hương",
    photo: "https://i.pravatar.cc/150?img=32",
    crewScore: 4.4,
    totalTrips: 1345,
    totalRatings: 1089,
    employeeCode: "FUTA-TX-00678",
    status: "average",
    scoreTrend: [4.2, 4.25, 4.3, 4.32, 4.35, 4.38, 4.4],
  },
];

const monthlyTrendData = [
  { month: "T1", avgScore: 4.5, totalRatings: 12456 },
  { month: "T2", avgScore: 4.55, totalRatings: 13234 },
  { month: "T3", avgScore: 4.6, totalRatings: 14567 },
  { month: "T4", avgScore: 4.62, totalRatings: 15123 },
  { month: "T5", avgScore: 4.65, totalRatings: 15890 },
  { month: "T6", avgScore: 4.68, totalRatings: 16234 },
];

export const CrewScoreDashboard = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState<"week" | "month" | "quarter">("month");

  const excellentStaff = mockStaffData.filter((s) => s.status === "excellent");
  const needsAttention = mockStaffData.filter((s) => s.crewScore < 4.5);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-green-100 text-green-700 border-green-200";
      case "good":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "average":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "excellent":
        return "Xuất sắc";
      case "good":
        return "Tốt";
      case "average":
        return "Trung bình";
      default:
        return "Khác";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Clean, Modern Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Quay lại
            </button>
            <div className="h-6 w-px bg-slate-200 hidden md:block"></div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">Dashboard Chất Lượng Crew Score</h1>
              <p className="text-xs text-slate-500 hidden md:block">Quản lý và theo dõi chất lượng nhân viên</p>
            </div>
          </div>
          <div className="flex items-center">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 outline-none transition-all"
            >
              <option value="week">Tuần này</option>
              <option value="month">Tháng này</option>
              <option value="quarter">Quý này</option>
            </select>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Overview Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Stat Card 1 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-500 text-sm font-medium">Điểm trung bình</span>
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">4.65</span>
              <span className="text-xs font-semibold text-green-700 bg-green-100 px-2.5 py-0.5 rounded-full">+0.03</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">so với tháng trước</p>
          </div>

          {/* Stat Card 2 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-500 text-sm font-medium">Tổng đánh giá</span>
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">
                {monthlyTrendData[monthlyTrendData.length - 1].totalRatings.toLocaleString()}
              </span>
              <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full">
                +{((monthlyTrendData[monthlyTrendData.length - 1].totalRatings - monthlyTrendData[monthlyTrendData.length - 2].totalRatings) / monthlyTrendData[monthlyTrendData.length - 2].totalRatings * 100).toFixed(1)}%
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2">so với tháng trước</p>
          </div>

          {/* Stat Card 3 - Improved Trophy Icon */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-500 text-sm font-medium">Nhân viên xuất sắc</span>
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                  <path d="M4 22h16" />
                  <path d="M10 14.66V17c0 .55-.47 .98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                  <path d="M14 14.66V17c0 .55.47 .98.97 1.21C16.15 18.75 17 20.24 17 22" />
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                </svg>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">{excellentStaff.length}</span>
              <span className="text-xs font-semibold text-orange-700 bg-orange-100 px-2.5 py-0.5 rounded-full">
                {((excellentStaff.length / mockStaffData.length) * 100).toFixed(0)}%
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2">tổng nhân viên</p>
          </div>

          {/* Stat Card 4 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-500 text-sm font-medium">Cần chú ý</span>
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">{needsAttention.length}</span>
              <span className="text-xs font-semibold text-red-700 bg-red-100 px-2.5 py-0.5 rounded-full">
                &lt; 4.5 Điểm
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2">điểm số thấp</p>
          </div>
        </div>

        {/* Chart & Top Staff Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Trend Chart - Fixed Scale */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Xu hướng điểm số trung bình</h2>
                <p className="text-sm text-slate-500">6 tháng gần nhất</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-1.5 rounded-full bg-slate-900 text-white text-sm font-medium transition-all shadow-sm">
                  Tháng
                </button>
                <button className="px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium transition-all">
                  Tuần
                </button>
              </div>
            </div>

            <div className="h-64 flex items-end justify-between gap-4 px-2">
              {monthlyTrendData.map((data) => {
                // Modified logic to make variations much clearer. Baseline is 4.4, Max is 4.8.
                const scaledHeight = Math.max(15, ((data.avgScore - 4.4) / 0.4) * 100);

                return (
                  <div key={data.month} className="flex flex-col items-center flex-1 group h-full justify-end">
                    <div className="w-full relative flex items-end justify-center h-full">
                      <div
                        className="w-full max-w-[3rem] bg-orange-400 rounded-t-lg transition-all duration-300 group-hover:bg-orange-500 relative"
                        style={{ height: `${scaledHeight}%` }}
                      >
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-xs font-bold px-2.5 py-1.5 rounded shadow-lg pointer-events-none">
                          {data.avgScore}
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-slate-500 mt-4 font-medium">{data.month}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Excellent Staff Leaderboard */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Nhân viên xuất sắc</h2>
                <p className="text-sm text-slate-500">Top 5 tháng này</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {excellentStaff.slice(0, 5).map((staff, index) => (
                <div key={staff.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all cursor-pointer">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${index === 0 ? 'bg-yellow-100 text-yellow-700' : index === 1 ? 'bg-slate-200 text-slate-700' : index === 2 ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-500'}`}>
                    {index + 1}
                  </div>
                  <img src={staff.photo} alt={staff.name} className="w-10 h-10 rounded-full object-cover shadow-sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate">{staff.name}</p>
                    <p className="text-xs text-slate-500 truncate">{staff.employeeCode}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1 text-orange-500">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-base font-bold text-slate-900">{staff.crewScore}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Staff Table Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Table Toolbar */}
          <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Danh sách nhân viên</h2>
              <p className="text-sm text-slate-500">Tất cả {mockStaffData.length} nhân viên</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 p-2.5 outline-none transition-all"
                />
                <svg className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <select className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 p-2.5 outline-none transition-all hidden sm:block">
                <option value="">Tất cả trạng thái</option>
                <option value="excellent">Xuất sắc</option>
                <option value="good">Tốt</option>
                <option value="average">Trung bình</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200 font-semibold">
                <tr>
                  <th scope="col" className="px-6 py-4">Nhân viên</th>
                  <th scope="col" className="px-6 py-4">Mã NV</th>
                  <th scope="col" className="px-6 py-4">Crew Score</th>
                  <th scope="col" className="px-6 py-4">Chuyến đi</th>
                  <th scope="col" className="px-6 py-4">Đánh giá</th>
                  <th scope="col" className="px-6 py-4">Trạng thái</th>
                  <th scope="col" className="px-6 py-4 text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockStaffData.map((staff) => (
                  <tr key={staff.id} className="bg-white hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img src={staff.photo} alt={staff.name} className="w-10 h-10 rounded-full object-cover" />
                          <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${staff.crewScore >= 4.7 ? 'bg-green-500' : staff.crewScore >= 4.5 ? 'bg-blue-500' : staff.crewScore >= 4.0 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{staff.name}</p>
                          <p className="text-xs text-slate-500">{staff.employeeCode}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-500">
                      {staff.employeeCode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-orange-500">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="font-bold text-slate-900">{staff.crewScore}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {staff.totalTrips.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {staff.totalRatings.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(staff.status)}`}>
                        {getStatusLabel(staff.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => navigate(`/crew-score/${staff.id}`)}
                        className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 font-medium px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};