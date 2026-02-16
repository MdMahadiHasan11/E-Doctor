import Link from 'next/link';
import { Mail, MapPin, Phone, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

function PublicFooter() {
  return (
    <footer className="border-t border-border bg-gradient-to-b from-background to-secondary/10 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full -ml-48 -mt-48 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full -mr-48 -mb-48 blur-3xl" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-black text-lg">E</span>
              </div>
              <span className="text-2xl font-black text-foreground">E-Doctor</span>
            </div>
            <p className="text-foreground/70 leading-relaxed font-medium max-w-sm">
              Your trusted healthcare platform connecting you with expert medical professionals for better health outcomes.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4 pt-4">
              <a href="#" className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-all duration-300 hover:scale-110">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-all duration-300 hover:scale-110">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-all duration-300 hover:scale-110">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-all duration-300 hover:scale-110">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-black text-foreground mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-foreground/70 hover:text-primary font-medium transition-colors duration-300 flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-all" />
                Home
              </Link></li>
              <li><Link href="#" className="text-foreground/70 hover:text-primary font-medium transition-colors duration-300 flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-all" />
                About Us
              </Link></li>
              <li><Link href="#" className="text-foreground/70 hover:text-primary font-medium transition-colors duration-300 flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-all" />
                Services
              </Link></li>
              <li><Link href="#" className="text-foreground/70 hover:text-primary font-medium transition-colors duration-300 flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-all" />
                Specialties
              </Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-black text-foreground mb-6 text-lg">Support</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-foreground/70 hover:text-primary font-medium transition-colors duration-300 flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-all" />
                FAQ
              </Link></li>
              <li><Link href="#" className="text-foreground/70 hover:text-primary font-medium transition-colors duration-300 flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-all" />
                Help Center
              </Link></li>
              <li><Link href="#" className="text-foreground/70 hover:text-primary font-medium transition-colors duration-300 flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-all" />
                Terms of Service
              </Link></li>
              <li><Link href="#" className="text-foreground/70 hover:text-primary font-medium transition-colors duration-300 flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-all" />
                Privacy Policy
              </Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-black text-foreground mb-6 text-lg">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="text-primary flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="text-foreground/70 font-medium leading-relaxed text-sm">
                    123 Medical Lane<br />
                    Health City, HC 12345
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-primary flex-shrink-0" size={20} />
                <a href="tel:+1234567890" className="text-foreground/70 hover:text-primary font-medium transition-colors">+1 (234) 567-890</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-primary flex-shrink-0" size={20} />
                <a href="mailto:contact@edoctor.com" className="text-foreground/70 hover:text-primary font-medium transition-colors">contact@edoctor.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-8" />

        {/* Bottom section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <p className="text-center md:text-left text-foreground/60 font-medium">
            &copy; {new Date().getFullYear()} E-Doctor. All Rights Reserved.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end gap-6">
            <Link href="#" className="text-foreground/60 hover:text-foreground font-medium text-sm transition-colors">Privacy</Link>
            <Link href="#" className="text-foreground/60 hover:text-foreground font-medium text-sm transition-colors">Terms</Link>
            <Link href="#" className="text-foreground/60 hover:text-foreground font-medium text-sm transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default PublicFooter;
