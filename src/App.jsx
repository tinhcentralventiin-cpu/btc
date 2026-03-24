
import React, { useMemo, useState } from 'react';
import {
  Activity,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bell,
  Building2,
  Calendar,
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Clock3,
  CreditCard,
  Edit2,
  Eye,
  EyeOff,
  FileText,
  Filter,
  Gift,
  History,
  Home,
  Key,
  Landmark,
  LayoutDashboard,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Menu,
  Megaphone,
  Phone,
  PieChart,
  Plus,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  UploadCloud,
  UserCircle,
  Wallet,
  X,
} from 'lucide-react';

const PACKAGE_CONFIG = {
  basic: {
    id: 'basic',
    name: 'BASIC',
    short: 'B',
    price: 500000,
    color: 'text-slate-200',
    accent: 'bg-slate-500',
    badge: 'border-slate-500/40 bg-slate-500/10 text-slate-200',
    panel: 'from-slate-700/50 to-slate-900/40',
    features: [
      'Quản lý tài sản, tình trạng và hồ sơ pháp lý căn hộ',
      'Quản lý tài liệu & hồ sơ bàn giao theo từng căn',
      'Quản lý danh sách / sản phẩm đang sở hữu',
      'Trung tâm yêu cầu hỗ trợ',
      'Quản lý điều khoản thanh toán',
      'Rent/Re-Sale: Submit “Rental” & post image only',
    ],
  },
  vip: {
    id: 'vip',
    name: 'VIP',
    short: 'V',
    price: 1000000,
    color: 'text-amber-300',
    accent: 'bg-amber-500',
    badge: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
    panel: 'from-amber-500/10 to-zinc-900/40',
    features: [
      'Tất cả tính năng của BASIC',
      'Quản lý giao dịch & lịch sử cập nhật tài liệu',
      'Theo dõi trạng thái tài liệu và SLA 48 giờ',
      'Quản lý lịch hẹn xem BĐS / xác nhận yêu cầu hẹn',
      'Phân tích & báo cáo mức độ quan tâm căn hộ hàng tuần',
      'Rent/Re-Sale: yêu cầu bán / cho thuê, đề xuất giá, sửa chữa & bảo trì',
    ],
  },
  premium: {
    id: 'premium',
    name: 'PREMIUM',
    short: 'P',
    price: 2000000,
    color: 'text-fuchsia-300',
    accent: 'bg-fuchsia-500',
    badge: 'border-fuchsia-500/40 bg-fuchsia-500/10 text-fuchsia-300',
    panel: 'from-fuchsia-500/15 to-zinc-900/50',
    features: [
      'Tất cả tính năng của VIP',
      'Tài chính & thanh toán: số dư, hóa đơn, biên lai, lịch sử',
      'Theo dõi tiến độ real-time bằng biểu đồ thời gian',
      'Danh sách ưu tiên, cuộc hẹn ưu tiên, báo cáo sau chuyến thăm',
      'Nộp yêu cầu pháp lý và xử lý yêu cầu ưu tiên trong 24 giờ',
      'Rent/Re-Sale: giá cả, top listing, hiệu suất tin, VR service giảm 25%',
    ],
  },
};

