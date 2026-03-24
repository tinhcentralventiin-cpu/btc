import React from 'react';
import DashboardModule from './DashboardModule';

export default function AccountInfoModule() {
  return (
    <div className="bg-slate-50 p-4">
      <div className="mx-4 mt-4 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900">
        Theo heading trong tài liệu gốc: "2.1.3. Thông tin tài khoản" dùng chung với Dashboard.
        Vì vậy module này đang tái sử dụng lại đúng code Dashboard để tránh bỏ sót phạm vi.
      </div>
      <DashboardModule />
    </div>
  );
}
