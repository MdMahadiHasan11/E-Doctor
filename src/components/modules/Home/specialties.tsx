import { HeartPulse, Brain, Bone, Baby } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

const specialists = [
  {
    name: 'Cardiology',
    icon: HeartPulse,
    bgColor: 'bg-red-100',
    iconColor: 'text-red-500',
  },
  {
    name: 'Neurology',
    icon: Brain,
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-500',
  },
  {
    name: 'Orthopedic',
    icon: Bone,
    bgColor: 'bg-pink-100',
    iconColor: 'text-pink-500',
  },
  {
    name: 'Pediatric',
    icon: Baby,
    bgColor: 'bg-green-100',
    iconColor: 'text-green-500',
  }
];

const Specialities = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-16">
          <div className="space-y-2">
            <h2 className="text-5xl font-black text-foreground">Our Specialties</h2>
            <p className="text-foreground/70 max-w-md mt-3 leading-relaxed text-lg font-medium">
              Access to medical experts across all major specialities.
            </p>
          </div>
          <a href="#" className="text-primary font-bold hover:text-accent transition-colors mt-4 sm:mt-0 inline-flex items-center gap-2 text-lg group">
            View All 
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialists.map((specialist, idx) => (
            <Card
              key={specialist.name}
              className="text-center transition-all duration-500 cursor-pointer hover:shadow-2xl hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm group overflow-hidden relative"
            >
              {/* Animated background accent */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <CardContent className="p-10 relative z-10">
                {/* Premium icon container */}
                <div
                  className="w-24 h-24 rounded-2xl mx-auto flex items-center justify-center mb-6 bg-gradient-to-br from-primary/20 to-accent/20 shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500"
                >
                  <specialist.icon
                    className="text-primary group-hover:text-accent transition-colors duration-500"
                    size={40}
                  />
                </div>
                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-500">
                  {specialist.name}
                </h3>
                <p className="text-sm text-foreground/50 mt-3 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Expert care in {specialist.name.toLowerCase()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specialities;