const MENU_GROUPS = [
  {
    title: 'Tổng quan',
    items: [
      { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { id: 'account', icon: UserCircle, label: 'Thông tin tài khoản' },
      { id: 'properties', icon: Home, label: 'Tài sản của tôi' },
    ],
  },
  {
    title: 'Nghiệp vụ Owner',
    items: [
      { id: 'request_action', icon: ClipboardList, label: 'Yêu cầu xử lý tài sản' },
      { id: 'track_request', icon: Activity, label: 'Theo dõi yêu cầu xử lý' },
      { id: 'reports', icon: BarChart3, label: 'Báo cáo & kết quả' },
      { id: 'manage_posts', icon: Megaphone, label: 'Quản lý tin đăng' },
      { id: 'manage_appointments', icon: Calendar, label: 'Quản lý lịch hẹn' },
    ],
  },
  {
    title: 'Gói & vận hành',
    items: [
      { id: 'packages', icon: ShoppingCart, label: 'Chọn gói thành viên' },
      { id: 'orders', icon: Wallet, label: 'Lịch sử thanh toán' },
      { id: 'notifications', icon: Bell, label: 'Trung tâm thông báo' },
    ],
  },
];

const INITIAL_USER = {
  name: 'Owner Demo',
  id: 'OWNER-8899',
  email: 'owner.portal@example.com',
  phone: '0901 640 636',
  address: 'Thành phố Mới, Bình Dương',
  packageExpiry: '17/10/2026',
  accountStatus: 'Hoạt động',
  kycStatus: 'Đã duyệt',
  avatar: 'OD',
};

const INITIAL_PROPERTIES = [
  {
    id: 'p1',
    code: 'SORA 2 · A05-11',
    project: 'SORA Gardens 2',
    type: 'Căn hộ 2PN',
    ownership: 'Đã bàn giao',
    status: 'Đang cho thuê',
    value: '3.45 tỷ',
    rent: '18 triệu/tháng',
    legalStatus: 'Hồ sơ đầy đủ',
    pinkbook: 90,
    payment: 100,
    docs: 18,
    block: 'Block A',
    floor: 'Tầng 5',
    note: 'Đã có thông báo đóng 5% cuối, chờ nhận sổ hồng.',
  },
  {
    id: 'p2',
    code: 'THE GLORY · B12-08',
    project: 'MIDORI PARK The GLORY',
    type: 'Căn hộ 3PN',
    ownership: 'Đã bàn giao',
    status: 'Đang rao bán',
    value: '5.20 tỷ',
    rent: '—',
    legalStatus: 'Thiếu bản scan CCCD',
    pinkbook: 65,
    payment: 85,
    docs: 12,
    block: 'Block B',
    floor: 'Tầng 12',
    note: 'Cần bổ sung CCCD và giấy ủy quyền để hoàn tất hồ sơ.',
  },
  {
    id: 'p3',
    code: 'MIDORI · V02',
    project: 'MIDORI PARK The VIEW',
    type: 'Shophouse',
    ownership: 'Đang hoàn thiện hồ sơ',
    status: 'Tự khai thác',
    value: '8.10 tỷ',
    rent: '45 triệu/tháng',
    legalStatus: 'Đang rà soát hồ sơ pháp lý',
    pinkbook: 45,
    payment: 72,
    docs: 9,
    block: 'Khu Villa',
    floor: '2 tầng',
    note: 'Đang xử lý cập nhật hồ sơ sở hữu và kiểm tra tiến độ pháp lý.',
  },
];

const INITIAL_REQUESTS = [
  {
    id: 'r1',
    propertyId: 'p1',
    title: 'Yêu cầu theo dõi tiến độ sổ hồng',
    category: 'Pháp lý',
    priority: 'Cao',
    status: 'Đang xử lý',
    createdAt: '21/03/2026',
    owner: 'Admin Hồ sơ',
    nextStep: 'Chờ xác nhận lịch hẹn nhận sổ',
    progress: 80,
    checklist: ['Tiếp nhận hồ sơ', 'Xác minh chứng từ', 'Thông báo đóng 5%', 'Chờ lịch nhận sổ'],
    timeline: [
      { time: '21/03', label: 'Tiếp nhận yêu cầu', state: 'done' },
      { time: '22/03', label: 'Kiểm tra hồ sơ pháp lý', state: 'done' },
      { time: '24/03', label: 'Thông báo đóng 5% cuối', state: 'current' },
      { time: 'Dự kiến 30/03', label: 'Nhận lịch trao sổ', state: 'pending' },
    ],
  },
  {
    id: 'r2',
    propertyId: 'p2',
    title: 'Đăng tin bán lại căn hộ',
    category: 'Re-Sale',
    priority: 'Trung bình',
    status: 'Chờ bổ sung',
    createdAt: '19/03/2026',
    owner: 'Admin Tổng',
    nextStep: 'Bổ sung CCCD & ảnh nội thất',
    progress: 45,
    checklist: ['Tạo yêu cầu', 'Đối chiếu pháp lý', 'Bổ sung media', 'Duyệt tin'],
    timeline: [
      { time: '19/03', label: 'Ghi nhận nhu cầu bán', state: 'done' },
      { time: '20/03', label: 'Kiểm tra hồ sơ sở hữu', state: 'done' },
      { time: '22/03', label: 'Yêu cầu bổ sung media', state: 'current' },
      { time: 'Sau khi đủ hồ sơ', label: 'Đưa tin lên sàn', state: 'pending' },
    ],
  },
  {
    id: 'r3',
    propertyId: 'p3',
    title: 'Yêu cầu bảo trì hệ thống điện',
    category: 'Bảo trì',
    priority: 'Thấp',
    status: 'Hoàn tất',
    createdAt: '12/03/2026',
    owner: 'Trung tâm yêu cầu',
    nextStep: 'Đã hoàn tất và chờ đánh giá',
    progress: 100,
    checklist: ['Tiếp nhận', 'Khảo sát', 'Xử lý', 'Nghiệm thu'],
    timeline: [
      { time: '12/03', label: 'Tiếp nhận yêu cầu', state: 'done' },
      { time: '13/03', label: 'Khảo sát hiện trạng', state: 'done' },
      { time: '14/03', label: 'Xử lý sự cố', state: 'done' },
      { time: '15/03', label: 'Nghiệm thu hoàn tất', state: 'done' },
    ],
  },
];

const INITIAL_LISTINGS = [
  {
    id: 'l1',
    propertyId: 'p2',
    title: 'Bán căn hộ MIDORI PARK The GLORY · B12-08',
    type: 'Re-Sale',
    status: 'Đang hiển thị',
    price: '5.20 tỷ',
    views: 1280,
    leads: 16,
    saves: 29,
    mediaCount: 12,
    packageTag: 'PREMIUM',
    publishedAt: '20/03/2026',
  },
  {
    id: 'l2',
    propertyId: 'p1',
    title: 'Cho thuê SORA Gardens 2 · A05-11 full nội thất',
    type: 'Rental',
    status: 'Chờ duyệt',
    price: '18 triệu/tháng',
    views: 440,
    leads: 4,
    saves: 7,
    mediaCount: 8,
    packageTag: 'VIP',
    publishedAt: '22/03/2026',
  },
  {
    id: 'l3',
    propertyId: 'p3',
    title: 'Shophouse MIDORI · V02 cần tìm khách thuê dài hạn',
    type: 'Rental',
    status: 'Tạm ẩn',
    price: '45 triệu/tháng',
    views: 960,
    leads: 10,
    saves: 19,
    mediaCount: 10,
    packageTag: 'VIP',
    publishedAt: '10/03/2026',
  },
];

const INITIAL_APPOINTMENTS = [
  {
    id: 'a1',
    propertyId: 'p2',
    title: 'Lịch xem nhà khách hàng lead nóng',
    date: '26/03/2026',
    time: '10:00 - 10:45',
    location: 'MIDORI PARK The GLORY · B12-08',
    broker: 'BTOS Team',
    customer: 'Khách hàng tiềm năng #A102',
    status: 'Đã xác nhận',
    note: 'Ưu tiên khách có nhu cầu mua thực, cần chuẩn bị bộ hồ sơ pháp lý bản mềm.',
  },
  {
    id: 'a2',
    propertyId: 'p1',
    title: 'Hẹn xác nhận đóng 5% cuối',
    date: '27/03/2026',
    time: '15:00 - 15:30',
    location: 'Online meeting / Văn phòng BTC',
    broker: 'Admin Hồ sơ',
    customer: 'Owner',
    status: 'Chờ xác nhận',
    note: 'Cần xác nhận lịch hẹn nhận sổ và checklist giấy tờ đi kèm.',
  },
  {
    id: 'a3',
    propertyId: 'p3',
    title: 'Hẹn khảo sát bảo trì sau xử lý',
    date: '18/03/2026',
    time: '09:00 - 09:20',
    location: 'MIDORI · V02',
    broker: 'Trung tâm yêu cầu',
    customer: 'Owner',
    status: 'Hoàn tất',
    note: 'Đã nghiệm thu, chờ owner đánh giá mức độ hài lòng.',
  },
];

const INITIAL_PAYMENTS = [
  {
    id: 'pay1',
    propertyId: 'p1',
    phase: 'Phí dịch vụ giao dịch - tháng 03/2026',
    amount: 1000000,
    method: 'Chuyển khoản',
    dueDate: '25/03/2026',
    paidDate: '24/03/2026',
    status: 'Đã thanh toán',
    invoice: 'INV-2026-0311',
  },
  {
    id: 'pay2',
    propertyId: 'p2',
    phase: 'Gia hạn gói PREMIUM',
    amount: 2000000,
    method: 'VNPay',
    dueDate: '28/03/2026',
    paidDate: '-',
    status: 'Chờ thanh toán',
    invoice: 'INV-2026-0328',
  },
  {
    id: 'pay3',
    propertyId: 'p3',
    phase: 'Phí xử lý yêu cầu pháp lý',
    amount: 500000,
    method: 'Bank transfer',
    dueDate: '18/03/2026',
    paidDate: '18/03/2026',
    status: 'Đã thanh toán',
    invoice: 'INV-2026-0307',
  },
];

const INITIAL_NOTIFICATIONS = [
  {
    id: 'n1',
    category: 'payment',
    title: 'Đến hạn thanh toán phí dịch vụ',
    description: 'Khoản phí dịch vụ giao dịch của căn SORA 2 · A05-11 cần được xác nhận trước 25/03.',
    time: '2 giờ trước',
    read: false,
    propertyId: 'p1',
  },
  {
    id: 'n2',
    category: 'lead',
    title: 'Có khách hàng mới quan tâm tin đăng',
    description: 'Lead mới để lại thông tin liên hệ cho tin bán MIDORI PARK The GLORY · B12-08.',
    time: 'Hôm qua, 14:30',
    read: false,
    propertyId: 'p2',
  },
  {
    id: 'n3',
    category: 'legal',
    title: 'Hồ sơ sổ hồng cập nhật trạng thái mới',
    description: 'Yêu cầu theo dõi sổ hồng của căn SORA 2 · A05-11 đã chuyển sang bước “Thông báo đóng 5% cuối”.',
    time: '22/03/2026',
    read: true,
    propertyId: 'p1',
  },
  {
    id: 'n4',
    category: 'appointment',
    title: 'Lịch hẹn xem nhà đã được xác nhận',
    description: 'Lịch xem nhà ngày 26/03 cho căn B12-08 đã được broker xác nhận thành công.',
    time: '22/03/2026',
    read: true,
    propertyId: 'p2',
  },
];

const CATEGORY_OPTIONS = [
  'Pháp lý',
  'Re-Sale',
  'Rental',
  'Mua thêm',
  'Bảo trì',
  'Cập nhật hồ sơ',
  'Khác',
];

function currencyVnd(value) {
  return new Intl.NumberFormat('vi-VN').format(value) + ' đ';
}

function statusPill(status) {
  const map = {
    'Đang xử lý': 'border-blue-400/40 bg-blue-400/10 text-blue-200',
    'Chờ bổ sung': 'border-amber-400/40 bg-amber-400/10 text-amber-200',
    'Hoàn tất': 'border-emerald-400/40 bg-emerald-400/10 text-emerald-200',
    'Đang hiển thị': 'border-emerald-400/40 bg-emerald-400/10 text-emerald-200',
    'Tạm ẩn': 'border-slate-400/40 bg-slate-400/10 text-slate-200',
    'Chờ duyệt': 'border-amber-400/40 bg-amber-400/10 text-amber-200',
    'Đã xác nhận': 'border-emerald-400/40 bg-emerald-400/10 text-emerald-200',
    'Chờ xác nhận': 'border-amber-400/40 bg-amber-400/10 text-amber-200',
    'Đã thanh toán': 'border-emerald-400/40 bg-emerald-400/10 text-emerald-200',
    'Chờ thanh toán': 'border-red-400/40 bg-red-400/10 text-red-200',
    'Hoạt động': 'border-emerald-400/40 bg-emerald-400/10 text-emerald-200',
    'Đã duyệt': 'border-emerald-400/40 bg-emerald-400/10 text-emerald-200',
  };
  return map[status] || 'border-white/15 bg-white/5 text-white';
}

function Modal({ title, subtitle, onClose, children, footer }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[#15161c] shadow-2xl">
        <div className="flex items-start justify-between border-b border-white/10 px-5 py-4">
          <div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            {subtitle && <p className="mt-1 text-sm text-gray-400">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/10 p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>
        <div className="max-h-[calc(92vh-132px)] overflow-y-auto custom-scrollbar px-5 py-5">{children}</div>
        {footer && <div className="border-t border-white/10 bg-black/20 px-5 py-4">{footer}</div>}
      </div>
    </div>
  );
}

function Card({ className = '', children }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl ${className}`}>
      {children}
    </div>
  );
}

function SectionTitle({ icon: Icon, title, subtitle, action }) {
  return (
    <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-[#e53e3e]">
              <Icon size={20} />
            </div>
          )}
          <div>
            <h2 className="text-2xl font-semibold text-white md:text-3xl">{title}</h2>
            {subtitle && <p className="mt-1 text-sm text-gray-400 md:text-base">{subtitle}</p>}
          </div>
        </div>
      </div>
      {action}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub, accent = 'text-[#e53e3e]', chip }) {
  return (
    <Card className="relative overflow-hidden p-5">
      <div className={`absolute right-4 top-4 opacity-15 ${accent}`}>
        <Icon size={50} strokeWidth={1.4} />
      </div>
      <div className={`mb-4 inline-flex rounded-xl border border-white/10 bg-black/20 p-3 ${accent}`}>
        <Icon size={18} />
      </div>
      <div className="text-sm text-gray-400">{label}</div>
      <div className="mt-2 text-3xl font-bold text-white">{value}</div>
      <div className="mt-2 flex items-center justify-between gap-3">
        <div className="text-xs text-gray-500">{sub}</div>
        {chip && <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-wide text-gray-300">{chip}</span>}
      </div>
    </Card>
  );
}

function ProgressBar({ value, color = '#ef4444' }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
      <div className="h-full rounded-full transition-all" style={{ width: `${value}%`, background: color }} />
    </div>
  );
}

function LoginView({ onLogin, onGoRegister, onForgot }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#14151a]/95 p-6 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-6 flex items-center gap-3">
        <div className="grid h-10 w-10 grid-cols-2 gap-0.5">
          <div className="rounded-sm bg-green-500" />
          <div className="rounded-sm bg-red-500" />
          <div className="rounded-sm bg-blue-500" />
          <div className="rounded-sm bg-yellow-500" />
        </div>
        <div>
          <div className="font-bold tracking-[0.25em] text-white">BECAMEX</div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-gray-400">Owner Portal</div>
        </div>
      </div>
      <h1 className="text-2xl font-semibold text-white">Đăng nhập cổng Owner</h1>
      <p className="mt-2 text-sm text-gray-400">Bản integrated portal đã gộp layout, sidebar và toàn bộ module vào một flow thống nhất.</p>
      <div className="mt-6 space-y-4">
        <div>
          <label className="mb-2 block text-sm text-gray-300">Email / Tên đăng nhập</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-3 text-gray-500" />
            <input className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-white outline-none transition focus:border-[#e53e3e]" defaultValue="owner.portal@example.com" />
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm text-gray-300">Mật khẩu</label>
          <div className="relative">
            <Key size={16} className="absolute left-3 top-3 text-gray-500" />
            <input type={showPassword ? 'text' : 'password'} className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-12 text-white outline-none transition focus:border-[#e53e3e]" defaultValue="password-demo" />
            <button className="absolute right-3 top-3 text-gray-500 hover:text-white" onClick={() => setShowPassword((v) => !v)}>
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
        <button onClick={onForgot} className="transition hover:text-white">Quên mật khẩu?</button>
        <button onClick={onGoRegister} className="transition hover:text-white">Đăng ký tài khoản</button>
      </div>
      <div className="mt-6 space-y-2">
        <button onClick={onLogin} className="w-full rounded-xl bg-[#e53e3e] px-4 py-3 font-medium text-white transition hover:bg-red-600">Đăng nhập Owner Portal</button>
        <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-gray-400">
          Demo này cho vào thẳng portal dark UI để test full điều hướng và chức năng tích hợp.
        </div>
      </div>
    </div>
  );
}

function ForgotPasswordView({ onBack }) {
  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#14151a]/95 p-6 shadow-2xl backdrop-blur-xl">
      <button onClick={onBack} className="mb-4 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white">
        <ArrowLeft size={16} /> Quay lại đăng nhập
      </button>
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#e53e3e]/20 bg-[#e53e3e]/10 text-[#e53e3e]">
        <Key size={28} />
      </div>
      <h2 className="text-2xl font-semibold text-white">Khôi phục mật khẩu</h2>
      <p className="mt-2 text-sm text-gray-400">Nhập email để hệ thống gửi link đặt lại mật khẩu. Đây là flow demo theo module đăng nhập / quên mật khẩu.</p>
      <div className="mt-5 space-y-4">
        <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[#e53e3e]" placeholder="Nhập email đã đăng ký" />
        <button className="w-full rounded-xl bg-[#e53e3e] px-4 py-3 font-medium text-white transition hover:bg-red-600">Gửi yêu cầu</button>
      </div>
    </div>
  );
}

function RegisterView({ onBack, onComplete }) {
  const [step, setStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState('vip');
  const [paymentMethod, setPaymentMethod] = useState('transfer');
  const steps = ['Tài khoản & Định danh', 'Khai báo tài sản', 'Gói dịch vụ', 'Thanh toán'];
  return (
    <div className="w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#14151a]/95 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <div>
          <h2 className="text-2xl font-semibold text-white">Đăng ký tài khoản</h2>
          <p className="mt-1 text-sm text-gray-400">Giữ nguyên tinh thần module Auth/KYC nhưng gộp vào app integrated.</p>
        </div>
        <button onClick={onBack} className="text-sm text-gray-400 hover:text-white">Quay lại</button>
      </div>
      <div className="border-b border-white/10 px-6 py-4">
        <div className="flex flex-wrap items-center gap-4">
          {steps.map((label, index) => {
            const current = index + 1;
            const active = step === current;
            const done = step > current;
            return (
              <div key={label} className="flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold ${done || active ? 'border-[#e53e3e] bg-[#e53e3e]/10 text-white' : 'border-white/10 bg-white/5 text-gray-500'}`}>
                  {done ? <Check size={16} /> : current}
                </div>
                <div className={`text-sm ${active ? 'text-white' : 'text-gray-400'}`}>{label}</div>
                {current < steps.length && <div className="hidden h-px w-10 bg-white/10 md:block" />}
              </div>
            );
          })}
        </div>
      </div>
      <div className="max-h-[70vh] overflow-y-auto custom-scrollbar px-6 py-6">
        {step === 1 && (
          <div className="grid gap-4 md:grid-cols-2">
            {['Họ và tên (*)', 'Điện thoại (*)', 'Email (*)', 'Tên đăng nhập (*)', 'Mật khẩu (*)', 'Xác nhận mật khẩu (*)'].map((placeholder) => (
              <input key={placeholder} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[#e53e3e]" placeholder={placeholder} />
            ))}
            <div className="md:col-span-2 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-dashed border-white/10 bg-black/20 p-4 text-sm text-gray-400">
                <div className="mb-3 flex items-center gap-2 text-white"><ShieldCheck size={16} /> Upload CCCD / Passport</div>
                <button className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 hover:bg-white/10"><UploadCloud size={16}/> Tải tài liệu</button>
              </div>
              <div className="rounded-xl border border-dashed border-white/10 bg-black/20 p-4 text-sm text-gray-400">
                <div className="mb-3 flex items-center gap-2 text-white"><Camera size={16} /> Ảnh chân dung định danh</div>
                <button className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 hover:bg-white/10"><UploadCloud size={16}/> Tải ảnh</button>
              </div>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            {[1, 2].map((item) => (
              <div key={item} className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 md:grid-cols-3">
                <input className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-[#e53e3e]" placeholder="Dự án" />
                <input className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-[#e53e3e]" placeholder="Mã căn / block" />
                <input className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-[#e53e3e]" placeholder="Ghi chú" />
              </div>
            ))}
            <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white hover:bg-white/10"><Plus size={16}/> Thêm tài sản</button>
          </div>
        )}
        {step === 3 && (
          <div className="grid gap-4 lg:grid-cols-3">
            {Object.values(PACKAGE_CONFIG).map((pkg) => (
              <button key={pkg.id} onClick={() => setSelectedPackage(pkg.id)} className={`rounded-2xl border p-5 text-left transition ${selectedPackage === pkg.id ? 'border-[#e53e3e] bg-[#e53e3e]/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}>
                <div className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${pkg.badge}`}>{pkg.name}</div>
                <div className="mt-4 text-3xl font-bold text-white">{currencyVnd(pkg.price)}</div>
                <ul className="mt-4 space-y-2 text-sm text-gray-300">
                  {pkg.features.slice(0, 4).map((feature) => (
                    <li key={feature} className="flex gap-2"><Check size={15} className="mt-0.5 text-[#e53e3e]" /> <span>{feature}</span></li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
        )}
        {step === 4 && (
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="p-5">
              <div className="text-sm text-gray-400">Gói đã chọn</div>
              <div className="mt-2 text-2xl font-semibold text-white">{PACKAGE_CONFIG[selectedPackage].name}</div>
              <div className="mt-1 text-[#e53e3e]">{currencyVnd(PACKAGE_CONFIG[selectedPackage].price)}</div>
            </Card>
            <Card className="p-5">
              <div className="text-sm text-gray-400">Phương thức thanh toán</div>
              <div className="mt-4 grid gap-3">
                {[
                  { id: 'transfer', label: 'Chuyển khoản', icon: Landmark },
                  { id: 'vnpay', label: 'VNPay / QR', icon: CreditCard },
                ].map((item) => (
                  <button key={item.id} onClick={() => setPaymentMethod(item.id)} className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left ${paymentMethod === item.id ? 'border-[#e53e3e] bg-[#e53e3e]/10 text-white' : 'border-white/10 bg-white/5 text-gray-300 hover:bg-white/10'}`}>
                    <item.icon size={18} /> {item.label}
                  </button>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between border-t border-white/10 bg-black/20 px-6 py-4">
        <button onClick={() => (step === 1 ? onBack() : setStep((s) => s - 1))} className="rounded-xl border border-white/10 px-4 py-2 text-gray-300 hover:bg-white/5">{step === 1 ? 'Hủy' : 'Quay lại'}</button>
        <button onClick={() => (step === 4 ? onComplete() : setStep((s) => s + 1))} className="rounded-xl bg-[#e53e3e] px-5 py-2 font-medium text-white hover:bg-red-600">{step === 4 ? 'Hoàn tất đăng ký' : 'Tiếp tục'}</button>
      </div>
    </div>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [authView, setAuthView] = useState('login');
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [currentPackageId, setCurrentPackageId] = useState('premium');
  const [user, setUser] = useState(INITIAL_USER);
  const [properties, setProperties] = useState(INITIAL_PROPERTIES);
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [listings, setListings] = useState(INITIAL_LISTINGS);
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const [payments, setPayments] = useState(INITIAL_PAYMENTS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showKycModal, setShowKycModal] = useState(false);
  const [showPackageConfirm, setShowPackageConfirm] = useState(false);
  const [selectedPackageCandidate, setSelectedPackageCandidate] = useState(null);
  const [requestDraft, setRequestDraft] = useState(null);
  const [selectedListingId, setSelectedListingId] = useState(null);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [notificationFilter, setNotificationFilter] = useState('all');
  const [requestFilter, setRequestFilter] = useState('all');

  const currentPackage = PACKAGE_CONFIG[currentPackageId];
  const unreadCount = notifications.filter((item) => !item.read).length;
  const activeListings = listings.filter((item) => item.status === 'Đang hiển thị').length;
  const pendingPayments = payments.filter((item) => item.status === 'Chờ thanh toán').length;
  const propertyMap = Object.fromEntries(properties.map((property) => [property.id, property]));

  const filteredNotifications = useMemo(() => {
    return notifications.filter((item) => {
      if (notificationFilter === 'unread' && item.read) return false;
      if (searchTerm && !`${item.title} ${item.description}`.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    });
  }, [notifications, notificationFilter, searchTerm]);

  const filteredRequests = useMemo(() => {
    return requests.filter((item) => {
      if (requestFilter !== 'all' && item.status !== requestFilter) return false;
      if (searchTerm && !`${item.title} ${item.category} ${item.nextStep}`.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    });
  }, [requests, requestFilter, searchTerm]);

  const selectedListing = listings.find((item) => item.id === selectedListingId) || null;
  const selectedAppointment = appointments.find((item) => item.id === selectedAppointmentId) || null;
  const selectedPayment = payments.find((item) => item.id === selectedPaymentId) || null;

  const menuLookup = MENU_GROUPS.flatMap((group) => group.items).find((item) => item.id === currentPage);
  const pageTitle = menuLookup?.label || 'BTC Owner Portal';

  const dashboardStats = useMemo(() => {
    return {
      totalAssets: properties.length,
      hotRequests: requests.filter((item) => item.priority === 'Cao' && item.status !== 'Hoàn tất').length,
      activeAppointments: appointments.filter((item) => item.status !== 'Hoàn tất').length,
      unread: unreadCount,
    };
  }, [appointments, properties.length, requests, unreadCount]);

  const submitRequest = (draft) => {
    const newRequest = {
      id: `r${Date.now()}`,
      propertyId: draft.propertyId,
      title: draft.title,
      category: draft.category,
      priority: draft.priority,
      status: 'Đang xử lý',
      createdAt: 'Hôm nay',
      owner: 'Admin Tổng',
      nextStep: 'Đang phân công nhân sự phụ trách',
      progress: 20,
      checklist: ['Tiếp nhận', 'Phân loại', 'Xử lý', 'Hoàn tất'],
      timeline: [
        { time: 'Hôm nay', label: 'Tiếp nhận yêu cầu', state: 'done' },
        { time: 'Trong ngày', label: 'Phân loại & gán phụ trách', state: 'current' },
        { time: 'Tiếp theo', label: 'Xử lý yêu cầu', state: 'pending' },
        { time: 'Kết thúc', label: 'Hoàn tất & phản hồi owner', state: 'pending' },
      ],
    };
    setRequests((prev) => [newRequest, ...prev]);
    setNotifications((prev) => [
      {
        id: `n${Date.now()}`,
        category: 'request',
        title: `Đã tạo yêu cầu mới: ${draft.title}`,
        description: `Hệ thống đã ghi nhận yêu cầu thuộc nhóm ${draft.category}.`,
        time: 'Vừa xong',
        read: false,
        propertyId: draft.propertyId,
      },
      ...prev,
    ]);
    setRequestDraft(null);
    setCurrentPage('track_request');
  };

  const createListing = (form) => {
    const newListing = {
      id: `l${Date.now()}`,
      propertyId: form.propertyId,
      title: form.title,
      type: form.type,
      status: 'Chờ duyệt',
      price: form.price,
      views: 0,
      leads: 0,
      saves: 0,
      mediaCount: 0,
      packageTag: currentPackage.name,
      publishedAt: 'Hôm nay',
    };
    setListings((prev) => [newListing, ...prev]);
    setSelectedListingId(null);
    setCurrentPage('manage_posts');
  };

  const createAppointment = (form) => {
    const newAppointment = {
      id: `a${Date.now()}`,
      propertyId: form.propertyId,
      title: form.title,
      date: form.date,
      time: form.time,
      location: form.location,
      broker: form.broker,
      customer: form.customer,
      status: 'Chờ xác nhận',
      note: form.note,
    };
    setAppointments((prev) => [newAppointment, ...prev]);
    setCurrentPage('manage_appointments');
  };

  const markAllRead = () => setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
  const markNotificationRead = (id) => setNotifications((prev) => prev.map((item) => item.id === id ? { ...item, read: true } : item));
  const toggleListingStatus = (id) => setListings((prev) => prev.map((item) => item.id === id ? { ...item, status: item.status === 'Đang hiển thị' ? 'Tạm ẩn' : 'Đang hiển thị' } : item));
  const confirmPackageChange = () => {
    if (!selectedPackageCandidate) return;
    setCurrentPackageId(selectedPackageCandidate);
    setPayments((prev) => [
      {
        id: `pay${Date.now()}`,
        propertyId: properties[0]?.id || 'p1',
        phase: `Nâng cấp gói ${PACKAGE_CONFIG[selectedPackageCandidate].name}`,
        amount: PACKAGE_CONFIG[selectedPackageCandidate].price,
        method: 'VNPay',
        dueDate: 'Hôm nay',
        paidDate: '-',
        status: 'Chờ thanh toán',
        invoice: `INV-${Date.now()}`,
      },
      ...prev,
    ]);
    setShowPackageConfirm(false);
    setSelectedPackageCandidate(null);
    setCurrentPage('orders');
  };

  const sidebar = (
    <aside className={`${isSidebarCollapsed ? 'w-24' : 'w-80'} relative z-20 flex h-screen flex-col border-r border-white/10 bg-black/45 backdrop-blur-2xl transition-all duration-300`}>
      <button
        onClick={() => setIsSidebarCollapsed((v) => !v)}
        className="absolute -right-3 top-10 z-30 rounded-full border border-white/10 bg-[#1b1c22] p-1.5 text-white shadow-lg hover:bg-[#25262d]"
      >
        {isSidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      <div className={`border-b border-white/10 px-6 py-6 ${isSidebarCollapsed ? 'items-center' : ''}`}>
        <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
          <div className="grid h-11 w-11 grid-cols-2 gap-0.5 shadow-[0_0_20px_rgba(255,255,255,0.15)]">
            <div className="rounded-sm bg-green-500" />
            <div className="rounded-sm bg-red-500" />
            <div className="rounded-sm bg-blue-500" />
            <div className="rounded-sm bg-yellow-500" />
          </div>
          {!isSidebarCollapsed && (
            <div>
              <div className="text-lg font-bold tracking-[0.35em] text-white">BECAMEX</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-gray-400">Owner Portal</div>
            </div>
          )}
        </div>
        <div className={`mt-6 ${isSidebarCollapsed ? 'flex justify-center' : ''}`}>
          {!isSidebarCollapsed ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <div className="flex items-center gap-3">
                <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-tr from-[#e53e3e] to-orange-400 font-bold text-white">
                  {user.avatar}
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-black bg-green-500" />
                </div>
                <div className="min-w-0">
                  <div className="truncate font-medium text-white">{user.name}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-gray-500">{user.id}</div>
                </div>
              </div>
              <div className="mt-3">
                <label className="mb-1 block text-[10px] uppercase tracking-[0.25em] text-gray-500">Gói đang dùng</label>
                <div className="relative">
                  <select
                    value={currentPackageId}
                    onChange={(e) => setCurrentPackageId(e.target.value)}
                    className={`w-full appearance-none rounded-xl border border-white/10 bg-black/30 py-2 pl-10 pr-10 text-sm font-semibold outline-none ${currentPackage.color}`}
                  >
                    {Object.values(PACKAGE_CONFIG).map((pkg) => (
                      <option key={pkg.id} value={pkg.id} className="bg-[#14151a] text-white">{pkg.name}</option>
                    ))}
                  </select>
                  <Sparkles size={14} className={`pointer-events-none absolute left-3 top-2.5 ${currentPackage.color}`} />
                  <ChevronDown size={14} className="pointer-events-none absolute right-3 top-2.5 text-gray-500" />
                </div>
              </div>
            </div>
          ) : (
            <button onClick={() => setCurrentPackageId(currentPackageId === 'basic' ? 'vip' : currentPackageId === 'vip' ? 'premium' : 'basic')} className={`flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 font-bold ${currentPackage.color}`}>
              {currentPackage.short}
            </button>
          )}
        </div>
      </div>

      <div className="custom-scrollbar flex-1 overflow-y-auto px-3 py-4">
        {MENU_GROUPS.map((group) => (
          <div key={group.title} className="mb-6">
            {!isSidebarCollapsed && <div className="mb-2 px-3 text-[10px] uppercase tracking-[0.25em] text-gray-500">{group.title}</div>}
            <div className="space-y-1.5">
              {group.items.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    title={isSidebarCollapsed ? item.label : ''}
                    className={`flex w-full items-center rounded-2xl transition ${isSidebarCollapsed ? 'justify-center p-3' : 'gap-3 px-4 py-3'} ${isActive ? 'border border-[#e53e3e]/40 bg-[#e53e3e]/15 text-white shadow-[0_0_20px_rgba(229,62,62,0.15)]' : 'border border-transparent text-gray-400 hover:bg-white/5 hover:text-white'}`}
                  >
                    <item.icon size={19} className={isActive ? 'text-[#e53e3e]' : ''} />
                    {!isSidebarCollapsed && <span className="flex-1 text-left text-sm font-medium">{item.label}</span>}
                    {!isSidebarCollapsed && isActive && <ChevronRight size={16} className="text-[#e53e3e]" />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 px-3 py-3">
        <button onClick={() => setShowChangePassword(true)} className={`mb-2 flex w-full items-center rounded-2xl text-gray-400 transition hover:bg-white/5 hover:text-white ${isSidebarCollapsed ? 'justify-center p-3' : 'gap-3 px-4 py-3'}`}>
          <Key size={18} /> {!isSidebarCollapsed && <span className="text-sm">Đổi mật khẩu</span>}
        </button>
        <button onClick={() => { setIsAuthenticated(false); setAuthView('login'); }} className={`flex w-full items-center rounded-2xl text-red-300 transition hover:bg-red-500/10 ${isSidebarCollapsed ? 'justify-center p-3' : 'gap-3 px-4 py-3'}`}>
          <LogOut size={18} /> {!isSidebarCollapsed && <span className="text-sm">Đăng xuất</span>}
        </button>
      </div>
    </aside>
  );

  function QuickCreateListingModal() {
    const [form, setForm] = useState({
      propertyId: properties[0]?.id || '',
      title: '',
      type: 'Re-Sale',
      price: '',
    });
    return (
      <Modal
        title="Tạo tin đăng mới"
        subtitle="Gộp luồng đăng bán / cho thuê từ nhiều module vào 1 modal dùng chung."
        onClose={() => setSelectedListingId(null)}
        footer={
          <div className="flex justify-end gap-3">
            <button onClick={() => setSelectedListingId(null)} className="rounded-xl border border-white/10 px-4 py-2 text-gray-300 hover:bg-white/5">Hủy</button>
            <button onClick={() => createListing(form)} className="rounded-xl bg-[#e53e3e] px-4 py-2 font-medium text-white hover:bg-red-600">Tạo tin đăng</button>
          </div>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <select value={form.propertyId} onChange={(e) => setForm({ ...form, propertyId: e.target.value })} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none">
            {properties.map((property) => <option key={property.id} value={property.id} className="bg-[#14151a]">{property.code}</option>)}
          </select>
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none">
            <option className="bg-[#14151a]">Re-Sale</option>
            <option className="bg-[#14151a]">Rental</option>
            <option className="bg-[#14151a]">Mua thêm</option>
          </select>
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="md:col-span-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" placeholder="Tiêu đề tin đăng" />
          <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" placeholder="Giá mong muốn" />
          <div className="rounded-xl border border-dashed border-white/10 bg-black/20 p-4 text-sm text-gray-400">
            <div className="mb-2 text-white">Media & hồ sơ</div>
            Click để upload ảnh / tài liệu của căn hộ.
          </div>
        </div>
      </Modal>
    );
  }

  function RequestModal() {
    const [draft, setDraft] = useState(requestDraft || {
      propertyId: properties[0]?.id || '',
      category: 'Pháp lý',
      priority: 'Trung bình',
      title: '',
      note: '',
    });
    return (
      <Modal
        title="Tạo yêu cầu xử lý tài sản"
        subtitle="Form dùng chung cho pháp lý, bảo trì, re-sale, rental, mua thêm hoặc cập nhật hồ sơ."
        onClose={() => setRequestDraft(null)}
        footer={
          <div className="flex justify-end gap-3">
            <button onClick={() => setRequestDraft(null)} className="rounded-xl border border-white/10 px-4 py-2 text-gray-300 hover:bg-white/5">Hủy</button>
            <button onClick={() => submitRequest(draft)} className="rounded-xl bg-[#e53e3e] px-4 py-2 font-medium text-white hover:bg-red-600">Gửi yêu cầu</button>
          </div>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <select value={draft.propertyId} onChange={(e) => setDraft({ ...draft, propertyId: e.target.value })} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none">
            {properties.map((property) => <option key={property.id} value={property.id} className="bg-[#14151a]">{property.code}</option>)}
          </select>
          <select value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none">
            {CATEGORY_OPTIONS.map((option) => <option key={option} className="bg-[#14151a]">{option}</option>)}
          </select>
          <input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} className="md:col-span-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" placeholder="Tiêu đề / nhu cầu xử lý" />
          <select value={draft.priority} onChange={(e) => setDraft({ ...draft, priority: e.target.value })} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none">
            {['Thấp', 'Trung bình', 'Cao'].map((item) => <option key={item} className="bg-[#14151a]">{item}</option>)}
          </select>
          <div className="rounded-xl border border-dashed border-white/10 bg-black/20 p-4 text-sm text-gray-400">
            Upload tài liệu / hình ảnh chứng minh nếu cần.
          </div>
          <textarea value={draft.note} onChange={(e) => setDraft({ ...draft, note: e.target.value })} rows={4} className="md:col-span-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" placeholder="Mô tả chi tiết yêu cầu" />
        </div>
      </Modal>
    );
  }

  function AppointmentModal() {
    const [form, setForm] = useState({
      propertyId: properties[0]?.id || '',
      title: 'Lịch xem nhà / xác nhận yêu cầu',
      date: '29/03/2026',
      time: '10:00 - 10:30',
      location: 'Online / tại căn hộ',
      broker: 'BTOS Team',
      customer: 'Khách hàng mới',
      note: '',
    });
    return (
      <Modal
        title="Tạo lịch hẹn mới"
        subtitle="Form chung cho lịch xem BĐS, xác nhận giao dịch hoặc hỗ trợ pháp lý."
        onClose={() => setSelectedAppointmentId(null)}
        footer={
          <div className="flex justify-end gap-3">
            <button onClick={() => setSelectedAppointmentId(null)} className="rounded-xl border border-white/10 px-4 py-2 text-gray-300 hover:bg-white/5">Hủy</button>
            <button onClick={() => { createAppointment(form); setSelectedAppointmentId(null); }} className="rounded-xl bg-[#e53e3e] px-4 py-2 font-medium text-white hover:bg-red-600">Tạo lịch hẹn</button>
          </div>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <select value={form.propertyId} onChange={(e) => setForm({ ...form, propertyId: e.target.value })} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none">
            {properties.map((property) => <option key={property.id} value={property.id} className="bg-[#14151a]">{property.code}</option>)}
          </select>
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
          <input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
          <input value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
          <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="md:col-span-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
          <input value={form.broker} onChange={(e) => setForm({ ...form, broker: e.target.value })} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
          <input value={form.customer} onChange={(e) => setForm({ ...form, customer: e.target.value })} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
          <textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} rows={4} className="md:col-span-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" placeholder="Ghi chú lịch hẹn" />
        </div>
      </Modal>
    );
  }

  function EditProfileModal() {
    const [form, setForm] = useState(user);
    return (
      <Modal
        title="Cập nhật thông tin tài khoản"
        subtitle="Gộp logic edit profile của Dashboard và Account vào 1 modal dùng chung."
        onClose={() => setShowEditProfile(false)}
        footer={
          <div className="flex justify-end gap-3">
            <button onClick={() => setShowEditProfile(false)} className="rounded-xl border border-white/10 px-4 py-2 text-gray-300 hover:bg-white/5">Hủy</button>
            <button onClick={() => { setUser(form); setShowEditProfile(false); }} className="rounded-xl bg-[#e53e3e] px-4 py-2 font-medium text-white hover:bg-red-600">Lưu cập nhật</button>
          </div>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
          <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
          <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
        </div>
      </Modal>
    );
  }

  function ChangePasswordModal() {
    return (
      <Modal
        title="Đổi mật khẩu"
        subtitle="Flow dùng chung cho menu sidebar và thông tin tài khoản."
        onClose={() => setShowChangePassword(false)}
        footer={
          <div className="flex justify-end gap-3">
            <button onClick={() => setShowChangePassword(false)} className="rounded-xl border border-white/10 px-4 py-2 text-gray-300 hover:bg-white/5">Hủy</button>
            <button onClick={() => setShowChangePassword(false)} className="rounded-xl bg-[#e53e3e] px-4 py-2 font-medium text-white hover:bg-red-600">Cập nhật mật khẩu</button>
          </div>
        }
      >
        <div className="space-y-4">
          <input type="password" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" placeholder="Mật khẩu hiện tại" />
          <input type="password" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" placeholder="Mật khẩu mới" />
          <input type="password" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" placeholder="Xác nhận mật khẩu mới" />
        </div>
      </Modal>
    );
  }

  function KycModal() {
    return (
      <Modal
        title="Yêu cầu cập nhật định danh / hồ sơ"
        subtitle="Phù hợp với use case owner gửi yêu cầu điều chỉnh hồ sơ và bổ sung chứng từ."
        onClose={() => setShowKycModal(false)}
        footer={
          <div className="flex justify-end gap-3">
            <button onClick={() => setShowKycModal(false)} className="rounded-xl border border-white/10 px-4 py-2 text-gray-300 hover:bg-white/5">Đóng</button>
            <button onClick={() => setShowKycModal(false)} className="rounded-xl bg-[#e53e3e] px-4 py-2 font-medium text-white hover:bg-red-600">Gửi yêu cầu</button>
          </div>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <input className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" placeholder="Chủ đề cập nhật" />
          <select className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none">
            <option className="bg-[#14151a]">CCCD / Passport</option>
            <option className="bg-[#14151a]">Giấy ủy quyền</option>
            <option className="bg-[#14151a]">Thông tin liên hệ</option>
            <option className="bg-[#14151a]">Khác</option>
          </select>
          <textarea rows={4} className="md:col-span-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" placeholder="Mô tả chi tiết yêu cầu cập nhật" />
          <div className="md:col-span-2 rounded-xl border border-dashed border-white/10 bg-black/20 p-5 text-sm text-gray-400">
            Upload tài liệu mới: CCCD, passport, hợp đồng, bản scan phụ lục...
          </div>
        </div>
      </Modal>
    );
  }

  function PackageConfirmModal() {
    const pkg = selectedPackageCandidate ? PACKAGE_CONFIG[selectedPackageCandidate] : null;
    if (!pkg) return null;
    return (
      <Modal
        title={`Xác nhận chuyển sang gói ${pkg.name}`}
        subtitle="Sau khi xác nhận, hệ thống sẽ tạo mới 1 giao dịch trong Lịch sử thanh toán."
        onClose={() => setShowPackageConfirm(false)}
        footer={
          <div className="flex justify-end gap-3">
            <button onClick={() => setShowPackageConfirm(false)} className="rounded-xl border border-white/10 px-4 py-2 text-gray-300 hover:bg-white/5">Hủy</button>
            <button onClick={confirmPackageChange} className="rounded-xl bg-[#e53e3e] px-4 py-2 font-medium text-white hover:bg-red-600">Xác nhận nâng cấp</button>
          </div>
        }
      >
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${pkg.badge}`}>{pkg.name}</div>
          <div className="mt-4 text-3xl font-bold text-white">{currencyVnd(pkg.price)}</div>
          <ul className="mt-5 space-y-2 text-sm text-gray-300">
            {pkg.features.map((feature) => (
              <li key={feature} className="flex gap-2"><Check size={15} className="mt-0.5 text-[#e53e3e]" /> <span>{feature}</span></li>
            ))}
          </ul>
        </div>
      </Modal>
    );
  }

  const renderDashboard = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionTitle
        icon={LayoutDashboard}
        title={`Xin chào, ${user.name}`}
        subtitle="Portal đã được refactor thành 1 app hoàn chỉnh: 1 layout dark, 1 sidebar, 1 luồng điều hướng thống nhất."
        action={
          <div className="flex flex-wrap gap-3">
            <button onClick={() => setRequestDraft({ propertyId: properties[0]?.id || '', category: 'Mua thêm', priority: 'Trung bình', title: 'Nhu cầu mua thêm sản phẩm', note: '' })} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white hover:bg-white/10">
              Nhu cầu mua thêm
            </button>
            <button onClick={() => setSelectedListingId('create-new')} className="rounded-xl bg-[#e53e3e] px-4 py-3 text-sm font-medium text-white hover:bg-red-600">
              Đăng tin bán / cho thuê
            </button>
          </div>
        }
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Building2} label="Tổng tài sản" value={dashboardStats.totalAssets} sub="Bao gồm căn hộ, shophouse, tài sản đang sở hữu" accent="text-blue-300" chip="Portfolio" />
        <StatCard icon={ClipboardList} label="Yêu cầu nóng" value={dashboardStats.hotRequests} sub="Yêu cầu ưu tiên cao đang cần xử lý" accent="text-amber-300" chip="SLA" />
        <StatCard icon={Calendar} label="Lịch hẹn đang mở" value={dashboardStats.activeAppointments} sub="Lịch xem nhà, xác nhận hồ sơ, giao dịch" accent="text-emerald-300" chip="Booking" />
        <StatCard icon={Bell} label="Thông báo chưa đọc" value={dashboardStats.unread} sub="Cập nhật hồ sơ, lead mới, lịch nhắc" accent="text-[#ff7b7b]" chip="Alert" />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
        <Card className="p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Tổng quan tài sản</h3>
              <p className="mt-1 text-sm text-gray-400">Phân bổ danh mục theo tình trạng sở hữu và mục đích khai thác.</p>
            </div>
            <button onClick={() => setCurrentPage('properties')} className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-gray-300 hover:bg-white/5">Vào kho tài sản</button>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {properties.map((property) => (
              <div key={property.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs uppercase tracking-[0.25em] text-gray-500">{property.project}</div>
                <div className="mt-2 text-lg font-semibold text-white">{property.code}</div>
                <div className="mt-1 text-sm text-gray-400">{property.type} · {property.status}</div>
                <div className="mt-4 space-y-3 text-sm">
                  <div>
                    <div className="mb-1 flex justify-between text-gray-400"><span>Sổ hồng</span><span>{property.pinkbook}%</span></div>
                    <ProgressBar value={property.pinkbook} color="#60a5fa" />
                  </div>
                  <div>
                    <div className="mb-1 flex justify-between text-gray-400"><span>Thanh toán</span><span>{property.payment}%</span></div>
                    <ProgressBar value={property.payment} color="#f97316" />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-gray-300">
                  <span>{property.docs} hồ sơ</span>
                  <span>{property.legalStatus}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="overflow-hidden p-6">
            <div className={`rounded-2xl border border-white/10 bg-gradient-to-br ${currentPackage.panel} p-5`}>
              <div className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${currentPackage.badge}`}>Gói hiện tại · {currentPackage.name}</div>
              <div className="mt-4 text-sm text-gray-300">Hạn sử dụng đến {user.packageExpiry}</div>
              <div className="mt-6 space-y-2 text-sm text-gray-200">
                {currentPackage.features.slice(0, 4).map((feature) => (
                  <div key={feature} className="flex gap-2"><Check size={15} className="mt-0.5 text-[#e53e3e]" /> <span>{feature}</span></div>
                ))}
              </div>
              <button onClick={() => setCurrentPage('packages')} className="mt-6 rounded-xl border border-white/10 bg-black/20 px-4 py-2 text-sm text-white hover:bg-white/5">Xem chi tiết gói</button>
            </div>
          </Card>

          <Card className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Tiến độ & lịch trình</h3>
              <button onClick={() => setCurrentPage('track_request')} className="text-sm text-[#e53e3e]">Xem timeline</button>
            </div>
            <div className="space-y-4">
              {requests.slice(0, 3).map((item) => (
                <div key={item.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-white">{item.title}</div>
                      <div className="mt-1 text-xs text-gray-400">{propertyMap[item.propertyId]?.code} · {item.category}</div>
                    </div>
                    <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase ${statusPill(item.status)}`}>{item.status}</span>
                  </div>
                  <div className="mt-3 text-sm text-gray-400">{item.nextStep}</div>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex-1"><ProgressBar value={item.progress} color="#ef4444" /></div>
                    <div className="text-xs text-gray-500">{item.progress}%</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderAccount = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionTitle
        icon={UserCircle}
        title="Thông tin tài khoản"
        subtitle="Module 2.1.3 được gộp chung vào portal shell, nhưng vẫn có đầy đủ vùng hiển thị & thao tác độc lập."
        action={
          <div className="flex gap-3">
            <button onClick={() => setShowKycModal(true)} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white hover:bg-white/10">Gửi yêu cầu KYC</button>
            <button onClick={() => setShowEditProfile(true)} className="rounded-xl bg-[#e53e3e] px-4 py-3 text-sm font-medium text-white hover:bg-red-600">Chỉnh sửa hồ sơ</button>
          </div>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <Card className="p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-start">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-[#e53e3e] to-orange-400 text-2xl font-bold text-white">{user.avatar}</div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-2xl font-semibold text-white">{user.name}</h3>
                <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase ${statusPill(user.accountStatus)}`}>{user.accountStatus}</span>
                <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase ${statusPill(user.kycStatus)}`}>{user.kycStatus}</span>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {[
                  { label: 'ID tài khoản', value: user.id, icon: ShieldCheck },
                  { label: 'Email', value: user.email, icon: Mail },
                  { label: 'Điện thoại', value: user.phone, icon: Phone },
                  { label: 'Địa chỉ', value: user.address, icon: MapPin },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-500"><item.icon size={14} /> {item.label}</div>
                    <div className="text-sm text-white">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white">Định danh & hồ sơ</h3>
          <div className="mt-5 space-y-4">
            {[
              { title: 'CCCD / Passport', status: 'Đã duyệt', desc: 'Bản scan đã đối chiếu thành công' },
              { title: 'Giấy ủy quyền', status: 'Không yêu cầu', desc: 'Chưa có phát sinh ủy quyền mới' },
              { title: 'Thông tin thanh toán', status: 'Đang dùng', desc: 'Tài khoản nhận chi trả đã xác minh' },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-medium text-white">{item.title}</div>
                    <div className="mt-1 text-sm text-gray-400">{item.desc}</div>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase ${statusPill(item.status === 'Đang dùng' ? 'Đã duyệt' : item.status)}`}>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white">Tài sản liên kết với tài khoản</h3>
          <div className="mt-4 space-y-3">
            {properties.map((property) => (
              <div key={property.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-4">
                <div>
                  <div className="font-medium text-white">{property.code}</div>
                  <div className="mt-1 text-sm text-gray-400">{property.project} · {property.type}</div>
                </div>
                <button onClick={() => { setCurrentPage('properties'); }} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300 hover:bg-white/10">Xem tài sản</button>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white">Thao tác nhanh</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {[
              { label: 'Chỉnh sửa hồ sơ', action: () => setShowEditProfile(true), icon: Edit2 },
              { label: 'Đổi mật khẩu', action: () => setShowChangePassword(true), icon: Key },
              { label: 'Yêu cầu cập nhật KYC', action: () => setShowKycModal(true), icon: ShieldCheck },
              { label: 'Mở lịch sử thanh toán', action: () => setCurrentPage('orders'), icon: Wallet },
            ].map((item) => (
              <button key={item.label} onClick={item.action} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-left text-white hover:bg-white/10">
                <div className="rounded-xl border border-white/10 bg-black/20 p-2 text-[#e53e3e]"><item.icon size={16} /></div>
                <div className="text-sm font-medium">{item.label}</div>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );

  const renderProperties = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionTitle
        icon={Home}
        title="Tài sản của tôi"
        subtitle="Một màn hình chung để xem danh sách tài sản, hồ sơ pháp lý, tiến độ sổ hồng và điều hướng sang các nghiệp vụ liên quan."
      />
      <div className="grid gap-6 xl:grid-cols-2">
        {properties.map((property) => (
          <Card key={property.id} className="p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-gray-500">{property.project}</div>
                <div className="mt-2 text-2xl font-semibold text-white">{property.code}</div>
                <div className="mt-1 text-sm text-gray-400">{property.type} · {property.block} · {property.floor}</div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase ${statusPill(property.status)}`}>{property.status}</span>
                <span className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase ${statusPill(property.legalStatus === 'Hồ sơ đầy đủ' ? 'Đã duyệt' : 'Chờ bổ sung')}`}>{property.legalStatus}</span>
              </div>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-gray-500">Giá trị</div>
                <div className="mt-2 text-xl font-semibold text-white">{property.value}</div>
                <div className="mt-1 text-sm text-gray-400">Giá thuê tham chiếu: {property.rent}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-gray-500">Tiến độ sổ hồng</div>
                <div className="mt-2 text-xl font-semibold text-white">{property.pinkbook}%</div>
                <div className="mt-3"><ProgressBar value={property.pinkbook} color="#60a5fa" /></div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-gray-500">Thanh toán</div>
                <div className="mt-2 text-xl font-semibold text-white">{property.payment}%</div>
                <div className="mt-3"><ProgressBar value={property.payment} color="#f59e0b" /></div>
              </div>
            </div>
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-gray-300">
              {property.note}
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <button onClick={() => setRequestDraft({ propertyId: property.id, category: 'Pháp lý', priority: 'Cao', title: `Yêu cầu hỗ trợ cho ${property.code}`, note: '' })} className="rounded-xl bg-[#e53e3e] px-4 py-2 text-sm font-medium text-white hover:bg-red-600">Tạo yêu cầu</button>
              <button onClick={() => { setCurrentPage('track_request'); setRequestFilter('all'); }} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 hover:bg-white/10">Theo dõi xử lý</button>
              <button onClick={() => setCurrentPage('manage_posts')} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 hover:bg-white/10">Quản lý tin đăng</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderRequestAction = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionTitle
        icon={ClipboardList}
        title="Yêu cầu xử lý tài sản"
        subtitle="Tập trung toàn bộ các nghiệp vụ phát sinh: pháp lý, re-sale, rental, bảo trì, mua thêm và cập nhật hồ sơ."
        action={<button onClick={() => setRequestDraft({ propertyId: properties[0]?.id || '', category: 'Pháp lý', priority: 'Trung bình', title: '', note: '' })} className="rounded-xl bg-[#e53e3e] px-4 py-3 text-sm font-medium text-white hover:bg-red-600">Tạo yêu cầu mới</button>}
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[
          { title: 'Pháp lý & Sổ hồng', desc: 'Theo dõi pinkbook, yêu cầu điều chỉnh hồ sơ, yêu cầu pháp lý phát sinh.', category: 'Pháp lý' },
          { title: 'Re-Sale / Rental', desc: 'Đăng bán, cho thuê, đề xuất giá và xử lý hồ sơ đăng tin.', category: 'Re-Sale' },
          { title: 'Bảo trì & Hỗ trợ', desc: 'Bảo trì, sửa chữa, kiểm tra bàn giao, hỗ trợ kỹ thuật.', category: 'Bảo trì' },
          { title: 'Mua thêm sản phẩm', desc: 'Gửi nhu cầu mua thêm căn hộ / sản phẩm mới trong dự án.', category: 'Mua thêm' },
          { title: 'Cập nhật hồ sơ', desc: 'Bổ sung CCCD, giấy ủy quyền, thông tin thanh toán và chứng từ.', category: 'Cập nhật hồ sơ' },
          { title: 'Khác', desc: 'Các yêu cầu khác chưa nằm trong nhóm chuẩn.', category: 'Khác' },
        ].map((item) => (
          <Card key={item.title} className="p-5">
            <div className="rounded-xl border border-white/10 bg-black/20 p-3 text-[#e53e3e] inline-flex"><ClipboardList size={18} /></div>
            <div className="mt-4 text-lg font-semibold text-white">{item.title}</div>
            <div className="mt-2 text-sm leading-6 text-gray-400">{item.desc}</div>
            <button onClick={() => setRequestDraft({ propertyId: properties[0]?.id || '', category: item.category, priority: 'Trung bình', title: item.title, note: '' })} className="mt-5 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10">Tạo yêu cầu</button>
          </Card>
        ))}
      </div>

      <Card className="mt-6 p-6">
        <h3 className="text-lg font-semibold text-white">Yêu cầu gần đây</h3>
        <div className="mt-4 space-y-3">
          {requests.slice(0, 4).map((item) => (
            <div key={item.id} className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-medium text-white">{item.title}</div>
                <div className="mt-1 text-sm text-gray-400">{propertyMap[item.propertyId]?.code} · {item.category} · tạo lúc {item.createdAt}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase ${statusPill(item.status)}`}>{item.status}</span>
                <button onClick={() => setCurrentPage('track_request')} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300 hover:bg-white/10">Theo dõi</button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderTrackRequest = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionTitle
        icon={Activity}
        title="Theo dõi yêu cầu xử lý"
        subtitle="Bảng theo dõi timeline, trạng thái, checklist và next step của từng yêu cầu đang mở."
        action={
          <div className="flex items-center gap-3">
            <select value={requestFilter} onChange={(e) => setRequestFilter(e.target.value)} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none">
              {['all', 'Đang xử lý', 'Chờ bổ sung', 'Hoàn tất'].map((item) => <option key={item} value={item} className="bg-[#14151a]">{item === 'all' ? 'Tất cả trạng thái' : item}</option>)}
            </select>
          </div>
        }
      />
      <div className="space-y-5">
        {filteredRequests.map((item) => (
          <Card key={item.id} className="p-6">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
              <div className="xl:w-[340px]">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl border border-white/10 bg-black/20 p-3 text-[#e53e3e]"><FileText size={18} /></div>
                  <div>
                    <div className="text-lg font-semibold text-white">{item.title}</div>
                    <div className="mt-1 text-sm text-gray-400">{propertyMap[item.propertyId]?.code} · {item.category}</div>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase ${statusPill(item.status)}`}>{item.status}</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase text-gray-300">Ưu tiên {item.priority}</span>
                </div>
                <div className="mt-5 space-y-3 text-sm text-gray-400">
                  <div><span className="text-gray-500">Phụ trách:</span> {item.owner}</div>
                  <div><span className="text-gray-500">Next step:</span> {item.nextStep}</div>
                </div>
              </div>
              <div className="grid flex-1 gap-5 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="mb-3 flex items-center justify-between text-sm text-gray-400">
                    <span>Tiến độ tổng</span>
                    <span>{item.progress}%</span>
                  </div>
                  <ProgressBar value={item.progress} color="#ef4444" />
                  <div className="mt-5 space-y-4">
                    {item.timeline.map((step) => (
                      <div key={step.label} className="flex gap-3">
                        <div className={`mt-1 h-3 w-3 flex-shrink-0 rounded-full ${step.state === 'done' ? 'bg-emerald-400' : step.state === 'current' ? 'bg-[#e53e3e]' : 'bg-white/20'}`} />
                        <div>
                          <div className="text-sm font-medium text-white">{step.label}</div>
                          <div className="mt-1 text-xs text-gray-500">{step.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-sm font-semibold text-white">Checklist</div>
                  <div className="mt-4 space-y-3">
                    {item.checklist.map((step, index) => (
                      <div key={step} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300">
                        <div className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${index < Math.ceil((item.progress / 100) * item.checklist.length) ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/5 text-gray-500'}`}>{index + 1}</div>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderReports = () => {
    const totalViews = listings.reduce((sum, item) => sum + item.views, 0);
    const totalLeads = listings.reduce((sum, item) => sum + item.leads, 0);
    const avgPinkbook = Math.round(properties.reduce((sum, item) => sum + item.pinkbook, 0) / properties.length);
    const marketBars = [
      { label: 'MIDORI PARK', value: 92 },
      { label: 'SORA Gardens', value: 76 },
      { label: 'The View', value: 61 },
      { label: 'Shophouse', value: 54 },
    ];
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <SectionTitle icon={BarChart3} title="Báo cáo & kết quả" subtitle="Tổng hợp hiệu suất danh mục, quan tâm thị trường, tình hình đăng tin và trạng thái xử lý giao dịch." />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <StatCard icon={TrendingUp} label="Tổng lượt xem tin" value={totalViews} sub="Từ các listing đang quản lý" accent="text-blue-300" />
          <StatCard icon={Bell} label="Lead quan tâm" value={totalLeads} sub="Tổng số lead để lại liên hệ" accent="text-emerald-300" />
          <StatCard icon={PieChart} label="Tiến độ sổ hồng TB" value={`${avgPinkbook}%`} sub="Tính trên toàn bộ tài sản đang theo dõi" accent="text-amber-300" />
          <StatCard icon={Wallet} label="Khoản chờ thanh toán" value={pendingPayments} sub="Giao dịch đang chờ xác nhận" accent="text-[#ff7b7b]" />
        </div>
        <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-white">Mức độ quan tâm theo nhóm sản phẩm</h3>
            <div className="mt-6 space-y-4">
              {marketBars.map((bar) => (
                <div key={bar.label}>
                  <div className="mb-2 flex items-center justify-between text-sm text-gray-300">
                    <span>{bar.label}</span>
                    <span>{bar.value}%</span>
                  </div>
                  <ProgressBar value={bar.value} color="#ef4444" />
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-white">Kết quả giao dịch gần đây</h3>
            <div className="mt-4 space-y-3">
              {[
                'Lead nóng cho căn B12-08 đã xác nhận lịch xem nhà.',
                'Yêu cầu sổ hồng A05-11 chuyển sang bước chờ nhận lịch.',
                'Shophouse V02 đã hoàn tất bảo trì và chờ đánh giá.',
                'Tin cho thuê A05-11 đang chờ admin duyệt media.',
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-gray-300">{item}</div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  };

  const renderPackages = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionTitle icon={ShoppingCart} title="Chọn gói thành viên" subtitle="Một màn hình chung cho lựa chọn gói, đổi gói và đồng bộ với lịch sử thanh toán." />
      <div className="grid gap-6 xl:grid-cols-3">
        {Object.values(PACKAGE_CONFIG).map((pkg) => {
          const isCurrent = pkg.id === currentPackageId;
          return (
            <Card key={pkg.id} className={`overflow-hidden p-6 ${isCurrent ? 'ring-1 ring-[#e53e3e]/50' : ''}`}>
              <div className={`rounded-2xl border border-white/10 bg-gradient-to-br ${pkg.panel} p-5`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${pkg.badge}`}>{pkg.name}</div>
                    <div className="mt-4 text-4xl font-bold text-white">{currencyVnd(pkg.price)}</div>
                  </div>
                  {isCurrent && <div className="rounded-full border border-[#e53e3e]/30 bg-[#e53e3e]/10 px-3 py-1 text-[10px] font-semibold uppercase text-[#ffb3b3]">Đang dùng</div>}
                </div>
                <div className="mt-5 space-y-3 text-sm text-gray-200">
                  {pkg.features.map((feature) => (
                    <div key={feature} className="flex gap-2"><Check size={15} className="mt-0.5 text-[#e53e3e]" /> <span>{feature}</span></div>
                  ))}
                </div>
                <button
                  onClick={() => { setSelectedPackageCandidate(pkg.id); setShowPackageConfirm(true); }}
                  className={`mt-6 w-full rounded-xl px-4 py-3 text-sm font-medium ${isCurrent ? 'border border-white/10 bg-black/20 text-gray-300' : 'bg-[#e53e3e] text-white hover:bg-red-600'}`}
                  disabled={isCurrent}
                >
                  {isCurrent ? 'Đang sử dụng' : `Chuyển sang ${pkg.name}`}
                </button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const renderPayments = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionTitle icon={Wallet} title="Lịch sử thanh toán" subtitle="Quản lý giao dịch, hóa đơn, biên lai và các khoản đến hạn từ nhiều module đã gộp lại." />
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-6">
          <StatCard icon={CreditCard} label="Tổng giao dịch" value={payments.length} sub="Bao gồm gói dịch vụ và phí xử lý" accent="text-blue-300" />
          <StatCard icon={AlertCircle} label="Khoản chờ thanh toán" value={pendingPayments} sub="Cần xác nhận thanh toán hoặc đối soát" accent="text-[#ff7b7b]" />
          <StatCard icon={Gift} label="Gói hiện tại" value={currentPackage.name} sub="Đồng bộ với cấu hình Membership" accent="text-fuchsia-300" />
        </div>
        <Card className="p-6">
          <div className="space-y-4">
            {payments.map((payment) => (
              <div key={payment.id} className="grid gap-4 rounded-2xl border border-white/10 bg-black/20 p-4 md:grid-cols-[1.4fr_0.9fr_0.8fr_auto] md:items-center">
                <div>
                  <div className="font-medium text-white">{payment.phase}</div>
                  <div className="mt-1 text-sm text-gray-400">{propertyMap[payment.propertyId]?.code} · {payment.invoice}</div>
                </div>
                <div>
                  <div className="text-white">{currencyVnd(payment.amount)}</div>
                  <div className="mt-1 text-xs text-gray-500">{payment.method}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-300">Hạn: {payment.dueDate}</div>
                  <div className="mt-1 text-xs text-gray-500">{payment.paidDate === '-' ? 'Chưa thanh toán' : `Đóng: ${payment.paidDate}`}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase ${statusPill(payment.status)}`}>{payment.status}</span>
                  <button onClick={() => setSelectedPaymentId(payment.id)} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300 hover:bg-white/10">Chi tiết</button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionTitle
        icon={Bell}
        title="Trung tâm thông báo"
        subtitle="Thông báo hệ thống, cập nhật hồ sơ, lead mới và lịch nhắc trong một trung tâm thống nhất."
        action={
          <div className="flex gap-3">
            <button onClick={() => setNotificationFilter((v) => v === 'all' ? 'unread' : 'all')} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white hover:bg-white/10">{notificationFilter === 'all' ? 'Chỉ xem chưa đọc' : 'Xem tất cả'}</button>
            <button onClick={markAllRead} className="rounded-xl bg-[#e53e3e] px-4 py-3 text-sm font-medium text-white hover:bg-red-600">Đánh dấu tất cả đã đọc</button>
          </div>
        }
      />
      <div className="space-y-4">
        {filteredNotifications.map((item) => (
          <Card key={item.id} className={`p-5 ${item.read ? 'opacity-80' : 'ring-1 ring-[#e53e3e]/30'}`}>
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="flex gap-4">
                <div className={`mt-1 h-10 w-10 flex-shrink-0 rounded-xl border border-white/10 ${item.read ? 'bg-white/5 text-gray-400' : 'bg-[#e53e3e]/10 text-[#e53e3e]'} flex items-center justify-center`}>
                  <Bell size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <div className="font-semibold text-white">{item.title}</div>
                    {!item.read && <span className="h-2.5 w-2.5 rounded-full bg-[#e53e3e]" />}
                  </div>
                  <div className="mt-2 text-sm leading-6 text-gray-400">{item.description}</div>
                  <div className="mt-3 text-xs text-gray-500">{item.time} · {propertyMap[item.propertyId]?.code}</div>
                </div>
              </div>
              {!item.read && <button onClick={() => markNotificationRead(item.id)} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300 hover:bg-white/10">Đánh dấu đã đọc</button>}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderListings = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionTitle
        icon={Megaphone}
        title="Quản lý tin đăng"
        subtitle="Tập trung toàn bộ tin đăng bán / cho thuê / nhu cầu mua vào một module duy nhất, không còn lặp layout."
        action={<button onClick={() => setSelectedListingId('create-new')} className="rounded-xl bg-[#e53e3e] px-4 py-3 text-sm font-medium text-white hover:bg-red-600">Tạo tin đăng mới</button>}
      />
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-1">
          <StatCard icon={Megaphone} label="Tin đang hiển thị" value={activeListings} sub="Đã publish công khai trên sàn" accent="text-emerald-300" />
          <StatCard icon={Eye} label="Lượt xem tổng" value={listings.reduce((sum, item) => sum + item.views, 0)} sub="Theo dõi hiệu suất listing" accent="text-blue-300" />
        </div>
        <div className="space-y-4">
          {listings.map((listing) => (
            <Card key={listing.id} className="p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="text-lg font-semibold text-white">{listing.title}</div>
                  <div className="mt-1 text-sm text-gray-400">{propertyMap[listing.propertyId]?.code} · {listing.type} · publish {listing.publishedAt}</div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {[
                      { label: 'Giá', value: listing.price },
                      { label: 'Views', value: listing.views },
                      { label: 'Leads', value: listing.leads },
                    ].map((metric) => (
                      <div key={metric.label} className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-gray-300">
                        <div className="text-xs uppercase tracking-[0.2em] text-gray-500">{metric.label}</div>
                        <div className="mt-1 font-medium text-white">{metric.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase ${statusPill(listing.status)}`}>{listing.status}</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase text-gray-300">{listing.packageTag}</span>
                  <button onClick={() => toggleListingStatus(listing.id)} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300 hover:bg-white/10">Ẩn / Hiện</button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionTitle
        icon={Calendar}
        title="Quản lý lịch hẹn"
        subtitle="Một màn hình thống nhất cho lịch xem BĐS, lịch xác nhận hồ sơ và lịch hỗ trợ giao dịch."
        action={<button onClick={() => setSelectedAppointmentId('create-new')} className="rounded-xl bg-[#e53e3e] px-4 py-3 text-sm font-medium text-white hover:bg-red-600">Tạo lịch hẹn</button>}
      />
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <Card key={appointment.id} className="p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="text-lg font-semibold text-white">{appointment.title}</div>
                <div className="mt-1 text-sm text-gray-400">{appointment.location}</div>
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  {[
                    { label: 'Ngày', value: appointment.date },
                    { label: 'Khung giờ', value: appointment.time },
                    { label: 'Phụ trách', value: appointment.broker },
                  ].map((item) => (
                    <div key={item.label} className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-gray-300">
                      <div className="text-xs uppercase tracking-[0.2em] text-gray-500">{item.label}</div>
                      <div className="mt-1 text-white">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase ${statusPill(appointment.status)}`}>{appointment.status}</span>
                <button onClick={() => setSelectedAppointmentId(appointment.id)} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300 hover:bg-white/10">Chi tiết</button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard': return renderDashboard();
      case 'account': return renderAccount();
      case 'properties': return renderProperties();
      case 'request_action': return renderRequestAction();
      case 'track_request': return renderTrackRequest();
      case 'reports': return renderReports();
      case 'packages': return renderPackages();
      case 'orders': return renderPayments();
      case 'notifications': return renderNotifications();
      case 'manage_posts': return renderListings();
      case 'manage_appointments': return renderAppointments();
      default: return renderDashboard();
    }
  };

  if (!isAuthenticated) {
    return (
      <div
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black p-4 font-sans text-gray-200"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2000&auto=format&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-[#14151a]/95 to-[#090a0d]/95 backdrop-blur-sm" />
        <div className="relative z-10 w-full max-w-5xl">
          {authView === 'login' && <LoginView onLogin={() => setIsAuthenticated(true)} onGoRegister={() => setAuthView('register')} onForgot={() => setAuthView('forgot')} />}
          {authView === 'forgot' && <ForgotPasswordView onBack={() => setAuthView('login')} />}
          {authView === 'register' && <RegisterView onBack={() => setAuthView('login')} onComplete={() => { setAuthView('login'); setIsAuthenticated(true); }} />}
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative flex h-screen w-full overflow-hidden bg-black font-sans text-gray-200"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2000&auto=format&fit=crop')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-[#14151a]/95 to-[#090a0d]/95 backdrop-blur-sm" />
      <div className="pointer-events-none absolute left-[20%] top-0 h-[520px] w-[520px] rounded-full bg-[#e53e3e]/10 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-0 right-[5%] h-[600px] w-[600px] rounded-full bg-blue-500/5 blur-[160px]" />

      {sidebar}

      <main className="relative z-10 flex-1 overflow-hidden">
        <div className="flex h-full flex-col">
          <div className="border-b border-white/10 bg-black/20 px-6 py-4 backdrop-blur-md lg:px-10">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-4">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-[#e53e3e] lg:hidden"><Menu size={18} /></div>
                <div>
                  <div className="text-xs uppercase tracking-[0.25em] text-gray-500">BTC Owner Portal · Integrated App</div>
                  <div className="mt-1 text-2xl font-semibold text-white">{pageTitle}</div>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative min-w-[280px]">
                  <Search size={16} className="pointer-events-none absolute left-3 top-3 text-gray-500" />
                  <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-white outline-none transition focus:border-[#e53e3e]" placeholder="Tìm nhanh theo tài sản, yêu cầu, thông báo..." />
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setCurrentPage('notifications')} className="relative rounded-xl border border-white/10 bg-white/5 p-3 text-gray-300 hover:bg-white/10 hover:text-white">
                    <Bell size={18} />
                    {unreadCount > 0 && <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#e53e3e] px-1 text-[10px] font-bold text-white">{unreadCount}</span>}
                  </button>
                  <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300">
                    {currentPackage.name} · {activeListings} tin đang chạy
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="custom-scrollbar flex-1 overflow-y-auto px-6 py-8 lg:px-10">{renderContent()}</div>
        </div>
      </main>

      {showEditProfile && <EditProfileModal />}
      {showChangePassword && <ChangePasswordModal />}
      {showKycModal && <KycModal />}
      {showPackageConfirm && <PackageConfirmModal />}
      {requestDraft && <RequestModal />}
      {selectedListingId === 'create-new' && <QuickCreateListingModal />}
      {selectedAppointmentId === 'create-new' && <AppointmentModal />}

      {selectedAppointment && (
        <Modal
          title="Chi tiết lịch hẹn"
          subtitle={selectedAppointment.location}
          onClose={() => setSelectedAppointmentId(null)}
          footer={<div className="flex justify-end"><button onClick={() => setSelectedAppointmentId(null)} className="rounded-xl bg-[#e53e3e] px-4 py-2 font-medium text-white hover:bg-red-600">Đóng</button></div>}
        >
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ['Khách hàng', selectedAppointment.customer],
              ['Phụ trách', selectedAppointment.broker],
              ['Ngày', selectedAppointment.date],
              ['Khung giờ', selectedAppointment.time],
              ['Trạng thái', selectedAppointment.status],
              ['Tài sản', propertyMap[selectedAppointment.propertyId]?.code],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-gray-500">{label}</div>
                <div className="mt-2 text-sm text-white">{value}</div>
              </div>
            ))}
            <div className="md:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-gray-300">{selectedAppointment.note}</div>
          </div>
        </Modal>
      )}

      {selectedPayment && (
        <Modal
          title="Chi tiết giao dịch"
          subtitle={selectedPayment.phase}
          onClose={() => setSelectedPaymentId(null)}
          footer={<div className="flex justify-end"><button onClick={() => setSelectedPaymentId(null)} className="rounded-xl bg-[#e53e3e] px-4 py-2 font-medium text-white hover:bg-red-600">Đóng</button></div>}
        >
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ['Mã hóa đơn', selectedPayment.invoice],
              ['Tài sản', propertyMap[selectedPayment.propertyId]?.code],
              ['Số tiền', currencyVnd(selectedPayment.amount)],
              ['Phương thức', selectedPayment.method],
              ['Hạn thanh toán', selectedPayment.dueDate],
              ['Ngày thanh toán', selectedPayment.paidDate],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-gray-500">{label}</div>
                <div className="mt-2 text-sm text-white">{value}</div>
              </div>
            ))}
            <div className="md:col-span-2 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-gray-300">
              Trạng thái hiện tại: <span className={`ml-2 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase ${statusPill(selectedPayment.status)}`}>{selectedPayment.status}</span>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
