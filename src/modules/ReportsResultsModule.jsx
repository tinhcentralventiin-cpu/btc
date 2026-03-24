import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard, UserCircle, Home, ClipboardList, Activity,
  BarChart3, ShoppingCart, Bell, LogOut, ChevronRight,
  ChevronLeft, Edit2, UploadCloud, X,
  FileText, Building2, Sparkles, PieChart, Clock, ArrowLeft,
  Download, ExternalLink, BookOpen, FileSpreadsheet, Info,
  Tag, KeyRound, PlusCircle, CalendarDays, CheckCircle, Phone,
  Lock, ListChecks, UserCheck, History, Users, XCircle,
  TrendingUp, Eye, DollarSign, Target, CheckCircle2, FileBarChart, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
export default function ReportsResultsModule() {
  // Trạng thái điều hướng chính
  const [activeMenu, setActiveMenu] = useState('reports'); // Mở sẵn tab Báo cáo & kết quả theo yêu cầu
  // Trạng thái cho Thanh Menu (Sidebar)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState({ transactions: true });
  // States cho các Popup (Modals)
  const [isDocAdjustmentOpen, setIsDocAdjustmentOpen] = useState(false);
  // State quản lý luồng Yêu cầu xử lý tài sản (Theo BRD UC-APR)
  const [requestModalProperty, setRequestModalProperty] = useState(null);
  // State quản lý View
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
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
  const userData = { name: "Nguyễn Văn Tịnh", id: "OWNER-8899" };
  // MOCK DỮ LIỆU: 7 Tài sản hiển thị
  const mockProperties = [
    {
      id: 'A10-05', project: 'SORA Gardens 2', block: 'A', status: 'Đang cho thuê',
      statusColor: 'text-blue-400', statusBg: 'bg-blue-500/20', statusBorder: 'border-blue-500/30',
      updateDate: '10/10/2023',
      pinkbook: { status: 'Đang xử lý', milestone: 'Đã nhận thông báo đóng 5% cuối', date: '01/11/2023', note: 'Đang chờ khách hàng hoàn tất nghĩa vụ tài chính cuối cùng để bàn giao Sổ hồng.' },
      documents: [{ id: 1, type: 'Hợp đồng SPA/LTL', name: 'HD_SPA_SORA2_A10-05_Signed.pdf', date: '15/05/2021', size: '2.4 MB' }]
    },
    {
      id: 'B12', project: 'MIDORI PARK The Glory', block: 'B', status: 'Đang ở / Tự quản',
      statusColor: 'text-emerald-400', statusBg: 'bg-emerald-500/20', statusBorder: 'border-emerald-500/30',
      updateDate: '05/08/2023',
      pinkbook: { status: 'Chưa nộp hồ sơ', milestone: 'Chờ chủ đầu tư thu thập hồ sơ', date: '05/08/2023', note: 'Dự kiến Quý 1/2024 sẽ bắt đầu thu thập hồ sơ làm GCN.' },
      documents: []
    },
    {
      id: 'V02', project: 'MIDORI PARK', block: 'Villa', status: 'Đang rao bán',
      statusColor: 'text-amber-400', statusBg: 'bg-amber-500/20', statusBorder: 'border-amber-500/30',
      updateDate: '12/11/2023',
      pinkbook: { status: 'Đã có sổ', milestone: 'Đã bàn giao Sổ hồng cho Chủ sở hữu', date: '10/05/2020', note: 'Hồ sơ pháp lý hoàn thiện.' },
      documents: []
    },
    {
      id: 'B05-12', project: 'SORA Gardens 1', block: 'B', status: 'Đang cho thuê',
      statusColor: 'text-blue-400', statusBg: 'bg-blue-500/20', statusBorder: 'border-blue-500/30',
      updateDate: '20/02/2024',
      pinkbook: { status: 'Đã có sổ', milestone: 'Đã bàn giao Sổ hồng', date: '15/08/2018', note: 'Sổ hồng đang do chủ sở hữu tự quản lý.' },
      documents: []
    },
    {
      id: 'C20-01', project: 'MIDORI PARK The View', block: 'C', status: 'Đang ở / Tự quản',
      statusColor: 'text-emerald-400', statusBg: 'bg-emerald-500/20', statusBorder: 'border-emerald-500/30',
      updateDate: '01/03/2024',
      pinkbook: { status: 'Đang xử lý', milestone: 'Đang nộp hồ sơ lên Sở TNMT', date: '28/02/2024', note: 'Chờ phản hồi từ cơ quan chức năng.' },
      documents: []
    },
    {
      id: 'A08-04', project: 'The Habitat', block: 'A', status: 'Đang rao bán',
      statusColor: 'text-amber-400', statusBg: 'bg-amber-500/20', statusBorder: 'border-amber-500/30',
      updateDate: '15/03/2024',
      pinkbook: { status: 'Đã có sổ', milestone: 'Đã bàn giao Sổ hồng', date: '05/06/2021', note: 'Sẵn sàng giao dịch chuyển nhượng.' },
      documents: []
    },
    {
      id: 'B15-09', project: 'SORA Gardens 2', block: 'B', status: 'Đang khóa',
      statusColor: 'text-gray-400', statusBg: 'bg-gray-500/20', statusBorder: 'border-gray-500/30',
      updateDate: '10/03/2024',
      pinkbook: { status: 'Chưa nộp hồ sơ', milestone: 'Đang tạm dừng giao dịch', date: '10/03/2024', note: 'Đang khóa trên hệ thống theo yêu cầu kiểm tra nội bộ.' },
      documents: []
    }
  ];
  // MOCK DỮ LIỆU: Danh sách yêu cầu xử lý
  const mockTransactions = [
    {
      id: 'REQ-20240318', propertyInfo: 'The Habitat • A08-04', type: 'Bán lại', date: '18/03/2024',
      assignee: 'Chưa phân công', status: 'Mới tạo', statusColor: 'text-gray-400 bg-gray-500/10 border-gray-500/20',
      note: 'Hệ thống đã tiếp nhận yêu cầu. Đang chờ Admin phân công Broker phụ trách.',
      customers: [], appointments: []
    },
    {
      id: 'REQ-20240315', propertyInfo: 'SORA Gardens 2 • A10-05', type: 'Cho thuê', date: '15/03/2024',
      assignee: 'Nguyễn Tú (Broker)', status: 'Đang xử lý', statusColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      note: 'Broker đang tiến hành đăng tin lên các kênh sàn và dẫn khách đi xem thực tế.',
      customers: [
        { name: 'Trần Văn B', phone: '09** *** 889', status: 'Đang đàm phán', updated: '2 giờ trước' },
        { name: 'Lê Thị H', phone: '08** *** 123', status: 'Mới liên hệ', updated: 'Hôm qua' }
      ],
      appointments: [{ id: 'APT-001', date: '20/03/2024 14:00', type: 'Xem BĐS', status: 'Đã xác nhận', note: 'Khách Trần Văn B yêu cầu xem.' }]
    },
    {
      id: 'REQ-20240210', propertyInfo: 'MIDORI PARK • V02', type: 'Bán lại', date: '10/02/2024',
      assignee: 'Lê Hoàng (Sale Admin)', status: 'Đã chuyển giao dịch', statusColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      note: 'Khách hàng đã đồng ý giá, chuẩn bị tiến hành thủ tục đặt cọc và hợp đồng 3 bên.',
      customers: [
        { name: 'Phạm Thành Đ', phone: '07** *** 456', status: 'Đặt cọc', updated: '10/03/2024' },
      ],
      appointments: []
    },
    {
      id: 'REQ-20240201', propertyInfo: 'SORA Gardens 1 • B05-12', type: 'Cho thuê', date: '01/02/2024',
      assignee: 'Nguyễn Tú (Broker)', status: 'Hoàn tất', statusColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      note: 'Giao dịch cho thuê thành công. Khách thuê đã nhận bàn giao căn hộ.',
      customers: [
        { name: 'Anna Smith', phone: '+84 ** *** 111', status: 'Đã giao dịch', updated: '15/02/2024' }
      ],
      appointments: [{ id: 'APT-002', date: '10/02/2024 09:30', type: 'Ký hợp đồng', status: 'Đã diễn ra', note: 'Ký HĐ Thuê tại VP Becamex Tokyu.' }]
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
      setSelectedTransaction(null);
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
  // --- VIEW: TẠO YÊU CẦU XỬ LÝ (TỪ MENU CHÍNH) ---
  const RequestActionView = () => {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1400px] mx-auto pb-10">
        <div className="mb-8">
          <h2 className="text-3xl font-light text-white mb-2 flex items-center">
            <Activity className="mr-3 text-[#e53e3e]" size={32}/>
            Tạo yêu cầu xử lý tài sản
          </h2>
          <p className="text-gray-400">Chọn tài sản hiện có để gửi yêu cầu ký gửi Bán/Cho thuê, hoặc tạo yêu cầu Tìm mua dự án mới.</p>
        </div>
        {/* Nội dung thu gọn để tập trung module mới */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center text-gray-400">
           Module này đã được rút gọn trong bản demo này. Vui lòng xem tab Tài sản của tôi hoặc Theo dõi yêu cầu xử lý.
        </div>
      </div>
    );
  };
  // --- VIEW: TÀI SẢN CỦA TÔI (MY PROPERTIES) ---
  const PropertiesView = () => {
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
    // Chi tiết Tài sản (Rút gọn)
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1400px] mx-auto pb-10">
            <button onClick={() => setSelectedProperty(null)} className="mb-4 flex items-center text-gray-400 hover:text-white">
                <ArrowLeft size={16} className="mr-2" /> Quay lại
            </button>
            <h2 className="text-2xl font-bold text-white mb-4">{selectedProperty.project} • {selectedProperty.id}</h2>
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center text-gray-400">
               Chi tiết tài sản đã được thu gọn trong demo này.
            </div>
        </div>
    );
  };
  // --- VIEW: THEO DÕI YÊU CẦU XỬ LÝ (TRANSACTION TRACKING) ---
  const TransactionTrackingView = () => {
    // FEATURE GATING: Kiểm tra gói theo BRD
    if (currentPackageId === 'basic') {
      return (
        <div className="flex flex-col items-center justify-center h-[80vh] text-center animate-in zoom-in-95 duration-500 max-w-lg mx-auto">
          <div className="w-24 h-24 bg-gray-800/80 border border-gray-700 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <Lock size={40} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3 tracking-wide">Tính năng dành cho VIP & PREMIUM</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            Nâng cấp gói dịch vụ để mở khóa tính năng theo dõi trạng thái xử lý yêu cầu, quản lý danh sách khách hàng liên hệ và cập nhật tiến độ giao dịch theo thời gian thực (Real-time).
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
          <div className="flex flex-col md:flex-row justify-between md:items-end mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-light text-white mb-2 flex items-center">
                <ListChecks className="mr-3 text-[#e53e3e]" size={32}/>
                Theo dõi yêu cầu xử lý
              </h2>
              <p className="text-gray-400">Quản lý và theo dõi tiến độ của các yêu cầu Bán / Cho thuê / Mua thêm bạn đã gửi.</p>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center text-gray-400">
             Danh sách Tracking đã được thu gọn trong demo này.
          </div>
        </div>
    );
  };
  // --- VIEW MỚI: BÁO CÁO & KẾT QUẢ (MODULE 2.1.7) ---
  const ReportsAndResultsView = () => {
    const [activeTab, setActiveTab] = useState('interest'); // interest | price | completed
    const [filterProperty, setFilterProperty] = useState('all');
    // FEATURE GATING (BRD: Chỉ áp dụng cho VIP/PREMIUM)
    if (currentPackageId === 'basic') {
        return (
          <div className="flex flex-col items-center justify-center h-[80vh] text-center animate-in zoom-in-95 duration-500 max-w-lg mx-auto">
            <div className="w-24 h-24 bg-gray-800/80 border border-gray-700 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <Lock size={40} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3 tracking-wide">Tính năng dành cho VIP & PREMIUM</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Chức năng "Báo cáo & Kết quả" (Phân tích mức độ quan tâm, So sánh giá, Kết quả giao dịch) chỉ khả dụng đối với tài khoản VIP hoặc PREMIUM.
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
      // Lấy danh sách tài sản đang có yêu cầu/giao dịch để làm Filter
      const propertiesWithRequests = mockTransactions
        .filter(t => t.propertyInfo !== 'Nhu cầu Mua thêm • Căn hộ 3PN') // Bỏ qua Mua thêm
        .map(t => t.propertyInfo);
      const uniqueProperties = [...new Set(propertiesWithRequests)];
      // Mock Data cho Mức độ quan tâm
      const mockInterestData = {
          views: 1245,
          contacts: 38,
          saves: 156,
          lastUpdated: '18/03/2026 10:30 AM',
          recentContacts: [
              { name: 'Nguyễn Trần', time: '2 giờ trước', type: 'Cho thuê' },
              { name: 'Lê Hoàng A.', time: 'Hôm qua', type: 'Bán lại' },
              { name: 'Phạm Thị M.', time: '15/03/2026', type: 'Cho thuê' },
          ]
      };
      // Mock Data cho So sánh giá
      const mockPriceData = [
          {
              id: 1,
              property: 'SORA Gardens 2 • A10-05',
              type: 'Cho thuê',
              ownerPrice: 15000000,
              marketAvg: 14500000,
              trend: 'up',
              lastUpdated: '17/03/2026'
          },
          {
              id: 2,
              property: 'The Habitat • A08-04',
              type: 'Bán lại',
              ownerPrice: 2800000000,
              marketAvg: 2950000000,
              trend: 'down',
              lastUpdated: '18/03/2026'
          }
      ];
      // Mock Data cho Kết quả giao dịch hoàn tất
      const mockCompletedTransactions = mockTransactions.filter(t => t.status === 'Hoàn tất' || t.status === 'Đã chuyển giao dịch');
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1400px] mx-auto pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between md:items-end mb-8 gap-4">
                <div>
                <h2 className="text-3xl font-light text-white mb-2 flex items-center">
                    <FileBarChart className="mr-3 text-[#e53e3e]" size={32}/>
                    Báo cáo & Kết quả
                </h2>
                <p className="text-gray-400">Dữ liệu tổng hợp tình trạng xử lý tài sản, đánh giá thị trường và giao dịch hoàn tất.</p>
                </div>
                {/* Bộ lọc theo căn hộ (BRD: Xem báo cáo theo từng căn hộ) */}
                <div className="flex items-center space-x-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2 w-full md:w-auto">
                    <Building2 size={16} className="text-gray-400" />
                    <select
                        value={filterProperty}
                        onChange={(e) => setFilterProperty(e.target.value)}
                        className="bg-transparent border-none text-white text-sm outline-none cursor-pointer w-full md:w-48 appearance-none"
                    >
                        <option value="all" className="bg-gray-900">Tất cả tài sản yêu cầu</option>
                        {uniqueProperties.map((prop, idx) => (
                            <option key={idx} value={prop} className="bg-gray-900">{prop}</option>
                        ))}
                    </select>
                    <ChevronDownIcon />
                </div>
            </div>
            {/* Navigation Tabs */}
            <div className="flex overflow-x-auto custom-scrollbar border-b border-white/10 mb-8 space-x-6">
                <button
                    onClick={() => setActiveTab('interest')}
                    className={`pb-4 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${activeTab === 'interest' ? 'text-white border-[#e53e3e]' : 'text-gray-400 border-transparent hover:text-gray-200'}`}
                >
                    <div className="flex items-center"><Eye size={16} className="mr-2" /> Mức độ quan tâm</div>
                </button>
                <button
                    onClick={() => setActiveTab('price')}
                    className={`pb-4 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${activeTab === 'price' ? 'text-white border-blue-500' : 'text-gray-400 border-transparent hover:text-gray-200'}`}
                >
                    <div className="flex items-center"><DollarSign size={16} className="mr-2" /> So sánh giá</div>
                </button>
                <button
                    onClick={() => setActiveTab('completed')}
                    className={`pb-4 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${activeTab === 'completed' ? 'text-white border-emerald-500' : 'text-gray-400 border-transparent hover:text-gray-200'}`}
                >
                    <div className="flex items-center"><CheckCircle2 size={16} className="mr-2" /> Giao dịch hoàn tất</div>
                </button>
            </div>
            {/* TAB CONTENT: MỨC ĐỘ QUAN TÂM */}
            {activeTab === 'interest' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                        <span>Cập nhật lần cuối: {mockInterestData.lastUpdated}</span>
                    </div>
                    {/* Thống kê Tổng quan */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
                            <p className="text-gray-400 text-sm mb-2">Tổng lượt xem tin</p>
                            <h3 className="text-3xl font-bold text-white mb-2">{mockInterestData.views.toLocaleString()}</h3>
                            <p className="text-xs text-emerald-400 flex items-center"><TrendingUp size={12} className="mr-1"/> +12% so với tuần trước</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl"></div>
                            <p className="text-gray-400 text-sm mb-2">Lượt lưu / Yêu thích</p>
                            <h3 className="text-3xl font-bold text-white mb-2">{mockInterestData.saves}</h3>
                            <p className="text-xs text-emerald-400 flex items-center"><TrendingUp size={12} className="mr-1"/> +5 mới hôm nay</p>
                        </div>
                        <div className="bg-white/5 border border-[#e53e3e]/20 rounded-2xl p-6 relative overflow-hidden shadow-[0_0_15px_rgba(229,62,62,0.1)]">
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#e53e3e]/10 rounded-full blur-2xl"></div>
                            <p className="text-gray-400 text-sm mb-2">Khách hàng liên hệ</p>
                            <h3 className="text-3xl font-bold text-[#e53e3e] mb-2">{mockInterestData.contacts}</h3>
                            <p className="text-xs text-gray-400 flex items-center">Tỷ lệ chuyển đổi: {((mockInterestData.contacts / mockInterestData.views) * 100).toFixed(1)}%</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Biểu đồ giả lập (Mock UI) */}
                        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6">
                            <h3 className="text-lg font-medium text-white mb-6">Biểu đồ tương tác 7 ngày qua</h3>
                            <div className="h-48 w-full flex items-end space-x-2 md:space-x-4">
                                {/* Dựng cột giả lập */}
                                {[40, 65, 45, 80, 50, 95, 70].map((height, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center group">
                                        <div className="w-full relative flex items-end justify-center h-full">
                                            <div style={{height: `${height}%`}} className="w-full bg-blue-500/20 border-t-2 border-blue-500 rounded-t-sm group-hover:bg-blue-500/40 transition-all"></div>
                                        </div>
                                        <span className="text-[10px] text-gray-500 mt-2">N{i+1}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Recent Contacts */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <h3 className="text-lg font-medium text-white mb-4">Khách hàng gần đây</h3>
                            <div className="space-y-4">
                                {mockInterestData.recentContacts.map((contact, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 bg-black/30 rounded-xl border border-white/5">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold text-white mr-3">
                                                {contact.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-200 font-medium">{contact.name}</p>
                                                <p className="text-xs text-gray-500">{contact.time}</p>
                                            </div>
                                        </div>
                                        <span className={`text-[10px] px-2 py-0.5 rounded border uppercase tracking-wider ${contact.type === 'Cho thuê' ? 'text-blue-400 border-blue-500/30 bg-blue-500/10' : 'text-amber-400 border-amber-500/30 bg-amber-500/10'}`}>
                                            {contact.type}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* TAB CONTENT: SO SÁNH GIÁ */}
            {activeTab === 'price' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                     <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex items-start">
                        <Info size={20} className="text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-blue-200">Dữ liệu so sánh giá được tổng hợp dựa trên các giao dịch thực tế và tin đăng tại phân khu tương ứng trong 30 ngày gần nhất. Dữ liệu mang tính chất tham khảo để Owner điều chỉnh chiến lược.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {mockPriceData.filter(d => filterProperty === 'all' || d.property === filterProperty).map(data => (
                            <div key={data.id} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                <div className="flex justify-between items-start mb-6 border-b border-white/5 pb-4">
                                    <div>
                                        <h3 className="text-lg font-medium text-white">{data.property}</h3>
                                        <p className="text-sm text-gray-400">Loại: {data.type}</p>
                                    </div>
                                    <span className="text-[10px] text-gray-500">Cập nhật: {data.lastUpdated}</span>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-400">Giá bạn đang đề xuất</span>
                                            <span className="text-white font-bold">{data.ownerPrice.toLocaleString()} đ{data.type === 'Cho thuê' ? '/tháng' : ''}</span>
                                        </div>
                                        <div className="w-full bg-gray-800 rounded-full h-2 mt-2">
                                            <div className="bg-blue-500 h-2 rounded-full" style={{width: '60%'}}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-400">Giá trung bình thị trường</span>
                                            <span className="text-yellow-500 font-bold">{data.marketAvg.toLocaleString()} đ{data.type === 'Cho thuê' ? '/tháng' : ''}</span>
                                        </div>
                                        <div className="w-full bg-gray-800 rounded-full h-2 mt-2 relative">
                                            <div className="bg-yellow-500 h-2 rounded-full" style={{width: '55%'}}></div>
                                            {/* Điểm đánh dấu giá owner so với trung bình */}
                                            <div className="absolute top-1/2 -translate-y-1/2 left-[60%] w-1 h-4 bg-white shadow-lg"></div>
                                        </div>
                                    </div>
                                    <div className="bg-black/30 p-4 rounded-xl border border-white/5 flex items-center justify-between">
                                        <span className="text-sm text-gray-300">Đánh giá mức giá:</span>
                                        {data.trend === 'up' ? (
                                            <span className="text-amber-400 text-sm font-medium flex items-center"><ArrowUpRight size={16} className="mr-1"/> Cao hơn thị trường 3.4%</span>
                                        ) : (
                                            <span className="text-emerald-400 text-sm font-medium flex items-center"><ArrowDownRight size={16} className="mr-1"/> Tốt hơn thị trường 5%</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {mockPriceData.filter(d => filterProperty === 'all' || d.property === filterProperty).length === 0 && (
                            <div className="col-span-1 md:col-span-2 text-center py-10 bg-black/20 rounded-2xl border border-white/5 border-dashed text-gray-500">
                                Không có dữ liệu so sánh giá cho tài sản đang chọn.
                            </div>
                        )}
                    </div>
                </div>
            )}
            {/* TAB CONTENT: GIAO DỊCH HOÀN TẤT */}
            {activeTab === 'completed' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                        <div className="p-6 border-b border-white/10">
                            <h3 className="text-lg font-medium text-white">Lịch sử giao dịch chốt thành công</h3>
                        </div>
                        <div className="overflow-x-auto custom-scrollbar">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-black/40 text-xs uppercase tracking-wider text-gray-500 border-b border-white/10">
                                        <th className="py-4 pl-6 font-medium">Căn hộ / Tài sản</th>
                                        <th className="py-4 font-medium">Loại KQ</th>
                                        <th className="py-4 font-medium">Kết quả giao dịch</th>
                                        <th className="py-4 font-medium">Khách hàng</th>
                                        <th className="py-4 pr-6 font-medium text-right">Thời điểm hoàn tất</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {mockCompletedTransactions.filter(t => filterProperty === 'all' || t.propertyInfo === filterProperty).map((tx, idx) => {
                                        // Fake data completion
                                        const finalPrice = tx.type === 'Cho thuê' ? '14.500.000 đ/tháng' : '2.900.000.000 đ';
                                        const customer = tx.customers.find(c => c.status === 'Đã giao dịch' || c.status === 'Đặt cọc') || { name: 'Nguyễn V. A' };
                                        return (
                                        <tr key={idx} className="hover:bg-white/5 transition-colors">
                                            <td className="py-4 pl-6">
                                                <span className="text-sm font-bold text-gray-200">{tx.propertyInfo}</span>
                                            </td>
                                            <td className="py-4">
                                                <span className={`text-[10px] px-2 py-0.5 rounded border uppercase tracking-wider ${tx.type === 'Cho thuê' ? 'text-blue-400 border-blue-500/30 bg-blue-500/10' : 'text-amber-400 border-amber-500/30 bg-amber-500/10'}`}>
                                                    {tx.type}
                                                </span>
                                            </td>
                                            <td className="py-4">
                                                <span className="text-sm font-medium text-emerald-400">{finalPrice}</span>
                                            </td>
                                            <td className="py-4">
                                                <div className="flex items-center">
                                                    <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-[10px] font-bold text-white mr-2">
                                                        {customer.name.charAt(0)}
                                                    </div>
                                                    <span className="text-sm text-gray-300">{customer.name}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 pr-6 text-right">
                                                <span className="text-sm text-gray-400">{tx.date}</span>
                                            </td>
                                        </tr>
                                    )})}
                                    {mockCompletedTransactions.filter(t => filterProperty === 'all' || t.propertyInfo === filterProperty).length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="py-10 text-center text-gray-500">Chưa có giao dịch hoàn tất nào cho tài sản này.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
      );
  };
  // --- COMPONENT TRỢ GIÚP (ARROW DOWN ICON MOCK) ---
  const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 pointer-events-none absolute right-4"><path d="m6 9 6 6 6-6"/></svg>
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
        {activeMenu === 'request_action' && <RequestActionView />}
        {activeMenu === 'properties' && <PropertiesView />}
        {activeMenu === 'track_request' && <TransactionTrackingView />}
        {/* VIEW BÁO CÁO MỚI */}
        {activeMenu === 'reports' && <ReportsAndResultsView />}
        {activeMenu !== 'request_action' && activeMenu !== 'properties' && activeMenu !== 'track_request' && activeMenu !== 'reports' && (
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
              Theo yêu cầu, một số tab đã được ẩn để tối ưu dung lượng mã. Vui lòng xem tab Báo cáo & Kết quả, Tài sản của tôi hoặc Theo dõi yêu cầu.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}