import { Button } from "@/components/ui/button";
import { Users, Stethoscope, Calendar, TrendingUp, AlertCircle } from "lucide-react";

export default function AdminDashboardPage() {
  const stats = [
    { icon: Users, label: "Total Users", value: "1,234", change: "+12.5%", color: "primary" },
    { icon: Stethoscope, label: "Total Doctors", value: "456", change: "+8.2%", color: "accent" },
    { icon: Calendar, label: "Appointments", value: "2,890", change: "+24.1%", color: "primary" },
    { icon: TrendingUp, label: "Revenue", value: "$45,600", change: "+15.3%", color: "accent" }
  ];

  const recentActivities = [
    { id: 1, action: "New Doctor Registration", user: "Dr. Emily Brown", time: "2 hours ago", type: "success" },
    { id: 2, action: "Appointment Booked", user: "John Doe", time: "5 hours ago", type: "info" },
    { id: 3, action: "Payment Received", amount: "$150", time: "1 day ago", type: "success" },
    { id: 4, action: "System Update Completed", time: "2 days ago", type: "warning" }
  ];

  return (
    <div className="relative">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className="mb-12 space-y-2">
          <h1 className="text-5xl font-black text-foreground">Admin Dashboard</h1>
          <p className="text-lg text-foreground/70 font-medium">Manage platform operations and monitor key metrics</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="rounded-2xl border border-border bg-white/80 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-${stat.color}/10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className={`text-${stat.color}`} size={24} />
                  </div>
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">{stat.change}</span>
                </div>
                <p className="text-sm text-foreground/60 font-medium mb-1">{stat.label}</p>
                <p className="text-3xl font-black text-foreground">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2 rounded-2xl border border-border bg-white/80 backdrop-blur-sm p-8 shadow-lg space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-foreground">Recent Activities</h2>
              <Button variant="outline" className="rounded-lg">View All</Button>
            </div>

            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="p-4 border border-border rounded-xl hover:shadow-md transition-all flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    activity.type === 'success' ? 'bg-primary/10' : activity.type === 'warning' ? 'bg-accent/10' : 'bg-foreground/10'
                  }`}>
                    <AlertCircle className={`${
                      activity.type === 'success' ? 'text-primary' : activity.type === 'warning' ? 'text-accent' : 'text-foreground/60'
                    }`} size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-foreground text-sm">{activity.action}</p>
                    <p className="text-xs text-foreground/60">{activity.user || activity.amount}</p>
                  </div>
                  <p className="text-xs text-foreground/50 whitespace-nowrap">{activity.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl border border-border bg-white/80 backdrop-blur-sm p-8 shadow-lg space-y-4">
            <h2 className="text-2xl font-black text-foreground mb-6">Quick Actions</h2>
            
            <Button className="w-full rounded-lg py-6 text-lg font-bold">Manage Doctors</Button>
            <Button className="w-full rounded-lg py-6 text-lg font-bold">Manage Users</Button>
            <Button variant="outline" className="w-full rounded-lg py-6 text-lg font-bold">View Reports</Button>
            <Button variant="outline" className="w-full rounded-lg py-6 text-lg font-bold">System Settings</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
