import { useState } from "react";
import { useTranslation } from 'react-i18next';
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
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { toast } from "sonner";

export default function App() {
  const { t } = useTranslation();
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
      toast.error(t('rsvp.error_required'));
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
            ? t('rsvp.success_yes')
            : t('rsvp.success_no')
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
        toast.error(t('rsvp.error_submit'));
      }
    } catch {
      toast.error(t('rsvp.error_connection'));
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
      <LanguageSwitcher />

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
        >
          <Heart
            className="mx-auto mb-6"
            size={44}
            weight="fill"
            style={{ color: "hsl(var(--primary))" }}
          />

          <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl text-white mb-4 leading-none">
            Maria &amp; Edir
          </h1>

          <p className="font-serif text-base sm:text-lg text-white/80">
            {t('hero.subtitle')}
          </p>
          <p className="mt-2 text-xs sm:text-sm font-semibold tracking-[0.22em] text-white/70">
            {t('hero.countdown')}
          </p>

          <div className="mt-10 flex items-center justify-center gap-3">
            <a href="#rsvp">
              <button className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-primary shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
                {t('hero.rsvp_button')}
              </button>
            </a>
            <a href="#details">
              <button className="inline-flex items-center justify-center rounded-2xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20">
                {t('hero.details_button')}
              </button>
            </a>
          </div>
        </motion.div>
      </motion.section>

      {/* DETAILS */}
      <section id="details" className="section container-pad max-w-4xl mx-auto">
        <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView">
          <motion.div {...fadeInUp} className="text-center mb-10 sm:mb-12">
            <h2 className="h2">{t('details.title')}</h2>
            <p className="mt-3 lead">{t('details.subtitle')}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div {...fadeInUp}>
              <Card className="h-full border-border/50 shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Heart className="text-primary" size={28} weight="duotone" />
                    <CardTitle className="font-serif text-2xl">{t('details.ceremony.title')}</CardTitle>
                  </div>
                  <CardDescription className="text-base">{t('details.ceremony.description')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Clock className="text-primary mt-1" size={20} weight="duotone" />
                    <div>
                      <p className="font-semibold">{t('details.ceremony.time')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="text-primary mt-1" size={20} weight="duotone" />
                    <div>
                      <p className="font-semibold">{t('details.ceremony.location')}</p>
                      <p className="text-sm text-muted-foreground">
                        {t('details.ceremony.city')}
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
                    <CardTitle className="font-serif text-2xl">{t('details.reception.title')}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {t('details.reception.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Clock className="text-primary mt-1" size={20} weight="duotone" />
                    <div>
                      <p className="font-semibold">{t('details.reception.time')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="text-primary mt-1" size={20} weight="duotone" />
                    <div>
                      <p className="font-semibold">{t('details.reception.location')}</p>
                      <p className="text-sm text-muted-foreground">
                        {t('details.reception.city')}
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
                  {t('details.dress_code')}
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
            <h2 className="h2">{t('schedule.title')}</h2>
            <p className="mt-3 lead">{t('schedule.subtitle')}</p>
          </motion.div>

          <div className="space-y-6">
            {[
              { key: 'ceremony_begins', icon: Heart },
              { key: 'cocktail_hour', icon: Users },
              { key: 'reception_starts', icon: Calendar },
              { key: 'dinner_service', icon: Users },
              { key: 'dancing', icon: Heart },
              { key: 'sendoff', icon: Heart },
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
                    {t(`schedule.${item.key}`)}
                  </p>
                  <p className="text-muted-foreground">TBA</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <Separator className="max-w-4xl mx-auto" />

      {/* LOCATION */}
      <section className="section container-pad max-w-4xl mx-auto">
        <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView">
          <motion.div {...fadeInUp} className="text-center mb-10 sm:mb-12">
            <MapPin className="mx-auto mb-4 text-primary" size={44} weight="duotone" />
            <h2 className="h2">{t('location.title')}</h2>
            <p className="mt-3 lead">{t('location.subtitle')}</p>
          </motion.div>

          <div className="grid md:grid-cols-1 gap-8">
            <motion.div {...fadeInUp}>
              <Card className="overflow-hidden border-border/60 shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-1">
                    <Heart className="text-primary" size={22} weight="duotone" />
                    <CardTitle className="font-serif text-xl">{t('location.venue')}</CardTitle>
                  </div>
                  <CardDescription className="text-base">{t('location.description')}</CardDescription>
                </CardHeader>

                <div className="aspect-video w-full bg-secondary/60 relative overflow-hidden border-y border-border/60">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3100.5231234567!2d15.03!3d36.89!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1313b8a6e8e8e8e9%3A0x1313b8a6e8e8e8e9!2sAgua%20Resort%20-%20Noto%20Beach!5e0!3m2!1sen!2sit!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Agua Resort Location Map"
                  />
                </div>

                <CardContent className="pt-5 space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-primary mt-0.5 flex-shrink-0" size={20} weight="duotone" />
                    <div>
                      <p className="font-semibold text-sm">{t('location.address')}</p>
                      <p className="text-sm text-muted-foreground">{t('location.city')}</p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() =>
                      window.open(
                        "https://www.google.com/maps/search/Contrada+Reitani+96017+Noto+SR+Italy",
                        "_blank"
                      )
                    }
                  >
                    {t('location.maps_button')}
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() =>
                      window.open(
                        "https://www.aguaresort.it/en/agua-beach/",
                        "_blank"
                      )
                    }
                  >
                    {t('location.website_button')}
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
            <h2 className="h2">{t('rsvp.title')}</h2>
            <p className="mt-3 lead">{t('rsvp.subtitle')}</p>
          </div>

          <Card className="border-border/50 shadow-lg">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t('rsvp.name_label')} *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t('rsvp.name_label')}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">{t('rsvp.email_label')} *</Label>
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
                  <Label>{t('rsvp.attending_label')} *</Label>
                  <RadioGroup
                    value={formData.attending}
                    onValueChange={(value) => setFormData({ ...formData, attending: value })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="yes" />
                      <Label htmlFor="yes" className="font-normal cursor-pointer">
                        {t('rsvp.yes')}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="no" />
                      <Label htmlFor="no" className="font-normal cursor-pointer">
                        {t('rsvp.no')}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.attending === "yes" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="guests">{t('rsvp.guests_label')}</Label>
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
                      <Label htmlFor="dietary">{t('rsvp.dietary_label')}</Label>
                      <Input
                        id="dietary"
                        value={formData.dietary}
                        onChange={(e) =>
                          setFormData({ ...formData, dietary: e.target.value })
                        }
                        placeholder={t('rsvp.dietary_label')}
                      />
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="message">{t('rsvp.message_label')}</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder={t('rsvp.message_label')}
                    rows={4}
                    maxLength={500}
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {formData.message.length}/500
                  </p>
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full">
                  <Check size={20} weight="bold" className="mr-2" />
                  {isSubmitting ? t('rsvp.submitting_button') : t('rsvp.submit_button')}
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

      {/* GALLERY */}
      <section className="section container-pad max-w-4xl mx-auto">
        <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView">
          <motion.div {...fadeInUp} className="text-center mb-10 sm:mb-12">
            <Camera className="mx-auto mb-4 text-primary" size={44} weight="duotone" />
            <h2 className="h2">{t('gallery.title')}</h2>
            <p className="mt-3 lead">{t('gallery.subtitle')}</p>
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
              {t('gallery.note')}
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 container-pad text-center bg-secondary/30">
        <Heart className="mx-auto mb-4 text-primary" size={32} weight="fill" />
        <p className="font-serif text-lg text-foreground mb-2">Maria &amp; Edir</p>
        <p className="text-sm text-muted-foreground mb-4">{t('footer.date')}</p>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Envelope size={16} />
          <span>{t('footer.email_label')} mariaedirmatrimonio@gmail.com</span>
        </div>
      </footer>
    </div>
  );
}
