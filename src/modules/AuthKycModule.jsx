import React, { useState } from 'react';
import {
  ShieldCheck, ArrowRight, ArrowLeft,
  CheckCircle, Eye, EyeOff, X, UploadCloud,
  Building2, MapPin, Plus, Trash2, User, Lock, Key,
  CreditCard, QrCode, Landmark, Receipt, Mail, Gift,
  FileText
} from 'lucide-react';
/**
 * App Component - Hệ thống đăng ký/đăng nhập sàn BĐS Becamex Tokyu
 * Cập nhật luồng:
 * Bước 1: Tài khoản & Định danh (Merged)
 * Bước 2: Khai báo tài sản (Tách riêng)
 * Bước 3: Gói dịch vụ
 * Bước 4: Thanh toán
 */
export default function AuthKycModule() {
  const [currentView, setCurrentView] = useState('login');
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('owner');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('vip');
  const [paymentMethod, setPaymentMethod] = useState('transfer');
  const [properties, setProperties] = useState([{ project: '', unit: '' }]);
  const packageData = {
    basic: {
      name: 'BASIC',
      price: 0,
      color: 'text-yellow-500',
      features: ['Quản lý hồ sơ & định danh', 'Xem tài sản & Tiến độ Sổ hồng', 'Lịch sử các đợt thanh toán', 'Đăng tin BĐS (Chờ Admin duyệt)']
    },
    vip: {
      name: 'VIP',
      price: 1000000,
      color: 'text-red-500',
      features: ['Tất cả quyền lợi gói BASIC', 'Quản lý lịch hẹn xem BĐS', 'Trạng thái giao dịch Real-time', 'Thống kê lượt xem tin đăng']
    },
    premium: {
      name: 'PREMIUM',
      price: 2000000,
      color: 'text-fuchsia-500',
      features: ['Tất cả quyền lợi gói VIP', 'Tin đăng vị trí ưu tiên (Tag VIP)', 'Báo cáo phân tích hàng tuần', 'Cập nhật trực tiếp từ Broker']
    }
  };
  const handleAddProperty = () => setProperties([...properties, { project: '', unit: '' }]);
  const handleRemoveProperty = (index) => setProperties(properties.filter((_, i) => i !== index));
  const updateProperty = (index, field, value) => {
    const newProps = [...properties];
    newProps[index][field] = value;
    setProperties(newProps);
  };
  const nextStep = () => {
    if (step === 4) setCurrentView('success');
    else setStep(prev => prev + 1);
  };
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));
  // --- MÀN HÌNH LOGIN ---
  const LoginScreen = () => (
    <div className="animate-in fade-in zoom-in-95 duration-500 w-full max-w-[400px] mx-auto">
      <div className="bg-[#14151a]/90 border border-white/10 shadow-2xl overflow-hidden backdrop-blur-md p-6 relative rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-light text-white tracking-wide">Đăng nhập</h2>
          <button className="text-gray-400 hover:text-white transition-colors">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>
        <div className="w-full h-px bg-white/20 mb-6"></div>
        <div className="space-y-5">
          <div>
            <label className="block text-sm text-gray-200 mb-2">Họ tên / Tên đăng nhập</label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-2.5 text-gray-400" strokeWidth={1.5} />
              <input type="text" placeholder="Nhập họ tên" className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 focus:border-[#e53e3e] outline-none text-white placeholder-gray-500 transition-colors text-sm rounded" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-200 mb-2">Mật khẩu</label>
            <div className="relative">
              <Key size={16} className="absolute left-3 top-2.5 text-gray-400" strokeWidth={1.5} />
              <input type={showPassword ? "text" : "password"} placeholder="Nhập mật khẩu" className="w-full pl-9 pr-10 py-2 bg-white/5 border border-white/10 focus:border-[#e53e3e] outline-none text-white placeholder-gray-500 transition-colors text-sm rounded" />
              <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-200">
                {showPassword ? <EyeOff size={16} strokeWidth={1.5} /> : <Eye size={16} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center text-xs pb-2 border-b border-white/20">
            <button onClick={() => setCurrentView('forgot_password')} className="text-gray-400 hover:text-[#e53e3e] transition-colors">Quên mật khẩu?</button>
            <button onClick={() => { setCurrentView('register'); setStep(1); }} className="text-white hover:text-[#e53e3e] transition-colors">Đăng ký ngay!</button>
          </div>
          <div className="space-y-2 pt-2">
            <button className="w-full py-2.5 bg-[#f03c30] hover:bg-red-600 text-white text-sm font-medium tracking-wide transition-colors rounded">ĐĂNG NHẬP (CHỦ SỞ HỮU)</button>
            <button className="w-full py-2.5 bg-[#f03c30] hover:bg-red-600 text-white text-sm font-medium tracking-wide transition-colors rounded">ĐĂNG NHẬP (MÔI GIỚI)</button>
            <button className="w-full py-2.5 bg-[#f03c30] hover:bg-red-600 text-white text-sm font-medium tracking-wide transition-colors rounded">ĐĂNG NHẬP (KHÁCH HÀNG)</button>
            <button className="w-full py-2.5 bg-[#f03c30] hover:bg-red-600 text-white text-sm font-medium tracking-wide transition-colors rounded">ĐĂNG NHẬP (ADMIN)</button>
          </div>
        </div>
      </div>
    </div>
  );
  // --- MÀN HÌNH QUÊN MẬT KHẨU ---
  const ForgotPasswordScreen = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    return (
      <div className="animate-in fade-in zoom-in-95 duration-500 w-full max-w-[400px] mx-auto">
        <div className="bg-[#14151a]/90 border border-white/10 shadow-2xl overflow-hidden backdrop-blur-md p-6 relative rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <button onClick={() => setCurrentView('login')} className="text-gray-400 hover:text-white transition-colors flex items-center text-sm">
              <ArrowLeft size={16} className="mr-1" /> Quay lại
            </button>
            <button onClick={() => setCurrentView('login')} className="text-gray-400 hover:text-white transition-colors">
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>
          <div className="w-full h-px bg-white/20 mb-6"></div>
          {!isSubmitted ? (
            <div className="space-y-5 animate-in fade-in">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Key size={24} className="text-[#e53e3e]" />
                </div>
                <h2 className="text-xl font-light text-white tracking-wide mb-2">Quên mật khẩu?</h2>
                <p className="text-sm text-gray-400">Vui lòng nhập địa chỉ email bạn đã sử dụng để đăng ký.</p>
              </div>
              <div>
                <label className="block text-sm text-gray-200 mb-2">Địa chỉ Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-2.5 text-gray-400" strokeWidth={1.5} />
                  <input type="email" placeholder="Nhập email của bạn" className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 focus:border-[#e53e3e] outline-none text-white placeholder-gray-500 transition-colors text-sm rounded" />
                </div>
              </div>
              <button onClick={() => setIsSubmitted(true)} className="w-full py-2.5 mt-2 bg-[#f03c30] hover:bg-red-600 text-white text-sm font-medium tracking-wide transition-colors rounded">
                GỬI YÊU CẦU
              </button>
            </div>
          ) : (
            <div className="space-y-5 text-center animate-in zoom-in-95 duration-300 py-4">
              <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={32} className="text-green-500" />
              </div>
              <h2 className="text-xl font-light text-white tracking-wide mb-2">Kiểm tra email</h2>
              <p className="text-sm text-gray-400 mb-6">Chúng tôi đã gửi một email hướng dẫn khôi phục mật khẩu.</p>
              <button onClick={() => setCurrentView('login')} className="w-full py-2.5 border border-[#f03c30] text-[#f03c30] hover:bg-[#f03c30] hover:text-white text-sm font-medium tracking-wide transition-colors rounded">
                QUAY LẠI ĐĂNG NHẬP
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };
  const SuccessScreen = () => (
    <div className="animate-in zoom-in-95 duration-500 w-full max-w-2xl mx-auto">
      <div className="bg-[#14151a]/95 border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md py-12 px-8 text-center">
        <div className="w-20 h-20 bg-[#e53e3e]/10 border border-[#e53e3e]/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="text-[#e53e3e]" size={40} />
        </div>
        <h2 className="text-3xl font-light text-white mb-3">Đăng ký thành công!</h2>
        <p className="text-gray-400 max-w-lg mx-auto text-sm mb-8 leading-relaxed">
          Tài khoản Chủ sở hữu và gói <span className="font-bold text-white uppercase">{packageData[selectedPackage].name}</span> của bạn đã được ghi nhận.
          <br/><br/>
          {selectedPackage !== 'basic' && paymentMethod !== 'vnpay' ? (
             <span className="text-yellow-500">Hệ thống đang chờ xác nhận thanh toán từ Admin (đối với CK/COD). </span>
          ) : ''}
          Hệ thống đang tiến hành phê duyệt hồ sơ định danh (KYC) trong vòng 24-48h làm việc.
        </p>
        <button onClick={() => setCurrentView('login')} className="px-8 py-3 border border-[#e53e3e] text-[#e53e3e] hover:bg-[#e53e3e] hover:text-white font-medium rounded-lg transition-all">
          Quay lại màn hình Đăng nhập
        </button>
      </div>
    </div>
  );
  return (
    <div
      className="min-h-screen bg-black font-sans text-gray-200 flex items-center justify-center p-4 md:p-8 relative"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2000&auto=format&fit=crop')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
      {currentView === 'login' && <LoginScreen />}
      {currentView === 'forgot_password' && <ForgotPasswordScreen />}
      {currentView === 'success' && <SuccessScreen />}
      {currentView === 'register' && (
        <div className="relative w-full max-w-5xl bg-[#14151a]/95 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-8 duration-500">
          <div className="flex justify-between items-center p-5 md:p-6 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 grid grid-cols-2 gap-0.5">
                <div className="bg-green-500 rounded-sm"></div>
                <div className="bg-red-500 rounded-sm"></div>
                <div className="bg-blue-500 rounded-sm"></div>
                <div className="bg-yellow-500 rounded-sm"></div>
              </div>
              <h1 className="text-xl md:text-2xl font-light text-white tracking-wide">Đăng ký tài khoản</h1>
            </div>
            <button onClick={() => setCurrentView('login')} className="text-gray-400 hover:text-[#e53e3e] transition-colors flex items-center text-sm">
              <span className="hidden md:inline mr-2">Đã có tài khoản?</span>
              <span className="underline">Đăng nhập</span>
            </button>
          </div>
          <div className="overflow-y-auto p-5 md:p-8 custom-scrollbar">
            <div className="mb-6 flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
              <label className="text-sm text-gray-400 min-w-[60px]">Bạn là</label>
              <div className="flex space-x-2">
                {['owner', 'broker', 'customer'].map(r => (
                  <button key={r} onClick={() => setRole(r)} className={`px-4 py-1.5 text-sm font-medium rounded transition-colors ${role === r ? 'bg-[#e53e3e] text-white' : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'}`}>
                    {r === 'owner' ? 'Chủ sở hữu' : r === 'broker' ? 'Môi giới' : 'Khách hàng mới'}
                  </button>
                ))}
              </div>
            </div>
            <div className="w-full py-2 mb-8 border-b border-white/5 pb-6">
              <div className="flex items-center justify-between md:justify-center md:space-x-4">
                {[
                  { num: 1, title: 'Tài khoản & Định danh' },
                  { num: 2, title: 'Khai báo tài sản' },
                  { num: 3, title: 'Gói dịch vụ' },
                  { num: 4, title: 'Thanh toán' }
                ].map((s, idx) => (
                  <React.Fragment key={s.num}>
                    <div className={`flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2 ${step >= s.num ? 'text-[#e53e3e]' : 'text-gray-600'}`}>
                      <div className={`w-8 h-8 flex items-center justify-center rounded-full border text-sm font-bold transition-colors ${
                        step >= s.num ? 'border-[#e53e3e] bg-[#e53e3e]/10' : 'border-gray-700 bg-[#1a1b23]'
                      }`}>
                        {step > s.num ? <CheckCircle size={16} /> : s.num}
                      </div>
                      <span className={`text-xs md:text-sm whitespace-nowrap ${step === s.num ? 'font-medium text-gray-200' : ''}`}>{s.title}</span>
                    </div>
                    {idx < 3 && (
                      <div className={`flex-1 md:flex-none md:w-10 lg:w-16 h-[1px] mx-2 ${step > s.num ? 'bg-[#e53e3e]' : 'bg-gray-700'}`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
            {/* Bước 1: Gộp Tài khoản & KYC */}
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
                {/* Phần Tài khoản */}
                <section>
                  <h3 className="text-sm font-medium text-gray-400 mb-4 flex items-center">
                    <User size={18} className="mr-2 text-gray-500" /> Thông tin cơ bản
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Họ và tên (*)" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-[#e53e3e] outline-none text-white placeholder-gray-500" />
                    <input type="tel" placeholder="Điện thoại (*)" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-[#e53e3e] outline-none text-white placeholder-gray-500" />
                    <input type="email" placeholder="Email (*)" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-[#e53e3e] outline-none text-white placeholder-gray-500" />
                    <input type="text" placeholder="Tên đăng nhập / ID (*)" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-[#e53e3e] outline-none text-white placeholder-gray-500" />
                    <div className="relative">
                      <input type={showPassword ? "text" : "password"} placeholder="Mật khẩu (*)" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-[#e53e3e] outline-none text-white placeholder-gray-500" />
                      <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-gray-500"><Eye size={18} /></button>
                    </div>
                    <input type={showPassword ? "text" : "password"} placeholder="Xác nhận mật khẩu (*)" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-[#e53e3e] outline-none text-white placeholder-gray-500" />
                  </div>
                </section>
                {/* Phần KYC (Định danh) */}
                <section className="pt-8 border-t border-white/5">
                  <h3 className="text-sm font-medium text-gray-400 mb-4 flex items-center">
                    <ShieldCheck size={18} className="mr-2 text-gray-500" /> Hồ sơ định danh (KYC)
                  </h3>
                  <div className="bg-[#e53e3e]/10 border border-[#e53e3e]/20 p-4 rounded-lg flex items-start space-x-3 text-red-200 text-sm mb-6">
                    <ShieldCheck className="flex-shrink-0 mt-0.5 text-[#e53e3e]" size={20} />
                    <p>Hệ thống yêu cầu hình ảnh rõ nét để phê duyệt tài khoản nhanh nhất.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg outline-none text-white appearance-none">
                      <option className="bg-gray-900">Căn cước công dân (CCCD)</option>
                      <option className="bg-gray-900">Hộ chiếu (Passport)</option>
                    </select>
                    <input type="text" placeholder="Số giấy tờ (*)" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg outline-none text-white" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {['Mặt trước CCCD', 'Mặt sau CCCD', 'Ảnh Selfie'].map((label, i) => (
                      <div key={i} className="border border-dashed border-gray-600 bg-white/5 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-white/10 hover:border-[#e53e3e] transition-all cursor-pointer h-32 group">
                        <UploadCloud size={24} className="text-gray-500 group-hover:text-[#e53e3e] mb-2 transition-colors" />
                        <span className="text-xs font-medium text-gray-400 group-hover:text-white">{label}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}
            {/* Bước 2: Tách riêng Khai báo tài sản */}
            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                  <h3 className="text-lg font-medium text-white mb-6 flex items-center">
                    <Building2 size={22} className="mr-3 text-[#e53e3e]" />
                    Danh sách tài sản sở hữu
                  </h3>
                  <p className="text-sm text-gray-400 mb-8">
                    Vui lòng cung cấp chính xác thông tin dự án và mã căn để hệ thống đối soát dữ liệu Hợp đồng.
                  </p>
                  <div className="space-y-4">
                    {properties.map((prop, index) => (
                      <div key={index} className="flex flex-col md:flex-row gap-4 p-4 bg-white/5 border border-white/5 rounded-xl animate-in fade-in slide-in-from-left-2 duration-300">
                        <div className="relative flex-1">
                          <label className="block text-xs text-gray-500 mb-1 ml-1">Dự án (*)</label>
                          <div className="relative">
                            <select
                              value={prop.project}
                              onChange={(e) => updateProperty(index, 'project', e.target.value)}
                              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-[#e53e3e] outline-none text-white appearance-none cursor-pointer"
                            >
                              <option value="" disabled hidden>Chọn dự án</option>
                              <option value="sora1" className="bg-gray-900 text-white">SORA Gardens I</option>
                              <option value="sora2" className="bg-gray-900 text-white">SORA Gardens II</option>
                              <option value="glory" className="bg-gray-900 text-white">The GLORY</option>
                            </select>
                            <MapPin size={18} className="absolute right-4 top-3.5 text-gray-500 pointer-events-none" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <label className="block text-xs text-gray-500 mb-1 ml-1">Mã căn / Unit (*)</label>
                          <div className="flex gap-2">
                            <input type="text" value={prop.unit} onChange={(e) => updateProperty(index, 'unit', e.target.value)} placeholder="VD: A1-01" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-[#e53e3e] outline-none text-white placeholder-gray-500" />
                            {properties.length > 1 && (
                              <button onClick={() => handleRemoveProperty(index)} className="px-4 border border-white/10 bg-white/5 rounded-lg hover:bg-red-500/10 hover:border-red-500 hover:text-red-500 text-gray-500 transition-colors">
                                <Trash2 size={20} />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button onClick={handleAddProperty} className="mt-6 flex items-center text-sm text-[#e53e3e] hover:text-red-400 font-medium group">
                    <div className="w-6 h-6 rounded-full border border-[#e53e3e] flex items-center justify-center mr-2 group-hover:bg-[#e53e3e] transition-colors">
                      <Plus size={14} className="group-hover:text-white" />
                    </div>
                    Thêm tài sản khác
                  </button>
                </div>
                <div className="bg-blue-500/5 border border-blue-500/10 p-4 rounded-xl flex items-center space-x-3 text-blue-300 text-xs">
                  <FileText size={20} />
                  <p>Thông tin này dùng để đối soát với hồ sơ SPA/LTL của Becamex Tokyu. Admin sẽ duyệt tài khoản dựa trên dữ liệu này.</p>
                </div>
              </div>
            )}
            {/* Bước 3: Gói dịch vụ */}
            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(packageData).map(([key, data]) => (
                    <div
                      key={key}
                      onClick={() => setSelectedPackage(key)}
                      className={`relative rounded-xl p-6 cursor-pointer transition-all border bg-gradient-to-b ${
                        selectedPackage === key
                          ? `from-${key === 'basic' ? 'yellow-500' : key === 'vip' ? 'red-500' : 'fuchsia-500'}/10 to-transparent border-${key === 'basic' ? 'yellow-500' : key === 'vip' ? 'red-500' : 'fuchsia-500'} scale-[1.02] shadow-2xl`
                          : 'from-white/5 to-transparent border-white/10 hover:border-white/30'
                      }`}
                    >
                      {key === 'vip' && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#e53e3e] text-white text-[10px] px-3 py-1 rounded-full uppercase tracking-widest font-bold">Best Seller</span>}
                      <div className="flex items-center space-x-2 mb-4 mt-2">
                        <div className={`w-4 h-4 rounded-full border ${selectedPackage === key ? `border-4 ${data.color.replace('text', 'border')}` : 'border-gray-500'}`}></div>
                        <h3 className={`${data.color} font-bold tracking-wider text-lg`}>{data.name}</h3>
                      </div>
                      <div className="flex items-end space-x-1 mb-6 border-b border-white/10 pb-4">
                        <span className="text-3xl font-bold text-white">
                          {data.price === 0 ? 'Miễn phí' : data.price.toLocaleString()}
                        </span>
                        {data.price !== 0 && <span className="text-sm text-gray-400 mb-1">VNĐ/năm</span>}
                      </div>
                      <ul className="space-y-3 text-sm text-gray-400">
                        {data.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className={`${data.color} mr-2 mt-0.5`}>•</span> {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Bước 4: Thanh toán */}
            {step === 4 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  <div className="md:col-span-2 space-y-4">
                    <h3 className="text-lg text-white font-medium mb-4 flex items-center">
                      <Receipt className="mr-2 text-gray-400" size={20}/> Tóm tắt đơn hàng
                    </h3>
                    <div className="bg-[#1a1b23] border border-white/5 rounded-xl p-6">
                      <div className="flex justify-between items-center pb-4 border-b border-white/10">
                        <span className="text-gray-400">Gói dịch vụ</span>
                        <span className={`font-bold uppercase tracking-wider ${packageData[selectedPackage].color}`}>{packageData[selectedPackage].name}</span>
                      </div>
                      <div className="flex justify-between items-center py-4 border-b border-white/10">
                        <span className="text-gray-400">Thời hạn</span>
                        <span className="text-white">{selectedPackage === 'basic' ? 'Trọn đời' : '12 tháng'}</span>
                      </div>
                      <div className="flex justify-between items-center pt-4">
                        <span className="text-gray-300 font-medium">Tổng thanh toán</span>
                        <span className={`text-2xl font-bold ${selectedPackage === 'basic' ? 'text-green-400' : 'text-white'}`}>
                          {packageData[selectedPackage].price === 0 ? '0 đ' : `${packageData[selectedPackage].price.toLocaleString()} đ`}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-3">
                    <h3 className="text-lg text-white font-medium mb-4">Phương thức thanh toán</h3>
                    {packageData[selectedPackage].price === 0 ? (
                      <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-8 flex flex-col items-center justify-center text-center h-[calc(100%-2.5rem)]">
                        <Gift size={48} className="text-green-500 mb-4" />
                        <h4 className="text-xl font-medium text-white mb-2">Gói BASIC miễn phí</h4>
                        <p className="text-gray-400 text-sm max-w-sm">
                          Bạn có thể tiến hành hoàn tất đăng ký ngay mà không cần thanh toán.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <label className={`flex items-start p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'vnpay' ? 'border-blue-500 bg-blue-500/5' : 'border-white/10 bg-white/5 hover:border-white/30'}`}>
                          <div className="flex items-center h-5">
                            <input type="radio" name="payment" checked={paymentMethod === 'vnpay'} onChange={() => setPaymentMethod('vnpay')} className="w-4 h-4 accent-blue-500 bg-transparent border-gray-600" />
                          </div>
                          <div className="ml-4 flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-white font-medium">Thanh toán VNPAY / Momo</span>
                              <QrCode className="text-blue-400" size={24} />
                            </div>
                            <p className="text-sm text-gray-400 mt-1">Thanh toán nhanh qua mã QR.</p>
                          </div>
                        </label>
                        <label className={`flex items-start p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'transfer' ? 'border-[#e53e3e] bg-[#e53e3e]/5' : 'border-white/10 bg-white/5 hover:border-white/30'}`}>
                          <div className="flex items-center h-5">
                            <input type="radio" name="payment" checked={paymentMethod === 'transfer'} onChange={() => setPaymentMethod('transfer')} className="w-4 h-4 accent-[#e53e3e] bg-transparent border-gray-600" />
                          </div>
                          <div className="ml-4 flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-white font-medium">Chuyển khoản ngân hàng</span>
                              <Landmark className="text-[#e53e3e]" size={24} />
                            </div>
                            {paymentMethod === 'transfer' && (
                              <div className="bg-black/50 p-4 mt-3 rounded-lg border border-white/5 text-sm">
                                <div className="flex justify-between mb-2"><span className="text-gray-500">Ngân hàng:</span> <span className="text-white font-medium">Vietcombank</span></div>
                                <div className="flex justify-between mb-2"><span className="text-gray-500">Số tài khoản:</span> <span className="text-white font-medium tracking-wider">0123 4567 8999</span></div>
                                <div className="flex justify-between"><span className="text-gray-500">Nội dung CK:</span> <span className="text-yellow-500 font-bold">DK PKG [SDT]</span></div>
                              </div>
                            )}
                          </div>
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="p-5 md:p-6 border-t border-white/10 bg-[#14151a] flex justify-between items-center">
            {step > 1 ? (
              <button onClick={prevStep} className="px-6 py-2.5 text-gray-400 hover:text-white font-medium transition-colors border border-transparent hover:border-white/10 rounded-lg">
                Quay lại
              </button>
            ) : <div />}
            <button
              onClick={nextStep}
              className="px-8 py-3 bg-[#e53e3e] hover:bg-red-700 text-white font-medium rounded-lg transition-colors shadow-lg shadow-red-500/20 flex items-center space-x-2"
            >
              <span>{step === 4 ? 'HOÀN TẤT ĐĂNG KÝ' : 'TIẾP TỤC'}</span>
              {step < 4 && <ArrowRight size={18} />}
            </button>
          </div>
        </div>
      )}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.02); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(229, 62, 62, 0.3); }
      `}</style>
    </div>
  );
}