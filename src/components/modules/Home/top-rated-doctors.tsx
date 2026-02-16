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
        <Card className="text-center overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white">
            <CardHeader className="bg-gradient-to-br from-primary/5 to-primary/10 items-center p-8">
                <Image 
                    src={doctor.image} 
                    alt={doctor.name} 
                    width={96} 
                    height={96}
                    className="rounded-full border-4 border-white shadow-lg"
                />
            </CardHeader>
            <CardContent className="p-6">
                <CardTitle className="text-xl font-bold text-foreground">{doctor.name}</CardTitle>
                <p className="text-primary font-semibold mt-2">{doctor.specialty}</p>
                <div className="flex items-center justify-center my-4 text-sm">
                    <Star className="text-accent fill-current" size={18} />
                    <span className="ml-2 text-foreground font-bold">{doctor.rating}</span>
                    <span className="ml-2 text-muted-foreground">({doctor.reviews} reviews)</span>
                </div>
            </CardContent>
             <CardFooter className="grid grid-cols-2 gap-3 p-6 pt-0">
                <Button variant="outline" className="rounded-lg">View Profile</Button>
                <Button className="rounded-lg">Book Now</Button>
            </CardFooter>
        </Card>
    )
}

const TopRatedDoctors = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-4xl font-bold text-foreground">Our Top Rated Doctors</h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            Access to medical experts from various specialities, ready to provide you with top-notch medical services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map(doctor => <DoctorCard key={doctor.name} doctor={doctor} />)}
        </div>
        
        <div className="text-center mt-12">
            <Button size="lg" className="rounded-lg px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl">View All Doctors</Button>
        </div>
      </div>
    </section>
  );
};

export default TopRatedDoctors;
