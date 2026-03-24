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
  CreditCard, AlertTriangle, Receipt, Wallet, Landmark
} from 'lucide-react';
export default function PaymentHistoryModule() {
  // Trạng thái điều hướng chính - Mở sẵn tab Lịch sử thanh toán (orders)
  const [activeMenu, setActiveMenu] = useState('orders');
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
  // State quản lý Gói hiện tại - Đặt mặc định là PREMIUM để xem được module Thanh toán
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
  // --- MOCK DATA ---
  // (Đã thu gọn phần Properties và Transactions để tập trung mã nguồn)
  const mockProperties = [
    { id: 'A10-05', project: 'SORA Gardens 2', block: 'A', status: 'Đang cho thuê', statusColor: 'text-blue-400', statusBg: 'bg-blue-500/20', statusBorder: 'border-blue-500/30', updateDate: '10/10/2023', pinkbook: { status: 'Đang xử lý' }, documents: [] },
    { id: 'B12', project: 'MIDORI PARK The Glory', block: 'B', status: 'Đang ở / Tự quản', statusColor: 'text-emerald-400', statusBg: 'bg-emerald-500/20', statusBorder: 'border-emerald-500/30', updateDate: '05/08/2023', pinkbook: { status: 'Chưa nộp hồ sơ' }, documents: [] },
  ];
  const mockTransactions = [
    { id: 'REQ-20240410', propertyInfo: 'The Habitat • A05-11', type: 'Bán lại', date: '10/04/2024', assignee: 'Nguyễn Tú', status: 'Đang xử lý', statusColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20', note: 'Đang chạy quảng cáo.', customers: [], appointments: [] }
  ];
  // MOCK DỮ LIỆU: LỊCH SỬ THANH TOÁN (MODULE 2.1.8)
  const mockPayments = [
    {
      id: 'PAY-202404-001',
      property: 'MIDORI PARK The Glory • B12',
      phase: 'Đợt 5 - Bàn giao nhà (25%)',
      amount: 850000000,
      method: 'Chuyển khoản',
      status: 'Đã đóng', // Đã đóng, Đến hạn, Sắp tới, Quá hạn
      statusStyle: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      date: '15/04/2024',
      dueDate: '20/04/2024',
      xntt: {
        id: 'XN-88902', amountConfirmed: 850000000, status: 'Đủ',
        statusStyle: 'text-emerald-400', interest: 0,
        date: '16/04/2024', note: 'Kế toán đã nhận đủ tiền và đối soát.'
      },
      debt: { total: 3400000000, paid: 3230000000, remaining: 170000000, status: 'Bình thường' },
      documents: [
        { id: 1, type: 'Hóa đơn điện tử (VAT)', name: 'Invoice_VAT_00192.pdf', date: '16/04/2024' },
        { id: 2, type: 'Biên lai thu tiền', name: 'Receipt_B12_D5.pdf', date: '16/04/2024' }
      ]
    },
    {
      id: 'PAY-202405-002',
      property: 'MIDORI PARK The Glory • B12',
      phase: 'Đợt 6 - Nhận Sổ Hồng (5%)',
      amount: 170000000,
      method: 'Chưa xác định',
      status: 'Sắp tới',
      statusStyle: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      date: '-',
      dueDate: '15/10/2024',
      xntt: null, // Chưa thanh toán nên chưa có XNTT
      debt: { total: 3400000000, paid: 3230000000, remaining: 170000000, status: 'Đang theo dõi' },
      documents: []
    },
    {
      id: 'PAY-202403-015',
      property: 'SORA Gardens 2 • A10-05',
      phase: 'Phí quản lý & Phí bảo trì (Q1/2024)',
      amount: 12500000,
      method: 'VNPAY',
      status: 'Quá hạn',
      statusStyle: 'text-red-400 bg-red-500/10 border-red-500/20',
      date: '-',
      dueDate: '31/03/2024',
      reminder: { daysLeft: -18, message: 'Khoản phí quản lý quý 1/2024 đã quá hạn. Vui lòng thanh toán sớm để tránh gián đoạn dịch vụ.' },
      xntt: {
        id: 'XN-88111', amountConfirmed: 10000000, status: 'Thiếu',
        statusStyle: 'text-red-400', interest: 150000,
        date: '02/04/2024', note: 'Giao dịch qua VNPAY bị thiếu, đã phát sinh lãi chậm nộp.'
      },
      debt: { total: 12500000, paid: 10000000, remaining: 2650000, status: 'Quá hạn' },
      documents: []
    },
    {
      id: 'PAY-202404-055',
      property: 'The Habitat • A05-11',
      phase: 'Phí dịch vụ môi giới bán lại',
      amount: 42000000,
      method: 'Tiền mặt (COD)',
      status: 'Đến hạn',
      statusStyle: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      date: '-',
      dueDate: '20/04/2024',
      reminder: { daysLeft: 2, message: 'Đợt thanh toán phí môi giới sắp đến hạn trong 2 ngày tới.' },
      xntt: null,
      debt: { total: 42000000, paid: 0, remaining: 42000000, status: 'Bình thường' },
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
        { id: 'orders', label: 'Lịch sử thanh toán' } // Module đang xem
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
  // --- VIEW: LỊCH SỬ THANH TOÁN (MODULE 2.1.8) ---
  const PaymentHistoryView = () => {
    // FEATURE GATING (BRD: Chỉ áp dụng cho PREMIUM, Basic & VIP xem dashboard)
    if (currentPackageId !== 'premium') {
      return (
        <div className="flex flex-col items-center justify-center h-[80vh] text-center animate-in zoom-in-95 duration-500 max-w-lg mx-auto">
          <div className="w-24 h-24 bg-gray-800/80 border border-gray-700 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <Lock size={40} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3 tracking-wide">Tính năng dành riêng cho PREMIUM</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            Chức năng Quản lý Tài chính & Lịch sử thanh toán chi tiết (đối soát công nợ, xem chứng từ XNTT, xuất hóa đơn) chỉ khả dụng đối với tài khoản PREMIUM. Gói BASIC và VIP chỉ xem được tóm tắt tại Dashboard.
          </p>
          <button
            onClick={() => handleMenuClick({id: 'packages'})}
            className="px-8 py-3 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(192,38,211,0.3)] flex items-center"
          >
            <Sparkles size={18} className="mr-2" /> Nâng cấp PREMIUM
          </button>
        </div>
      );
    }
    // TÌM CÁC THÔNG BÁO NHẮC NỢ (Sắp đến hạn / Quá hạn)
    const alertPayments = mockPayments.filter(p => p.status === 'Quá hạn' || p.status === 'Đến hạn');
    // MÀN HÌNH CHI TIẾT THANH TOÁN
    if (selectedPayment) {
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1000px] mx-auto pb-10">
          <div className="flex items-center mb-8 border-b border-white/10 pb-6">
            <button
              onClick={() => setSelectedPayment(null)}
              className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-white mr-4 transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <div className="flex items-center space-x-3 mb-1">
                <h2 className="text-2xl font-bold text-white tracking-wide">Chi tiết đợt thanh toán</h2>
                <span className={`text-[10px] px-2.5 py-1 rounded font-bold uppercase tracking-wider border ${selectedPayment.statusStyle}`}>
                  {selectedPayment.status}
                </span>
              </div>
              <p className="text-sm text-gray-500">Mã giao dịch: {selectedPayment.id} • {selectedPayment.property}</p>
            </div>
          </div>
          {/* Cảnh báo nhắc nợ trong chi tiết */}
          {selectedPayment.reminder && (
            <div className={`mb-6 p-4 rounded-xl border flex items-start ${selectedPayment.status === 'Quá hạn' ? 'bg-red-500/10 border-red-500/20' : 'bg-amber-500/10 border-amber-500/20'}`}>
              <AlertTriangle size={20} className={`mr-3 flex-shrink-0 mt-0.5 ${selectedPayment.status === 'Quá hạn' ? 'text-red-400' : 'text-amber-400'}`} />
              <div>
                <h4 className={`text-sm font-bold mb-1 ${selectedPayment.status === 'Quá hạn' ? 'text-red-400' : 'text-amber-400'}`}>Thông báo nhắc nợ</h4>
                <p className="text-sm text-gray-300">{selectedPayment.reminder.message}</p>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Khối 1: Thông tin Giao dịch */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-medium text-white mb-5 flex items-center">
                <CreditCard size={18} className="mr-2 text-blue-400"/> Thông tin giao dịch
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-white/5 pb-3">
                  <span className="text-sm text-gray-400">Đợt thanh toán</span>
                  <span className="text-sm font-medium text-white text-right max-w-[200px]">{selectedPayment.phase}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-3">
                  <span className="text-sm text-gray-400">Số tiền phải đóng</span>
                  <span className="text-lg font-bold text-white">{selectedPayment.amount.toLocaleString()} đ</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-3">
                  <span className="text-sm text-gray-400">Ngày đến hạn</span>
                  <span className="text-sm font-medium text-white">{selectedPayment.dueDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Phương thức</span>
                  <span className="text-sm font-medium text-white">{selectedPayment.method}</span>
                </div>
              </div>
            </div>
            {/* Khối 2: Công nợ & Số dư */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
              <h3 className="text-lg font-medium text-white mb-5 flex items-center">
                <Wallet size={18} className="mr-2 text-purple-400"/> Tình trạng công nợ
              </h3>
              <div className="space-y-4 relative z-10">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Tổng giá trị phải thanh toán</span>
                  <span className="text-sm font-medium text-white">{selectedPayment.debt.total.toLocaleString()} đ</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-1.5 mb-4">
                  <div className="bg-purple-500 h-1.5 rounded-full" style={{width: `${(selectedPayment.debt.paid / selectedPayment.debt.total) * 100}%`}}></div>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-3">
                  <span className="text-sm text-gray-400">Đã thanh toán (lũy kế)</span>
                  <span className="text-sm font-medium text-emerald-400">{selectedPayment.debt.paid.toLocaleString()} đ</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Số dư còn lại</span>
                  <span className="text-lg font-bold text-amber-400">{selectedPayment.debt.remaining.toLocaleString()} đ</span>
                </div>
              </div>
            </div>
            {/* Khối 3: Xác nhận thanh toán (XNTT) */}
            <div className="md:col-span-2 bg-black/40 border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-medium text-white mb-5 flex items-center">
                <CheckCircle size={18} className="mr-2 text-emerald-400"/> Lịch sử xác nhận thanh toán (XNTT)
              </h3>
              {selectedPayment.xntt ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <p className="text-xs text-gray-500 mb-1">Mã xác nhận</p>
                    <p className="text-sm font-mono text-white">{selectedPayment.xntt.id}</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <p className="text-xs text-gray-500 mb-1">Số tiền đối soát</p>
                    <p className="text-sm font-bold text-white">{selectedPayment.xntt.amountConfirmed.toLocaleString()} đ</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <p className="text-xs text-gray-500 mb-1">Kết quả đối soát</p>
                    <p className={`text-sm font-bold ${selectedPayment.xntt.statusStyle}`}>{selectedPayment.xntt.status}</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <p className="text-xs text-gray-500 mb-1">Lãi phát sinh</p>
                    <p className="text-sm font-bold text-red-400">{selectedPayment.xntt.interest > 0 ? `+${selectedPayment.xntt.interest.toLocaleString()} đ` : '0 đ'}</p>
                  </div>
                  <div className="sm:col-span-2 md:col-span-4 bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between">
                    <p className="text-sm text-gray-300"><span className="text-gray-500 mr-2">Ghi chú từ kế toán:</span> {selectedPayment.xntt.note}</p>
                    <span className="text-xs text-gray-500 mt-2 sm:mt-0 flex items-center"><Clock size={12} className="mr-1"/> Cập nhật: {selectedPayment.xntt.date}</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 border border-white/5 border-dashed rounded-xl bg-white/5">
                  <p className="text-sm text-gray-500">Chưa có dữ liệu xác nhận thanh toán cho đợt này.</p>
                </div>
              )}
            </div>
            {/* Khối 4: Hóa đơn & Biên lai */}
            <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-medium text-white mb-5 flex items-center">
                <Receipt size={18} className="mr-2 text-yellow-500"/> Chứng từ (Hóa đơn / Biên lai)
              </h3>
              {selectedPayment.documents.length > 0 ? (
                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-gray-500">
                        <th className="pb-3 font-medium pl-2">Tên / Loại chứng từ</th>
                        <th className="pb-3 font-medium">Ngày phát hành</th>
                        <th className="pb-3 font-medium text-right pr-2">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {selectedPayment.documents.map((doc) => (
                        <tr key={doc.id} className="hover:bg-white/5 transition-colors group">
                          <td className="py-4 pl-2">
                            <div className="flex items-center">
                              <FileText size={16} className="mr-3 text-yellow-500/70" />
                              <div>
                                <p className="text-sm font-medium text-white">{doc.name}</p>
                                <p className="text-xs text-gray-500">{doc.type}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4"><span className="text-sm text-gray-300">{doc.date}</span></td>
                          <td className="py-4 pr-2 text-right">
                            <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded text-gray-300 hover:text-white transition-colors text-xs font-medium mr-2">Xem</button>
                            <button className="p-1.5 bg-white/5 hover:bg-[#e53e3e]/20 rounded text-gray-300 hover:text-[#e53e3e] border border-transparent hover:border-[#e53e3e]/30 transition-colors" title="Tải xuống"><Download size={14} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 border border-white/5 border-dashed rounded-xl bg-black/20">
                  <p className="text-sm text-gray-500">Hóa đơn điện tử và biên lai sẽ được tự động xuất sau khi XNTT hoàn tất.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
    // MÀN HÌNH DANH SÁCH THANH TOÁN CHÍNH
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1400px] mx-auto pb-10">
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-light text-white mb-2 flex items-center">
              <Landmark className="mr-3 text-[#e53e3e]" size={32}/>
              Lịch sử thanh toán & Tài chính
            </h2>
            <p className="text-gray-400">Quản lý các đợt thanh toán, đối soát công nợ, và tải hóa đơn/biên lai điện tử.</p>
          </div>
          <div className="flex space-x-3 text-sm">
            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg flex items-center">
              <Wallet size={16} className="mr-2 text-gray-400"/> Dư nợ tổng: <strong className="text-amber-400 ml-2">214,650,000 đ</strong>
            </div>
          </div>
        </div>
        {/* THÔNG BÁO NHẮC NỢ (Alerts) */}
        {alertPayments.length > 0 && (
          <div className="mb-8 animate-in slide-in-from-top-4">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-3">Thông báo cần xử lý ({alertPayments.length})</h3>
            <div className="space-y-3">
              {alertPayments.map(alert => (
                <div key={alert.id} className={`p-4 rounded-xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-lg ${alert.status === 'Quá hạn' ? 'bg-red-500/10 border-red-500/30' : 'bg-amber-500/10 border-amber-500/30'}`}>
                  <div className="flex items-start">
                    <AlertTriangle size={24} className={`mr-4 flex-shrink-0 mt-0.5 ${alert.status === 'Quá hạn' ? 'text-red-500' : 'text-amber-500'}`} />
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider border ${alert.statusStyle}`}>{alert.status}</span>
                        <span className="text-sm font-bold text-white">{alert.phase}</span>
                      </div>
                      <p className="text-sm text-gray-300">{alert.reminder.message}</p>
                      <p className="text-xs text-gray-500 mt-1">Căn hộ: {alert.property} • Hạn chót: <span className="text-white font-medium">{alert.dueDate}</span></p>
                    </div>
                  </div>
                  <button className={`px-5 py-2 rounded-lg text-sm font-bold transition-colors whitespace-nowrap ${alert.status === 'Quá hạn' ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-amber-500 hover:bg-amber-600 text-black'}`}>
                    Thanh toán ngay
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* DANH SÁCH GIAO DỊCH */}
        <div>
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-4">Danh sách giao dịch / Đợt thanh toán</h3>
          <div className="grid grid-cols-1 gap-4">
            {mockPayments.map((payment) => (
              <div key={payment.id} className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-5 hover:border-white/20 hover:bg-white/10 transition-all duration-300 group flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 w-full">
                  <div className="md:col-span-2">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1">Căn hộ / Đợt thanh toán</p>
                    <p className="text-white font-bold truncate">{payment.property}</p>
                    <p className="text-sm text-gray-400 mt-0.5 truncate">{payment.phase}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1">Số tiền</p>
                    <p className="text-white font-bold">{payment.amount.toLocaleString()} đ</p>
                    <p className="text-xs text-gray-500 mt-0.5">{payment.method}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1">Hạn / Thanh toán</p>
                    <p className="text-sm text-gray-300">{payment.dueDate}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{payment.date !== '-' ? `Đóng: ${payment.date}` : 'Chưa đóng'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1">Trạng thái</p>
                    <span className={`inline-block text-[10px] px-2.5 py-1 rounded font-bold uppercase tracking-wider border mt-0.5 ${payment.statusStyle}`}>
                      {payment.status}
                    </span>
                  </div>
                </div>
                <div className="md:ml-4 flex-shrink-0 w-full md:w-auto mt-2 md:mt-0">
                  <button
                    onClick={() => setSelectedPayment(payment)}
                    className="w-full md:w-auto px-5 py-2.5 bg-black/40 hover:bg-[#e53e3e]/20 border border-white/10 rounded-lg text-sm text-white hover:text-[#e53e3e] font-medium transition-colors flex items-center justify-center group-hover:border-white/20"
                  >
                    Xem chi tiết <ChevronRight size={16} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
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
        {activeMenu === 'orders' && <PaymentHistoryView />}
        {/* Mock content for other tabs */}
        {activeMenu !== 'orders' && (
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
              Các module khác đã được thu gọn để tập trung không gian cho module <b>Lịch sử thanh toán</b> trong bản demo này.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}