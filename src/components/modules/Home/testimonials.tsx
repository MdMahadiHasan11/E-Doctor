import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import samplePhoto from '../../../assets/images/hero-doctor.jpg';

const testimonials = [
  {
    name: 'Robert Fox',
    role: 'Patient',
    image: samplePhoto,
    quote: 'The care and professionalism I received were outstanding. The doctors were knowledgeable and the staff was incredibly supportive throughout my treatment.',
    rating: 5,
  },
  {
    name: 'Jane Cooper',
    role: 'Patient',
    image: samplePhoto,     
    quote: 'A seamless experience from booking an appointment to the consultation. The use of technology for prescriptions and follow-ups is very convenient.',
    rating: 5,
  },
  {
    name: 'Wade Warren',
    role: 'Patient',
    image: samplePhoto,     
    quote: 'I highly recommend their services. The specialists are top-notch, and they truly focus on preventive care which has greatly improved my health.',
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-bold text-foreground">What Our Patients Say</h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            We are committed to providing you with the best medical and healthcare services. Hear from our satisfied patients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="border-0 bg-white hover:shadow-lg transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full -mr-10 -mt-10" />
               <CardContent className="p-8 relative z-10">
                <Quote className="text-primary/20 mb-4" size={32} />
                <p className="text-foreground leading-relaxed mb-6 font-medium">{testimonial.quote}</p>
                <div className="flex items-center pt-4 border-t border-border">
                    <Image 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      width={56} 
                      height={56} 
                      className="rounded-full border-2 border-primary/20"
                    />
                    <div className="ml-4">
                        <h4 className="font-bold text-foreground text-sm">{testimonial.name}</h4>
                        <p className="text-muted-foreground text-xs mb-2">{testimonial.role}</p>
                        <div className="flex gap-0.5">
                            {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="text-accent fill-current" size={14} />
                            ))}
                        </div>
                    </div>
                </div>
               </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
