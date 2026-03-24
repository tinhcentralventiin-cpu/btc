import React, { useState } from 'react';
import {
  LayoutDashboard, UserCircle, Home, ClipboardList, Activity,
  BarChart3, ShoppingCart, Bell, LogOut, ChevronRight,
  ChevronLeft, Edit2, UploadCloud, X,
  FileText, Building2, Sparkles, PieChart, Clock, ArrowLeft,
  Download, ExternalLink, BookOpen, FileSpreadsheet, Info,
  Tag, KeyRound, PlusCircle, CalendarDays, CheckCircle, Phone
} from 'lucide-react';
export default function PropertyRequestModule() {
  // Trạng thái điều hướng chính
  const [activeMenu, setActiveMenu] = useState('properties');
  // Trạng thái cho Thanh Menu (Sidebar)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState({ transactions: true });
  // States cho các Popup (Modals)
  const [isDocAdjustmentOpen, setIsDocAdjustmentOpen] = useState(false);
  // State quản lý luồng Yêu cầu xử lý tài sản (Theo BRD UC-APR)
  const [requestModalProperty, setRequestModalProperty] = useState(null); // null = đóng, object = mở modal với property tương ứng
  // State quản lý View bên trong Module "Tài sản của tôi"
  const [selectedProperty, setSelectedProperty] = useState(null);
  // State quản lý Gói hiện tại
  const [currentPackageId, setCurrentPackageId] = useState('vip');
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
  const userData = {
    name: "Nguyễn Văn Tịnh", id: "OWNER-8899"
  };
  // Dữ liệu 7 Tài sản hiển thị
  const mockProperties = [
    {
      id: 'A10-05', project: 'SORA Gardens 2', block: 'A', status: 'Đang cho thuê',
      statusColor: 'text-blue-400', statusBg: 'bg-blue-500/20', statusBorder: 'border-blue-500/30',
      updateDate: '10/10/2023',
      pinkbook: {
        status: 'Đang xử lý', milestone: 'Đã nhận thông báo đóng 5% cuối', date: '01/11/2023',
        note: 'Đang chờ khách hàng hoàn tất nghĩa vụ tài chính cuối cùng để bàn giao Sổ hồng.'
      },
      documents: [
        { id: 1, type: 'Hợp đồng SPA/LTL', name: 'HD_SPA_SORA2_A10-05_Signed.pdf', date: '15/05/2021', size: '2.4 MB' },
        { id: 2, type: 'Bản vẽ Layout', name: 'Layout_A10-05_Final.pdf', date: '15/05/2021', size: '1.1 MB' },
        { id: 3, type: 'Phụ lục', name: 'PhuLuc_01_SORA2.pdf', date: '20/06/2021', size: '0.8 MB' },
        { id: 4, type: 'Biên bản bàn giao', name: 'BBBG_A10-05_SORA2.pdf', date: '10/12/2022', size: '1.5 MB' },
      ]
    },
    {
      id: 'B12', project: 'MIDORI PARK The Glory', block: 'B', status: 'Đang ở / Tự quản',
      statusColor: 'text-emerald-400', statusBg: 'bg-emerald-500/20', statusBorder: 'border-emerald-500/30',
      updateDate: '05/08/2023',
      pinkbook: {
        status: 'Chưa nộp hồ sơ', milestone: 'Chờ chủ đầu tư thu thập hồ sơ', date: '05/08/2023',
        note: 'Dự kiến Quý 1/2024 sẽ bắt đầu thu thập hồ sơ làm GCN.'
      },
      documents: [
        { id: 5, type: 'Hợp đồng SPA/LTL', name: 'HD_MB_TheGlory_B12.pdf', date: '02/02/2023', size: '3.1 MB' },
        { id: 6, type: 'Bản vẽ Layout', name: 'Layout_TheGlory_B12.pdf', date: '02/02/2023', size: '1.8 MB' },
      ]
    },
    {
      id: 'V02', project: 'MIDORI PARK', block: 'Villa', status: 'Đang rao bán',
      statusColor: 'text-amber-400', statusBg: 'bg-amber-500/20', statusBorder: 'border-amber-500/30',
      updateDate: '12/11/2023',
      pinkbook: {
        status: 'Đã có sổ', milestone: 'Đã bàn giao Sổ hồng cho Chủ sở hữu', date: '10/05/2020',
        note: 'Hồ sơ pháp lý hoàn thiện.'
      },
      documents: [
        { id: 7, type: 'Hợp đồng SPA/LTL', name: 'HD_MB_Midori_V02.pdf', date: '10/01/2019', size: '4.5 MB' },
        { id: 8, type: 'Bản vẽ Layout', name: 'Layout_Villa_V02.pdf', date: '10/01/2019', size: '2.2 MB' },
        { id: 9, type: 'Biên bản bàn giao', name: 'BBBG_V02.pdf', date: '20/12/2019', size: '1.2 MB' },
      ]
    },
    {
      id: 'B05-12', project: 'SORA Gardens 1', block: 'B', status: 'Đang cho thuê',
      statusColor: 'text-blue-400', statusBg: 'bg-blue-500/20', statusBorder: 'border-blue-500/30',
      updateDate: '20/02/2024',
      pinkbook: {
        status: 'Đã có sổ', milestone: 'Đã bàn giao Sổ hồng cho Chủ sở hữu', date: '15/08/2018',
        note: 'Giao dịch hoàn tất. Sổ hồng đang do chủ sở hữu tự quản lý.'
      },
      documents: [
        { id: 10, type: 'Hợp đồng SPA/LTL', name: 'HD_SPA_SORA1_B05-12.pdf', date: '10/01/2015', size: '3.5 MB' },
        { id: 11, type: 'Bản vẽ Layout', name: 'Layout_B05-12.pdf', date: '10/01/2015', size: '1.2 MB' },
      ]
    },
    {
      id: 'C20-01', project: 'MIDORI PARK The View', block: 'C', status: 'Đang ở / Tự quản',
      statusColor: 'text-emerald-400', statusBg: 'bg-emerald-500/20', statusBorder: 'border-emerald-500/30',
      updateDate: '01/03/2024',
      pinkbook: {
        status: 'Đang xử lý', milestone: 'Đang nộp hồ sơ lên Sở TNMT', date: '28/02/2024',
        note: 'Hồ sơ đã được Chủ đầu tư nộp lên cơ quan nhà nước, chờ phản hồi.'
      },
      documents: [
        { id: 12, type: 'Hợp đồng SPA/LTL', name: 'HD_MB_TheView_C20-01.pdf', date: '12/12/2019', size: '2.8 MB' },
      ]
    },
    {
      id: 'A08-04', project: 'The Habitat', block: 'A', status: 'Đang rao bán',
      statusColor: 'text-amber-400', statusBg: 'bg-amber-500/20', statusBorder: 'border-amber-500/30',
      updateDate: '15/03/2024',
      pinkbook: {
        status: 'Đã có sổ', milestone: 'Đã bàn giao Sổ hồng', date: '05/06/2021',
        note: 'Sổ hồng hợp lệ, sẵn sàng giao dịch chuyển nhượng.'
      },
      documents: [
        { id: 13, type: 'Hợp đồng SPA/LTL', name: 'HD_Habitat_A08-04.pdf', date: '15/04/2018', size: '4.1 MB' },
        { id: 14, type: 'Biên bản bàn giao', name: 'BBBG_Habitat_A08-04.pdf', date: '20/05/2019', size: '1.5 MB' },
      ]
    },
    {
      id: 'B15-09', project: 'SORA Gardens 2', block: 'B', status: 'Đang khóa',
      statusColor: 'text-gray-400', statusBg: 'bg-gray-500/20', statusBorder: 'border-gray-500/30',
      updateDate: '10/03/2024',
      pinkbook: {
        status: 'Chưa nộp hồ sơ', milestone: 'Đang tạm dừng giao dịch', date: '10/03/2024',
        note: 'Tài sản đang bị khóa trên hệ thống theo yêu cầu kiểm tra pháp lý nội bộ.'
      },
      documents: []
    }
  ];
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
    { id: 'logout', icon: LogOut, label: 'Đăng xuất', color: 'text-red-400 hover:text-red-300 hover:bg-red-500/10' }
  ];
  const handleMenuClick = (item) => {
    if (item.type === 'divider') return;
    if (item.id === 'logout') {
      alert("Đăng xuất thành công!");
    } else {
      setActiveMenu(item.id);
      setSelectedProperty(null);
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
  const Sidebar = () => (
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
                className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center p-3' : 'space-x-3 px-4 py-3'} rounded-xl transition-all duration-300 group ${
                  isActive && !hasChildren && item.id !== 'logout'
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
                      isActive && item.id !== 'logout' && <ChevronRight size={16} className="ml-auto text-[#e53e3e] flex-shrink-0" />
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
  // --- VIEW: TÀI SẢN CỦA TÔI (MY PROPERTIES) ---
  const PropertiesView = () => {
    // Danh sách Tài sản (My Properties List)
    if (!selectedProperty) {
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1400px] mx-auto pb-10">
          <div className="flex flex-col md:flex-row justify-between md:items-end mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-light text-white mb-2">Tài sản của tôi</h2>
              <p className="text-gray-400">Quản lý và tra cứu thông tin các bất động sản bạn đang sở hữu.</p>
            </div>
            <div className="flex space-x-3 text-sm">
              <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg flex items-center">
                <Building2 size={16} className="mr-2 text-gray-400"/> Tổng: <strong className="text-white ml-1">{mockProperties.length} tài sản</strong>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {mockProperties.map((prop) => (
              <div key={prop.id} className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl overflow-hidden hover:border-white/20 hover:bg-white/10 transition-all duration-300 group flex flex-col">
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1">{prop.project}</p>
                      <h3 className="text-2xl font-bold text-white flex items-center">
                        {prop.block} • {prop.id}
                      </h3>
                    </div>
                    <span className={`text-[10px] ${prop.statusBg} ${prop.statusColor} px-2.5 py-1 rounded font-bold uppercase tracking-wider border ${prop.statusBorder}`}>
                      {prop.status}
                    </span>
                  </div>
                  <div className="space-y-3 mt-6">
                     <div className="flex justify-between items-center text-sm border-b border-white/5 pb-3">
                        <span className="text-gray-500 flex items-center"><FileText size={14} className="mr-2"/> Hồ sơ lưu trữ</span>
                        <span className="text-gray-200 font-medium">{prop.documents.length} tài liệu</span>
                     </div>
                     <div className="flex justify-between items-center text-sm border-b border-white/5 pb-3">
                        <span className="text-gray-500 flex items-center"><BookOpen size={14} className="mr-2"/> Sổ hồng</span>
                        <span className="text-gray-200 font-medium">{prop.pinkbook.status}</span>
                     </div>
                     <div className="flex justify-between items-center text-sm pb-1">
                        <span className="text-gray-500 flex items-center"><Clock size={14} className="mr-2"/> Cập nhật</span>
                        <span className="text-gray-200 font-medium">{prop.updateDate}</span>
                     </div>
                  </div>
                </div>
                <div className="p-4 bg-black/40 border-t border-white/5 flex justify-end">
                  <button
                    onClick={() => setSelectedProperty(prop)}
                    className="flex items-center text-sm text-white hover:text-[#e53e3e] font-medium transition-colors group-hover:translate-x-1"
                  >
                    Xem chi tiết <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    // Chi tiết Tài sản (Property Detail)
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1400px] mx-auto pb-10">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
          <div className="flex items-center">
            <button
              onClick={() => setSelectedProperty(null)}
              className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-white mr-4 transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <div className="flex items-center space-x-3 mb-1">
                <h2 className="text-2xl font-bold text-white tracking-wide">{selectedProperty.project} • {selectedProperty.id}</h2>
                <span className={`text-[10px] ${selectedProperty.statusBg} ${selectedProperty.statusColor} px-2 py-0.5 rounded font-bold uppercase tracking-wider border ${selectedProperty.statusBorder}`}>
                  {selectedProperty.status}
                </span>
              </div>
              <p className="text-sm text-gray-500">Block: {selectedProperty.block} | Cập nhật: {selectedProperty.updateDate}</p>
            </div>
          </div>
          {/* Nút Call-to-action chính => Mở luồng Yêu cầu xử lý */}
          <button
            onClick={() => setRequestModalProperty(selectedProperty)}
            className="flex items-center space-x-2 bg-[#e53e3e] hover:bg-red-600 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-[0_0_20px_rgba(229,62,62,0.2)]"
          >
            <Activity size={18} />
            <span>Yêu cầu xử lý tài sản</span>
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cột trái: Tiến độ Sổ hồng */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-medium text-white flex items-center">
                  <BookOpen size={18} className="mr-2 text-blue-400"/> Tiến độ Sổ hồng
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-black/20 p-3 rounded-lg border border-white/5">
                  <span className="text-sm text-gray-400">Trạng thái</span>
                  <span className="text-sm font-bold text-white">{selectedProperty.pinkbook.status}</span>
                </div>
                <div className="relative pl-6 pb-2 border-l-2 border-blue-500/30 ml-2 mt-4">
                  <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-1 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                  <p className="text-xs text-blue-400 font-bold mb-1 uppercase tracking-wider">Mốc hiện tại</p>
                  <p className="text-sm text-white font-medium mb-1">{selectedProperty.pinkbook.milestone}</p>
                  <p className="text-xs text-gray-500 flex items-center"><Clock size={12} className="mr-1"/> Cập nhật: {selectedProperty.pinkbook.date}</p>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl mt-4">
                  <p className="text-xs text-blue-200 leading-relaxed flex items-start">
                    <Info size={14} className="mr-2 flex-shrink-0 mt-0.5 text-blue-400"/>
                    {selectedProperty.pinkbook.note}
                  </p>
                </div>
              </div>
            </div>
            {/* Thông tin hỗ trợ */}
            <div className="bg-gradient-to-br from-gray-800/50 to-black/50 border border-white/5 rounded-2xl p-6">
               <h4 className="text-sm font-medium text-white mb-2">Bạn cần hỗ trợ?</h4>
               <p className="text-xs text-gray-400 mb-4 leading-relaxed">Nếu có thắc mắc về hồ sơ pháp lý, vui lòng liên hệ Admin quản lý hồ sơ để được giải đáp.</p>
               <button className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white transition-colors flex items-center justify-center">
                 <Phone size={14} className="mr-2"/> Liên hệ hỗ trợ
               </button>
            </div>
          </div>
          {/* Cột Phải: Kho hồ sơ */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 h-full">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                  <h3 className="text-xl font-medium text-white flex items-center">
                    <FileSpreadsheet size={20} className="mr-2 text-emerald-400"/> Kho hồ sơ điện tử
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">Lưu trữ hợp đồng, phụ lục, bản vẽ của căn hộ.</p>
                </div>
                <button
                  onClick={() => setIsDocAdjustmentOpen(true)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white transition-colors flex items-center whitespace-nowrap"
                >
                  <Edit2 size={14} className="mr-2 text-gray-400"/> Yêu cầu điều chỉnh
                </button>
              </div>
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-gray-500">
                      <th className="pb-3 font-medium pl-2">Loại hồ sơ</th>
                      <th className="pb-3 font-medium">Tên File</th>
                      <th className="pb-3 font-medium">Cập nhật</th>
                      <th className="pb-3 font-medium text-right pr-2">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {selectedProperty.documents.map((doc) => (
                      <tr key={doc.id} className="hover:bg-white/5 transition-colors group">
                        <td className="py-4 pl-2">
                          <span className="inline-flex items-center text-sm font-medium text-gray-200">
                            <FileText size={16} className="mr-2 text-emerald-500/70" />
                            {doc.type}
                          </span>
                        </td>
                        <td className="py-4">
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-300 truncate max-w-[200px] sm:max-w-xs">{doc.name}</span>
                            <span className="text-[10px] text-gray-500 mt-0.5">{doc.size}</span>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className="text-xs text-gray-400">{doc.date}</span>
                        </td>
                        <td className="py-4 pr-2 text-right">
                          <div className="flex justify-end space-x-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 bg-white/5 hover:bg-white/10 rounded text-gray-300 hover:text-white transition-colors" title="Xem chi tiết">
                              <ExternalLink size={16} />
                            </button>
                            <button className="p-1.5 bg-white/5 hover:bg-white/10 rounded text-gray-300 hover:text-emerald-400 transition-colors" title="Tải xuống">
                              <Download size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {selectedProperty.documents.length === 0 && (
                      <tr>
                        <td colSpan="4" className="py-8 text-center text-gray-500 text-sm">
                          Chưa có tài liệu nào được tải lên cho căn hộ này.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  // --- COMPONENT: LUỒNG YÊU CẦU XỬ LÝ TÀI SẢN (DỰA THEO BRD UC-APR) ---
  const AssetRequestFlowModal = ({ property, onClose }) => {
    const [step, setStep] = useState(1);
    const [requestType, setRequestType] = useState(null); // 'rent', 'resell', 'buy_more'
    const handleSelectNeed = (type) => {
      setRequestType(type);
      setStep(2);
    };
    const handleSubmit = () => {
      // Giả lập call API thành công
      setStep(3);
    };
    const isBuyMore = requestType === 'buy_more';
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-in fade-in duration-300">
        <div className="bg-[#14151a] border border-white/10 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-white/10 bg-white/5">
            <div>
              <h3 className="text-xl text-white font-medium">Yêu cầu xử lý tài sản</h3>
              {step === 1 && <p className="text-sm text-gray-400 mt-1">Bước 1/2: Vui lòng chọn nhu cầu xử lý cho tài sản của bạn.</p>}
              {step === 2 && <p className="text-sm text-gray-400 mt-1">Bước 2/2: Điền thông tin chi tiết cho yêu cầu.</p>}
              {step === 3 && <p className="text-sm text-emerald-400 mt-1">Hoàn tất: Yêu cầu đã được ghi nhận.</p>}
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white bg-black/20 p-2 rounded-full transition-colors"><X size={20}/></button>
          </div>
          <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
            {/* STEP 1: CHỌN NHU CẦU XỬ LÝ */}
            {step === 1 && (
              <div className="animate-in slide-in-from-right-4 duration-300">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-8 flex items-center">
                  <Info size={20} className="text-blue-400 mr-3 flex-shrink-0" />
                  <p className="text-sm text-blue-200">Tài sản đang chọn: <strong className="text-white ml-1">{property.project} • {property.id}</strong></p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Card Cho thuê */}
                  <div
                    onClick={() => handleSelectNeed('rent')}
                    className="bg-black/30 border border-white/10 hover:border-[#e53e3e] hover:bg-white/5 rounded-2xl p-6 cursor-pointer transition-all group flex flex-col items-center text-center"
                  >
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <KeyRound size={28} className="text-emerald-400" />
                    </div>
                    <h4 className="text-lg font-medium text-white mb-2">Cho thuê</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">Gửi thông tin để đăng tin cho thuê tài sản này trên hệ thống.</p>
                  </div>
                  {/* Card Bán lại */}
                  <div
                    onClick={() => handleSelectNeed('resell')}
                    className="bg-black/30 border border-white/10 hover:border-[#e53e3e] hover:bg-white/5 rounded-2xl p-6 cursor-pointer transition-all group flex flex-col items-center text-center"
                  >
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Tag size={28} className="text-amber-400" />
                    </div>
                    <h4 className="text-lg font-medium text-white mb-2">Bán lại</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">Tìm kiếm khách hàng tiềm năng để chuyển nhượng tài sản.</p>
                  </div>
                  {/* Card Mua thêm */}
                  <div
                    onClick={() => handleSelectNeed('buy_more')}
                    className="bg-black/30 border border-white/10 hover:border-[#e53e3e] hover:bg-white/5 rounded-2xl p-6 cursor-pointer transition-all group flex flex-col items-center text-center"
                  >
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <PlusCircle size={28} className="text-blue-400" />
                    </div>
                    <h4 className="text-lg font-medium text-white mb-2">Mua thêm</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">Bạn có nhu cầu tìm kiếm và đầu tư thêm các dự án khác.</p>
                  </div>
                </div>
              </div>
            )}
            {/* STEP 2: REQUEST FORM */}
            {step === 2 && (
              <div className="animate-in slide-in-from-right-4 duration-300 space-y-6">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-sm text-gray-400">Loại yêu cầu:</span>
                  <span className="bg-[#e53e3e]/20 text-[#e53e3e] border border-[#e53e3e]/30 px-3 py-1 rounded-md text-sm font-bold uppercase tracking-wider">
                    {requestType === 'rent' ? 'Cho thuê' : requestType === 'resell' ? 'Bán lại' : 'Mua thêm'}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {!isBuyMore ? (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Tài sản cần xử lý</label>
                      <div className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-400 flex items-center">
                        <Building2 size={16} className="mr-2 opacity-50"/>
                        {property.project} • Block {property.block} • {property.id}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Dự án quan tâm</label>
                        <select className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg focus:border-[#e53e3e] outline-none text-white appearance-none transition-colors">
                          <option className="bg-gray-900">SORA Gardens 1 & 2</option>
                          <option className="bg-gray-900">MIDORI PARK The Glory</option>
                          <option className="bg-gray-900">Khác</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Nhu cầu cụ thể</label>
                        <select className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg focus:border-[#e53e3e] outline-none text-white appearance-none transition-colors">
                          <option className="bg-gray-900">Căn hộ 2 Phòng ngủ</option>
                          <option className="bg-gray-900">Nhà phố / Biệt thự</option>
                          <option className="bg-gray-900">Shophouse kinh doanh</option>
                        </select>
                      </div>
                    </>
                  )}
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {isBuyMore ? 'Ngân sách dự kiến (VNĐ)' : requestType === 'rent' ? 'Giá thuê mong muốn (VNĐ/Tháng)' : 'Giá bán mong muốn (VNĐ)'} <span className="text-[#e53e3e]">*</span>
                    </label>
                    <input type="text" placeholder="Nhập số tiền..." className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg focus:border-[#e53e3e] outline-none text-white transition-colors" />
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Thời gian mong muốn xử lý
                    </label>
                    <div className="relative">
                      <input type="date" className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg focus:border-[#e53e3e] outline-none text-white transition-colors" />
                      <CalendarDays size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Ghi chú bổ sung</label>
                    <textarea
                      rows="3"
                      placeholder={isBuyMore ? "Yêu cầu về hướng, tầng, tiện ích..." : "Thông tin về nội thất hiện trạng, thời gian có thể giao nhà..."}
                      className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg focus:border-[#e53e3e] outline-none text-white resize-none transition-colors"
                    ></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Đính kèm hồ sơ / Hình ảnh (Nếu có)</label>
                    <div className="border-2 border-dashed border-white/20 bg-white/5 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-[#e53e3e]/50 hover:bg-white/10 transition-colors cursor-pointer group">
                      <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <UploadCloud size={24} className="text-gray-400 group-hover:text-[#e53e3e]" />
                      </div>
                      <span className="text-sm font-medium text-gray-200">Kéo thả file vào đây hoặc <span className="text-[#e53e3e]">chọn từ máy tính</span></span>
                      <span className="text-xs text-gray-500 mt-2">Hỗ trợ JPG, PNG, PDF (Tối đa 5MB)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* STEP 3: KẾT QUẢ GỬI YÊU CẦU */}
            {step === 3 && (
              <div className="animate-in zoom-in-95 duration-500 flex flex-col items-center justify-center py-8 text-center">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 relative">
                  <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping"></div>
                  <CheckCircle size={40} className="text-emerald-500 relative z-10" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Gửi yêu cầu thành công!</h3>
                <p className="text-gray-400 max-w-md mx-auto mb-8">Hệ thống đã ghi nhận yêu cầu xử lý tài sản của bạn. Admin sẽ liên hệ và cập nhật trạng thái trong vòng 24h làm việc.</p>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 w-full max-w-md text-left mb-8">
                  <div className="flex justify-between border-b border-white/5 pb-3 mb-3">
                    <span className="text-gray-500 text-sm">Mã yêu cầu</span>
                    <span className="text-white font-medium text-sm">REQ-20260317</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-3 mb-3">
                    <span className="text-gray-500 text-sm">Tài sản</span>
                    <span className="text-white font-medium text-sm">{property.project} • {property.id}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-3 mb-3">
                    <span className="text-gray-500 text-sm">Loại yêu cầu</span>
                    <span className="text-white font-medium text-sm">{requestType === 'rent' ? 'Cho thuê' : requestType === 'resell' ? 'Bán lại' : 'Mua thêm'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-sm">Trạng thái</span>
                    <span className="text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">Chờ tiếp nhận</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Footer Actions */}
          <div className="p-5 border-t border-white/10 bg-black/20 flex justify-end space-x-3">
            {step === 1 && (
              <button onClick={onClose} className="px-6 py-2.5 text-gray-400 hover:text-white font-medium transition-colors">Hủy bỏ</button>
            )}
            {step === 2 && (
              <>
                <button onClick={() => setStep(1)} className="px-6 py-2.5 text-gray-400 hover:text-white font-medium transition-colors mr-auto">Quay lại</button>
                <button onClick={handleSubmit} className="px-8 py-2.5 bg-[#e53e3e] hover:bg-red-600 text-white rounded-lg font-bold shadow-lg transition-all">Gửi yêu cầu</button>
              </>
            )}
            {step === 3 && (
              <>
                <button onClick={onClose} className="px-6 py-2.5 text-gray-400 hover:text-white font-medium transition-colors mr-auto">Đóng</button>
                <button onClick={() => { onClose(); handleMenuClick({id: 'transactions'}); }} className="px-8 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg font-bold transition-all flex items-center">
                  Xem danh sách yêu cầu <ChevronRight size={16} className="ml-1" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };
  // --- MODAL PHỤ: YÊU CẦU ĐIỀU CHỈNH HỒ SƠ ---
  const DocAdjustmentModal = () => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#14151a] border border-white/10 rounded-xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-5 border-b border-white/10">
          <div>
            <h3 className="text-lg text-white font-medium">Yêu cầu điều chỉnh hồ sơ</h3>
            <p className="text-xs text-gray-400 mt-1">Gửi yêu cầu nếu phát hiện sai sót trong kho hồ sơ điện tử.</p>
          </div>
          <button onClick={() => setIsDocAdjustmentOpen(false)} className="text-gray-400 hover:text-white"><X size={20}/></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Tài sản liên quan</label>
            <input type="text" value={`${selectedProperty?.project} • ${selectedProperty?.id}`} disabled className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded text-gray-500 cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Loại hồ sơ cần điều chỉnh (*)</label>
            <select className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded focus:border-[#e53e3e] outline-none text-white appearance-none">
              <option className="bg-gray-900">Hợp đồng SPA/LTL</option>
              <option className="bg-gray-900">Phụ lục</option>
              <option className="bg-gray-900">Bản vẽ Layout</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Nội dung yêu cầu (*)</label>
            <textarea rows="3" placeholder="Ghi rõ nội dung bị sai sót..." className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded focus:border-[#e53e3e] outline-none text-white resize-none"></textarea>
          </div>
        </div>
        <div className="p-5 border-t border-white/10 flex justify-end space-x-3 bg-black/20">
          <button onClick={() => setIsDocAdjustmentOpen(false)} className="px-5 py-2 text-gray-400 hover:text-white">Hủy</button>
          <button onClick={() => setIsDocAdjustmentOpen(false)} className="px-6 py-2 bg-[#e53e3e] hover:bg-red-700 text-white rounded font-medium transition-colors">Gửi yêu cầu</button>
        </div>
      </div>
    </div>
  );
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
        {/* Module chính hiển thị duy nhất "Tài sản của tôi" để nhẹ code */}
        {activeMenu === 'properties' && <PropertiesView />}
        {activeMenu !== 'properties' && (
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
              Theo yêu cầu, Dashboard và Account đã được ẩn để tối ưu dung lượng code. Hãy trải nghiệm luồng "Yêu cầu xử lý tài sản" bên trong tab Tài sản của tôi.
            </p>
          </div>
        )}
      </main>
      {/* Render Luồng Yêu cầu xử lý tài sản */}
      {requestModalProperty && (
        <AssetRequestFlowModal
          property={requestModalProperty}
          onClose={() => setRequestModalProperty(null)}
        />
      )}
      {/* Render Modal Phụ */}
      {isDocAdjustmentOpen && <DocAdjustmentModal />}
    </div>
  );
}