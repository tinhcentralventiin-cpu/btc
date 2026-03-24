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
  Megaphone, PauseCircle, RefreshCw, ArrowUpCircle, CalendarCheck, Star, FileSignature, Check, QrCode, Banknote
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
export default function MembershipPackageModule() {
  // Trạng thái điều hướng chính - Mở sẵn tab Chọn gói thành viên (packages)
  const [activeMenu, setActiveMenu] = useState('packages');
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
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  // State quản lý Gói hiện tại - Khởi tạo mặc định là BASIC để dễ trải nghiệm luồng mua gói
  const [currentPackageId, setCurrentPackageId] = useState('basic');
  // Cấu hình dữ liệu các Gói
  const packageConfig = {
    basic: {
      id: 'basic', name: 'BASIC', short: 'B', price: 0,
      color: 'text-gray-300', bgGradient: 'from-gray-700 via-gray-800 to-gray-900',
      textGradient: 'from-gray-200 via-gray-400 to-gray-500',
      badgeColor: 'bg-gray-500/20 text-gray-300 border-gray-500/50', iconColor: 'text-gray-400',
      features: [
        'Quản lý hồ sơ & thông tin định danh',
        'Xem danh sách tài sản & Tiến độ Sổ hồng',
        'Xem lịch sử các đợt thanh toán',
        'Gửi yêu cầu xử lý tài sản (Bán/Thuê)',
        'Đăng tin BĐS (Chờ Admin duyệt)'
      ]
    },
    vip: {
      id: 'vip', name: 'VIP', short: 'V', price: 1000000,
      color: 'text-yellow-500', bgGradient: 'from-gray-800 via-black to-gray-900',
      textGradient: 'from-yellow-200 via-yellow-400 to-yellow-600',
      badgeColor: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50', iconColor: 'text-yellow-500',
      features: [
        'Tất cả quyền lợi của gói BASIC',
        'Xem thống kê lượt xem/liên hệ tin đăng',
        'Gia hạn và gửi yêu cầu tạm ngừng tin',
        'Theo dõi trạng thái giao dịch Real-time',
        'Quản lý lịch hẹn xem BĐS'
      ]
    },
    premium: {
      id: 'premium', name: 'PREMIUM', short: 'P', price: 2000000,
      color: 'text-fuchsia-500', bgGradient: 'from-[#2a0845] via-[#1a0525] to-black',
      textGradient: 'from-fuchsia-300 via-fuchsia-500 to-purple-600',
      badgeColor: 'bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/50', iconColor: 'text-fuchsia-400',
      features: [
        'Tất cả quyền lợi của gói VIP',
        'Tin đăng vị trí ưu tiên (Tag VIP/TOP)',
        'Xếp lịch cuộc hẹn ưu tiên',
        'Cập nhật tiến độ trực tiếp từ Broker',
        'Báo cáo phân tích chuyên sâu hàng tuần'
      ]
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
    }
  ];
  // --- MOCK DATA: LỊCH SỬ THANH TOÁN ---
  const mockPayments = [
    {
      id: 'PAY-202404-001', property: 'MIDORI PARK The Glory • B12', phase: 'Đợt 5 - Bàn giao nhà (25%)', amount: 850000000,
      method: 'Chuyển khoản', status: 'Đã đóng', statusStyle: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      date: '15/04/2024', dueDate: '20/04/2024',
      debt: { total: 3400000000, paid: 3230000000, remaining: 170000000 }, documents: []
    }
  ];
  // --- MOCK DATA: QUẢN LÝ LỊCH HẸN ---
  const initialAppointments = [
    {
      id: 'APT-2604-001', property: 'SORA Gardens 2 • A10-05', type: 'Xem BĐS', date: '20/04/2026 14:30',
      status: 'Chờ xác nhận', statusStyle: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      isPriority: true, generalNote: 'Khách hàng là chuyên gia người Nhật.', report: '', btosNote: ''
    }
  ];
  const [appointments, setAppointments] = useState(initialAppointments);
  const [notifications, setNotifications] = useState([]);
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'account', icon: UserCircle, label: 'Thông tin tài khoản' },
    { id: 'properties', icon: Home, label: 'Tài sản của tôi' },
    { id: 'packages', icon: Sparkles, label: 'Quản lý gói thành viên' },
    { id: 'request_action', icon: ClipboardList, label: 'Yêu cầu xử lý tài sản' },
    { id: 'track_request', icon: Activity, label: 'Theo dõi giao dịch' },
    { id: 'manage_posts', icon: Megaphone, label: 'Quản lý tin đăng' },
    { id: 'manage_appointments', icon: CalendarCheck, label: 'Quản lý lịch hẹn' },
    { id: 'reports', icon: BarChart3, label: 'Báo cáo & kết quả' },
    { id: 'orders', icon: Landmark, label: 'Lịch sử thanh toán' },
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
              <div className="relative group w-full cursor-default">
                <div className={`w-full bg-white/5 border border-white/10 rounded-md px-4 py-1.5 flex items-center justify-between text-xs font-bold transition-colors ${currentPackage.color}`}>
                   <div className="flex items-center">
                     <Sparkles size={12} className={`mr-2 ${currentPackage.iconColor}`} />
                     GÓI {currentPackage.name}
                   </div>
                </div>
              </div>
            ) : (
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 cursor-default font-bold text-xs ${currentPackage.color}`}
                title={`Gói ${currentPackage.name}`}
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
  // --- VIEW: CHỌN GÓI THÀNH VIÊN (MODULE 2.1.1.2) ---
  const MembershipPackagesView = () => {
    const [step, setStep] = useState(1); // 1: List, 2: Checkout, 3: Success
    const [selectedPkgId, setSelectedPkgId] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('vnpay'); // vnpay, transfer, cod
    const [isProcessing, setIsProcessing] = useState(false);
    const handleSelectPackage = (pkgId) => {
      if (pkgId === currentPackageId) return; // Không mua lại gói đang dùng
      setSelectedPkgId(pkgId);
      setStep(2);
    };
    const handlePayment = () => {
      setIsProcessing(true);
      // Mô phỏng thời gian gọi API thanh toán
      setTimeout(() => {
        setIsProcessing(false);
        setCurrentPackageId(selectedPkgId); // Cập nhật state Gói hệ thống ngay lập tức
        setStep(3);
      }, 1500);
    };
    const targetPkg = packageConfig[selectedPkgId];
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1200px] mx-auto pb-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-8 gap-4 border-b border-white/10 pb-6">
          <div>
            <h2 className="text-3xl font-light text-white mb-2 flex items-center">
              <Sparkles className="mr-3 text-[#e53e3e]" size={32}/>
              Quản lý gói thành viên
            </h2>
            <p className="text-gray-400">Nâng cấp gói thành viên để mở khóa các tính năng quản lý tài sản và ưu tiên giao dịch chuyên sâu.</p>
          </div>
          {step > 1 && (
            <button onClick={() => setStep(1)} className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-gray-300 transition-colors flex items-center">
              <ArrowLeft size={16} className="mr-2" /> Quay lại danh sách gói
            </button>
          )}
        </div>
        {/* STEP 1: DANH SÁCH GÓI */}
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-right-4">
            {Object.values(packageConfig).map((pkg) => {
              const isCurrent = currentPackageId === pkg.id;
              return (
                <div key={pkg.id} className={`relative flex flex-col bg-black/40 backdrop-blur-md rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isCurrent ? 'border-white/30 shadow-[0_0_30px_rgba(255,255,255,0.05)]' : 'border-white/10 hover:border-white/30 hover:-translate-y-1'
                }`}>
                  {pkg.id === 'vip' && <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg z-10">BEST SELLER</div>}
                  <div className={`p-8 border-b border-white/10 bg-gradient-to-b from-white/5 to-transparent flex flex-col items-center text-center`}>
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 border border-white/10 ${pkg.badgeColor}`}>
                       <Sparkles size={24} className={pkg.iconColor} />
                    </div>
                    <h3 className={`text-2xl font-black tracking-wider mb-2 bg-gradient-to-r ${pkg.textGradient} text-transparent bg-clip-text`}>
                      GÓI {pkg.name}
                    </h3>
                    <div className="flex items-end justify-center mb-2">
                      <span className="text-3xl font-bold text-white">{pkg.price === 0 ? 'Miễn phí' : pkg.price.toLocaleString()}</span>
                      {pkg.price > 0 && <span className="text-sm text-gray-500 ml-1 mb-1">đ/năm</span>}
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <ul className="space-y-4 mb-8 flex-1">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check size={16} className={`mr-3 mt-0.5 flex-shrink-0 ${pkg.iconColor}`} />
                          <span className="text-sm text-gray-300 leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => handleSelectPackage(pkg.id)}
                      disabled={isCurrent}
                      className={`w-full py-3.5 rounded-xl text-sm font-bold transition-all ${
                        isCurrent
                          ? 'bg-white/10 text-gray-400 cursor-not-allowed border border-white/5'
                          : `bg-gradient-to-r ${pkg.bgGradient} text-white shadow-lg border border-white/20 hover:scale-[1.02]`
                      }`}
                    >
                      {isCurrent ? 'ĐANG SỬ DỤNG' : (pkg.price === 0 ? 'CHUYỂN ĐỔI' : 'CHỌN MUA')}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {/* STEP 2: THANH TOÁN (CHECKOUT) */}
        {step === 2 && targetPkg && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in slide-in-from-right-4">
            {/* Cột trái: Tóm tắt đơn hàng */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
                <h3 className="text-lg font-medium text-white mb-6 border-b border-white/10 pb-4 flex items-center">
                  <Receipt size={20} className="mr-2 text-gray-400" /> Tóm tắt đơn hàng
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Gói dịch vụ</span>
                    <span className={`text-sm font-bold ${targetPkg.color}`}>GÓI {targetPkg.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Thời hạn</span>
                    <span className="text-sm font-medium text-white">12 tháng</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Đơn giá</span>
                    <span className="text-sm font-medium text-white">{targetPkg.price.toLocaleString()} đ</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-sm text-gray-400">Thuế VAT (10%)</span>
                    <span className="text-sm font-medium text-white">{(targetPkg.price * 0.1).toLocaleString()} đ</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-base text-gray-300 font-medium">Tổng thanh toán</span>
                    <span className="text-2xl font-bold text-[#e53e3e]">{(targetPkg.price * 1.1).toLocaleString()} đ</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Cột phải: Phương thức thanh toán */}
            <div className="lg:col-span-7">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 h-full flex flex-col">
                <h3 className="text-lg font-medium text-white mb-6 border-b border-white/10 pb-4 flex items-center">
                  <CreditCard size={20} className="mr-2 text-gray-400" /> Phương thức thanh toán
                </h3>
                <div className="space-y-4 flex-1">
                  {/* VNPAY */}
                  <label className={`block relative border rounded-xl p-4 cursor-pointer transition-all ${paymentMethod === 'vnpay' ? 'bg-blue-500/10 border-blue-500/50' : 'bg-black/40 border-white/10 hover:border-white/30'}`}>
                    <div className="flex items-center">
                      <input type="radio" name="payment" value="vnpay" checked={paymentMethod === 'vnpay'} onChange={() => setPaymentMethod('vnpay')} className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-600 focus:ring-blue-500 focus:ring-2" />
                      <div className="ml-3 flex-1 flex items-center justify-between">
                        <div>
                          <span className="block text-sm font-bold text-white mb-0.5">Thanh toán VNPAY / Momo</span>
                          <span className="block text-xs text-gray-500">Quét mã QR hoặc dùng thẻ ATM/Visa nội địa. Kích hoạt ngay lập tức.</span>
                        </div>
                        <QrCode size={24} className="text-blue-400" />
                      </div>
                    </div>
                  </label>
                  {/* Chuyển khoản */}
                  <label className={`block relative border rounded-xl p-4 cursor-pointer transition-all ${paymentMethod === 'transfer' ? 'bg-amber-500/10 border-amber-500/50' : 'bg-black/40 border-white/10 hover:border-white/30'}`}>
                    <div className="flex items-center mb-3">
                      <input type="radio" name="payment" value="transfer" checked={paymentMethod === 'transfer'} onChange={() => setPaymentMethod('transfer')} className="w-4 h-4 text-amber-500 bg-gray-800 border-gray-600 focus:ring-amber-500 focus:ring-2" />
                      <div className="ml-3 flex-1 flex items-center justify-between">
                        <div>
                          <span className="block text-sm font-bold text-white mb-0.5">Chuyển khoản ngân hàng</span>
                          <span className="block text-xs text-gray-500">Thanh toán thủ công, hệ thống sẽ duyệt trong 2-4h làm việc.</span>
                        </div>
                        <Landmark size={24} className="text-amber-400" />
                      </div>
                    </div>
                    {/* Bảng thông tin CK */}
                    {paymentMethod === 'transfer' && (
                      <div className="ml-7 mt-3 p-4 bg-black/50 border border-white/5 rounded-lg space-y-2 animate-in fade-in duration-300">
                        <div className="flex justify-between"><span className="text-xs text-gray-400">Ngân hàng:</span><span className="text-xs font-bold text-white">Vietcombank - CN Bình Dương</span></div>
                        <div className="flex justify-between"><span className="text-xs text-gray-400">Số tài khoản:</span><span className="text-xs font-bold text-emerald-400">0123 4567 8999</span></div>
                        <div className="flex justify-between"><span className="text-xs text-gray-400">Chủ tài khoản:</span><span className="text-xs font-bold text-white">BECAMEX TOKYU CO., LTD</span></div>
                        <div className="flex justify-between"><span className="text-xs text-gray-400">Nội dung CK:</span><span className="text-xs font-bold text-yellow-400 bg-yellow-500/20 px-2 py-0.5 rounded">DK PKG {userData.id}</span></div>
                      </div>
                    )}
                  </label>
                  {/* COD */}
                  <label className={`block relative border rounded-xl p-4 cursor-pointer transition-all ${paymentMethod === 'cod' ? 'bg-emerald-500/10 border-emerald-500/50' : 'bg-black/40 border-white/10 hover:border-white/30'}`}>
                    <div className="flex items-center">
                      <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="w-4 h-4 text-emerald-500 bg-gray-800 border-gray-600 focus:ring-emerald-500 focus:ring-2" />
                      <div className="ml-3 flex-1 flex items-center justify-between">
                        <div>
                          <span className="block text-sm font-bold text-white mb-0.5">Tiền mặt tại Văn phòng (COD)</span>
                          <span className="block text-xs text-gray-500">Thanh toán trực tiếp tại Tòa nhà SORA Gardens.</span>
                        </div>
                        <Banknote size={24} className="text-emerald-400" />
                      </div>
                    </div>
                  </label>
                </div>
                <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                  <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="px-8 py-3.5 bg-[#e53e3e] hover:bg-red-600 text-white rounded-xl font-bold shadow-[0_0_20px_rgba(229,62,62,0.3)] transition-all flex items-center"
                  >
                    {isProcessing ? (
                      <><RefreshCw size={18} className="mr-2 animate-spin" /> Đang xử lý...</>
                    ) : (
                      <>Thanh toán & Hoàn tất <ChevronRight size={18} className="ml-1" /></>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* STEP 3: SUCCESS */}
        {step === 3 && targetPkg && (
          <div className="animate-in zoom-in-95 duration-500 flex flex-col items-center justify-center py-16 text-center max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 relative">
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping"></div>
              <CheckCircle size={48} className="text-emerald-500 relative z-10" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Đăng ký Gói thành công!</h2>
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              Cảm ơn bạn đã lựa chọn tin tưởng Becamex Tokyu. Gói dịch vụ <strong className={targetPkg.color}>MEMBER {targetPkg.name}</strong> của bạn đã được ghi nhận và kích hoạt thành công trên hệ thống.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 w-full text-left mb-8 shadow-lg">
              <div className="flex justify-between border-b border-white/5 pb-3 mb-3">
                <span className="text-gray-500 text-sm">Mã đơn hàng</span>
                <span className="text-white font-mono text-sm">ORD-{Math.floor(Math.random() * 100000)}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-3 mb-3">
                <span className="text-gray-500 text-sm">Phương thức</span>
                <span className="text-white font-medium text-sm uppercase">{paymentMethod}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-3 mb-3">
                <span className="text-gray-500 text-sm">Gói đăng ký</span>
                <span className={`font-bold text-sm ${targetPkg.color}`}>{targetPkg.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Trạng thái</span>
                <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">Đã kích hoạt</span>
              </div>
            </div>
            <div className="flex gap-4">
               <button onClick={() => setStep(1)} className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors">
                 Về danh sách gói
               </button>
               <button onClick={() => handleMenuClick({id: 'dashboard'})} className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium shadow-lg transition-colors flex items-center">
                 Khám phá Dashboard <ChevronRight size={18} className="ml-1" />
               </button>
            </div>
          </div>
        )}
      </div>
    );
  };
  // --- VIEW: DANH SÁCH LỊCH HẸN (Dạng Grid) ---
  const ManageAppointmentsView = () => {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1400px] mx-auto pb-10">
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-8 gap-4 border-b border-white/10 pb-6">
          <div>
            <h2 className="text-3xl font-light text-white mb-2 flex items-center">
              <CalendarCheck className="mr-3 text-[#e53e3e]" size={32}/>
              Quản lý lịch hẹn
            </h2>
            <p className="text-gray-400">Theo dõi và xác nhận các lịch hẹn xem bất động sản, làm việc với Broker.</p>
          </div>
        </div>
        {/* Header Grid */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-5 pb-3 text-[10px] uppercase tracking-widest text-gray-500 font-semibold border-b border-white/5 mb-4">
          <div className="col-span-4 pl-1">Mã lịch hẹn / Căn hộ</div>
          <div className="col-span-2">Loại lịch hẹn</div>
          <div className="col-span-2">Thời gian hẹn</div>
          <div className="col-span-2">Trạng thái</div>
          <div className="col-span-2 text-right pr-1">Thao tác</div>
        </div>
        <div className="space-y-4">
          {appointments.map((apt) => (
            <div key={apt.id} className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-5 hover:border-white/20 transition-all duration-300 group">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-4 items-center">
                <div className="md:col-span-4 flex flex-col">
                  <div className="text-white font-bold flex flex-wrap items-center gap-2">{apt.id}</div>
                  <p className="text-sm text-gray-400 mt-1 flex items-center"><Building2 size={12} className="mr-1.5"/> {apt.property}</p>
                </div>
                <div className="md:col-span-2"><p className="text-sm font-medium text-gray-200">{apt.type}</p></div>
                <div className="md:col-span-2"><p className="text-sm text-white font-mono flex items-center"><Clock size={14} className="mr-1.5 text-blue-400"/> {apt.date}</p></div>
                <div className="md:col-span-2"><span className={`inline-block text-[10px] px-2.5 py-1 rounded font-bold uppercase border ${apt.statusStyle}`}>{apt.status}</span></div>
                <div className="md:col-span-2 flex justify-start md:justify-end items-center gap-2">
                  <button className="px-4 py-2 bg-black/40 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-gray-300 font-medium transition-colors flex items-center">
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
  // --- VIEW: THEO DÕI YÊU CẦU & GIAO DỊCH (Dạng Grid) ---
  const TransactionTrackingView = () => {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1400px] mx-auto pb-10">
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-8 gap-4 border-b border-white/10 pb-6">
          <div>
            <h2 className="text-3xl font-light text-white mb-2 flex items-center">
              <ListChecks className="mr-3 text-[#e53e3e]" size={32}/> Theo dõi yêu cầu xử lý
            </h2>
            <p className="text-gray-400">Quản lý và theo dõi tiến độ của các yêu cầu Bán / Cho thuê / Mua thêm.</p>
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
        <div className="space-y-4">
          {mockTransactions.map((tx) => (
            <div key={tx.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all duration-300">
               <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                 <div className="md:col-span-3"><p className="text-white font-bold">{tx.id}</p><p className="text-xs text-gray-400 mt-1">{tx.date}</p></div>
                 <div className="md:col-span-3"><p className="text-white font-medium truncate">{tx.propertyInfo}</p><p className="text-xs text-gray-400 mt-1">{tx.type}</p></div>
                 <div className="md:col-span-2"><div className="flex items-center"><UserCircle size={14} className="mr-1.5 text-gray-400" /><p className="text-sm text-gray-200">{tx.assignee}</p></div></div>
                 <div className="md:col-span-2"><span className={`inline-block text-[10px] px-2.5 py-1 rounded font-bold uppercase border ${tx.statusColor}`}>{tx.status}</span></div>
                 <div className="md:col-span-2 flex md:justify-end">
                    <button className="px-5 py-2.5 bg-black/40 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-gray-300 flex items-center">
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
  // --- VIEW: LỊCH SỬ THANH TOÁN (Dạng Grid) ---
  const PaymentHistoryView = () => {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1400px] mx-auto pb-10">
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-8 gap-4 border-b border-white/10 pb-6">
          <div>
            <h2 className="text-3xl font-light text-white mb-2 flex items-center">
              <Landmark className="mr-3 text-[#e53e3e]" size={32}/> Lịch sử thanh toán & Tài chính
            </h2>
            <p className="text-gray-400">Quản lý các đợt thanh toán, đối soát công nợ, và tải hóa đơn.</p>
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
        <div className="space-y-4">
          {mockPayments.map((payment) => (
            <div key={payment.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all duration-300">
               <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                 <div className="md:col-span-4"><p className="text-white font-bold truncate">{payment.property}</p><p className="text-sm text-gray-400 mt-1 truncate">{payment.phase}</p></div>
                 <div className="md:col-span-2"><p className="text-white font-bold">{payment.amount.toLocaleString()} đ</p><p className="text-xs text-gray-500 mt-1">{payment.method}</p></div>
                 <div className="md:col-span-2"><p className="text-sm text-gray-300">{payment.dueDate}</p><p className="text-xs text-gray-500 mt-1">{payment.date !== '-' ? `Đóng: ${payment.date}` : 'Chưa đóng'}</p></div>
                 <div className="md:col-span-2"><span className={`inline-block text-[10px] px-2.5 py-1 rounded font-bold uppercase border ${payment.statusStyle}`}>{payment.status}</span></div>
                 <div className="md:col-span-2 flex md:justify-end">
                    <button className="px-5 py-2.5 bg-black/40 hover:bg-[#e53e3e]/20 border border-white/10 rounded-lg text-sm text-gray-300 flex items-center">
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
        {/* VIEW: CHỌN GÓI THÀNH VIÊN */}
        {activeMenu === 'packages' && <MembershipPackagesView />}
        {/* Các Views Khác */}
        {activeMenu === 'manage_appointments' && <ManageAppointmentsView />}
        {activeMenu === 'track_request' && <TransactionTrackingView />}
        {activeMenu === 'orders' && <PaymentHistoryView />}
        {activeMenu !== 'packages' && activeMenu !== 'manage_appointments' && activeMenu !== 'track_request' && activeMenu !== 'orders' && (
          <div className="flex flex-col items-center justify-center h-full text-center animate-in zoom-in-95 duration-500">
            <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-6">
              <Sparkles size={40} className="text-gray-500" />
            </div>
            <h2 className="text-2xl font-light text-white mb-3">
              Module <span className="font-medium text-[#e53e3e]">
                "{
                  menuItems.find(m => m.id === activeMenu)?.label || activeMenu
                }"
              </span>
            </h2>
            <p className="text-gray-400 max-w-md mx-auto text-sm leading-relaxed">
              Vui lòng xem các tab <b>Quản lý gói thành viên</b>, <b>Quản lý lịch hẹn</b>, hoặc <b>Lịch sử thanh toán</b>.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}