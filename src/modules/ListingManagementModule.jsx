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
  Megaphone, PauseCircle, RefreshCw, ArrowUpCircle
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
export default function ListingManagementModule() {
  // Trạng thái điều hướng chính - Mở sẵn tab Quản lý tin đăng (manage_posts)
  const [activeMenu, setActiveMenu] = useState('manage_posts');
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
  const [selectedListing, setSelectedListing] = useState(null); // Quản lý tin đăng chi tiết
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
  // --- MOCK DATA: QUẢN LÝ TIN ĐĂNG (MODULE 2.1.10) ---
  const initialListings = [
    {
      id: 'LST-1001',
      property: 'SORA Gardens 2 • A10-05',
      title: 'Cho thuê căn hộ cao cấp SORA Gardens 2, Full nội thất, dọn vào ở ngay',
      type: 'Cho thuê',
      price: '15.000.000 đ/tháng',
      status: 'Đang hiển thị', // Đang hiển thị, Tạm ngừng, Hết hạn
      statusStyle: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      views: 1245,
      contacts: 15,
      publishDate: '01/04/2026',
      expiryDate: '01/05/2026',
      isPushed: true
    },
    {
      id: 'LST-1002',
      property: 'The Habitat • A05-11',
      title: 'Bán gấp căn 2PN The Habitat, view nội khu hồ bơi tầng trung',
      type: 'Bán lại',
      price: '2.100.000.000 đ',
      status: 'Đang hiển thị',
      statusStyle: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      views: 856,
      contacts: 8,
      publishDate: '10/03/2026',
      expiryDate: '10/06/2026',
      isPushed: false
    },
    {
      id: 'LST-1003',
      property: 'MIDORI PARK The View • C20-01',
      title: 'Căn hộ Góc 3PN Midori Park The View, sổ hồng sẵn, bao phí thuế',
      type: 'Bán lại',
      price: '3.400.000.000 đ',
      status: 'Hết hạn',
      statusStyle: 'text-gray-400 bg-gray-500/10 border-gray-500/20',
      views: 3200,
      contacts: 42,
      publishDate: '01/01/2026',
      expiryDate: '01/04/2026',
      isPushed: false
    },
    {
      id: 'LST-1004',
      property: 'MIDORI PARK The Glory • B12',
      title: 'Cho thuê The Glory tháp B view hồ bơi phong cách Resort',
      type: 'Cho thuê',
      price: '14.000.000 đ/tháng',
      status: 'Tạm ngừng',
      statusStyle: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      views: 450,
      contacts: 2,
      publishDate: '15/03/2026',
      expiryDate: '15/06/2026',
      isPushed: false
    }
  ];
  const [listings, setListings] = useState(initialListings);
  const [notifications, setNotifications] = useState([]); // Đã lược bớt data cho nhẹ code
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
        { id: 'manage_posts', label: 'Quản lý tin đăng' } // Thêm menu Quản lý tin đăng
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
  // --- VIEW: QUẢN LÝ TIN ĐĂNG (MODULE 2.1.10) ---
  const ManageListingsView = () => {
    const handleAction = (e, listing, actionType) => {
      e.stopPropagation();
      let message = '';
      if (actionType === 'push') {
        if (currentPackageId !== 'premium') {
           alert('Tính năng Đẩy tin chỉ dành riêng cho gói PREMIUM.'); return;
        }
        message = `Đã gửi yêu cầu đẩy tin "${listing.id}" lên vị trí ưu tiên.`;
      } else if (actionType === 'extend') {
        message = `Đã gia hạn thành công tin đăng "${listing.id}" thêm 30 ngày.`;
      } else if (actionType === 'suspend') {
        message = `Tin đăng "${listing.id}" đã được chuyển sang trạng thái tạm ngừng.`;
      }
      // Mô phỏng cập nhật dữ liệu (Trong thực tế sẽ gọi API)
      alert(message);
    };
    // Kiểm tra quyền theo Gói (Feature Gating)
    const canViewStats = currentPackageId === 'vip' || currentPackageId === 'premium';
    const canManageListing = currentPackageId === 'vip' || currentPackageId === 'premium';
    const canPushListing = currentPackageId === 'premium';
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1400px] mx-auto pb-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-8 gap-4 border-b border-white/10 pb-6">
          <div>
            <h2 className="text-3xl font-light text-white mb-2 flex items-center">
              <Megaphone className="mr-3 text-[#e53e3e]" size={32}/>
              Quản lý tin đăng
            </h2>
            <p className="text-gray-400">Theo dõi trạng thái, hiệu quả hiển thị và quản lý các tin rao bán/cho thuê của bạn.</p>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg flex items-center">
              <Tag size={16} className="mr-2 text-gray-400"/> Tổng: <strong className="text-white ml-2">{listings.length} tin đăng</strong>
            </div>
          </div>
        </div>
        {/* Thông báo Nâng cấp gói nếu là BASIC */}
        {!canManageListing && (
          <div className="mb-8 p-4 rounded-xl border bg-blue-500/10 border-blue-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start">
              <Info size={20} className="text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-blue-400 mb-1">Gói BASIC chỉ hỗ trợ xem danh sách tin đăng</h4>
                <p className="text-sm text-blue-200">Nâng cấp lên gói <strong>VIP</strong> hoặc <strong>PREMIUM</strong> để xem thống kê (lượt xem, liên hệ) và thực hiện các thao tác quản lý (Gia hạn, Tạm ngừng, Đẩy tin ưu tiên).</p>
              </div>
            </div>
            <button
              onClick={() => handleMenuClick({id: 'packages'})}
              className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-bold transition-colors whitespace-nowrap"
            >
              Nâng cấp gói ngay
            </button>
          </div>
        )}
        {/* Danh sách Tin Đăng (Dạng bảng Responsive) */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-black/40 text-xs uppercase tracking-wider text-gray-500 border-b border-white/10">
                  <th className="py-4 pl-6 font-medium w-[30%]">Tài sản / Tiêu đề tin</th>
                  <th className="py-4 font-medium w-[15%]">Loại / Giá mong muốn</th>
                  <th className="py-4 font-medium w-[12%]">Trạng thái</th>
                  {canViewStats && (
                    <th className="py-4 font-medium w-[13%] text-center">Hiệu quả</th>
                  )}
                  <th className="py-4 font-medium w-[15%]">Thời gian</th>
                  <th className="py-4 pr-6 font-medium text-right w-[15%]">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {listings.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors group cursor-pointer" onClick={() => setSelectedListing(item)}>
                    {/* Cột 1: Căn hộ & Tiêu đề */}
                    <td className="py-4 pl-6">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 font-bold mb-1 flex items-center">
                          <Building2 size={12} className="mr-1.5"/> {item.property}
                          {item.isPushed && <span className="ml-2 text-[10px] bg-fuchsia-500/20 text-fuchsia-400 px-1.5 py-0.5 rounded border border-fuchsia-500/30">TOP</span>}
                        </span>
                        <span className="text-sm font-medium text-white line-clamp-2 pr-4">{item.title}</span>
                      </div>
                    </td>
                    {/* Cột 2: Loại tin & Giá */}
                    <td className="py-4">
                      <span className={`inline-block text-[10px] px-2 py-0.5 rounded border uppercase tracking-wider mb-1.5 ${item.type === 'Cho thuê' ? 'text-blue-400 border-blue-500/30 bg-blue-500/10' : 'text-amber-400 border-amber-500/30 bg-amber-500/10'}`}>
                          {item.type}
                      </span>
                      <p className="text-sm font-bold text-gray-200">{item.price}</p>
                    </td>
                    {/* Cột 3: Trạng thái */}
                    <td className="py-4">
                      <span className={`inline-block text-[10px] px-2.5 py-1 rounded font-bold uppercase tracking-wider border ${item.statusStyle}`}>
                        {item.status}
                      </span>
                    </td>
                    {/* Cột 4: Hiệu quả (Chỉ hiển thị cho VIP/PREMIUM) */}
                    {canViewStats && (
                      <td className="py-4 text-center">
                        <div className="flex flex-col items-center justify-center space-y-1.5">
                          <span className="text-xs text-gray-400 flex items-center justify-center w-full" title="Lượt xem">
                            <Eye size={14} className="mr-1.5" /> {item.views.toLocaleString()}
                          </span>
                          <span className="text-xs text-[#e53e3e] font-medium flex items-center justify-center w-full" title="Lượt khách liên hệ">
                            <Users size={14} className="mr-1.5" /> {item.contacts} liên hệ
                          </span>
                        </div>
                      </td>
                    )}
                    {/* Cột 5: Thời gian */}
                    <td className="py-4">
                      <div className="flex flex-col text-xs">
                        <span className="text-gray-400 mb-1"><span className="text-gray-500 inline-block w-12">Đăng:</span> {item.publishDate}</span>
                        <span className="text-gray-300"><span className="text-gray-500 inline-block w-12">Hết hạn:</span> {item.expiryDate}</span>
                      </div>
                    </td>
                    {/* Cột 6: Nút thao tác nhanh */}
                    <td className="py-4 pr-6 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        {/* Các nút thao tác chỉ hiện cho gói VIP/Premium */}
                        {canManageListing && (
                          <>
                            {item.status !== 'Hết hạn' && (
                              <button
                                onClick={(e) => handleAction(e, item, 'suspend')}
                                className="p-1.5 bg-black/40 hover:bg-white/10 rounded-lg text-gray-400 hover:text-amber-400 border border-transparent hover:border-white/10 transition-all"
                                title="Tạm ngừng"
                              >
                                <PauseCircle size={16} />
                              </button>
                            )}
                            <button
                              onClick={(e) => handleAction(e, item, 'extend')}
                              className="p-1.5 bg-black/40 hover:bg-white/10 rounded-lg text-gray-400 hover:text-emerald-400 border border-transparent hover:border-white/10 transition-all"
                              title="Gia hạn tin"
                            >
                              <RefreshCw size={16} />
                            </button>
                            {/* Nút Đẩy tin (Chỉ Premium mới được bật, VIP bị disable) */}
                            <button
                              onClick={(e) => handleAction(e, item, 'push')}
                              disabled={!canPushListing}
                              className={`p-1.5 rounded-lg border transition-all ${
                                canPushListing
                                  ? 'bg-black/40 hover:bg-fuchsia-500/20 text-gray-400 hover:text-fuchsia-400 border-transparent hover:border-fuchsia-500/30'
                                  : 'bg-gray-800/50 text-gray-600 border-gray-700/50 cursor-not-allowed'
                              }`}
                              title={canPushListing ? "Đẩy tin lên đầu" : "Tính năng cần gói PREMIUM"}
                            >
                              <ArrowUpCircle size={16} />
                            </button>
                          </>
                        )}
                        <button className="px-3 py-1.5 ml-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-300 hover:text-white transition-colors text-xs font-medium whitespace-nowrap">
                          Chi tiết
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
  // --- MODAL: CHI TIẾT TIN ĐĂNG ---
  const ListingDetailModal = () => {
    if (!selectedListing) return null;
    const canViewStats = currentPackageId === 'vip' || currentPackageId === 'premium';
    const canManageListing = currentPackageId === 'vip' || currentPackageId === 'premium';
    const canPushListing = currentPackageId === 'premium';
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-in fade-in duration-300">
        <div className="bg-[#14151a] border border-white/10 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col transform animate-in zoom-in-95 max-h-[90vh]">
          {/* Header Modal */}
          <div className="flex justify-between items-center p-6 border-b border-white/10 bg-white/5">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-500/10 border border-blue-500/20">
                <Megaphone size={18} className="text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg text-white font-bold">Chi tiết tin đăng</h3>
                <p className="text-xs text-gray-400 font-mono mt-0.5">ID: {selectedListing.id}</p>
              </div>
            </div>
            <button onClick={() => setSelectedListing(null)} className="text-gray-400 hover:text-[#e53e3e] bg-black/20 p-2 rounded-full transition-colors"><X size={20}/></button>
          </div>
          {/* Body Modal */}
          <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
            <div className="flex items-start justify-between mb-6 gap-4">
              <div>
                <span className={`inline-block text-[10px] px-2 py-0.5 rounded border uppercase tracking-wider mb-2 ${selectedListing.type === 'Cho thuê' ? 'text-blue-400 border-blue-500/30 bg-blue-500/10' : 'text-amber-400 border-amber-500/30 bg-amber-500/10'}`}>
                  {selectedListing.type}
                </span>
                <h2 className="text-2xl font-bold text-white leading-tight">{selectedListing.title}</h2>
              </div>
              <span className={`flex-shrink-0 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider border ${selectedListing.statusStyle}`}>
                {selectedListing.status}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Căn hộ</p>
                <p className="text-sm text-gray-200 font-bold flex items-center"><Building2 size={14} className="mr-2 text-gray-400"/> {selectedListing.property}</p>
              </div>
              <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Giá mong muốn</p>
                <p className="text-sm text-emerald-400 font-bold flex items-center"><DollarSign size={14} className="mr-2"/> {selectedListing.price}</p>
              </div>
              <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Ngày đăng</p>
                <p className="text-sm text-gray-200 font-medium flex items-center"><CalendarDays size={14} className="mr-2 text-gray-400"/> {selectedListing.publishDate}</p>
              </div>
              <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Ngày hết hạn</p>
                <p className="text-sm text-gray-200 font-medium flex items-center"><Clock size={14} className="mr-2 text-gray-400"/> {selectedListing.expiryDate}</p>
              </div>
            </div>
            {/* Khối Thống kê Hiệu quả (Feature Gating) */}
            {canViewStats ? (
               <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/20 p-5 rounded-2xl">
                 <h3 className="text-sm font-bold text-white mb-4 flex items-center"><TrendingUp size={16} className="mr-2 text-blue-400"/> Hiệu quả tin đăng</h3>
                 <div className="grid grid-cols-2 gap-4">
                   <div className="bg-black/40 p-4 rounded-xl border border-white/5 text-center">
                     <p className="text-gray-400 text-xs mb-1">Lượt xem tin</p>
                     <p className="text-2xl font-bold text-white">{selectedListing.views.toLocaleString()}</p>
                   </div>
                   <div className="bg-black/40 p-4 rounded-xl border border-[#e53e3e]/20 text-center shadow-[0_0_15px_rgba(229,62,62,0.1)]">
                     <p className="text-gray-400 text-xs mb-1">Khách liên hệ</p>
                     <p className="text-2xl font-bold text-[#e53e3e]">{selectedListing.contacts}</p>
                   </div>
                 </div>
               </div>
            ) : (
               <div className="bg-black/20 border border-white/5 border-dashed p-6 rounded-2xl text-center">
                 <Lock size={24} className="mx-auto mb-3 text-gray-600" />
                 <p className="text-sm text-gray-400 mb-2">Nâng cấp gói thành viên để xem dữ liệu tương tác</p>
                 <button onClick={() => {setSelectedListing(null); handleMenuClick({id: 'packages'});}} className="text-xs text-[#e53e3e] font-bold hover:underline">
                   Xem các gói dịch vụ
                 </button>
               </div>
            )}
          </div>
          {/* Footer Modal - Nút thao tác */}
          <div className="p-6 border-t border-white/10 bg-black/40 flex flex-wrap gap-3 justify-end items-center">
            <button
              onClick={() => setSelectedListing(null)}
              className="px-5 py-2.5 text-gray-400 hover:text-white font-medium transition-colors mr-auto"
            >
              Đóng
            </button>
            {canManageListing && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); alert(`Tạm ngừng tin ${selectedListing.id}`); setSelectedListing(null); }}
                  className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-amber-400 rounded-lg text-sm font-medium transition-all flex items-center"
                >
                  <PauseCircle size={16} className="mr-2" /> Tạm ngừng
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); alert(`Gia hạn tin ${selectedListing.id}`); setSelectedListing(null); }}
                  className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-emerald-400 rounded-lg text-sm font-medium transition-all flex items-center"
                >
                  <RefreshCw size={16} className="mr-2" /> Gia hạn
                </button>
                {canPushListing ? (
                  <button
                    onClick={(e) => { e.stopPropagation(); alert(`Đẩy tin ${selectedListing.id}`); setSelectedListing(null); }}
                    className="px-5 py-2.5 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white rounded-lg text-sm font-bold shadow-lg transition-all flex items-center"
                  >
                    <ArrowUpCircle size={16} className="mr-2" /> Đẩy tin lên TOP
                  </button>
                ) : (
                  <button
                    disabled
                    className="px-5 py-2.5 bg-gray-800/50 text-gray-600 border border-gray-700/50 rounded-lg text-sm font-bold flex items-center cursor-not-allowed"
                    title="Chỉ dành cho gói PREMIUM"
                  >
                    <Lock size={14} className="mr-2" /> Đẩy tin lên TOP
                  </button>
                )}
              </>
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
        {/* VIEW: QUẢN LÝ TIN ĐĂNG */}
        {activeMenu === 'manage_posts' && <ManageListingsView />}
        {/* Các view khác đã được thu gọn để focus vào module tin đăng */}
        {activeMenu !== 'manage_posts' && (
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
              Vui lòng xem tab <b>Quản lý tin đăng</b> (nằm trong thư mục <i>Yêu cầu & Giao dịch</i>) để trải nghiệm module mới cập nhật.
            </p>
          </div>
        )}
      </main>
      {/* MODALS */}
      {selectedListing && <ListingDetailModal />}
    </div>
  );
}