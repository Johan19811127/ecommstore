import AdminMessages from "@/components/admin/Layout/AdminMes";

// pages/admin.js


export default function Admin() {
  // Assuming the admin is already authenticated and identified as 'admin'
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminMessages /> 
    </div>
  );
}
