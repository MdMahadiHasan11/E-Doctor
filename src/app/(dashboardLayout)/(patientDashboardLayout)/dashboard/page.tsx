import { Button } from "@/components/ui/button";
import { Calendar, FileText, Clock, Heart } from "lucide-react";

export default function Page() {
  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      date: "2024-02-20",
      time: "10:00 AM",
      status: "confirmed"
    },
    {
      id: 2,
      doctor: "Dr. Michael Brown",
      specialty: "General Medicine",
      date: "2024-02-25",
      time: "2:30 PM",
      status: "pending"
    }
  ];

  const recentPrescriptions = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      date: "2024-02-10",
      status: "Active"
    },
    {
      id: 2,
      doctor: "Dr. James Wilson",
      date: "2024-01-15",
      status: "Completed"
    }
  ];

  return (
    <div className="relative">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Welcome Section */}
        <div className="mb-12 space-y-2">
          <h1 className="text-4xl md:text-5xl font-black text-foreground">Welcome Back!</h1>
          <p className="text-lg text-foreground/70 font-medium">Manage your health journey with E-Doctor</p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Calendar, label: "Upcoming Appointments", value: "2", color: "primary" },
            { icon: FileText, label: "Active Prescriptions", value: "3", color: "accent" },
            { icon: Clock, label: "Total Consultations", value: "12", color: "primary" },
            { icon: Heart, label: "Health Score", value: "85%", color: "accent" }
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="rounded-2xl border border-border bg-white/80 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg bg-${stat.color}/10 flex items-center justify-center`}>
                    <Icon className={`text-${stat.color}`} size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60 font-medium">{stat.label}</p>
                    <p className="text-2xl font-black text-foreground">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Appointments */}
          <div className="lg:col-span-2 rounded-2xl border border-border bg-white/80 backdrop-blur-sm p-8 shadow-lg space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-foreground">Upcoming Appointments</h2>
              <Button variant="outline" className="rounded-lg">View All</Button>
            </div>

            <div className="space-y-4">
              {upcomingAppointments.map((apt) => (
                <div key={apt.id} className="p-6 border border-border rounded-xl hover:shadow-md transition-all group">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <div>
                      <p className="font-bold text-foreground text-lg">{apt.doctor}</p>
                      <p className="text-sm text-foreground/60">{apt.specialty}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="text-primary" size={18} />
                      <span className="font-medium text-foreground">{apt.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="text-primary" size={18} />
                      <span className="font-medium text-foreground">{apt.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${apt.status === 'confirmed' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'}`}>
                        {apt.status}
                      </span>
                      <Button size="sm" className="rounded-lg">Details</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button className="w-full rounded-lg py-6 text-lg font-bold">Book New Appointment</Button>
          </div>

          {/* Prescriptions Sidebar */}
          <div className="rounded-2xl border border-border bg-white/80 backdrop-blur-sm p-8 shadow-lg space-y-6">
            <h2 className="text-2xl font-black text-foreground">Recent Prescriptions</h2>

            <div className="space-y-3">
              {recentPrescriptions.map((rx) => (
                <div key={rx.id} className="p-4 border border-border rounded-xl hover:shadow-md transition-all group">
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-bold text-foreground text-sm">{rx.doctor}</p>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${rx.status === 'Active' ? 'bg-primary/10 text-primary' : 'bg-foreground/10 text-foreground/60'}`}>
                      {rx.status}
                    </span>
                  </div>
                  <p className="text-xs text-foreground/60">{rx.date}</p>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full rounded-lg">View All Prescriptions</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
