import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard, UserCircle, Home, ClipboardList, Activity,
  BarChart3, ShoppingCart, Bell, LogOut, ChevronRight,
  ChevronLeft, Edit2, UploadCloud, X,
  FileText, Building2, Sparkles, PieChart, Clock, ArrowLeft,
  Download, ExternalLink, BookOpen, FileSpreadsheet, Info,
  Tag, KeyRound, PlusCircle, CalendarDays, CheckCircle, Phone,
  Lock, ListChecks, UserCheck, History, Users, XCircle,
  TrendingUp, Eye, DollarSign, Target, CheckCircle2, FileBarChart, ArrowUpRight, ArrowDownRight,
  CreditCard, AlertTriangle, Receipt, Wallet, Landmark, Mail, MailOpen, CheckCheck, Filter,
  Megaphone, PauseCircle, RefreshCw, ArrowUpCircle, CalendarCheck, Star, FileSignature
} from 'lucide-react';
// Đưa hàm getIconConfig ra ngoài scope toàn cục để các component con đều có thể truy cập
const getIconConfig = (type) => {
  switch(type) {
    case 'payment': return { icon: Landmark, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' };
    case 'contact': return { icon: UserCircle, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' };
    case 'listing': return { icon: Tag, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' };
    case 'contract': return { icon: FileText, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' };
    default: return { icon: Bell, color: 'text-gray-400', bg: 'bg-gray-500/10 border-gray-500/20' };
  }
};
export default function AppointmentManagementModule() {
  // Trạng thái điều hướng chính - Mở sẵn tab Quản lý lịch hẹn (manage_appointments)
  const [activeMenu, setActiveMenu] = useState('manage_appointments');
  // Trạng thái cho Thanh Menu (Sidebar)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState({ transactions: true, billing: true });
  // States cho các Popup (Modals)
  const [isDocAdjustmentOpen, setIsDocAdjustmentOpen] = useState(false);
  const [requestModalProperty, setRequestModalProperty] = useState(null);
  // State quản lý View
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [selectedListing, setSelectedListing] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null); // Quản lý chi tiết lịch hẹn
  // State quản lý Gói hiện tại - Chỉnh sửa ở đây để test quyền (basic | vip | premium)
  const [currentPackageId, setCurrentPackageId] = useState('premium');
  // Cấu hình dữ liệu các Gói
  const packageConfig = {
    basic: {
      id: 'basic', name: 'BASIC', short: 'B',
      color: 'text-gray-300', bgGradient: 'from-gray-700 via-gray-800 to-gray-900',
      textGradient: 'from-gray-200 via-gray-400 to-gray-500',
      badgeColor: 'bg-gray-500/20 text-gray-300 border-gray-500/50', iconColor: 'text-gray-400'
    },
    vip: {
      id: 'vip', name: 'VIP', short: 'V',
      color: 'text-yellow-500', bgGradient: 'from-gray-800 via-black to-gray-900',
      textGradient: 'from-yellow-200 via-yellow-400 to-yellow-600',
      badgeColor: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50', iconColor: 'text-yellow-500'
    },
    premium: {
      id: 'premium', name: 'PREMIUM', short: 'P',
      color: 'text-fuchsia-500', bgGradient: 'from-[#2a0845] via-[#1a0525] to-black',
      textGradient: 'from-fuchsia-300 via-fuchsia-500 to-purple-600',
      badgeColor: 'bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/50', iconColor: 'text-fuchsia-400'
    }
  };
  const currentPackage = packageConfig[currentPackageId];
  const userData = { name: "Nguyễn Văn Tịnh", id: "OWNER-8899" };
  // --- MOCK DATA: THEO DÕI YÊU CẦU & GIAO DỊCH ---
  const mockTransactions = [
    {
      id: 'REQ-20240410', propertyInfo: 'The Habitat • A05-11', type: 'Bán lại', date: '10/04/2024',
      assignee: 'Nguyễn Tú', status: 'Đang xử lý', statusColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20'
    },
    {
      id: 'REQ-20240328', propertyInfo: 'Nhu cầu Mua thêm • Biệt thự', type: 'Mua thêm', date: '28/03/2024',
      assignee: 'Lê Hoàng', status: 'Từ chối', statusColor: 'text-red-400 bg-red-500/10 border-red-500/20'
    },
    {
      id: 'REQ-20240315', propertyInfo: 'SORA Gardens 2 • A10-05', type: 'Cho thuê', date: '15/03/2024',
      assignee: 'Nguyễn Tú', status: 'Đang xử lý', statusColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20'
    },
    {
      id: 'REQ-20240210', propertyInfo: 'MIDORI PARK • V02', type: 'Bán lại', date: '10/02/2024',
      assignee: 'Lê Hoàng', status: 'Đã chuyển giao dịch', statusColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20'
    }
  ];
  // --- MOCK DATA: LỊCH SỬ THANH TOÁN ---
  const mockPayments = [
    {
      id: 'PAY-202404-001', property: 'MIDORI PARK The Glory • B12', phase: 'Đợt 5 - Bàn giao nhà (25%)', amount: 850000000,
      method: 'Chuyển khoản', status: 'Đã đóng', statusStyle: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      date: '15/04/2024', dueDate: '20/04/2024',
      debt: { total: 3400000000, paid: 3230000000, remaining: 170000000 }, documents: []
    },
    {
      id: 'PAY-202405-002', property: 'MIDORI PARK The Glory • B12', phase: 'Đợt 6 - Nhận Sổ Hồng (5%)', amount: 170000000,
      method: 'Chưa xác định', status: 'Sắp tới', statusStyle: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      date: '-', dueDate: '15/10/2024', debt: { total: 3400000000, paid: 3230000000, remaining: 170000000 }, documents: []
    },
    {
      id: 'PAY-202403-015', property: 'SORA Gardens 2 • A10-05', phase: 'Phí quản lý & bảo trì (Q1/2024)', amount: 1250000,
      method: 'VNPAY', status: 'Quá hạn', statusStyle: 'text-red-400 bg-red-500/10 border-red-500/20',
      date: '-', dueDate: '31/03/2024',
      reminder: { daysLeft: -18, message: 'Khoản phí quản lý quý 1/2024 đã quá hạn.' },
      debt: { total: 12500000, paid: 10000000, remaining: 2650000 }, documents: []
    }
  ];
  // --- MOCK DATA: QUẢN LÝ LỊCH HẸN (MODULE 2.1.11) ---
  const initialAppointments = [
    {
      id: 'APT-2604-001',
      property: 'SORA Gardens 2 • A10-05',
      type: 'Xem BĐS',
      date: '20/04/2026 14:30',
      status: 'Chờ xác nhận',
      statusStyle: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      isPriority: true,
      generalNote: 'Khách hàng là chuyên gia người Nhật, quan tâm đến nội thất bàn giao và dịch vụ tòa nhà.',
      report: '',
      btosNote: 'Broker Nguyễn Tú sẽ dẫn khách. Khách hàng thuộc tệp VIP, cần chuẩn bị kỹ kịch bản tư vấn.'
    },
    {
      id: 'APT-2604-002',
      property: 'The Habitat • A05-11',
      type: 'Xác nhận yêu cầu hẹn',
      date: '18/04/2026 09:00',
      status: 'Đã xác nhận',
      statusStyle: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      isPriority: false,
      generalNote: 'Hẹn ký phụ lục điều chỉnh giá bán với Broker tại Văn phòng Becamex Tokyu.',
      report: '',
      btosNote: ''
    },
    {
      id: 'APT-2604-003',
      property: 'MIDORI PARK The View • C20-01',
      type: 'Xem BĐS',
      date: '10/04/2026 10:00',
      status: 'Đã diễn ra',
      statusStyle: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      isPriority: true,
      generalNote: 'Khách xem nhà mẫu thực tế.',
      report: 'Khách hàng chưa ưng ý về hướng view của căn hộ, đang được Broker tư vấn sang căn khác cùng tầm giá.',
      btosNote: 'Chăm sóc thêm (Follow-up) sau 3 ngày. Gửi thêm layout các căn block C.'
    },
    {
      id: 'APT-2604-004',
      property: 'SORA Gardens 1 • B05-12',
      type: 'Xem BĐS',
      date: '22/04/2026 15:00',
      status: 'Chờ xác nhận',
      statusStyle: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      isPriority: false,
      generalNote: 'Khách gia đình 4 người, muốn xem thực tế diện tích phòng khách và ban công.',
      report: '',
      btosNote: ''
    },
    {
      id: 'APT-2604-005',
      property: 'MIDORI PARK The View • C20-01',
      type: 'Xác nhận yêu cầu hẹn',
      date: '25/04/2026 09:30',
      status: 'Đã xác nhận',
      statusStyle: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      isPriority: true,
      generalNote: 'Hẹn ký hợp đồng cọc với khách mua.',
      report: '',
      btosNote: 'Chuẩn bị sẵn 3 bản hợp đồng cọc. Khách thanh toán 100% tiền mặt.'
    },
    {
      id: 'APT-2604-006',
      property: 'The Habitat • A08-04',
      type: 'Xem BĐS',
      date: '15/04/2026 14:00',
      status: 'Đã diễn ra',
      statusStyle: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      isPriority: false,
      generalNote: 'Khách đi cùng gia đình xem căn 2PN.',
      report: 'Khách ưng ý vị trí nhưng còn phân vân mức giá. Đề xuất Owner xem xét giảm 50 triệu.',
      btosNote: 'Broker Lê Hoàng đang tiếp tục follow up khách hàng này.'
    },
    {
      id: 'APT-2604-007',
      property: 'SORA Gardens 2 • B15-09',
      type: 'Xem BĐS',
      date: '28/04/2026 10:00',
      status: 'Chờ xác nhận',
      statusStyle: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      isPriority: false,
      generalNote: 'Khách thuê dài hạn (2 năm), yêu cầu kiểm tra kỹ tình trạng nội thất khu vực bếp.',
      report: '',
      btosNote: 'Cần liên hệ lễ tân để mở cửa trước 15 phút để bật điều hòa.'
    }
  ];
  const [appointments, setAppointments] = useState(initialAppointments);
  const [listings, setListings] = useState([]); // Đã lược bớt data tin đăng cho nhẹ code
  const [notifications, setNotifications] = useState([]);
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'account', icon: UserCircle, label: 'Thông tin tài khoản' },
    { id: 'properties', icon: Home, label: 'Tài sản của tôi' },
    {
      id: 'transactions',
      icon: ClipboardList,
      label: 'Yêu cầu & Giao dịch',
      children: [
        { id: 'request_action', label: 'Yêu cầu xử lý tài sản' },
        { id: 'track_request', label: 'Theo dõi yêu cầu xử lý' },
        { id: 'manage_posts', label: 'Quản lý tin đăng' },
        { id: 'manage_appointments', label: 'Quản lý lịch hẹn' } // Thêm module Quản lý lịch hẹn
      ]
    },
    { id: 'reports', icon: BarChart3, label: 'Báo cáo & kết quả' },
    {
      id: 'billing',
      icon: ShoppingCart,
      label: 'Gói & Thanh toán',
      children: [
        { id: 'packages', label: 'Chọn gói thành viên' },
        { id: 'orders', label: 'Lịch sử thanh toán' }
      ]
    },
    { id: 'notifications', icon: Bell, label: 'Trung tâm thông báo' },
    { id: 'divider', type: 'divider' },
    { id: 'logout', icon: LogOut, label: 'Đăng xuất', color: 'text-red-400 hover:text-red-300 hover:bg-red-500/10' }
  ];
  const handleMenuClick = (item) => {
    if (item.type === 'divider') return;
    if (item.id === 'logout') {
      alert("Đăng xuất thành công!");
    } else {
      setActiveMenu(item.id);
      setSelectedProperty(null);
      setSelectedTransaction(null);
      setSelectedPayment(null);
      setSelectedNotification(null);
      setSelectedListing(null);
      setSelectedAppointment(null);
    }
  };
  const toggleSubMenu = (id) => {
    if (isSidebarCollapsed) {
      setIsSidebarCollapsed(false);
      setOpenSubMenus({ [id]: true });
    } else {
      setOpenSubMenus(prev => ({ ...prev, [id]: !prev[id] }));
    }
  };
  // --- COMPONENT: SIDEBAR ---
  const Sidebar = () => {
    const unreadCount = notifications.filter(n => !n.isRead).length;
    return (
      <aside className={`${isSidebarCollapsed ? 'w-24' : 'w-72'} h-screen flex flex-col bg-black/40 backdrop-blur-2xl border-r border-white/10 z-20 relative transition-all duration-300 ease-in-out`}>
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="absolute -right-3 top-10 bg-gray-800 hover:bg-gray-700 text-white rounded-full p-1 z-50 border border-white/20 shadow-lg transition-colors"
        >
          {isSidebarCollapsed ? <ChevronRight size={16}/> : <ChevronLeft size={16}/>}
        </button>
        <div className={`p-6 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'space-x-3'}`}>
          <div className="w-10 h-10 grid grid-cols-2 gap-0.5 shadow-[0_0_15px_rgba(255,255,255,0.2)] flex-shrink-0">
            <div className="bg-green-500 rounded-sm"></div>
            <div className="bg-[#e53e3e] rounded-sm"></div>
            <div className="bg-blue-500 rounded-sm"></div>
            <div className="bg-yellow-500 rounded-sm"></div>
          </div>
          {!isSidebarCollapsed && (
            <div className="overflow-hidden whitespace-nowrap">
              <h1 className="text-white font-bold text-lg tracking-widest leading-tight">BECAMEX</h1>
              <p className="text-[10px] text-gray-400 tracking-[0.2em] uppercase font-medium">Owner Portal</p>
            </div>
          )}
        </div>
        <div className={`px-4 pb-5 mb-2 border-b border-white/10 flex flex-col ${isSidebarCollapsed ? 'items-center' : ''}`}>
          <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'space-x-3 px-2'}`}>
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#e53e3e] to-orange-400 flex items-center justify-center text-white font-bold text-sm shadow-lg">TN</div>
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-black rounded-full"></div>
            </div>
            {!isSidebarCollapsed && (
              <div className="overflow-hidden whitespace-nowrap flex-1">
                <h2 className="text-white font-medium text-sm">{userData.name}</h2>
                <p className="text-[10px] text-gray-500 font-mono mt-0.5">{userData.id}</p>
              </div>
            )}
          </div>
          <div className={`mt-4 ${isSidebarCollapsed ? 'w-full flex justify-center' : 'px-2'}`}>
            {!isSidebarCollapsed ? (
              <div className="relative group">
                <select
                  value={currentPackageId}
                  onChange={(e) => setCurrentPackageId(e.target.value)}
                  className={`w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-md pl-7 pr-4 py-1.5 text-xs font-bold outline-none cursor-pointer appearance-none transition-colors ${currentPackage.color}`}
                >
                  <option value="basic" className="bg-gray-900 text-gray-300">GÓI BASIC</option>
                  <option value="vip" className="bg-gray-900 text-yellow-500">GÓI VIP</option>
                  <option value="premium" className="bg-gray-900 text-fuchsia-500">GÓI PREMIUM</option>
                </select>
                <Sparkles size={12} className={`absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none ${currentPackage.iconColor}`} />
                <ChevronRight size={12} className={`absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none rotate-90 ${currentPackage.iconColor}`} />
              </div>
            ) : (
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 cursor-pointer font-bold text-xs ${currentPackage.color} hover:bg-white/10 transition-colors`}
                title="Click để đổi gói"
                onClick={() => {
                  const packages = ['basic', 'vip', 'premium'];
                  const nextIdx = (packages.indexOf(currentPackageId) + 1) % 3;
                  setCurrentPackageId(packages[nextIdx]);
                }}
              >
                {currentPackage.short}
              </div>
            )}
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto custom-scrollbar px-3 py-2 space-y-1.5">
          {menuItems.map((item, idx) => {
            if (item.type === 'divider') return <div key={idx} className="h-px bg-white/10 my-4 mx-4"></div>;
            const hasChildren = !!item.children;
            const isMenuOpen = openSubMenus[item.id];
            const isChildActive = hasChildren && item.children.some(child => child.id === activeMenu);
            const isActive = activeMenu === item.id || isChildActive;
            return (
              <div key={item.id} className="w-full">
                <button
                  onClick={() => hasChildren ? toggleSubMenu(item.id) : handleMenuClick(item)}
                  title={isSidebarCollapsed ? item.label : ''}
                  className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center p-3' : 'space-x-3 px-4 py-3'} rounded-xl transition-all duration-300 group relative ${
                    isActive && !hasChildren && item.id !== 'logout'
                      ? 'bg-gradient-to-r from-[#e53e3e]/20 to-transparent text-white border-l-2 border-[#e53e3e]'
                      : (isChildActive ? 'text-white' : `${item.color || 'text-gray-400 hover:text-white hover:bg-white/5'}`)
                  }`}
                >
                  <div className="relative">
                    <item.icon size={20} className={`${isActive && item.id !== 'logout' ? 'text-[#e53e3e]' : ''} group-hover:scale-110 transition-transform flex-shrink-0`} />
                    {item.id === 'notifications' && unreadCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e53e3e] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#e53e3e] border border-black"></span>
                      </span>
                    )}
                  </div>
                  {!isSidebarCollapsed && (
                    <>
                      <span className="text-sm font-medium tracking-wide whitespace-nowrap overflow-hidden text-left flex-1">
                        {item.label}
                      </span>
                      {hasChildren ? (
                        <ChevronRight size={16} className={`flex-shrink-0 transition-transform duration-300 ${isMenuOpen ? 'rotate-90 text-white' : 'text-gray-500'}`} />
                      ) : (
                        item.id === 'notifications' && unreadCount > 0 ? (
                          <span className="bg-[#e53e3e] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md ml-auto">
                            {unreadCount}
                          </span>
                        ) : (
                          isActive && item.id !== 'logout' && <ChevronRight size={16} className="ml-auto text-[#e53e3e] flex-shrink-0" />
                        )
                      )}
                    </>
                  )}
                </button>
                {hasChildren && isMenuOpen && !isSidebarCollapsed && (
                  <div className="mt-1 ml-4 pl-6 border-l border-white/10 space-y-1 animate-in fade-in slide-in-from-top-2 duration-300">
                    {item.children.map(child => {
                      const isChildItemActive = activeMenu === child.id;
                      return (
                        <button
                          key={child.id}
                          onClick={() => handleMenuClick(child)}
                          className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors relative ${
                            isChildItemActive ? 'text-white bg-white/10 font-medium' : 'text-gray-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {isChildItemActive && <div className="absolute left-[-17px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#e53e3e]"></div>}
                          <span className="truncate block w-full">{child.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    );
  };
  // --- VIEW: QUẢN LÝ LỊCH HẸN (Dạng Thẻ - Cột thẳng hàng bằng Grid 12) ---
  const ManageAppointmentsView = () => {
    const handleConfirmAppointment = (e, appointment) => {
      e.stopPropagation();
      setAppointments(appointments.map(apt =>
        apt.id === appointment.id
          ? { ...apt, status: 'Đã xác nhận', statusStyle: 'text-blue-400 bg-blue-500/10 border-blue-500/20' }
          : apt
      ));
      alert(`Đã xác nhận yêu cầu hẹn mã ${appointment.id} thành công!`);
    };
    const canManageAppointments = currentPackageId === 'vip' || currentPackageId === 'premium';
    const canViewPremiumFeatures = currentPackageId === 'premium';
    if (!canManageAppointments) {
      return (
        <div className="flex flex-col items-center justify-center h-[80vh] text-center animate-in zoom-in-95 duration-500 max-w-lg mx-auto">
          <div className="w-24 h-24 bg-gray-800/80 border border-gray-700 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <Lock size={40} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3 tracking-wide">Tính năng dành cho VIP & PREMIUM</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            Module "Quản lý lịch hẹn" giúp bạn theo dõi lịch xem BĐS, xác nhận các yêu cầu hẹn gặp và nhận các báo cáo chuyến thăm chuyên sâu. Vui lòng nâng cấp gói để sử dụng.
          </p>
          <button
            onClick={() => handleMenuClick({id: 'packages'})}
            className="px-8 py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(234,179,8,0.3)] flex items-center"
          >
            <Sparkles size={18} className="mr-2" /> Nâng cấp Gói dịch vụ
          </button>
        </div>
      );
    }
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1400px] mx-auto pb-10">
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-8 gap-4 border-b border-white/10 pb-6">
          <div>
            <h2 className="text-3xl font-light text-white mb-2 flex items-center">
              <CalendarCheck className="mr-3 text-[#e53e3e]" size={32}/>
              Quản lý lịch hẹn
            </h2>
            <p className="text-gray-400">Theo dõi và xác nhận các lịch hẹn xem bất động sản, làm việc với Broker hoặc đối tác.</p>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg flex items-center">
              <CalendarDays size={16} className="mr-2 text-gray-400"/> Tổng: <strong className="text-white ml-2">{appointments.length} lịch hẹn</strong>
            </div>
          </div>
        </div>
        {/* Cấu trúc Header chung cho Grid (Chỉ hiện trên PC) */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-5 pb-3 text-[10px] uppercase tracking-widest text-gray-500 font-semibold border-b border-white/5 mb-4">
          <div className="col-span-4 pl-1">Mã lịch hẹn / Căn hộ</div>
          <div className="col-span-2">Loại lịch hẹn</div>
          <div className="col-span-2">Thời gian hẹn</div>
          <div className="col-span-2">Trạng thái</div>
          <div className="col-span-2 text-right pr-1">Thao tác</div>
        </div>
        {/* Danh sách Dạng thẻ (Grid 12 cột) */}
        <div className="space-y-4">
          {appointments.map((apt) => (
            <div
              key={apt.id}
              onClick={() => setSelectedAppointment(apt)}
              className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-5 hover:border-white/20 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-4 items-center">
                {/* Cột 1: Mã / Căn hộ */}
                <div className="md:col-span-4 flex flex-col">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1 md:hidden">Mã lịch hẹn / Căn hộ</p>
                  <div className="text-white font-bold flex flex-wrap items-center gap-2">
                    {apt.id}
                    {canViewPremiumFeatures && apt.isPriority && (
                      <span className="flex items-center text-[10px] bg-yellow-500/20 text-yellow-500 px-1.5 py-0.5 rounded border border-yellow-500/30">
                        <Star size={10} className="mr-1 fill-current" /> ƯU TIÊN
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 mt-1 flex items-center"><Building2 size={12} className="mr-1.5"/> {apt.property}</p>
                </div>
                {/* Cột 2: Loại lịch hẹn */}
                <div className="md:col-span-2">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1 md:hidden">Loại lịch hẹn</p>
                  <p className="text-sm font-medium text-gray-200">{apt.type}</p>
                </div>
                {/* Cột 3: Thời gian */}
                <div className="md:col-span-2">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1 md:hidden">Thời gian hẹn</p>
                  <p className="text-sm text-white font-mono flex items-center"><Clock size={14} className="mr-1.5 text-blue-400"/> {apt.date}</p>
                </div>
                {/* Cột 4: Trạng thái */}
                <div className="md:col-span-2">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1 md:hidden">Trạng thái</p>
                  <span className={`inline-block text-[10px] px-2.5 py-1 rounded font-bold uppercase tracking-wider border ${apt.statusStyle}`}>
                    {apt.status}
                  </span>
                </div>
                {/* Cột 5: Nút thao tác */}
                <div className="md:col-span-2 flex justify-start md:justify-end items-center gap-2 mt-2 md:mt-0">
                  {apt.status === 'Chờ xác nhận' && (
                    <button
                      onClick={(e) => handleConfirmAppointment(e, apt)}
                      className="px-4 py-2 bg-[#e53e3e]/10 hover:bg-[#e53e3e] text-[#e53e3e] hover:text-white border border-[#e53e3e]/30 rounded-lg text-sm font-medium transition-all flex items-center whitespace-nowrap"
                    >
                      Xác nhận <CheckCircle size={14} className="ml-1.5" />
                    </button>
                  )}
                  <button
                    className="px-4 py-2 bg-black/40 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-gray-300 hover:text-white font-medium transition-colors flex items-center whitespace-nowrap"
                  >
                    Chi tiết <ChevronRight size={14} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  // --- VIEW: THEO DÕI YÊU CẦU & GIAO DỊCH (Dạng Thẻ - Cột thẳng hàng) ---
  const TransactionTrackingView = () => {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1400px] mx-auto pb-10">
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-8 gap-4 border-b border-white/10 pb-6">
          <div>
            <h2 className="text-3xl font-light text-white mb-2 flex items-center">
              <ListChecks className="mr-3 text-[#e53e3e]" size={32}/>
              Theo dõi yêu cầu xử lý
            </h2>
            <p className="text-gray-400">Quản lý và theo dõi tiến độ của các yêu cầu Bán / Cho thuê / Mua thêm bạn đã gửi.</p>
          </div>
        </div>
        {/* Header Grid */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-5 pb-3 text-[10px] uppercase tracking-widest text-gray-500 font-semibold border-b border-white/5 mb-4">
          <div className="col-span-3 pl-1">Mã Yêu cầu / Ngày</div>
          <div className="col-span-3">Tài sản / Loại</div>
          <div className="col-span-2">Phụ trách</div>
          <div className="col-span-2">Trạng thái</div>
          <div className="col-span-2 text-right pr-1">Thao tác</div>
        </div>
        {/* List Grid */}
        <div className="space-y-4">
          {mockTransactions.map((tx) => (
            <div key={tx.id} onClick={() => {}} className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-5 hover:border-white/20 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
               <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                 <div className="md:col-span-3">
                   <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1 md:hidden">Mã Yêu cầu / Ngày</p>
                   <p className="text-white font-bold">{tx.id}</p>
                   <p className="text-xs text-gray-400 mt-1">{tx.date}</p>
                 </div>
                 <div className="md:col-span-3">
                   <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1 md:hidden">Tài sản / Loại</p>
                   <p className="text-white font-medium truncate">{tx.propertyInfo}</p>
                   <p className="text-xs text-gray-400 mt-1">{tx.type}</p>
                 </div>
                 <div className="md:col-span-2">
                   <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1 md:hidden">Phụ trách</p>
                   <div className="flex items-center">
                     <UserCircle size={14} className="mr-1.5 text-gray-400" />
                     <p className="text-sm text-gray-200">{tx.assignee}</p>
                   </div>
                 </div>
                 <div className="md:col-span-2">
                   <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1 md:hidden">Trạng thái</p>
                   <span className={`inline-block text-[10px] px-2.5 py-1 rounded font-bold uppercase tracking-wider border ${tx.statusColor}`}>
                     {tx.status}
                   </span>
                 </div>
                 <div className="md:col-span-2 flex justify-start md:justify-end mt-2 md:mt-0">
                    <button className="px-5 py-2.5 bg-black/40 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-gray-300 hover:text-white font-medium transition-colors inline-flex items-center whitespace-nowrap">
                      Chi tiết <ChevronRight size={14} className="ml-1" />
                    </button>
                 </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  // --- VIEW: LỊCH SỬ THANH TOÁN (Dạng Thẻ - Cột thẳng hàng) ---
  const PaymentHistoryView = () => {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1400px] mx-auto pb-10">
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-8 gap-4 border-b border-white/10 pb-6">
          <div>
            <h2 className="text-3xl font-light text-white mb-2 flex items-center">
              <Landmark className="mr-3 text-[#e53e3e]" size={32}/>
              Lịch sử thanh toán & Tài chính
            </h2>
            <p className="text-gray-400">Quản lý các đợt thanh toán, đối soát công nợ, và tải hóa đơn/biên lai điện tử.</p>
          </div>
        </div>
        {/* Header Grid */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-5 pb-3 text-[10px] uppercase tracking-widest text-gray-500 font-semibold border-b border-white/5 mb-4">
          <div className="col-span-4 pl-1">Căn hộ / Đợt thanh toán</div>
          <div className="col-span-2">Số tiền</div>
          <div className="col-span-2">Hạn / Thanh toán</div>
          <div className="col-span-2">Trạng thái</div>
          <div className="col-span-2 text-right pr-1">Thao tác</div>
        </div>
        {/* List Grid */}
        <div className="space-y-4">
          {mockPayments.map((payment) => (
            <div key={payment.id} onClick={() => {}} className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-5 hover:border-white/20 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
               <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                 <div className="md:col-span-4">
                   <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1 md:hidden">Căn hộ / Đợt thanh toán</p>
                   <p className="text-white font-bold truncate pr-4">{payment.property}</p>
                   <p className="text-sm text-gray-400 mt-1 truncate pr-4">{payment.phase}</p>
                 </div>
                 <div className="md:col-span-2">
                   <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1 md:hidden">Số tiền</p>
                   <p className="text-white font-bold">{payment.amount.toLocaleString()} đ</p>
                   <p className="text-xs text-gray-500 mt-1">{payment.method}</p>
                 </div>
                 <div className="md:col-span-2">
                   <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1 md:hidden">Hạn / Thanh toán</p>
                   <p className="text-sm text-gray-300">{payment.dueDate}</p>
                   <p className="text-xs text-gray-500 mt-1">{payment.date !== '-' ? `Đóng: ${payment.date}` : 'Chưa đóng'}</p>
                 </div>
                 <div className="md:col-span-2">
                   <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1 md:hidden">Trạng thái</p>
                   <span className={`inline-block text-[10px] px-2.5 py-1 rounded font-bold uppercase tracking-wider border ${payment.statusStyle}`}>
                     {payment.status}
                   </span>
                 </div>
                 <div className="md:col-span-2 flex justify-start md:justify-end mt-2 md:mt-0">
                    <button className="px-5 py-2.5 bg-black/40 hover:bg-[#e53e3e]/20 border border-white/10 rounded-lg text-sm text-gray-300 hover:text-[#e53e3e] font-medium transition-colors inline-flex items-center whitespace-nowrap">
                      Chi tiết <ChevronRight size={14} className="ml-1" />
                    </button>
                 </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  // --- MODAL: CHI TIẾT LỊCH HẸN ---
  const AppointmentDetailModal = () => {
    if (!selectedAppointment) return null;
    const canViewPremiumFeatures = currentPackageId === 'premium';
    const handleConfirm = () => {
      // Cập nhật state (mô phỏng)
      setAppointments(appointments.map(apt =>
        apt.id === selectedAppointment.id
          ? { ...apt, status: 'Đã xác nhận', statusStyle: 'text-blue-400 bg-blue-500/10 border-blue-500/20' }
          : apt
      ));
      setSelectedAppointment({...selectedAppointment, status: 'Đã xác nhận', statusStyle: 'text-blue-400 bg-blue-500/10 border-blue-500/20'});
      alert(`Đã xác nhận yêu cầu hẹn mã ${selectedAppointment.id} thành công!`);
    };
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-in fade-in duration-300">
        <div className="bg-[#14151a] border border-white/10 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col transform animate-in zoom-in-95 max-h-[90vh]">
          {/* Header Modal */}
          <div className="flex justify-between items-center p-6 border-b border-white/10 bg-white/5">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-emerald-500/10 border border-emerald-500/20">
                <CalendarCheck size={18} className="text-emerald-400" />
              </div>
              <div>
                <h3 className="text-lg text-white font-bold">Chi tiết lịch hẹn</h3>
                <p className="text-xs text-gray-400 font-mono mt-0.5">ID: {selectedAppointment.id}</p>
              </div>
            </div>
            <button onClick={() => setSelectedAppointment(null)} className="text-gray-400 hover:text-[#e53e3e] bg-black/20 p-2 rounded-full transition-colors"><X size={20}/></button>
          </div>
          {/* Body Modal */}
          <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar space-y-6">
            {/* Hàng 1: Tổng quan */}
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`inline-block text-[10px] px-2 py-0.5 rounded border uppercase tracking-wider ${selectedAppointment.statusStyle}`}>
                    {selectedAppointment.status}
                  </span>
                  {canViewPremiumFeatures && selectedAppointment.isPriority && (
                    <span className="flex items-center text-[10px] bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded border border-yellow-500/30 uppercase tracking-wider font-bold">
                      <Star size={12} className="mr-1 fill-current" /> Lịch hẹn ưu tiên
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-white leading-tight">{selectedAppointment.type}</h2>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Thời gian hẹn</p>
                <p className="text-lg text-white font-mono flex items-center justify-start sm:justify-end">
                  <Clock size={16} className="mr-2 text-blue-400"/> {selectedAppointment.date}
                </p>
              </div>
            </div>
            {/* Hàng 2: Thông tin căn hộ & Ghi chú chung */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black/30 p-5 rounded-xl border border-white/5 h-full">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Căn hộ liên quan</p>
                <div className="flex items-center bg-white/5 p-3 rounded-lg border border-white/5">
                  <Building2 size={18} className="text-gray-400 mr-3" />
                  <span className="text-sm font-bold text-gray-200">{selectedAppointment.property}</span>
                </div>
              </div>
              <div className="bg-black/30 p-5 rounded-xl border border-white/5 h-full">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Ghi chú chung</p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {selectedAppointment.generalNote || <span className="text-gray-600 italic">Không có ghi chú.</span>}
                </p>
              </div>
            </div>
            {/* Hàng 3: THÔNG TIN NÂNG CAO (GATING PREMIUM) */}
            <div className="mt-8 border-t border-white/10 pt-6">
              <h3 className="text-base font-bold text-white mb-4 flex items-center">
                <FileSignature size={18} className="mr-2 text-purple-400"/> Báo cáo & Đánh giá (Từ BTOS)
              </h3>
              {canViewPremiumFeatures ? (
                <div className="grid grid-cols-1 gap-4">
                  {/* Báo cáo sau chuyến thăm */}
                  <div className="bg-gradient-to-r from-purple-900/10 to-transparent p-5 rounded-xl border border-purple-500/20">
                    <p className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-2">Báo cáo sau chuyến thăm</p>
                    <p className="text-sm text-gray-200 leading-relaxed">
                      {selectedAppointment.report || <span className="text-gray-500 italic">Báo cáo sẽ được cập nhật sau khi buổi xem BĐS kết thúc.</span>}
                    </p>
                  </div>
                  {/* Ghi chú chi tiết từ BTOS */}
                  <div className="bg-gradient-to-r from-blue-900/10 to-transparent p-5 rounded-xl border border-blue-500/20">
                    <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Ghi chú điều phối (BTOS)</p>
                    <p className="text-sm text-gray-200 leading-relaxed">
                      {selectedAppointment.btosNote || <span className="text-gray-500 italic">Chưa có ghi chú nội bộ từ hệ thống.</span>}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-black/20 border border-white/5 border-dashed p-6 rounded-2xl text-center">
                  <Lock size={24} className="mx-auto mb-3 text-gray-600" />
                  <p className="text-sm text-gray-400 mb-2">Các báo cáo chuyến thăm và ghi chú nội bộ hệ thống chỉ khả dụng cho tài khoản <strong>PREMIUM</strong>.</p>
                  <button onClick={() => {setSelectedAppointment(null); handleMenuClick({id: 'packages'});}} className="text-xs text-[#e53e3e] font-bold hover:underline">
                    Nâng cấp gói ngay
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* Footer Modal - Nút thao tác */}
          <div className="p-6 border-t border-white/10 bg-black/40 flex gap-3 justify-end items-center">
            <button
              onClick={() => setSelectedAppointment(null)}
              className="px-6 py-2.5 text-gray-400 hover:text-white font-medium transition-colors mr-auto"
            >
              Quay lại
            </button>
            {selectedAppointment.status === 'Chờ xác nhận' && (
              <button
                onClick={handleConfirm}
                className="px-6 py-2.5 bg-[#e53e3e] hover:bg-red-600 text-white rounded-lg text-sm font-bold shadow-lg transition-all flex items-center"
              >
                Xác nhận yêu cầu hẹn <CheckCircle size={16} className="ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };
  // --- MAIN RENDER ---
  return (
    <div
      className="flex h-screen w-full bg-black font-sans text-gray-200 overflow-hidden relative"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2000&auto=format&fit=crop')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-[#14151a]/95 to-[#0a0b0e]/95 backdrop-blur-sm z-0"></div>
      <Sidebar />
      <main className="flex-1 relative z-10 h-screen overflow-y-auto custom-scrollbar p-8 lg:p-12 transition-all duration-300">
        {/* VIEW: DANH SÁCH MODULES DẠNG THẺ (GRID) */}
        {activeMenu === 'manage_appointments' && <ManageAppointmentsView />}
        {activeMenu === 'track_request' && <TransactionTrackingView />}
        {activeMenu === 'orders' && <PaymentHistoryView />}
        {/* Các view khác đã được thu gọn */}
        {activeMenu !== 'manage_appointments' && activeMenu !== 'track_request' && activeMenu !== 'orders' && (
          <div className="flex flex-col items-center justify-center h-full text-center animate-in zoom-in-95 duration-500">
            <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-6">
              <Sparkles size={40} className="text-gray-500" />
            </div>
            <h2 className="text-2xl font-light text-white mb-3">
              Module <span className="font-medium text-[#e53e3e]">
                "{
                  menuItems.find(m => m.id === activeMenu)?.label ||
                  menuItems.flatMap(m => m.children || []).find(c => c.id === activeMenu)?.label
                }"
              </span>
            </h2>
            <p className="text-gray-400 max-w-md mx-auto text-sm leading-relaxed">
              Vui lòng xem các tab <b>Quản lý lịch hẹn</b>, <b>Lịch sử thanh toán</b>, hoặc <b>Theo dõi yêu cầu</b> để trải nghiệm bố cục thẻ đã được căn hàng tự động.
            </p>
          </div>
        )}
      </main>
      {/* MODALS */}
      {selectedAppointment && <AppointmentDetailModal />}
    </div>
  );
}