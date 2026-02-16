import { Star } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import cardioDoc from '../../../assets/images/doctor-cardiologist.jpg';
import neurolDoc from '../../../assets/images/doctor-neurologist.jpg';
import orthoDoc from '../../../assets/images/doctor-orthopedic.jpg';

const doctors = [
  {
    name: 'Dr. Cameron Williamson',
    specialty: 'Cardiologist',
    rating: 4.9,
    reviews: 23,
    image: cardioDoc,
  },
  {
    name: 'Dr. Leslie Alexander',
    specialty: 'Neurologist',
    rating: 4.8,
    reviews: 45,
    image: neurolDoc,       
  },
  {
    name: 'Dr. Robert Fox',
    specialty: 'Orthopedic',
    rating: 4.9,
    reviews: 32,
    image: orthoDoc,
  },
];

const DoctorCard = ({ doctor }: { doctor: typeof doctors[0] }) => {
    return (
        <Card className="text-center overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 bg-white/90 backdrop-blur-sm group hover:-translate-y-2 relative">
            {/* Decorative background elements */}
            <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-br from-primary/30 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur" />
            
            <CardHeader className="bg-gradient-to-br from-primary/10 to-accent/10 items-center p-8 relative z-10">
                <div className="w-32 h-32 rounded-full mx-auto flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/10 shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500 ring-4 ring-white">
                    <Image 
                        src={doctor.image} 
                        alt={doctor.name} 
                        width={120} 
                        height={120}
                        className="rounded-full"
                    />
                </div>
            </CardHeader>
            <CardContent className="p-8 relative z-10">
                <CardTitle className="text-2xl font-black text-foreground group-hover:text-primary transition-colors">{doctor.name}</CardTitle>
                <p className="text-primary font-bold mt-2 text-lg">{doctor.specialty}</p>
                <div className="flex items-center justify-center my-6 text-sm gap-3">
                    <div className="flex items-center gap-1 bg-accent/10 px-3 py-2 rounded-full">
                        <Star className="text-accent fill-current" size={18} />
                        <span className="text-foreground font-bold">{doctor.rating}</span>
                    </div>
                    <span className="text-foreground/60 font-semibold">({doctor.reviews} reviews)</span>
                </div>
            </CardContent>
             <CardFooter className="grid grid-cols-2 gap-3 p-8 pt-0 relative z-10">
                <Button variant="outline" className="rounded-xl font-semibold h-12 border-2 hover:border-primary">View Profile</Button>
                <Button className="rounded-xl font-bold h-12 bg-gradient-to-r from-primary to-accent hover:shadow-lg shadow-md">Book Now</Button>
            </CardFooter>
        </Card>
    )
}

const TopRatedDoctors = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background via-accent/5 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl opacity-40" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-5xl font-black text-foreground">Our Top Rated Doctors</h2>
          <p className="text-foreground/70 mt-4 leading-relaxed text-lg font-medium">
            Access to medical experts from various specialities, ready to provide you with top-notch medical services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map(doctor => <DoctorCard key={doctor.name} doctor={doctor} />)}
        </div>
        
        <div className="text-center mt-16">
            <Button size="lg" className="rounded-xl px-10 py-7 text-lg font-bold shadow-lg hover:shadow-2xl bg-gradient-to-r from-primary to-accent hover:scale-105 transition-all">View All Doctors</Button>
        </div>
      </div>
    </section>
  );
};

export default TopRatedDoctors;
