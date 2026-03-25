import { useMemo, useState } from "react";
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
import { Toaster, toast } from "sonner";

/** Edit these */
const COUPLE = "Audrey & Patrick";
const DATE_LONG = "October 5, 2024";
const CITY = "San Diego, CA";
const COUNTDOWN_TEXT = "123 Days To Go";
const DRESS_CODE = "Semi-formal garden attire";
const CONTACT_EMAIL = "hello@yourwedding.com";

/** Replace with your Formspree endpoint when ready */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

type RSVP = {
  name: string;
  email: string;
  attending: "yes" | "no";
  guests: string;
  dietary: string;
  message: string;
};

const fadeInUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true, margin: "-120px" },
};

const stagger = {
  whileInView: { transition: { staggerChildren: 0.08 } },
  viewport: { once: true, margin: "-120px" },
};

function Pill({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 shadow-sm backdrop-blur">
      <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] text-slate-500">
        {icon}
        <span>{label.toUpperCase()}</span>
      </div>
      <div className="mt-1 text-sm font-semibold text-slate-900">{value}</div>
    </div>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded-3xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function CardHeader({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="p-6 pb-4">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-2 text-slate-900 shadow-sm">
          {icon}
        </div>
        <div>
          <div className="text-xl font-semibold text-slate-900">{title}</div>
          {subtitle ? (
            <div className="mt-0.5 text-sm text-slate-600">{subtitle}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function CardBody({ children }: { children: React.ReactNode }) {
  return <div className="px-6 pb-6">{children}</div>;
}

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="space-y-2">
      <div className="text-sm font-semibold text-slate-800">{label}</div>
      {children}
      {hint ? <div className="text-xs text-slate-500">{hint}</div> : null}
    </label>
  );
}

export default function App() {
  const [formData, setFormData] = useState<RSVP>({
    name: "",
    email: "",
    attending: "yes",
    guests: "1",
    dietary: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = useMemo(() => {
    if (!formData.name.trim()) return false;
    if (!formData.email.trim()) return false;
    return true;
  }, [formData.name, formData.email]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!canSubmit) {
      toast.error("Please fill in your name and email.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!res.ok) throw new Error(`RSVP failed: ${res.status}`);

      toast.success(
        formData.attending === "yes"
          ? "We can’t wait to celebrate with you!"
          : "Thank you for letting us know."
      );

      setFormData({
        name: "",
        email: "",
        attending: "yes",
        guests: "1",
        dietary: "",
        message: "",
      });
    } catch (err) {
      toast.error("Unable to submit RSVP. Please try again later.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  const schedule = [
    { time: "3:00 PM", event: "Ceremony Begins", icon: Heart },
    { time: "4:00 PM", event: "Cocktail Hour", icon: Users },
    { time: "5:30 PM", event: "Reception Starts", icon: Calendar },
    { time: "6:30 PM", event: "Dinner Service", icon: Users },
    { time: "8:00 PM", event: "Dancing & Celebration", icon: Heart },
    { time: "11:00 PM", event: "Send-off", icon: Heart },
  ] as const;

  return (
    <div className="wedding-shell">
      <Toaster richColors position="top-center" />

      {/* HERO (green + gold vibe) */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/90 via-emerald-950/75 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.9) 1px, transparent 0)",
            backgroundSize: "44px 44px",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-5 py-20 text-center text-white sm:py-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.08 }}
          >
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.25em]">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: "rgb(221 204 150)" }}
              />
              WEDDING WEBSITE
            </div>

            <Heart
              className="mx-auto mb-6"
              size={44}
              weight="fill"
              style={{ color: "rgb(221 204 150)" }}
            />

            <h1 className="mx-auto max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
              {COUPLE}
            </h1>

            <p className="mt-6 text-lg text-white/80 sm:text-xl">
              {DATE_LONG} • {CITY}
            </p>
            <p className="mt-2 text-sm font-semibold tracking-[0.22em] text-white/70">
              {COUNTDOWN_TEXT}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#rsvp"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-emerald-950 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                RSVP
              </a>
              <a
                href="#details"
                className="inline-flex items-center justify-center rounded-2xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
              >
                View Details
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="wedding-max">
        {/* DETAILS */}
        <section id="details" className="py-4">
          <motion.div variants={stagger} initial="initial" whileInView="whileInView">
            <motion.div {...fadeInUp} className="mb-10 text-center">
              <h2 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
                Event Details
              </h2>
              <p className="mt-3 text-base text-slate-600">
                Join us for a day of love and celebration.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-3">
              <motion.div {...fadeInUp}>
                <Pill
                  icon={<Calendar size={16} weight="duotone" className="text-emerald-800" />}
                  label="Date"
                  value={DATE_LONG}
                />
              </motion.div>
              <motion.div {...fadeInUp}>
                <Pill
                  icon={<MapPin size={16} weight="duotone" className="text-emerald-800" />}
                  label="City"
                  value={CITY}
                />
              </motion.div>
              <motion.div {...fadeInUp}>
                <Pill
                  icon={<Clock size={16} weight="duotone" className="text-emerald-800" />}
                  label="Start"
                  value="3:00 PM"
                />
              </motion.div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <motion.div {...fadeInUp}>
                <Card className="h-full">
                  <CardHeader
                    icon={<Heart size={24} weight="duotone" className="text-emerald-900" />}
                    title="Ceremony"
                    subtitle='Where we say “I do”'
                  />
                  <CardBody>
                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="flex items-start gap-3">
                        <Clock size={18} className="mt-0.5 text-emerald-800" weight="duotone" />
                        <div>
                          <div className="font-semibold text-slate-900">3:00 PM</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin size={18} className="mt-0.5 text-emerald-800" weight="duotone" />
                        <div>
                          <div className="font-semibold text-slate-900">Garden Chapel</div>
                          <div className="text-slate-600">123 Rose Garden Lane, Bloom Valley</div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div {...fadeInUp}>
                <Card className="h-full">
                  <CardHeader
                    icon={<Users size={24} weight="duotone" className="text-emerald-900" />}
                    title="Reception"
                    subtitle="Dinner, dancing & celebration"
                  />
                  <CardBody>
                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="flex items-start gap-3">
                        <Clock size={18} className="mt-0.5 text-emerald-800" weight="duotone" />
                        <div>
                          <div className="font-semibold text-slate-900">5:30 PM</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin size={18} className="mt-0.5 text-emerald-800" weight="duotone" />
                        <div>
                          <div className="font-semibold text-slate-900">The Grand Ballroom</div>
                          <div className="text-slate-600">
                            456 Celebration Avenue, Bloom Valley
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            </div>

            <motion.div {...fadeInUp} className="mt-6">
              <Card className="border-emerald-900/10 bg-emerald-50/60">
                <div className="p-6 text-center text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">Dress Code:</span>{" "}
                  {DRESS_CODE}
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </section>

        {/* SCHEDULE */}
        <section className="py-10">
          <motion.div variants={stagger} initial="initial" whileInView="whileInView">
            <motion.div {...fadeInUp} className="mb-10 text-center">
              <h2 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
                Schedule
              </h2>
              <p className="mt-3 text-base text-slate-600">Timeline for the day.</p>
            </motion.div>

            <div className="mx-auto max-w-2xl space-y-6">
              {schedule.map((item, index) => (
                <motion.div
                  key={index}
                  {...fadeInUp}
                  className="group flex items-start gap-4"
                >
                  <div className="flex flex-col items-center">
                    <div className="rounded-full border border-slate-200 bg-white p-3 shadow-sm transition group-hover:shadow-md">
                      <item.icon size={22} className="text-emerald-900" weight="duotone" />
                    </div>
                    {index < schedule.length - 1 ? (
                      <div className="mt-2 h-6 w-0.5 bg-slate-200" />
                    ) : null}
                  </div>
                  <div className="flex-1 pb-2">
                    <div className="text-lg font-semibold text-slate-900">
                      {item.event}
                    </div>
                    <div className="text-sm text-slate-600">{item.time}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* RSVP */}
        <section id="rsvp" className="py-10">
          <motion.div {...fadeInUp} className="mx-auto max-w-2xl">
            <div className="mb-10 text-center">
              <h2 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
                RSVP
              </h2>
              <p className="mt-3 text-base text-slate-600">
                Please let us know if you can join us.
              </p>
            </div>

            <Card className="shadow-md">
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full Name *">
                    <input
                      className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((f) => ({ ...f, name: e.target.value }))
                      }
                      placeholder="Your name"
                      required
                    />
                  </Field>

                  <Field label="Email *">
                    <input
                      className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((f) => ({ ...f, email: e.target.value }))
                      }
                      placeholder="you@email.com"
                      required
                    />
                  </Field>
                </div>

                <Field label="Will you be attending? *">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm">
                      <input
                        type="radio"
                        name="attending"
                        checked={formData.attending === "yes"}
                        onChange={() =>
                          setFormData((f) => ({ ...f, attending: "yes" }))
                        }
                      />
                      <span className="font-semibold text-slate-900">
                        Joyfully accept
                      </span>
                    </label>

                    <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm">
                      <input
                        type="radio"
                        name="attending"
                        checked={formData.attending === "no"}
                        onChange={() =>
                          setFormData((f) => ({ ...f, attending: "no" }))
                        }
                      />
                      <span className="font-semibold text-slate-900">
                        Regretfully decline
                      </span>
                    </label>
                  </div>
                </Field>

                {formData.attending === "yes" ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Number of Guests">
                      <select
                        className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                        value={formData.guests}
                        onChange={(e) =>
                          setFormData((f) => ({ ...f, guests: e.target.value }))
                        }
                      >
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                      </select>
                    </Field>

                    <Field label="Dietary Restrictions">
                      <input
                        className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                        value={formData.dietary}
                        onChange={(e) =>
                          setFormData((f) => ({ ...f, dietary: e.target.value }))
                        }
                        placeholder="Allergies or preferences?"
                      />
                    </Field>
                  </div>
                ) : null}

                <Field
                  label="Message for the Couple"
                  hint={`${formData.message.length}/500`}
                >
                  <textarea
                    className="min-h-28 w-full resize-y rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((f) => ({ ...f, message: e.target.value }))
                    }
                    placeholder="Share your well wishes..."
                    rows={4}
                    maxLength={500}
                  />
                </Field>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-emerald-950 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-900 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Check size={18} className="mr-2" weight="bold" />
                  {isSubmitting ? "Submitting..." : "Submit RSVP"}
                </button>

                <div className="text-xs text-slate-500">
                  Replace <code>YOUR_FORM_ID</code> in the Formspree URL when ready.
                </div>
              </form>
            </Card>
          </motion.div>
        </section>

        {/* GALLERY (simple placeholders like your sample) */}
        <section className="py-10">
          <motion.div variants={stagger} initial="initial" whileInView="whileInView">
            <motion.div {...fadeInUp} className="mb-10 text-center">
              <Camera className="mx-auto mb-3 text-emerald-900" size={38} weight="duotone" />
              <h2 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
                Our Story
              </h2>
              <p className="mt-3 text-base text-slate-600">
                A glimpse into our journey together.
              </p>
            </motion.div>

            <motion.div {...fadeInUp} className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="aspect-square rounded-2xl border border-slate-200 bg-gradient-to-br from-emerald-50 to-white shadow-sm"
                />
              ))}
            </motion.div>
          </motion.div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="mt-10 border-t border-slate-200 bg-white/70">
        <div className="mx-auto max-w-6xl px-5 py-10 text-center">
          <Heart
            className="mx-auto mb-3"
            size={28}
            weight="fill"
            style={{ color: "rgb(185 157 90)" }}
          />
          <div className="text-lg font-semibold text-slate-900">{COUPLE}</div>
          <div className="mt-1 text-sm text-slate-600">
            {DATE_LONG} • {CITY}
          </div>
          <div className="mt-4 inline-flex items-center gap-2 text-sm text-slate-600">
            <Envelope size={16} />
            <span>Questions? {CONTACT_EMAIL}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
