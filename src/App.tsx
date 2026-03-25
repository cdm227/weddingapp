import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Clock,
  Heart,
  Users,
  Envelope,
  Check,
  Camera,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attending: "yes",
    guests: "1",
    dietary: "",
    message: "",
  });

  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          attending: formData.attending,
          guests: formData.guests,
          dietary: formData.dietary,
          message: formData.message,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        toast.success(
          formData.attending === "yes"
            ? "We can't wait to celebrate with you!"
            : "Thank you for letting us know"
        );

        setFormData({
          name: "",
          email: "",
          attending: "yes",
          guests: "1",
          dietary: "",
          message: "",
        });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Unable to submit RSVP. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    viewport: { once: true, margin: "-120px" },
  };

  const staggerContainer = {
    whileInView: { transition: { staggerChildren: 0.08 } },
    viewport: { once: true, margin: "-120px" },
  };

  const gallery = [
    { src: "/photos/01.svg", alt: "Photo 01" },
    { src: "/photos/02.svg", alt: "Photo 02" },
    { src: "/photos/03.svg", alt: "Photo 03" },
    { src: "/photos/04.svg", alt: "Photo 04" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <motion.section
        className="relative min-h-[92vh] sm:min-h-screen flex flex-col items-center justify-center container-pad text-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/65 to-secondary/40" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.9) 1px, transparent 0)",
            backgroundSize: "44px 44px",
          }}
        />

        <motion.div
          className="relative z-10 max-w-3xl"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        ><Heart
            className="mx-auto mb-6"
            size={44}
            weight="fill"
            style={{ color: "hsl(var(--primary))" }}
          />

          <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl text-white mb-4 leading-none">
            Audrey &amp; Patrick
          </h1>

          <p className="font-serif text-base sm:text-lg text-white/80">
            October 5, 2024 • San Diego, CA
          </p>
          <p className="mt-2 text-xs sm:text-sm font-semibold tracking-[0.22em] text-white/70">
            123 Days To Go
          </p>

          <div className="mt-10 flex items-center justify-center gap-3">
            <a href="#rsvp">
              <button className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-primary shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                RSVP
              </button>
            </a>
            <a href="#details">
              <button className="inline-flex items-center justify-center rounded-2xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15">
                View Details
              </button>
            </a>
          </div>
        </motion.div>
      </motion.section>

      {/* DETAILS */}
      <section id="details" className="section container-pad max-w-4xl mx-auto">
        <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView">
          <motion.div {...fadeInUp} className="text-center mb-10 sm:mb-12">
            <h2 className="h2">Event Details</h2>
            <p className="mt-3 lead">Join us for a day of love and celebration</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div {...fadeInUp}>
              <Card className="h-full border-border/50 shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Heart className="text-primary" size={28} weight="duotone" />
                    <CardTitle className="font-serif text-2xl">Ceremony</CardTitle>
                  </div>
                  <CardDescription className="text-base">Where we say "I do"</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Clock className="text-primary mt-1" size={20} weight="duotone" />
                    <div>
                      <p className="font-semibold">3:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="text-primary mt-1" size={20} weight="duotone" />
                    <div>
                      <p className="font-semibold">Garden Chapel</p>
                      <p className="text-sm text-muted-foreground">
                        123 Rose Garden Lane, Bloom Valley
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div {...fadeInUp}>
              <Card className="h-full border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="text-primary" size={28} weight="duotone" />
                    <CardTitle className="font-serif text-2xl">Reception</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    Dinner, dancing &amp; celebration
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Clock className="text-primary mt-1" size={20} weight="duotone" />
                    <div>
                      <p className="font-semibold">5:30 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="text-primary mt-1" size={20} weight="duotone" />
                    <div>
                      <p className="font-semibold">The Grand Ballroom</p>
                      <p className="text-sm text-muted-foreground">
                        456 Celebration Avenue, Bloom Valley
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div {...fadeInUp} className="mt-8">
            <Card className="border-border/50 bg-secondary/60">
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  <span className="font-semibold text-foreground">Dress Code:</span>{" "}
                  Semi-formal garden attire
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </section>

      <Separator className="max-w-4xl mx-auto" />

      {/* SCHEDULE */}
      <section className="section container-pad max-w-2xl mx-auto">
        <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView">
          <motion.div {...fadeInUp} className="text-center mb-10 sm:mb-12">
            <h2 className="h2">Schedule</h2>
            <p className="mt-3 lead">Timeline for the day</p>
          </motion.div>

          <div className="space-y-6">
            {[
              { time: "3:00 PM", event: "Ceremony Begins", icon: Heart },
              { time: "4:00 PM", event: "Cocktail Hour", icon: Users },
              { time: "5:30 PM", event: "Reception Starts", icon: Calendar },
              { time: "6:30 PM", event: "Dinner Service", icon: Users },
              { time: "8:00 PM", event: "Dancing & Celebration", icon: Heart },
              { time: "11:00 PM", event: "Send-off", icon: Heart },
            ].map((item, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                className="flex items-start gap-4 group"
              >
                <div className="flex flex-col items-center">
                  <div className="rounded-full bg-accent/10 p-3 group-hover:bg-accent/15 transition-colors">
                    <item.icon className="text-primary" size={24} weight="duotone" />
                  </div>
                  {index < 5 && <div className="w-0.5 h-6 bg-border mt-2" />}
                </div>
                <div className="flex-1 pb-2">
                  <p className="font-serif font-semibold text-lg text-foreground">
                    {item.event}
                  </p>
                  <p className="text-muted-foreground">{item.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <Separator className="max-w-4xl mx-auto" />

      {/* LOCATION (match screenshot style) */}
      <section className="section container-pad max-w-4xl mx-auto">
        <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView">
          <motion.div {...fadeInUp} className="text-center mb-10 sm:mb-12">
            <MapPin className="mx-auto mb-4 text-primary" size={44} weight="duotone" />
            <h2 className="h2">Location</h2>
            <p className="mt-3 lead">Find your way to our celebration</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Ceremony */}
            <motion.div {...fadeInUp}>
              <Card className="overflow-hidden border-border/60 shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-1">
                    <Heart className="text-primary" size={22} weight="duotone" />
                    <CardTitle className="font-serif text-xl">Ceremony</CardTitle>
                  </div>
                  <CardDescription className="text-base">Garden Chapel</CardDescription>
                </CardHeader>

                <div className="aspect-video w-full bg-secondary/60 relative overflow-hidden border-y border-border/60">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093713!2d144.9537353153167!3d-37.81720997975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sEnglish%20Garden!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ceremony Location Map"
                  />
                </div>

                <CardContent className="pt-5 space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-primary mt-0.5 flex-shrink-0" size={20} weight="duotone" />
                    <div>
                      <p className="font-semibold text-sm">123 Rose Garden Lane</p>
                      <p className="text-sm text-muted-foreground">Bloom Valley</p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() =>
                      window.open(
                        "https://maps.google.com/?q=Garden+Chapel+Bloom+Valley",
                        "_blank"
                      )
                    }
                  >
                    Open in Google Maps
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Reception */}
            <motion.div {...fadeInUp}>
              <Card className="overflow-hidden border-border/60 shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-1">
                    <Users className="text-primary" size={22} weight="duotone" />
                    <CardTitle className="font-serif text-xl">Reception</CardTitle>
                  </div>
                  <CardDescription className="text-base">The Grand Ballroom</CardDescription>
                </CardHeader>

                <div className="aspect-video w-full bg-secondary/60 relative overflow-hidden border-y border-border/60">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093713!2d144.9637353153167!3d-37.81720997975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d5c2b349649%3A0xb6899234e561db11!2sBallroom!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Reception Location Map"
                  />
                </div>

                <CardContent className="pt-5 space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-primary mt-0.5 flex-shrink-0" size={20} weight="duotone" />
                    <div>
                      <p className="font-semibold text-sm">456 Celebration Avenue</p>
                      <p className="text-sm text-muted-foreground">Bloom Valley</p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() =>
                      window.open(
                        "https://maps.google.com/?q=Grand+Ballroom+Bloom+Valley",
                        "_blank"
                      )
                    }
                  >
                    Open in Google Maps
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <Separator className="max-w-4xl mx-auto" />

      {/* RSVP */}
      <section className="section container-pad max-w-2xl mx-auto" id="rsvp">
        <motion.div {...fadeInUp}>
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="h2">RSVP</h2>
            <p className="mt-3 lead">Please let us know if you can join us</p>
          </div>

          <Card className="border-border/50 shadow-lg">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Will you be attending? *</Label>
                  <RadioGroup
                    value={formData.attending}
                    onValueChange={(value) => setFormData({ ...formData, attending: value })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="yes" />
                      <Label htmlFor="yes" className="font-normal cursor-pointer">
                        Joyfully accept
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="no" />
                      <Label htmlFor="no" className="font-normal cursor-pointer">
                        Regretfully decline
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.attending === "yes" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="guests">Number of Guests</Label>
                      <Select
                        value={formData.guests}
                        onValueChange={(value) => setFormData({ ...formData, guests: value })}
                      >
                        <SelectTrigger id="guests">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Guest</SelectItem>
                          <SelectItem value="2">2 Guests</SelectItem>
                          <SelectItem value="3">3 Guests</SelectItem>
                          <SelectItem value="4">4 Guests</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dietary">Dietary Restrictions</Label>
                      <Input
                        id="dietary"
                        value={formData.dietary}
                        onChange={(e) =>
                          setFormData({ ...formData, dietary: e.target.value })
                        }
                        placeholder="Any allergies or preferences?"
                      />
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="message">Message for the Couple</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Dietary restrictions, song requests, notes..."
                    rows={4}
                    maxLength={500}
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {formData.message.length}/500
                  </p>
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full">
                  <Check size={20} weight="bold" className="mr-2" />
                  {isSubmitting ? "Submitting..." : "Send RSVP"}
                </Button>

                <p className="text-xs text-muted-foreground">
                  Tip: replace <code>YOUR_FORM_ID</code> in the code once you create your
                  Formspree form.
                </p>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      <Separator className="max-w-4xl mx-auto" />

      {/* GALLERY (real images from /public/photos) */}
      <section className="section container-pad max-w-4xl mx-auto">
        <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView">
          <motion.div {...fadeInUp} className="text-center mb-10 sm:mb-12">
            <Camera className="mx-auto mb-4 text-primary" size={44} weight="duotone" />
            <h2 className="h2">Our Story</h2>
            <p className="mt-3 lead">A glimpse into our journey together</p>
          </motion.div>

          <motion.div {...fadeInUp}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {gallery.map((img, index) => (
                <Dialog
                  key={img.src}
                  open={selectedImage === index}
                  onOpenChange={(open) => setSelectedImage(open ? index : null)}
                >
                  <DialogTrigger asChild>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative aspect-square overflow-hidden rounded-2xl border border-border bg-secondary/50 shadow-sm hover:shadow-md transition"
                      aria-label={`Open ${img.alt}`}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.button>
                  </DialogTrigger>

                  <DialogContent className="max-w-4xl p-0 overflow-hidden">
                    <img src={img.src} alt={img.alt} className="w-full h-auto" />
                  </DialogContent>
                </Dialog>
              ))}
            </div>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Add/replace images in <code>public/photos/</code> later (01–04).
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 container-pad text-center bg-secondary/30">
        <Heart className="mx-auto mb-4 text-primary" size={32} weight="fill" />
        <p className="font-serif text-lg text-foreground mb-2">Audrey &amp; Patrick</p>
        <p className="text-sm text-muted-foreground mb-4">October 5, 2024</p>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Envelope size={16} />
          <span>Questions? Contact us at hello@audreypatrick.wedding</span>
        </div>
      </footer>
    </div>
  );
}
