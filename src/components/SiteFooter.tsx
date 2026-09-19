import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/nexum-logo.webp";

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background mt-24">
      <div className="container mx-auto px-4 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="mb-4">
            <img src={logo} alt="nexumfocus" className="h-10 w-auto" />
          </div>
          <p className="text-sm text-background/70 max-w-md">
            Simplifying Business Solutions, Powering Progress. We build the digital path
            from confusion to conversion across cloud, web, and DevOps.
          </p>
        </div>
        <div>
          <h4 className="font-display text-base mb-4">Navigate</h4>
          <ul className="space-y-2 text-sm text-background/70">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
            <li><Link to="/services" className="hover:text-primary">Services</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-base mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-background/80">
            <li className="font-semibold text-background">nexumfocus</li>
            <li className="flex items-start gap-2"><Phone className="size-4 mt-0.5 text-primary" /><a href="tel:+923128422259" className="hover:text-primary">+92 (312) 8422 259</a></li>
            <li className="flex items-start gap-2"><Mail className="size-4 mt-0.5 text-primary" /><a href="mailto:support@nexumfocus.com" className="hover:text-primary">support@nexumfocus.com</a></li>
            <li className="flex items-start gap-2"><MapPin className="size-4 mt-0.5 text-primary" />Global · Remote-first</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-6 text-xs text-background/60 flex flex-col md:flex-row justify-between gap-2">
          <p>© {new Date().getFullYear()} nexumfocus. All rights reserved.</p>
          <p>Cloud · DevOps · Web & Application Development</p>
        </div>
      </div>
    </footer>
  );
}
