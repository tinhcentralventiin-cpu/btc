import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, UserCircle, Home, ClipboardList, Activity, 
  BarChart3, ShoppingCart, Bell, LogOut, ChevronRight,
  ChevronLeft, Edit2, UploadCloud, X, 
  FileText, Building2, Sparkles, PieChart, Clock, ArrowLeft, 
  Download, ExternalLink, BookOpen, FileSpreadsheet, Info,
  Tag, KeyRound, PlusCircle, CalendarDays, CheckCircle, Phone,
  Lock, ListChecks, UserCheck, History, Users, XCircle
} from 'lucide-react';
export default function RequestTrackingModule() {
  // Trạng thái điều hướng chính
  const [activeMenu, setActiveMenu] = useState('track_request'); // Mở sẵn tab Theo dõi yêu cầu xử lý
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
  // MOCK DỮ LIỆU: Danh sách yêu cầu xử lý (Nhiều dữ liệu hơn để lấp đầy giao diện)
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
      id: 'REQ-20240310', propertyInfo: 'MIDORI PARK The Glory • B12', type: 'Bán lại', date: '10/03/2024',
      assignee: 'Trần Quyết (Broker)', status: 'Đang xử lý', statusColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      note: 'Đang chạy quảng cáo bán hàng. Đã có một số khách hàng tiềm năng liên hệ.',
      customers: [
        { name: 'Hoàng Kim C', phone: '09** *** 112', status: 'Mới liên hệ', updated: '12/03/2024' },
        { name: 'Đỗ Tiến D', phone: '07** *** 334', status: 'Đang đàm phán', updated: '14/03/2024' }
      ],
      appointments: [{ id: 'APT-003', date: '16/03/2024 10:00', type: 'Xem BĐS', status: 'Đã diễn ra', note: 'Dẫn khách Đỗ Tiến D xem nhà mẫu.' }]
    },
    {
      id: 'REQ-20240225', propertyInfo: 'Nhu cầu Mua thêm • Căn hộ 3PN', type: 'Mua thêm', date: '25/02/2024',
      assignee: 'Lê Hoàng (Sale Admin)', status: 'Đang xử lý', statusColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      note: 'Broker đang lọc danh sách các dự án phù hợp với ngân sách và yêu cầu của Owner.',
      customers: [], appointments: []
    },
    {
      id: 'REQ-20240210', propertyInfo: 'MIDORI PARK • V02', type: 'Bán lại', date: '10/02/2024',
      assignee: 'Lê Hoàng (Sale Admin)', status: 'Đã chuyển giao dịch', statusColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      note: 'Khách hàng đã đồng ý giá, chuẩn bị tiến hành thủ tục đặt cọc và hợp đồng 3 bên.',
      customers: [
        { name: 'Phạm Thành Đ', phone: '07** *** 456', status: 'Đặt cọc', updated: '10/03/2024' },
        { name: 'Hoàng Văn D', phone: '09** *** 789', status: 'Ngừng quan tâm', updated: '05/03/2024' }
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
    },
    {
      id: 'REQ-20240115', propertyInfo: 'MIDORI PARK The View • C20-01', type: 'Cho thuê', date: '15/01/2024',
      assignee: 'Admin Hệ Thống', status: 'Từ chối', statusColor: 'text-red-400 bg-red-500/10 border-red-500/20',
      note: 'Yêu cầu bị hủy do Owner thông báo đã tự tìm được khách thuê.',
      customers: [], appointments: []
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8 flex flex-col h-full">
            <div className="mb-6 border-b border-white/10 pb-4">
              <h3 className="text-xl text-white font-medium flex items-center">
                <Home size={20} className="mr-2 text-blue-400"/>
                1. Ký gửi tài sản đang sở hữu
              </h3>
              <p className="text-sm text-gray-400 mt-2">Áp dụng cho các bất động sản đã có trong danh mục "Tài sản của tôi".</p>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-4 max-h-[50vh]">
              {mockProperties.map(prop => (
                <div key={prop.id} className="bg-black/30 border border-white/5 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-white/20 hover:bg-white/5 transition-all">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="text-white font-medium text-lg">{prop.project} • {prop.id}</p>
                      {prop.status.includes('khóa') && <Lock size={14} className="text-gray-500" />}
                    </div>
                    <p className="text-xs text-gray-500">Block: {prop.block} | Trạng thái: <span className={prop.statusColor}>{prop.status}</span></p>
                  </div>
                  <button 
                    disabled={prop.status.includes('khóa')}
                    onClick={() => setRequestModalProperty(prop)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                      prop.status.includes('khóa') 
                        ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700' 
                        : 'bg-[#e53e3e]/10 text-[#e53e3e] hover:bg-[#e53e3e] hover:text-white border border-[#e53e3e]/30'
                    }`}
                  >
                    {prop.status.includes('khóa') ? 'Bị khóa' : 'Tạo yêu cầu'}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8 flex flex-col h-fit">
            <div className="mb-6 border-b border-white/10 pb-4">
              <h3 className="text-xl text-white font-medium flex items-center">
                <PlusCircle size={20} className="mr-2 text-emerald-400"/>
                2. Tìm mua dự án mới
              </h3>
              <p className="text-sm text-gray-400 mt-2">Bạn muốn mở rộng danh mục đầu tư? Gửi yêu cầu để Broker hỗ trợ tìm kiếm sản phẩm phù hợp.</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 p-8 rounded-xl text-center flex flex-col items-center justify-center py-12">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
                <Building2 size={36} className="text-emerald-400" />
              </div>
              <h4 className="text-lg text-white font-medium mb-2">Đăng ký Nhu cầu Mua</h4>
              <p className="text-sm text-gray-400 mb-8 max-w-sm">Không cần phải có sẵn tài sản, bạn có thể tạo ngay yêu cầu tìm mua Căn hộ, Nhà phố, Biệt thự mới từ Becamex Tokyu.</p>
              <button 
                onClick={() => setRequestModalProperty({ isBuyMoreOnly: true, project: 'Dự án mới', id: 'Nhu cầu Mua' })}
                className="w-full sm:w-auto px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-bold shadow-lg transition-colors flex items-center justify-center"
              >
                <PlusCircle size={18} className="mr-2" />
                Tạo yêu cầu Mua thêm ngay
              </button>
            </div>
          </div>
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
          <button 
            disabled={selectedProperty.status.includes('khóa')}
            onClick={() => setRequestModalProperty(selectedProperty)}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
              selectedProperty.status.includes('khóa')
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
                : 'bg-[#e53e3e] hover:bg-red-600 text-white shadow-[0_0_20px_rgba(229,62,62,0.2)]'
            }`}
          >
            {selectedProperty.status.includes('khóa') ? <Lock size={18} /> : <Activity size={18} />}
            <span>{selectedProperty.status.includes('khóa') ? 'Tài sản đang khóa' : 'Yêu cầu xử lý tài sản'}</span>
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-800/50 to-black/50 border border-white/5 rounded-2xl p-6">
               <h4 className="text-sm font-medium text-white mb-2">Bạn cần hỗ trợ?</h4>
               <p className="text-xs text-gray-400 mb-4 leading-relaxed">Nếu có thắc mắc về hồ sơ pháp lý, vui lòng liên hệ Admin quản lý hồ sơ để được giải đáp.</p>
               <button className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white transition-colors flex items-center justify-center">
                 <Phone size={14} className="mr-2"/> Liên hệ hỗ trợ
               </button>
            </div>
          </div>
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
                        <td className="py-4"><span className="text-xs text-gray-400">{doc.date}</span></td>
                        <td className="py-4 pr-2 text-right">
                          <div className="flex justify-end space-x-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 bg-white/5 hover:bg-white/10 rounded text-gray-300 hover:text-white transition-colors" title="Xem chi tiết"><ExternalLink size={16} /></button>
                            <button className="p-1.5 bg-white/5 hover:bg-white/10 rounded text-gray-300 hover:text-emerald-400 transition-colors" title="Tải xuống"><Download size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {selectedProperty.documents.length === 0 && (
                      <tr><td colSpan="4" className="py-8 text-center text-gray-500 text-sm">Chưa có tài liệu nào được tải lên cho căn hộ này.</td></tr>
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
  // --- VIEW: THEO DÕI YÊU CẦU XỬ LÝ (TRANSACTION TRACKING - BRD 2.1.6) ---
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
            <Sparkles size={18} className="mr-2" />
            Nâng cấp Gói dịch vụ
          </button>
        </div>
      );
    }
    // Danh sách Yêu cầu đã gửi
    if (!selectedTransaction) {
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
            <div className="flex space-x-3 text-sm">
              <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg flex items-center">
                <History size={16} className="mr-2 text-gray-400"/> Tổng: <strong className="text-white ml-1">{mockTransactions.length} yêu cầu</strong>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {mockTransactions.map((tx) => (
              <div key={tx.id} className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-5 hover:border-white/20 hover:bg-white/10 transition-all duration-300 group flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1">Mã Yêu cầu / Ngày</p>
                    <p className="text-white font-medium">{tx.id}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{tx.date}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1">Tài sản / Loại</p>
                    <p className="text-white font-medium truncate">{tx.propertyInfo}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{tx.type}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1">Phụ trách</p>
                    <div className="flex items-center mt-0.5">
                      <UserCircle size={14} className="mr-1.5 text-gray-400" />
                      <p className="text-sm text-gray-200">{tx.assignee}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1">Trạng thái</p>
                    <span className={`inline-block text-[10px] px-2.5 py-1 rounded font-bold uppercase tracking-wider border mt-0.5 ${tx.statusColor}`}>
                      {tx.status}
                    </span>
                  </div>
                </div>
                <div className="md:ml-4 flex-shrink-0 w-full md:w-auto">
                  <button 
                    onClick={() => setSelectedTransaction(tx)}
                    className="w-full md:w-auto px-5 py-2.5 bg-black/40 hover:bg-black/60 border border-white/10 rounded-lg text-sm text-white hover:text-[#e53e3e] font-medium transition-colors flex items-center justify-center group-hover:border-white/20"
                  >
                    Xem chi tiết <ChevronRight size={16} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    // Helper kiểm tra hiển thị Process bar
    const getProgressStatus = (status) => {
      const isRejected = status === 'Từ chối';
      const step1 = !isRejected; 
      const step2 = step1 && (status === 'Đang xử lý' || status === 'Đã chuyển giao dịch' || status === 'Hoàn tất');
      const step3 = step2 && (status === 'Đã chuyển giao dịch' || status === 'Hoàn tất');
      const step4 = step3 && status === 'Hoàn tất';
      return { step1, step2, step3, step4, isRejected };
    };
    const progress = getProgressStatus(selectedTransaction.status);
    // Chi tiết Yêu cầu
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1400px] mx-auto pb-10">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center">
            <button 
              onClick={() => setSelectedTransaction(null)}
              className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-white mr-4 transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <div className="flex items-center space-x-3 mb-1">
                <h2 className="text-2xl font-bold text-white tracking-wide">Yêu cầu {selectedTransaction.id}</h2>
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider border ${selectedTransaction.statusColor}`}>
                  {selectedTransaction.status}
                </span>
              </div>
              <p className="text-sm text-gray-500">
                Gửi ngày: {selectedTransaction.date} • {selectedTransaction.type} • {selectedTransaction.propertyInfo}
              </p>
            </div>
          </div>
          {!progress.isRejected && (
            <div className="flex space-x-3">
               <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white transition-colors flex items-center">
                 <Phone size={14} className="mr-2 text-blue-400"/> Gọi người phụ trách
               </button>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6">
              <h3 className="text-lg font-medium text-white mb-5 flex items-center">
                <UserCheck size={18} className="mr-2 text-blue-400"/> Thông tin xử lý
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1">Người phụ trách</p>
                  <div className="flex items-center bg-black/30 border border-white/5 rounded-lg p-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm mr-3">
                      {selectedTransaction.assignee !== 'Chưa phân công' ? selectedTransaction.assignee.charAt(0) : '?'}
                    </div>
                    <p className="text-sm text-white font-medium">{selectedTransaction.assignee}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1">Ghi chú từ hệ thống</p>
                  <div className={`${progress.isRejected ? 'bg-red-500/10 border-red-500/20 text-red-200' : 'bg-blue-500/10 border-blue-500/20 text-blue-200'} border p-4 rounded-xl`}>
                    <p className="text-sm leading-relaxed">{selectedTransaction.note}</p>
                  </div>
                </div>
              </div>
            </div>
            {!progress.isRejected && (
              <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6">
                 <h3 className="text-lg font-medium text-white mb-6 flex items-center">
                   <Activity size={18} className="mr-2 text-emerald-400"/> Tiến độ giao dịch
                 </h3>
                 <div className="relative ml-2 space-y-8">
                    {/* Đường line nền xám */}
                    <div className="absolute top-2 bottom-2 left-[7px] w-0.5 bg-gray-700/50"></div>
                    {/* Đường line màu xanh chạy theo tiến độ */}
                    <div className={`absolute top-2 left-[7px] w-0.5 bg-emerald-500 transition-all duration-1000 ${
                      progress.step4 ? 'h-full' :
                      progress.step3 ? 'h-[66%]' :
                      progress.step2 ? 'h-[33%]' :
                      'h-0'
                    }`}></div>
                    <div className="relative pl-8">
                      <div className={`absolute w-4 h-4 rounded-full border-4 border-[#14151a] left-0 top-0.5 z-10 ${progress.step1 ? 'bg-emerald-500' : 'bg-gray-700'}`}></div>
                      <p className={`text-sm font-bold mb-0.5 ${progress.step1 ? 'text-emerald-400' : 'text-gray-500'}`}>Tiếp nhận yêu cầu</p>
                      <p className="text-xs text-gray-500">{progress.step1 ? 'Đã hoàn thành' : 'Chờ xử lý'}</p>
                    </div>
                    <div className="relative pl-8">
                      <div className={`absolute w-4 h-4 rounded-full border-4 border-[#14151a] left-0 top-0.5 z-10 ${
                        progress.step2 ? 'bg-emerald-500' : (progress.step1 ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'bg-gray-700')
                      }`}></div>
                      <p className={`text-sm font-bold mb-0.5 ${
                        progress.step2 ? 'text-emerald-400' : (progress.step1 ? 'text-amber-400' : 'text-gray-500')
                      }`}>Tìm kiếm khách hàng</p>
                      <p className="text-xs text-gray-500">{progress.step2 ? 'Đã có khách hàng liên hệ' : (progress.step1 ? 'Đang thực hiện' : 'Chờ cập nhật')}</p>
                    </div>
                    <div className="relative pl-8">
                      <div className={`absolute w-4 h-4 rounded-full border-4 border-[#14151a] left-0 top-0.5 z-10 ${
                        progress.step3 ? 'bg-emerald-500' : (progress.step2 ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'bg-gray-700')
                      }`}></div>
                      <p className={`text-sm font-bold mb-0.5 ${
                        progress.step3 ? 'text-emerald-400' : (progress.step2 ? 'text-amber-400' : 'text-gray-500')
                      }`}>Đàm phán / Đặt cọc</p>
                      <p className="text-xs text-gray-500">{progress.step3 ? 'Đã xác nhận cọc' : (progress.step2 ? 'Đang giao dịch' : 'Chờ cập nhật')}</p>
                    </div>
                    <div className="relative pl-8">
                      <div className={`absolute w-4 h-4 rounded-full border-4 border-[#14151a] left-0 top-0.5 z-10 ${
                        progress.step4 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-gray-700'
                      }`}></div>
                      <p className={`text-sm font-bold mb-0.5 ${progress.step4 ? 'text-emerald-400' : 'text-gray-500'}`}>Giao dịch hoàn tất</p>
                      <p className="text-xs text-gray-500">{progress.step4 ? 'Thành công' : 'Chờ cập nhật'}</p>
                    </div>
                 </div>
              </div>
            )}
          </div>
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-medium text-white flex items-center">
                  <Users size={20} className="mr-2 text-[#e53e3e]"/> Khách hàng liên hệ
                </h3>
                <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-gray-300 border border-white/10">{selectedTransaction.customers.length} khách hàng</span>
              </div>
              {selectedTransaction.customers.length > 0 ? (
                <div className="space-y-3">
                  {selectedTransaction.customers.map((cust, idx) => (
                    <div key={idx} className="bg-black/30 border border-white/5 hover:bg-white/5 transition-colors rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 flex items-center justify-center text-white mr-3">
                          {cust.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white mb-0.5">{cust.name}</p>
                          <p className="text-xs text-gray-500 font-mono">{cust.phone}</p>
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <span className={`inline-block text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider border mb-1 ${
                          cust.status === 'Đã giao dịch' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' :
                          cust.status === 'Đặt cọc' ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' :
                          cust.status === 'Ngừng quan tâm' ? 'text-gray-400 bg-gray-500/10 border-gray-500/20' :
                          cust.status === 'Quan tâm' ? 'text-purple-400 bg-purple-500/10 border-purple-500/20' :
                          'text-blue-400 bg-blue-500/10 border-blue-500/20'
                        }`}>
                          {cust.status}
                        </span>
                        <p className="text-[10px] text-gray-500 flex items-center sm:justify-end">
                          <Clock size={10} className="mr-1"/> Cập nhật: {cust.updated}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-black/20 rounded-xl border border-white/5 border-dashed">
                  {progress.isRejected ? (
                    <p className="text-sm text-gray-500 flex flex-col items-center"><XCircle size={24} className="mb-2 text-gray-600"/>Yêu cầu đã bị từ chối / hủy bỏ.</p>
                  ) : (
                    <p className="text-sm text-gray-500">Chưa có khách hàng liên hệ cho yêu cầu này.</p>
                  )}
                </div>
              )}
            </div>
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-medium text-white flex items-center">
                  <CalendarDays size={20} className="mr-2 text-yellow-500"/> Lịch hẹn liên quan
                </h3>
              </div>
              {selectedTransaction.appointments.length > 0 ? (
                <div className="space-y-4">
                  {selectedTransaction.appointments.map((apt, idx) => (
                    <div key={idx} className="bg-black/30 border border-white/5 hover:border-white/10 transition-colors rounded-xl p-5 relative overflow-hidden">
                      <div className="absolute left-0 top-0 w-1 h-full bg-yellow-500"></div>
                      <div className="flex flex-col md:flex-row justify-between gap-4 mb-3">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-white font-bold">{apt.type}</span>
                            <span className="text-[10px] bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 px-2 py-0.5 rounded uppercase">
                              {apt.status}
                            </span>
                          </div>
                          <p className="text-sm text-yellow-400 font-mono flex items-center">
                            <Clock size={14} className="mr-1.5"/> {apt.date}
                          </p>
                        </div>
                        <div className="md:text-right">
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest">Mã lịch hẹn</p>
                          <p className="text-xs text-gray-400 font-mono">{apt.id}</p>
                        </div>
                      </div>
                      <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                        <p className="text-sm text-gray-300"><span className="text-gray-500 mr-2">Ghi chú:</span>{apt.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-black/20 rounded-xl border border-white/5 border-dashed">
                  {progress.isRejected ? (
                    <p className="text-sm text-gray-500">Không có lịch hẹn phát sinh.</p>
                  ) : (
                    <p className="text-sm text-gray-500">Chưa có lịch hẹn nào phát sinh cho yêu cầu này.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  // --- COMPONENT: LUỒNG YÊU CẦU XỬ LÝ TÀI SẢN (MODAL TẠO YÊU CẦU) ---
  const AssetRequestFlowModal = ({ property, onClose }) => {
    // Nếu được pass property.isBuyMoreOnly = true thì set initial step là 2 và type là buy_more
    const isInitialBuyMore = property?.isBuyMoreOnly;
    const [step, setStep] = useState(isInitialBuyMore ? 2 : 1);
    const [requestType, setRequestType] = useState(isInitialBuyMore ? 'buy_more' : null); 
    // Handle skip if initial state is Buy More
    useEffect(() => {
      if (property?.isBuyMoreOnly) {
        setRequestType('buy_more');
        setStep(2);
      }
    }, [property]);
    const handleSelectNeed = (type) => {
      setRequestType(type);
      setStep(2);
    };
    const handleSubmit = () => {
      setStep(3);
    };
    const isBuyMore = requestType === 'buy_more';
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-in fade-in duration-300">
        <div className="bg-[#14151a] border border-white/10 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
          <div className="flex justify-between items-center p-6 border-b border-white/10 bg-white/5">
            <div>
              <h3 className="text-xl text-white font-medium">Yêu cầu xử lý tài sản</h3>
              {step === 1 && !isInitialBuyMore && <p className="text-sm text-gray-400 mt-1">Bước 1/2: Vui lòng chọn nhu cầu xử lý cho tài sản của bạn.</p>}
              {step === 2 && <p className="text-sm text-gray-400 mt-1">{isInitialBuyMore ? 'Điền thông tin chi tiết cho yêu cầu Mua thêm' : 'Bước 2/2: Điền thông tin chi tiết cho yêu cầu.'}</p>}
              {step === 3 && <p className="text-sm text-emerald-400 mt-1">Hoàn tất: Yêu cầu đã được ghi nhận.</p>}
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white bg-black/20 p-2 rounded-full transition-colors"><X size={20}/></button>
          </div>
          <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
            {step === 1 && !isInitialBuyMore && (
              <div className="animate-in slide-in-from-right-4 duration-300">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-8 flex items-center">
                  <Info size={20} className="text-blue-400 mr-3 flex-shrink-0" />
                  <p className="text-sm text-blue-200">Tài sản đang chọn: <strong className="text-white ml-1">{property.project} • {property.id}</strong></p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  <div onClick={() => handleSelectNeed('rent')} className="bg-black/30 border border-white/10 hover:border-[#e53e3e] hover:bg-white/5 rounded-2xl p-6 cursor-pointer transition-all group flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <KeyRound size={28} className="text-emerald-400" />
                    </div>
                    <h4 className="text-lg font-medium text-white mb-2">Cho thuê</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">Gửi thông tin để đăng tin cho thuê tài sản này trên hệ thống.</p>
                  </div>
                  <div onClick={() => handleSelectNeed('resell')} className="bg-black/30 border border-white/10 hover:border-[#e53e3e] hover:bg-white/5 rounded-2xl p-6 cursor-pointer transition-all group flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Tag size={28} className="text-amber-400" />
                    </div>
                    <h4 className="text-lg font-medium text-white mb-2">Bán lại</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">Tìm kiếm khách hàng tiềm năng để chuyển nhượng tài sản.</p>
                  </div>
                </div>
              </div>
            )}
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
                          <option className="bg-gray-900">MIDORI PARK The View</option>
                          <option className="bg-gray-900">The Habitat</option>
                          <option className="bg-gray-900">Tất cả dự án</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Nhu cầu cụ thể</label>
                        <select className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg focus:border-[#e53e3e] outline-none text-white appearance-none transition-colors">
                          <option className="bg-gray-900">Căn hộ 1 Phòng ngủ</option>
                          <option className="bg-gray-900">Căn hộ 2 Phòng ngủ</option>
                          <option className="bg-gray-900">Căn hộ 3 Phòng ngủ</option>
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
                      Thời gian mong muốn hoàn tất
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
                  {!isBuyMore && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Đính kèm hồ sơ / Hình ảnh (Nếu có)</label>
                      <div className="border-2 border-dashed border-white/20 bg-white/5 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-[#e53e3e]/50 hover:bg-white/10 transition-colors cursor-pointer group">
                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <UploadCloud size={24} className="text-gray-400 group-hover:text-[#e53e3e]" />
                        </div>
                        <span className="text-sm font-medium text-gray-200">Kéo thả file vào đây hoặc <span className="text-[#e53e3e]">chọn từ máy tính</span></span>
                        <span className="text-xs text-gray-500 mt-2">Hỗ trợ JPG, PNG (Tối đa 5 file, mỗi file 5MB)</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="animate-in zoom-in-95 duration-500 flex flex-col items-center justify-center py-8 text-center">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 relative">
                  <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping"></div>
                  <CheckCircle size={40} className="text-emerald-500 relative z-10" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Gửi yêu cầu thành công!</h3>
                <p className="text-gray-400 max-w-md mx-auto mb-8">Hệ thống đã ghi nhận yêu cầu {requestType === 'buy_more' ? 'Tìm mua dự án' : 'xử lý tài sản'} của bạn. Trợ lý kinh doanh sẽ liên hệ và cập nhật trạng thái trong vòng 24h.</p>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 w-full max-w-md text-left mb-8">
                  <div className="flex justify-between border-b border-white/5 pb-3 mb-3">
                    <span className="text-gray-500 text-sm">Mã yêu cầu</span>
                    <span className="text-white font-medium text-sm">REQ-20260317</span>
                  </div>
                  {!isBuyMore && (
                    <div className="flex justify-between border-b border-white/5 pb-3 mb-3">
                      <span className="text-gray-500 text-sm">Tài sản</span>
                      <span className="text-white font-medium text-sm">{property.project} • {property.id}</span>
                    </div>
                  )}
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
          <div className="p-5 border-t border-white/10 bg-black/20 flex justify-end space-x-3">
            {step === 1 && (
              <button onClick={onClose} className="px-6 py-2.5 text-gray-400 hover:text-white font-medium transition-colors">Hủy bỏ</button>
            )}
            {step === 2 && (
              <>
                {!isInitialBuyMore && <button onClick={() => setStep(1)} className="px-6 py-2.5 text-gray-400 hover:text-white font-medium transition-colors mr-auto">Quay lại</button>}
                {isInitialBuyMore && <button onClick={onClose} className="px-6 py-2.5 text-gray-400 hover:text-white font-medium transition-colors mr-auto">Hủy bỏ</button>}
                <button onClick={handleSubmit} className="px-8 py-2.5 bg-[#e53e3e] hover:bg-red-600 text-white rounded-lg font-bold shadow-lg transition-all">Gửi yêu cầu</button>
              </>
            )}
            {step === 3 && (
              <>
                <button onClick={onClose} className="px-6 py-2.5 text-gray-400 hover:text-white font-medium transition-colors mr-auto">Đóng</button>
                <button onClick={() => { onClose(); handleMenuClick({id: 'track_request'}); }} className="px-8 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg font-bold transition-all flex items-center">
                  Xem danh sách yêu cầu <ChevronRight size={16} className="ml-1" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };
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
        {/* Module: Yêu cầu xử lý (Từ Main Menu) */}
        {activeMenu === 'request_action' && <RequestActionView />}
        {/* Module: Tài sản của tôi */}
        {activeMenu === 'properties' && <PropertiesView />}
        {/* Module: Theo dõi yêu cầu xử lý (Transaction Tracking) */}
        {activeMenu === 'track_request' && <TransactionTrackingView />}
        {activeMenu !== 'request_action' && activeMenu !== 'properties' && activeMenu !== 'track_request' && (
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
              Theo yêu cầu, Dashboard và Account đã được ẩn để tối ưu dung lượng code. Hãy thử trải nghiệm tab Yêu cầu xử lý, Tài sản của tôi hoặc Theo dõi yêu cầu.
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