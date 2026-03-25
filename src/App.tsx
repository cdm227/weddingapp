import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { toast } from "sonner";

type RSVP = {
  name: string;
  email: string;
  attending: "yes" | "no";
  guests: number;
  message: string;
};

export default function App() {
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState<RSVP>({
    name: "",
    email: "",
    attending: "yes",
    guests: 1,
    message: "",
  });

  const canSubmit = useMemo(() => {
    if (!form.name.trim()) return false;
    if (!form.email.trim()) return false;
    if (form.guests < 1 || form.guests > 10) return false;
    return true;
  }, [form]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) {
      toast.error("Please complete your name and email.");
      return;
    }

    setSubmitting(true);
    try {
      // TODO: Replace with your real Formspree endpoint:
      // https://formspree.io/f/YOUR_FORM_ID
      const endpoint = "https://formspree.io/f/YOUR_FORM_ID";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error(`RSVP failed: ${res.status}`);
      }

      toast.success("RSVP sent — thank you!");
      setForm((f) => ({ ...f, message: "" }));
    } catch (err) {
      toast.error("Could not send RSVP. Try again later.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-3xl px-5 py-10">
        <motion.header
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <p className="text-sm font-medium tracking-wide text-slate-500">
            Wedding
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            Name1 &amp; Name2
          </h1>
          <p className="mt-3 text-base text-slate-600">
            We’re so excited to celebrate with you. Please RSVP below.
          </p>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-1">
                <span className="text-sm font-medium text-slate-700">Name</span>
                <input
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-300"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  placeholder="Your full name"
                  required
                />
              </label>

              <label className="space-y-1">
                <span className="text-sm font-medium text-slate-700">Email</span>
                <input
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-300"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  placeholder="you@email.com"
                  type="email"
                  required
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <label className="space-y-1 sm:col-span-2">
                <span className="text-sm font-medium text-slate-700">
                  Attending?
                </span>
                <select
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-300"
                  value={form.attending}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      attending: e.target.value as RSVP["attending"],
                    }))
                  }
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </label>

              <label className="space-y-1">
                <span className="text-sm font-medium text-slate-700">
                  Guests
                </span>
                <input
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-300"
                  value={form.guests}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      guests: Number(e.target.value),
                    }))
                  }
                  type="number"
                  min={1}
                  max={10}
                />
              </label>
            </div>

            <label className="space-y-1">
              <span className="text-sm font-medium text-slate-700">
                Message (optional)
              </span>
              <textarea
                className="min-h-28 w-full resize-y rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-300"
                value={form.message}
                onChange={(e) =>
                  setForm((f) => ({ ...f, message: e.target.value }))
                }
                placeholder="Dietary restrictions, song requests, notes..."
              />
            </label>

            <button
              type="submit"
              disabled={!canSubmit || submitting}
              className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Sending..." : "Send RSVP"}
            </button>

            <p className="text-xs text-slate-500">
              Tip: replace <code>YOUR_FORM_ID</code> in the code once you create
              your Formspree form.
            </p>
          </form>
        </motion.section>

        <footer className="mt-10 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Name1 &amp; Name2
        </footer>
      </div>
    </div>
  );
}
