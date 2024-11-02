// pages/admin.js
import AdminMessages from '../../../components/AdminMessages'

export default function Admin() {
  // Assuming the admin is already authenticated and identified as 'admin'
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminMessages />
    </div>
  );
}
