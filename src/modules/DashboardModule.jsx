import React, { useState } from 'react';
import {
  LayoutDashboard, UserCircle, Home, ClipboardList, Activity,
  BarChart3, ShoppingCart, History, Bell, LogOut, ChevronRight,
  ChevronLeft, Plus, Edit2, ShieldCheck, Key, UploadCloud, X,
  FileText, CheckCircle2, Phone, Mail, MapPin, Camera,
  Building2, Sparkles, AlertCircle, Lock, PieChart, Wallet, Calendar,
  Megaphone, Eye, Users, TrendingUp, Menu, Clock
} from 'lucide-react';
export default function DashboardModule() {
  const [activeMenu, setActiveMenu] = useState('account'); // Để mặc định mở tab Account cho dễ xem cập nhật
  // Trạng thái cho Thanh Menu (Sidebar)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState({ transactions: true }); // State lưu menu con đang mở
  // States cho các Popup (Modals) bên trong
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isChangePwdOpen, setIsChangePwdOpen] = useState(false);
  const [isKycRequestOpen, setIsKycRequestOpen] = useState(false);
  const [isPostPropertyOpen, setIsPostPropertyOpen] = useState(false);
  const [postType, setPostType] = useState('sell'); // 'sell', 'rent', or 'buy'
  // State quản lý Gói hiện tại (Demo mục đích)
  const [currentPackageId, setCurrentPackageId] = useState('vip');
  // Cấu hình dữ liệu các Gói (Dựa trên BRD)
  const packageConfig = {
    basic: {
      id: 'basic',
      name: 'BASIC',
      short: 'B',
      color: 'text-gray-300',
      bgGradient: 'from-gray-700 via-gray-800 to-gray-900',
      textGradient: 'from-gray-200 via-gray-400 to-gray-500',
      badgeColor: 'bg-gray-500/20 text-gray-300 border-gray-500/50',
      iconColor: 'text-gray-400'
    },
    vip: {
      id: 'vip',
      name: 'VIP',
      short: 'V',
      color: 'text-yellow-500',
      bgGradient: 'from-gray-800 via-black to-gray-900',
      textGradient: 'from-yellow-200 via-yellow-400 to-yellow-600',
      badgeColor: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50',
      iconColor: 'text-yellow-500'
    },
    premium: {
      id: 'premium',
      name: 'PREMIUM',
      short: 'P',
      color: 'text-fuchsia-500',
      bgGradient: 'from-[#2a0845] via-[#1a0525] to-black',
      textGradient: 'from-fuchsia-300 via-fuchsia-500 to-purple-600',
      badgeColor: 'bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/50',
      iconColor: 'text-fuchsia-400'
    }
  };
  const currentPackage = packageConfig[currentPackageId];
  // Mock Dữ liệu User
  const userData = {
    name: "Nguyễn Văn Tịnh",
    id: "OWNER-8899",
    email: "tinh.nguyen@example.com",
    phone: "0909 123 456",
    address: "Thành phố Mới, Bình Dương",
    packageExpiry: "17/10/2025",
    accountStatus: "Hoạt động",
    kycStatus: "Đã duyệt"
  };
  // Dữ liệu Menu đã được chuẩn hóa theo BRD v3 (Có phân cấp)
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
        { id: 'manage_appointments', label: 'Quản lý lịch hẹn' }
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
    { id: 'change_pwd', icon: Key, label: 'Đổi mật khẩu' },
    { id: 'logout', icon: LogOut, label: 'Đăng xuất', color: 'text-red-400 hover:text-red-300 hover:bg-red-500/10' }
  ];
  const handleMenuClick = (item) => {
    if (item.type === 'divider') return;
    if (item.id === 'change_pwd') {
      setIsChangePwdOpen(true);
    } else if (item.id === 'logout') {
      alert("Đăng xuất thành công!");
    } else {
      setActiveMenu(item.id);
    }
  };
  const toggleSubMenu = (id) => {
    // Nếu đang thu gọn menu mà bấm mở menu con thì tự động bung menu ra
    if (isSidebarCollapsed) {
      setIsSidebarCollapsed(false);
      setOpenSubMenus({ [id]: true });
    } else {
      setOpenSubMenus(prev => ({ ...prev, [id]: !prev[id] }));
    }
  };
  // --- COMPONENT: SIDEBAR CAO CẤP ---
  const Sidebar = () => (
    <aside
      className={`${isSidebarCollapsed ? 'w-24' : 'w-72'} h-screen flex flex-col bg-black/40 backdrop-blur-2xl border-r border-white/10 z-20 relative transition-all duration-300 ease-in-out`}
    >
      {/* Nút Ẩn/Hiện Sidebar */}
      <button
        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        className="absolute -right-3 top-10 bg-gray-800 hover:bg-gray-700 text-white rounded-full p-1 z-50 border border-white/20 shadow-lg transition-colors"
      >
        {isSidebarCollapsed ? <ChevronRight size={16}/> : <ChevronLeft size={16}/>}
      </button>
      {/* Brand & Logo */}
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
      {/* User Quick Info & Compact Package Switcher */}
      <div className={`px-4 pb-5 mb-2 border-b border-white/10 flex flex-col ${isSidebarCollapsed ? 'items-center' : ''}`}>
        {/* Avatar & Name */}
        <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'space-x-3 px-2'}`}>
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#e53e3e] to-orange-400 flex items-center justify-center text-white font-bold text-sm shadow-lg">
              TN
            </div>
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-black rounded-full"></div>
          </div>
          {!isSidebarCollapsed && (
            <div className="overflow-hidden whitespace-nowrap flex-1">
              <h2 className="text-white font-medium text-sm">{userData.name}</h2>
              <p className="text-[10px] text-gray-500 font-mono mt-0.5">{userData.id}</p>
            </div>
          )}
        </div>
        {/* Chuyển Gói Nhanh - Gọn gàng */}
        <div className={`mt-4 ${isSidebarCollapsed ? 'w-full flex justify-center' : 'px-2'}`}>
          {!isSidebarCollapsed ? (
            <div className="relative group">
              <select
                value={currentPackageId}
                onChange={(e) => setCurrentPackageId(e.target.value)}
                className={`w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-md pl-7 pr-4 py-1.5 text-xs font-bold outline-none cursor-pointer appearance-none transition-colors ${currentPackage.color}`}
              >
                <option value="basic" className="bg-gray-900 text-gray-300">GÓI BASIC (TEST)</option>
                <option value="vip" className="bg-gray-900 text-yellow-500">GÓI VIP (TEST)</option>
                <option value="premium" className="bg-gray-900 text-fuchsia-500">GÓI PREMIUM (TEST)</option>
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
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto custom-scrollbar px-3 py-2 space-y-1.5">
        {menuItems.map((item, idx) => {
          if (item.type === 'divider') {
            return <div key={idx} className="h-px bg-white/10 my-4 mx-4"></div>;
          }
          const hasChildren = !!item.children;
          const isMenuOpen = openSubMenus[item.id];
          const isChildActive = hasChildren && item.children.some(child => child.id === activeMenu);
          const isActive = activeMenu === item.id || isChildActive;
          return (
            <div key={item.id} className="w-full">
              <button
                onClick={() => hasChildren ? toggleSubMenu(item.id) : handleMenuClick(item)}
                title={isSidebarCollapsed ? item.label : ''}
                className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center p-3' : 'space-x-3 px-4 py-3'} rounded-xl transition-all duration-300 group ${
                  isActive && !hasChildren && item.id !== 'logout' && item.id !== 'change_pwd'
                    ? 'bg-gradient-to-r from-[#e53e3e]/20 to-transparent text-white border-l-2 border-[#e53e3e]'
                    : (isChildActive ? 'text-white' : `${item.color || 'text-gray-400 hover:text-white hover:bg-white/5'}`)
                }`}
              >
                <item.icon size={20} className={`${isActive && item.id !== 'logout' ? 'text-[#e53e3e]' : ''} group-hover:scale-110 transition-transform flex-shrink-0`} />
                {!isSidebarCollapsed && (
                  <>
                    <span className="text-sm font-medium tracking-wide whitespace-nowrap overflow-hidden text-left flex-1">
                      {item.label}
                    </span>
                    {hasChildren ? (
                      <ChevronRight size={16} className={`flex-shrink-0 transition-transform duration-300 ${isMenuOpen ? 'rotate-90 text-white' : 'text-gray-500'}`} />
                    ) : (
                      isActive && item.id !== 'logout' && item.id !== 'change_pwd' && <ChevronRight size={16} className="ml-auto text-[#e53e3e] flex-shrink-0" />
                    )}
                  </>
                )}
              </button>
              {/* Hiển thị Menu con */}
              {hasChildren && isMenuOpen && !isSidebarCollapsed && (
                <div className="mt-1 ml-4 pl-6 border-l border-white/10 space-y-1 animate-in fade-in slide-in-from-top-2 duration-300">
                  {item.children.map(child => {
                    const isChildItemActive = activeMenu === child.id;
                    return (
                      <button
                        key={child.id}
                        onClick={() => handleMenuClick(child)}
                        className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors relative ${
                          isChildItemActive
                            ? 'text-white bg-white/10 font-medium'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
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
  // --- VIEW 1: PREMIUM DASHBOARD CÓ PHÂN QUYỀN ---
  const DashboardView = () => {
    // Logic Phân quyền dựa trên gói hiện tại
    const isVIPorPremium = currentPackageId === 'vip' || currentPackageId === 'premium';
    const isPremium = currentPackageId === 'premium';
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-[1600px] mx-auto">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 space-y-4 md:space-y-0">
          <div>
            <h2 className="text-3xl font-light text-white mb-2">Xin chào, <span className="font-semibold">{userData.name}</span></h2>
            <p className="text-gray-400">Chào mừng trở lại! Dưới đây là tổng quan tài sản của bạn hôm nay.</p>
          </div>
          {/* Quick Actions */}
          <div className="flex space-x-3 relative">
            <button
              onClick={() => { setPostType('buy'); setIsPostPropertyOpen(true); }}
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-5 py-2.5 rounded-lg font-medium transition-all backdrop-blur-md"
            >
              <ShoppingCart size={18} />
              <span className="hidden sm:inline">Nhu cầu Mua</span>
            </button>
            <button
              onClick={() => { setPostType('sell'); setIsPostPropertyOpen(true); }}
              className="flex items-center space-x-2 bg-[#e53e3e] hover:bg-red-600 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-[0_0_20px_rgba(229,62,62,0.3)]"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Đăng tin Bán / Cho thuê</span>
            </button>
          </div>
        </div>
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Tổng Tài Sản', value: '28', icon: Building2, color: 'text-blue-400', bg: 'bg-blue-500/10', trend: 'Tại 3 dự án' },
            { label: 'Tình Trạng Đăng Tin', value: '12', icon: Activity, color: 'text-emerald-400', bg: 'bg-emerald-500/10', trend: 'Tin đang hiển thị', requiresVIP: true },
            { label: 'Lịch Hẹn & Giao Dịch', value: '02', icon: Calendar, color: 'text-amber-400', bg: 'bg-amber-500/10', trend: 'Lịch hẹn tuần này', requiresVIP: true },
            { label: 'Trung Tâm Thông Báo', value: '05', icon: Bell, color: 'text-[#e53e3e]', bg: 'bg-[#e53e3e]/10', trend: 'Cập nhật từ hệ thống' }
          ].map((stat, i) => {
            const isLocked = stat.requiresVIP && !isVIPorPremium;
            if (isLocked) {
              return (
                <div key={i} className="bg-gray-900/50 border border-gray-800 border-dashed backdrop-blur-xl p-6 rounded-2xl flex flex-col items-center justify-center text-center transition-all opacity-80">
                  <Lock size={24} className="text-gray-600 mb-3" />
                  <p className="text-gray-400 text-sm font-medium mb-1">{stat.label}</p>
                  <p className="text-[11px] text-gray-500">Nâng cấp VIP để sử dụng</p>
                </div>
              );
            }
            return (
              <div key={i} className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-2xl relative overflow-hidden group hover:border-white/20 transition-all">
                <div className={`absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity ${stat.color}`}>
                  <stat.icon size={64} strokeWidth={1} />
                </div>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${stat.bg} ${stat.color}`}>
                  <stat.icon size={20} />
                </div>
                <p className="text-gray-400 text-sm font-medium mb-1">{stat.label}</p>
                <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
                <p className="text-xs text-gray-500">{stat.trend}</p>
              </div>
            );
          })}
        </div>
        {/* Main Grid: Properties Overview & VIP Card */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Col: Tổng quan tài sản & Lịch trình tiến độ */}
          <div className="xl:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-medium text-white flex items-center">
                <PieChart className="mr-2 text-[#e53e3e]" size={20} /> Tổng quan tài sản
              </h3>
              <button
                onClick={() => setActiveMenu('properties')}
                className="text-sm bg-white/5 hover:bg-white/10 px-4 py-1.5 rounded-lg text-white transition-colors flex items-center border border-white/10"
              >
                Vào kho tài sản <ChevronRight size={14} className="ml-1" />
              </button>
            </div>
            {/* Block 1: Phân bổ tài sản (Aggregate Data) */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-gray-400 text-sm font-medium">Trạng thái danh mục (28 căn hộ)</p>
              </div>
              <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden flex mb-4">
                <div className="bg-blue-500 h-full w-[50%]"></div>
                <div className="bg-emerald-500 h-full w-[35%]"></div>
                <div className="bg-amber-500 h-full w-[15%]"></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500 flex-shrink-0"></div>
                  <div>
                    <p className="text-white font-bold">14 <span className="text-xs text-gray-400 font-normal">căn</span></p>
                    <p className="text-xs text-gray-500 uppercase">Đang cho thuê</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 flex-shrink-0"></div>
                  <div>
                    <p className="text-white font-bold">10 <span className="text-xs text-gray-400 font-normal">căn</span></p>
                    <p className="text-xs text-gray-500 uppercase">Đang ở / Tự quản</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500 flex-shrink-0"></div>
                  <div>
                    <p className="text-white font-bold">04 <span className="text-xs text-gray-400 font-normal">căn</span></p>
                    <p className="text-xs text-gray-500 uppercase">Đang rao bán</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Block 2: Danh sách các công việc đang xử lý (Theo đúng Use Case) */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6">
              <h4 className="text-white font-medium mb-5 flex items-center">
                <Activity size={18} className="mr-2 text-emerald-400"/> Tiến độ & Lịch trình
              </h4>
              <div className="space-y-3">
                {/* Dòng 1: Xem Tiến độ Sổ hồng */}
                <div className="bg-black/30 border border-white/5 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group">
                  <div className="flex items-start space-x-4 mb-3 md:mb-0">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="text-blue-400" size={20} />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] text-gray-300 font-medium tracking-wider">SORA 2 • A10-05</span>
                        <span className="text-blue-400 text-xs font-bold bg-blue-500/10 px-2 py-0.5 rounded">SỔ HỒNG</span>
                      </div>
                      <p className="text-white font-medium mt-1">Đã có thông báo đóng 5% cuối</p>
                      <p className="text-sm text-gray-500 mt-0.5">Tiến độ: 90% • Chờ nhận sổ</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 border border-white/10 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors ml-14 md:ml-0 whitespace-nowrap">
                    Xem lộ trình
                  </button>
                </div>
                {/* Dòng 2: Xem đợt thanh toán */}
                <div className="bg-black/30 border border-white/5 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group">
                  <div className="flex items-start space-x-4 mb-3 md:mb-0">
                    <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
                      <Wallet className="text-red-400" size={20} />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] text-gray-300 font-medium tracking-wider">THE GLORY • B12</span>
                        <span className="text-red-400 text-xs font-bold bg-red-500/10 px-2 py-0.5 rounded">THANH TOÁN</span>
                      </div>
                      <p className="text-white font-medium mt-1">Đến hạn thanh toán đợt 5</p>
                      <p className="text-sm text-gray-500 mt-0.5">Hạn chót: 15/10/2025 • Số tiền: 250Tr</p>
                    </div>
                  </div>
                </div>
                {/* Dòng 3: Giao dịch Real-time / Lịch hẹn (CHỈ VIP/PREMIUM) */}
                {isVIPorPremium ? (
                  <div className="bg-black/30 border border-white/5 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group">
                    <div className="flex items-start space-x-4 mb-3 md:mb-0">
                      <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                        <Calendar className="text-yellow-500" size={20} />
                      </div>
                      <div className="overflow-hidden">
                        <div className="flex items-center space-x-2">
                          <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] text-gray-300 font-medium tracking-wider">MIDORI • V02</span>
                          <span className="text-yellow-500 text-xs font-bold bg-yellow-500/10 px-2 py-0.5 rounded">GIAO DỊCH</span>
                        </div>
                        <p className="text-white font-medium mt-1 truncate">Khách hàng Trần Văn B (Đang mua lại)</p>
                        <div className="flex items-center mt-2 space-x-1.5 text-[10px] sm:text-xs overflow-x-auto custom-scrollbar pb-1">
                           <span className="text-green-400 font-medium flex items-center whitespace-nowrap"><CheckCircle2 size={12} className="mr-1"/> Đang đàm phán</span>
                           <ChevronRight size={12} className="text-gray-600 flex-shrink-0" />
                           <span className="text-yellow-500 font-bold bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/20 animate-pulse whitespace-nowrap">Đặt cọc</span>
                           <ChevronRight size={12} className="text-gray-600 flex-shrink-0" />
                           <span className="text-gray-500 font-medium whitespace-nowrap">Đã giao dịch</span>
                        </div>
                        <p className="text-[10px] text-gray-500 mt-1 italic flex items-center">
                          <UserCircle size={10} className="mr-1"/> Broker: Nguyễn Tú cập nhật 1 giờ trước
                        </p>
                      </div>
                    </div>
                    <button className="px-4 py-2 border border-white/10 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors ml-14 md:ml-0 whitespace-nowrap">
                      Chi tiết
                    </button>
                  </div>
                ) : (
                  <div className="bg-gray-900/50 border border-gray-800 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center">
                    <Lock size={24} className="text-gray-600 mb-2" />
                    <p className="text-sm text-gray-400">Nâng cấp VIP để quản lý Lịch hẹn & Giao dịch trực tuyến</p>
                  </div>
                )}
              </div>
            </div>
            {/* Block 3: Quản lý Tin đăng & Khách quan tâm (CHỈ VIP/PREMIUM) */}
            {isVIPorPremium && (
              <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 animate-in fade-in slide-in-from-bottom-4">
                <div className="flex justify-between items-center mb-5">
                  <h4 className="text-white font-medium flex items-center">
                    <Megaphone size={18} className="mr-2 text-blue-400"/> Quản lý Tin đăng & Tương tác
                  </h4>
                  <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded font-medium border border-blue-500/30">Tính năng VIP</span>
                </div>
                <div className="space-y-4">
                  {/* Item 1 */}
                  <div className="bg-black/30 border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-white/5 transition-colors gap-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold uppercase tracking-wider border border-emerald-500/20">Đang rao bán</span>
                        <span className="text-gray-400 text-xs">Cập nhật 2 giờ trước</span>
                      </div>
                      <p className="text-white font-medium text-lg">Căn hộ SORA 2 • A10-05</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                        <span className="flex items-center"><Eye size={14} className="mr-1.5 text-gray-500"/> 342</span>
                        <span className="flex items-center"><Users size={14} className="mr-1.5 text-blue-400"/> <strong className="text-blue-400 mr-1">12</strong> Quan tâm</span>
                      </div>
                    </div>
                    <div className="flex sm:flex-col lg:flex-row gap-2 w-full sm:w-auto">
                      <button className="flex-1 sm:flex-none px-4 py-2 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 transition-colors">Khách Hàng</button>
                      <button className="flex-1 sm:flex-none px-4 py-2 bg-white/10 rounded-lg text-sm text-white hover:bg-white/20 transition-colors">Quản lý</button>
                    </div>
                  </div>
                  {/* Item 2 */}
                  <div className="bg-black/30 border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-white/5 transition-colors gap-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded font-bold uppercase tracking-wider border border-blue-500/20">Đang cho thuê</span>
                        <span className="text-gray-400 text-xs">Cập nhật hôm qua</span>
                      </div>
                      <p className="text-white font-medium text-lg">Shophouse THE GLORY • SH-01</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                        <span className="flex items-center"><Eye size={14} className="mr-1.5 text-gray-500"/> 856</span>
                        <span className="flex items-center"><Users size={14} className="mr-1.5 text-blue-400"/> <strong className="text-blue-400 mr-1">28</strong> Quan tâm</span>
                      </div>
                    </div>
                    <div className="flex sm:flex-col lg:flex-row gap-2 w-full sm:w-auto">
                      <button className="flex-1 sm:flex-none px-4 py-2 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 transition-colors">Khách Hàng</button>
                      <button className="flex-1 sm:flex-none px-4 py-2 bg-white/10 rounded-lg text-sm text-white hover:bg-white/20 transition-colors">Quản lý</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Right Col: VIP Card & Financial Overview */}
          <div className="xl:col-span-1 space-y-6">
            <div className="flex justify-between items-center">
               <h3 className="text-xl font-medium text-white">Thẻ Thành viên</h3>
            </div>
            {/* Black Card Design */}
            <div className={`bg-gradient-to-br ${currentPackage.bgGradient} rounded-2xl p-6 relative overflow-hidden border border-white/10 shadow-2xl transition-all duration-500`}>
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="flex justify-between items-start mb-8">
                <Sparkles className={`${currentPackage.iconColor} transition-colors duration-500`} size={28} />
                <span className={`${currentPackage.badgeColor} border px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest transition-colors duration-500`}>
                  Active
                </span>
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Gói hiện tại</p>
                <h3 className={`text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r ${currentPackage.textGradient} tracking-wider mb-6 transition-all duration-500`}>
                  {currentPackage.name} MEMBER
                </h3>
              </div>
              <div className="flex justify-between items-end font-mono text-sm text-gray-300">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase mb-1 font-sans">Chủ sở hữu</p>
                  <p className="truncate max-w-[120px]">{userData.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-500 uppercase mb-1 font-sans">Ngày hết hạn</p>
                  <p>{currentPackageId === 'basic' ? 'Không thời hạn' : userData.packageExpiry}</p>
                </div>
              </div>
            </div>
            {/* Tài chính & Thanh toán (CHỈ PREMIUM) */}
            {isPremium && (
               <div className="bg-gradient-to-r from-fuchsia-500/10 to-purple-600/10 border border-fuchsia-500/30 backdrop-blur-md rounded-2xl p-6 animate-in fade-in zoom-in-95">
                 <div className="flex justify-between items-center mb-5">
                   <h4 className="text-fuchsia-300 font-medium flex items-center">
                     <BarChart3 size={18} className="mr-2"/> Phân tích (Premium)
                   </h4>
                 </div>
                 {/* Biểu đồ Tiến độ Real-time */}
                 <div className="mb-6 bg-black/20 p-4 rounded-xl border border-fuchsia-500/20">
                    <p className="text-[11px] text-fuchsia-200/70 uppercase tracking-widest mb-3">Mức độ quan tâm (Real-time)</p>
                    <div className="flex items-end justify-between h-20 gap-2">
                        {[40, 60, 45, 80, 50, 95, 75].map((height, idx) => (
                           <div key={idx} className="w-full relative group">
                              <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-fuchsia-600 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                {height * 2}
                              </div>
                              <div
                                className={`w-full rounded-t-sm transition-all duration-1000 ${idx === 5 ? 'bg-fuchsia-400 shadow-[0_0_10px_rgba(232,121,249,0.5)]' : 'bg-fuchsia-500/40 hover:bg-fuchsia-500/60'}`}
                                style={{ height: `${height}%` }}
                              ></div>
                           </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-2 text-[10px] text-gray-500 font-mono">
                       <span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span><span className="text-fuchsia-400 font-bold">T7</span><span>CN</span>
                    </div>
                 </div>
                 {/* Báo cáo & Tài chính */}
                 <div className="space-y-4">
                   <div className="flex justify-between items-center border-b border-fuchsia-500/20 pb-3">
                     <span className="text-sm text-gray-300">Quan tâm (Tuần)</span>
                     <span className="text-white font-bold flex items-center text-emerald-400">
                       <TrendingUp size={14} className="mr-1"/> +35%
                     </span>
                   </div>
                   <div className="flex justify-between items-center border-b border-fuchsia-500/20 pb-3">
                     <span className="text-sm text-gray-300">Dự thu (Cho thuê)</span>
                     <span className="text-white font-bold text-sm">125 Tr VNĐ</span>
                   </div>
                   <div className="pt-1">
                     <button className="w-full py-2.5 bg-fuchsia-500/20 hover:bg-fuchsia-500/30 border border-fuchsia-500/30 text-fuchsia-200 rounded-lg text-sm transition-colors font-medium">
                       Xuất Báo Cáo
                     </button>
                   </div>
                 </div>
               </div>
            )}
            {/* Quick Notifications */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6">
              <h4 className="text-white font-medium mb-4 flex items-center"><Bell size={16} className="mr-2 text-yellow-500"/> Thông báo mới</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#e53e3e] rounded-full mt-1.5 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm text-gray-200">Hợp đồng thuê căn A10-05 sắp hết hạn</p>
                    <p className="text-xs text-gray-500 mt-1">2 giờ trước</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm text-gray-200">Xác nhận nhận thanh toán kỳ 4 căn B12</p>
                    <p className="text-xs text-gray-500 mt-1">Hôm qua</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  // --- VIEW 2: THÔNG TIN TÀI KHOẢN ---
  const AccountView = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1200px] mx-auto">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-light text-white mb-2">Thông tin tài khoản</h2>
          <p className="text-gray-400">Quản lý hồ sơ định danh và các thông tin liên hệ bảo mật của bạn.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cột trái: Avatar & Status */}
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#e53e3e]/20 to-transparent"></div>
            <div className="relative w-32 h-32 mx-auto mb-6 group cursor-pointer z-10">
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#e53e3e] to-orange-500 flex items-center justify-center text-4xl text-white font-bold border-4 border-[#14151a] shadow-xl">
                TN
              </div>
              <div className="absolute inset-0 bg-black/60 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={24} className="text-white mb-1" />
                <span className="text-[10px] font-medium text-white">Đổi ảnh</span>
              </div>
            </div>
            <h3 className="text-2xl font-medium text-white relative z-10">{userData.name}</h3>
            <p className="text-sm text-[#e53e3e] font-mono mt-1 mb-6 relative z-10">{userData.id}</p>
            <div className="flex flex-col space-y-3 text-sm relative z-10 bg-black/20 p-4 rounded-xl border border-white/5">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Trạng thái TK</span>
                <span className="text-green-400 flex items-center"><CheckCircle2 size={14} className="mr-1"/>{userData.accountStatus}</span>
              </div>
               <div className="flex justify-between items-center pt-2 border-t border-white/5">
                <span className="text-gray-400">Gói dịch vụ</span>
                <span className={`${currentPackage.color} font-bold uppercase`}>{currentPackage.name}</span>
              </div>
            </div>
            {/* DỜI NÚT ĐỔI MẬT KHẨU SANG CỘT TRÁI CHUẨN UX HƠN */}
            <button
              onClick={() => setIsChangePwdOpen(true)}
              className="w-full mt-4 relative z-10 flex items-center justify-center text-sm font-medium text-gray-300 hover:text-white transition-all bg-black/20 hover:bg-white/10 py-3 rounded-xl border border-white/5 hover:border-white/20 group shadow-lg"
            >
              <Key size={16} className="mr-2 text-gray-500 group-hover:text-amber-400 transition-colors" />
              Đổi mật khẩu bảo mật
            </button>
          </div>
        </div>
        {/* Cột phải: Info, KYC & Request History */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card: Thông tin liên hệ */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 relative">
            <button onClick={() => setIsEditProfileOpen(true)} className="absolute top-8 right-8 text-gray-400 hover:text-[#e53e3e] transition-colors p-2 bg-white/5 hover:bg-white/10 rounded-lg">
              <Edit2 size={18} />
            </button>
            <h4 className="text-xl text-white font-medium mb-6">Thông tin liên hệ cơ bản</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="p-3 bg-white/5 rounded-lg mr-4"><Phone size={20} className="text-blue-400" /></div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Số điện thoại</p>
                  <p className="text-white text-base font-medium">{userData.phone}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="p-3 bg-white/5 rounded-lg mr-4"><Mail size={20} className="text-emerald-400" /></div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="text-white text-base font-medium truncate max-w-[200px]">{userData.email}</p>
                </div>
              </div>
              <div className="flex items-start md:col-span-2">
                <div className="p-3 bg-white/5 rounded-lg mr-4"><MapPin size={20} className="text-amber-400" /></div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Địa chỉ liên hệ</p>
                  <p className="text-white text-base font-medium">{userData.address}</p>
                </div>
              </div>
            </div>
          </div>
          {/* Card: Hồ sơ định danh KYC */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-xl text-white font-medium">Hồ sơ định danh (KYC)</h4>
              <span className="flex items-center bg-green-500/10 text-green-400 text-sm px-3 py-1 rounded-full border border-green-500/20">
                <CheckCircle2 size={16} className="mr-1.5"/> Đã xác thực
              </span>
            </div>
            <div className="bg-black/40 rounded-xl p-5 border border-white/5 mb-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-400 mb-1">Căn cước công dân / Passport</p>
                <p className="text-xl text-white tracking-widest font-mono">079 099 123 456</p>
              </div>
              <ShieldCheck size={40} className="text-green-500/30" />
            </div>
            <div className="bg-[#e53e3e]/10 border border-[#e53e3e]/30 rounded-xl p-4 mb-6 flex items-start space-x-3">
              <AlertCircle size={20} className="text-[#e53e3e] flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="text-gray-200 font-medium mb-1">Lưu ý quan trọng</p>
                <p className="text-gray-400 leading-relaxed">Thông tin định danh liên kết trực tiếp với giấy tờ sở hữu BĐS. Bạn không thể tự chỉnh sửa. Để thay đổi, vui lòng tạo Yêu cầu điều chỉnh để Admin phê duyệt.</p>
              </div>
            </div>
            <button onClick={() => setIsKycRequestOpen(true)} className="px-6 py-3 bg-[#e53e3e] hover:bg-red-600 text-white rounded-lg font-medium transition-colors text-sm flex items-center shadow-lg w-full md:w-auto justify-center">
              <Edit2 size={16} className="mr-2"/> Tạo yêu cầu điều chỉnh KYC
            </button>
          </div>
          {/* BỔ SUNG: Lịch sử yêu cầu điều chỉnh hồ sơ */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-xl text-white font-medium flex items-center">
                <History size={20} className="mr-2 text-blue-400" />
                Lịch sử yêu cầu điều chỉnh
              </h4>
            </div>
            <div className="space-y-4">
              {/* Item 1 - Chờ xử lý */}
              <div className="bg-black/30 border border-white/5 rounded-xl p-4 md:p-5 flex flex-col md:flex-row md:justify-between md:items-center gap-4 hover:bg-white/5 transition-colors">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-white font-medium text-sm">YC-20260317</span>
                    <span className="text-[10px] bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded font-medium border border-yellow-500/20">Chờ xử lý</span>
                  </div>
                  <p className="text-sm text-gray-300 font-medium">Cập nhật Hộ chiếu mới</p>
                  <p className="text-xs text-gray-500 mt-1">Lý do: Đổi hộ chiếu do hết hạn</p>
                </div>
                <div className="flex items-center text-xs text-gray-400 md:text-right">
                  <Clock size={14} className="mr-1.5" />
                  <span>Gửi ngày: 17/03/2026</span>
                </div>
              </div>
              {/* Item 2 - Đã duyệt */}
              <div className="bg-black/30 border border-white/5 rounded-xl p-4 md:p-5 flex flex-col md:flex-row md:justify-between md:items-center gap-4 hover:bg-white/5 transition-colors">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-white font-medium text-sm">YC-20241105</span>
                    <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded font-medium border border-green-500/20">Đã duyệt</span>
                  </div>
                  <p className="text-sm text-gray-300 font-medium">Thay đổi CCCD gắn chip</p>
                  <p className="text-xs text-gray-500 mt-1">Ghi chú từ Admin: Đã cập nhật hồ sơ khớp với bản gốc.</p>
                </div>
                <div className="flex items-center text-xs text-gray-400 md:text-right">
                  <CheckCircle2 size={14} className="mr-1.5 text-green-500/50" />
                  <span>Xử lý: 06/11/2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  // --- CÁC MODALS ---
  const EditProfileModal = () => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#14151a] border border-white/10 rounded-xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center p-5 border-b border-white/10">
          <h3 className="text-lg text-white font-medium">Cập nhật thông tin liên hệ</h3>
          <button onClick={() => setIsEditProfileOpen(false)} className="text-gray-400 hover:text-white"><X size={20}/></button>
        </div>
        <div className="p-6 space-y-4">
          <div><label className="block text-sm text-gray-400 mb-1.5">Số điện thoại</label><input type="text" defaultValue={userData.phone} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded focus:border-[#e53e3e] outline-none text-white" /></div>
          <div><label className="block text-sm text-gray-400 mb-1.5">Email</label><input type="email" defaultValue={userData.email} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded focus:border-[#e53e3e] outline-none text-white" /></div>
          <div><label className="block text-sm text-gray-400 mb-1.5">Địa chỉ liên hệ</label><textarea rows="3" defaultValue={userData.address} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded focus:border-[#e53e3e] outline-none text-white resize-none"></textarea></div>
        </div>
        <div className="p-5 border-t border-white/10 flex justify-end space-x-3 bg-black/20">
          <button onClick={() => setIsEditProfileOpen(false)} className="px-5 py-2 text-gray-400 hover:text-white">Hủy</button>
          <button onClick={() => setIsEditProfileOpen(false)} className="px-5 py-2 bg-[#e53e3e] hover:bg-red-700 text-white rounded font-medium transition-colors">Lưu thay đổi</button>
        </div>
      </div>
    </div>
  );
  const ChangePasswordModal = () => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#14151a] border border-white/10 rounded-xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center p-5 border-b border-white/10">
          <h3 className="text-lg text-white font-medium">Đổi mật khẩu</h3>
          <button onClick={() => setIsChangePwdOpen(false)} className="text-gray-400 hover:text-white"><X size={20}/></button>
        </div>
        <div className="p-6 space-y-4">
          <div><label className="block text-sm text-gray-400 mb-1.5">Mật khẩu hiện tại</label><input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded focus:border-[#e53e3e] outline-none text-white" /></div>
          <div><label className="block text-sm text-gray-400 mb-1.5">Mật khẩu mới</label><input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded focus:border-[#e53e3e] outline-none text-white" /></div>
          <div><label className="block text-sm text-gray-400 mb-1.5">Xác nhận mật khẩu mới</label><input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded focus:border-[#e53e3e] outline-none text-white" /></div>
        </div>
        <div className="p-5 border-t border-white/10 flex justify-end space-x-3 bg-black/20">
          <button onClick={() => setIsChangePwdOpen(false)} className="px-5 py-2 text-gray-400 hover:text-white">Hủy</button>
          <button onClick={() => setIsChangePwdOpen(false)} className="px-5 py-2 bg-[#e53e3e] hover:bg-red-700 text-white rounded font-medium transition-colors">Cập nhật mật khẩu</button>
        </div>
      </div>
    </div>
  );
  const KycRequestModal = () => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#14151a] border border-white/10 rounded-xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-5 border-b border-white/10">
          <div>
            <h3 className="text-lg text-white font-medium">Yêu cầu điều chỉnh thông định danh</h3>
            <p className="text-xs text-gray-400 mt-1">Yêu cầu sẽ được Admin Hồ sơ xem xét trong 24-48h.</p>
          </div>
          <button onClick={() => setIsKycRequestOpen(false)} className="text-gray-400 hover:text-white"><X size={20}/></button>
        </div>
        <div className="p-6 overflow-y-auto custom-scrollbar space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Loại yêu cầu</label>
              <select className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded focus:border-[#e53e3e] outline-none text-white appearance-none">
                <option className="bg-gray-900">Cập nhật CCCD gắn chip mới</option>
                <option className="bg-gray-900">Thay đổi Hộ chiếu</option>
                <option className="bg-gray-900">Khác</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Thông tin hiện tại</label>
              <input type="text" value="CCCD: 079099123456" disabled className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded text-gray-500 cursor-not-allowed" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Thông tin đề nghị điều chỉnh (*)</label>
            <input type="text" placeholder="Nhập số CCCD/Passport mới..." className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded focus:border-[#e53e3e] outline-none text-white" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Lý do điều chỉnh (*)</label>
            <textarea rows="2" placeholder="Ví dụ: Đổi từ CMND 9 số sang CCCD gắn chip..." className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded focus:border-[#e53e3e] outline-none text-white resize-none"></textarea>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Hồ sơ đính kèm (Bản chụp rõ nét) (*)</label>
            <div className="border border-dashed border-gray-600 bg-white/5 rounded-lg p-8 flex flex-col items-center justify-center text-center hover:border-[#e53e3e] transition-colors cursor-pointer">
              <UploadCloud size={32} className="text-gray-500 mb-3" />
              <span className="text-sm font-medium text-gray-300">Click để tải file lên (JPG, PNG, PDF)</span>
              <span className="text-xs text-gray-500 mt-1">Kích thước tối đa 5MB/file</span>
            </div>
          </div>
        </div>
        <div className="p-5 border-t border-white/10 flex justify-end space-x-3 bg-black/20">
          <button onClick={() => setIsKycRequestOpen(false)} className="px-5 py-2 text-gray-400 hover:text-white">Hủy</button>
          <button onClick={() => setIsKycRequestOpen(false)} className="px-6 py-2 bg-[#e53e3e] hover:bg-red-700 text-white rounded font-medium transition-colors">Gửi yêu cầu</button>
        </div>
      </div>
    </div>
  );
  const PostPropertyModal = () => {
    const isBuy = postType === 'buy';
    const isSell = postType === 'sell';
    const isRent = postType === 'rent';
    const isSellOrRent = isSell || isRent;
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200">
        <div className="bg-[#14151a] border border-white/10 rounded-xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
          <div className="flex justify-between items-center p-5 border-b border-white/10">
            <div>
              <h3 className="text-lg text-white font-medium">
                {isBuy ? 'Đăng Nhu Cầu Mua BĐS' : 'Yêu cầu Xử lý Tài sản'}
              </h3>
              <p className="text-xs text-gray-400 mt-1">Thông tin sẽ được ghi nhận và đưa lên sàn giao dịch.</p>
            </div>
            <button onClick={() => setIsPostPropertyOpen(false)} className="text-gray-400 hover:text-white"><X size={20}/></button>
          </div>
          {/* TABS CHO BÁN / CHO THUÊ */}
          {isSellOrRent && (
            <div className="flex border-b border-white/10 bg-black/20">
              <button
                className={`flex-1 py-3.5 text-sm font-medium text-center transition-all relative ${isSell ? 'text-[#e53e3e] bg-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                onClick={() => setPostType('sell')}
              >
                Đăng tin Bán lại
                {isSell && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#e53e3e]"></div>}
              </button>
              <button
                className={`flex-1 py-3.5 text-sm font-medium text-center transition-all relative ${isRent ? 'text-[#e53e3e] bg-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                onClick={() => setPostType('rent')}
              >
                Đăng tin Cho thuê
                {isRent && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#e53e3e]"></div>}
              </button>
            </div>
          )}
          <div className="p-6 overflow-y-auto custom-scrollbar space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {isSellOrRent ? (
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-400 mb-1.5">Tài sản / Căn hộ cần {isSell ? 'Bán' : 'Cho thuê'}</label>
                  <select className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded focus:border-[#e53e3e] outline-none text-white appearance-none">
                    <option className="bg-gray-900">SORA 2 • A10-05</option>
                    <option className="bg-gray-900">THE GLORY • B12</option>
                    <option className="bg-gray-900">MIDORI • V02</option>
                  </select>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Dự án quan tâm</label>
                    <select className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded focus:border-[#e53e3e] outline-none text-white appearance-none">
                      <option className="bg-gray-900">SORA Gardens 1 & 2</option>
                      <option className="bg-gray-900">MIDORI PARK The Glory</option>
                      <option className="bg-gray-900">MIDORI PARK The View</option>
                      <option className="bg-gray-900">Khác</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Nhu cầu cụ thể</label>
                    <select className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded focus:border-[#e53e3e] outline-none text-white appearance-none">
                      <option className="bg-gray-900">Tìm mua Căn hộ</option>
                      <option className="bg-gray-900">Tìm mua Nhà phố</option>
                      <option className="bg-gray-900">Tìm mua Biệt thự</option>
                    </select>
                  </div>
                </>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">
                {isBuy ? 'Ngân sách dự kiến (VNĐ) (*)' : (isSell ? 'Giá bán mong muốn (VNĐ) (*)' : 'Giá thuê mong muốn (VNĐ/Tháng) (*)')}
              </label>
              <input type="text" placeholder={isBuy ? "VD: 2.500.000.000 - 3.000.000.000" : (isSell ? "VD: 2.500.000.000" : "VD: 15.000.000")} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded focus:border-[#e53e3e] outline-none text-white" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Ghi chú thêm</label>
              <textarea rows="3" placeholder={isBuy ? "Yêu cầu về số phòng ngủ, tầng, hướng ban công..." : "Thông tin về nội thất, yêu cầu đặc biệt, thời gian có thể giao nhà..."} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded focus:border-[#e53e3e] outline-none text-white resize-none"></textarea>
            </div>
            {isSellOrRent && (
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Hình ảnh thực tế / Hồ sơ (Tối đa 5 file) (*)</label>
                <div className="border border-dashed border-gray-600 bg-white/5 rounded-lg p-8 flex flex-col items-center justify-center text-center hover:border-[#e53e3e] transition-colors cursor-pointer">
                  <UploadCloud size={32} className="text-gray-500 mb-3" />
                  <span className="text-sm font-medium text-gray-300">Click để tải hình ảnh căn hộ lên (JPG, PNG)</span>
                  <span className="text-xs text-gray-500 mt-1">Kích thước tối đa 5MB/file</span>
                </div>
              </div>
            )}
          </div>
          <div className="p-5 border-t border-white/10 flex justify-end space-x-3 bg-black/20">
            <button onClick={() => setIsPostPropertyOpen(false)} className="px-5 py-2 text-gray-400 hover:text-white">Hủy</button>
            <button onClick={() => setIsPostPropertyOpen(false)} className="px-6 py-2 bg-[#e53e3e] hover:bg-red-700 text-white rounded font-medium transition-colors">Gửi yêu cầu</button>
          </div>
        </div>
      </div>
    );
  };
  // --- MAIN APP LAYOUT ---
  return (
    <div
      className="flex h-screen w-full bg-black font-sans text-gray-200 overflow-hidden relative"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2000&auto=format&fit=crop')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark & Blur Overlay over the map background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-[#14151a]/95 to-[#0a0b0e]/95 backdrop-blur-sm z-0"></div>
      {/* Decorative Light Glows */}
      <div className="absolute top-0 left-[20%] w-[500px] h-[500px] bg-[#e53e3e]/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 right-[10%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none z-0"></div>
      {/* App Content */}
      <Sidebar />
      <main className="flex-1 relative z-10 h-screen overflow-y-auto custom-scrollbar p-8 lg:p-12 transition-all duration-300">
        {/* Render Views based on Active Menu */}
        {activeMenu === 'dashboard' && <DashboardView />}
        {activeMenu === 'account' && <AccountView />}
        {/* Placeholder for unimplemented tabs */}
        {activeMenu !== 'dashboard' && activeMenu !== 'account' && (
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
              Giao diện này đang được thiết kế riêng với chuẩn "Executive". Anh Tịnh có thể order chi tiết tiếp theo dựa trên BRD nhé!
            </p>
          </div>
        )}
      </main>
      {/* Render Modals */}
      {isEditProfileOpen && <EditProfileModal />}
      {isChangePwdOpen && <ChangePasswordModal />}
      {isKycRequestOpen && <KycRequestModal />}
      {isPostPropertyOpen && <PostPropertyModal />}
    </div>
  );
}