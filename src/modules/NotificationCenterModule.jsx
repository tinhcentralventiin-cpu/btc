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
  CreditCard, AlertTriangle, Receipt, Wallet, Landmark, Mail, MailOpen, CheckCheck, Filter
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
export default function NotificationCenterModule() {
  // Trạng thái điều hướng chính - Mở sẵn tab Trung tâm thông báo (notifications)
  const [activeMenu, setActiveMenu] = useState('notifications');
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
  // State quản lý Gói hiện tại
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
  // --- MOCK DATA: THÔNG BÁO (MODULE 2.1.9) ---
  const initialNotifications = [
    {
      id: 'NOTI-001',
      type: 'payment', // payment, contact, listing, contract
      title: 'Đến hạn thanh toán phí dịch vụ môi giới',
      content: 'Khoản phí dịch vụ môi giới cho giao dịch Bán lại căn hộ The Habitat • A05-11 sẽ đến hạn trong 2 ngày tới. Vui lòng thanh toán để hoàn tất giao dịch.',
      date: '2 giờ trước',
      isRead: false,
      property: 'The Habitat • A05-11',
      actionLabel: 'Thanh toán ngay',
      actionLink: 'orders'
    },
    {
      id: 'NOTI-002',
      type: 'contact',
      title: 'Có khách hàng mới quan tâm căn hộ',
      content: 'Khách hàng "Trần Văn B" vừa để lại thông tin liên hệ cho tin đăng Cho thuê căn hộ SORA Gardens 2 • A10-05. Broker Nguyễn Tú đang tiến hành tư vấn.',
      date: 'Hôm qua, 14:30',
      isRead: false,
      property: 'SORA Gardens 2 • A10-05',
      actionLabel: 'Xem chi tiết giao dịch',
      actionLink: 'track_request'
    },
    {
      id: 'NOTI-003',
      type: 'listing',
      title: 'Tin đăng sắp hết hạn hiển thị',
      content: 'Tin đăng "Bán gấp căn hộ MIDORI PARK The View C20-01" của bạn sẽ hết hạn sau 3 ngày nữa. Hãy gia hạn để tiếp tục tiếp cận khách hàng tiềm năng.',
      date: '15/04/2026',
      isRead: true,
      property: 'MIDORI PARK The View • C20-01',
      actionLabel: 'Gia hạn tin đăng',
      actionLink: 'manage_posts'
    },
    {
      id: 'NOTI-004',
      type: 'contract',
      title: 'Nhắc lịch ký hợp đồng cho thuê',
      content: 'Lịch hẹn ký hợp đồng cho thuê căn hộ SORA Gardens 1 • C15-02 với khách hàng Kenji Sato được lên lịch vào 09:00 sáng ngày 20/04/2026 tại văn phòng Becamex Tokyu.',
      date: '12/04/2026',
      isRead: true,
      property: 'SORA Gardens 1 • C15-02',
      actionLabel: 'Xem chi tiết lịch hẹn',
      actionLink: 'manage_appointments'
    },
    {
      id: 'NOTI-005',
      type: 'payment',
      title: 'Xác nhận thanh toán thành công',
      content: 'Kế toán đã xác nhận nhận đủ số tiền 850.000.000 VNĐ cho Đợt 5 - Bàn giao nhà căn hộ MIDORI PARK The Glory • B12. Hóa đơn điện tử đã được phát hành.',
      date: '10/04/2026',
      isRead: true,
      property: 'MIDORI PARK The Glory • B12',
      actionLabel: 'Tải hóa đơn điện tử',
      actionLink: 'orders'
    }
  ];
  const [notifications, setNotifications] = useState(initialNotifications);
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
        { id: 'track_request', label: 'Theo dõi yêu cầu xử lý' }
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
  // --- VIEW: TRUNG TÂM THÔNG BÁO (MODULE 2.1.9) ---
  const NotificationCenterView = () => {
    const [filter, setFilter] = useState('all'); // 'all' | 'unread'
    const handleMarkAllAsRead = () => {
      setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    };
    const handleNotificationClick = (noti) => {
      // Đánh dấu là đã đọc
      if (!noti.isRead) {
        setNotifications(notifications.map(n => n.id === noti.id ? { ...n, isRead: true } : n));
      }
      setSelectedNotification(noti);
    };
    const filteredNotifications = notifications.filter(n => filter === 'all' ? true : !n.isRead);
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1000px] mx-auto pb-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-8 gap-4 border-b border-white/10 pb-6">
          <div>
            <h2 className="text-3xl font-light text-white mb-2 flex items-center">
              <Bell className="mr-3 text-[#e53e3e]" size={32}/>
              Trung tâm thông báo
            </h2>
            <p className="text-gray-400">Quản lý và cập nhật các thông tin mới nhất về tài sản, thanh toán và giao dịch của bạn.</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleMarkAllAsRead}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg flex items-center text-sm text-gray-300 transition-colors whitespace-nowrap"
            >
              <CheckCheck size={16} className="mr-2 text-emerald-400"/> Đánh dấu tất cả đã đọc
            </button>
          </div>
        </div>
        {/* Cụm Bộ Lọc */}
        <div className="flex items-center space-x-2 mb-6">
          <Filter size={16} className="text-gray-500 mr-2" />
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${filter === 'all' ? 'bg-[#e53e3e]/20 text-[#e53e3e] border border-[#e53e3e]/30' : 'bg-transparent text-gray-400 hover:text-white border border-transparent'}`}
          >
            Tất cả thông báo
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${filter === 'unread' ? 'bg-[#e53e3e]/20 text-[#e53e3e] border border-[#e53e3e]/30' : 'bg-transparent text-gray-400 hover:text-white border border-transparent'}`}
          >
            Chưa đọc ({notifications.filter(n => !n.isRead).length})
          </button>
        </div>
        {/* Danh sách thông báo */}
        <div className="space-y-3">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((noti) => {
              const Icon = getIconConfig(noti.type).icon;
              const conf = getIconConfig(noti.type);
              return (
                <div
                  key={noti.id}
                  onClick={() => handleNotificationClick(noti)}
                  className={`p-4 md:p-5 rounded-2xl border transition-all duration-300 cursor-pointer group flex flex-col sm:flex-row items-start gap-4
                    ${!noti.isRead ? 'bg-white/10 border-white/20 shadow-lg' : 'bg-black/20 border-white/5 hover:bg-white/5 hover:border-white/10'}
                  `}
                >
                  {/* Cột trái: Icon */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 border ${conf.bg}`}>
                    <Icon size={20} className={conf.color} />
                  </div>
                  {/* Cột giữa: Nội dung */}
                  <div className="flex-1 w-full min-w-0">
                    <div className="flex justify-between items-start mb-1 gap-2">
                      <h4 className={`text-base truncate ${!noti.isRead ? 'text-white font-bold' : 'text-gray-300 font-medium group-hover:text-white'}`}>
                        {noti.title}
                      </h4>
                      <span className="text-[10px] text-gray-500 font-mono whitespace-nowrap pt-1 hidden sm:block">
                        {noti.date}
                      </span>
                    </div>
                    <p className={`text-sm mb-2 line-clamp-2 ${!noti.isRead ? 'text-gray-300' : 'text-gray-500'}`}>
                      {noti.content}
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Building2 size={12} className="mr-1.5" />
                      <span className="truncate">{noti.property}</span>
                      <span className="sm:hidden ml-auto">{noti.date}</span>
                    </div>
                  </div>
                  {/* Cột phải: Trạng thái (dot) & CTA */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto mt-2 sm:mt-0 gap-3">
                    {!noti.isRead ? (
                      <div className="w-2.5 h-2.5 bg-[#e53e3e] rounded-full shadow-[0_0_8px_rgba(229,62,62,0.8)]"></div>
                    ) : (
                      <div className="w-2.5 h-2.5 bg-transparent"></div> // Placeholder
                    )}
                    <div className="text-sm font-medium text-[#e53e3e] opacity-0 group-hover:opacity-100 transition-opacity flex items-center hidden sm:flex">
                      Xem chi tiết <ChevronRight size={16} className="ml-1" />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16 bg-black/20 border border-white/5 border-dashed rounded-2xl">
              <MailOpen size={48} className="mx-auto mb-4 text-gray-600" />
              <h3 className="text-lg font-medium text-gray-400 mb-2">Không có thông báo nào</h3>
              <p className="text-sm text-gray-500">Bạn đã đọc tất cả thông báo hiện có trong hệ thống.</p>
            </div>
          )}
        </div>
      </div>
    );
  };
  // --- MODAL: CHI TIẾT THÔNG BÁO ---
  const NotificationDetailModal = () => {
    if (!selectedNotification) return null;
    const conf = getIconConfig(selectedNotification.type).icon;
    const IconCmp = conf;
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-in fade-in duration-300">
        <div className="bg-[#14151a] border border-white/10 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col transform animate-in zoom-in-95">
          <div className="flex justify-between items-center p-6 border-b border-white/10 bg-white/5">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${getIconConfig(selectedNotification.type).bg}`}>
                <IconCmp size={18} className={getIconConfig(selectedNotification.type).color} />
              </div>
              <div>
                <h3 className="text-lg text-white font-bold">Chi tiết thông báo</h3>
                <p className="text-xs text-gray-400 font-mono mt-0.5">{selectedNotification.date}</p>
              </div>
            </div>
            <button onClick={() => setSelectedNotification(null)} className="text-gray-400 hover:text-[#e53e3e] bg-black/20 p-2 rounded-full transition-colors"><X size={20}/></button>
          </div>
          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white mb-4 leading-tight">{selectedNotification.title}</h2>
            <div className="bg-black/30 p-4 rounded-xl border border-white/5 mb-6 flex items-center">
              <Building2 size={16} className="text-gray-500 mr-3 flex-shrink-0" />
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-0.5">Tài sản liên quan</p>
                <p className="text-sm text-gray-200 font-medium">{selectedNotification.property}</p>
              </div>
            </div>
            <div className="text-gray-300 text-sm leading-relaxed mb-8 whitespace-pre-line bg-white/5 p-6 rounded-2xl border border-white/5">
              {selectedNotification.content}
            </div>
          </div>
          <div className="p-6 border-t border-white/10 bg-black/40 flex justify-end space-x-4">
            <button
              onClick={() => setSelectedNotification(null)}
              className="px-6 py-2.5 text-gray-400 hover:text-white font-medium transition-colors"
            >
              Đóng
            </button>
            <button
              onClick={() => {
                setSelectedNotification(null);
                handleMenuClick({ id: selectedNotification.actionLink });
              }}
              className="px-8 py-2.5 bg-[#e53e3e] hover:bg-red-600 text-white rounded-lg font-bold shadow-lg transition-all flex items-center"
            >
              {selectedNotification.actionLabel} <ChevronRight size={16} className="ml-2" />
            </button>
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
        {/* VIEW: TRUNG TÂM THÔNG BÁO */}
        {activeMenu === 'notifications' && <NotificationCenterView />}
        {/* Mock content for other tabs */}
        {activeMenu !== 'notifications' && (
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
              Các module khác đã được thu gọn để tập trung không gian cho module <b>Trung tâm thông báo</b> trong bản demo này.
            </p>
          </div>
        )}
      </main>
      {/* MODALS */}
      {selectedNotification && <NotificationDetailModal />}
    </div>
  );
}