import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  ReactNode,
} from "react";

type StepKey = "info" | "work" | "help";

interface Step {
  key: StepKey;
  label: string;
}

const STEPS: Step[] = [
  { key: "info", label: "Your info" },
  { key: "work", label: "Your work" },
  { key: "help", label: "Let's talk" },
];

const INDUSTRIES = [
  "Water utilities",
  "Solar operators",
  "Electric cooperatives",
  "Construction & infrastructure",
  "Other",
] as const;

type Industry = (typeof INDUSTRIES)[number];

interface FormState {
  fullName: string;
  contact: string;
  industry: Industry | "";
  teamSetup: string;
  helpNeeded: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = {
  fullName: "",
  contact: "",
  industry: "",
  teamSetup: "",
  helpNeeded: "",
};

interface FieldProps {
  label: string;
  children: ReactNode;
}

function Field({ label, children }: FieldProps) {
  return (
    <label className="block mb-5">
      <span className="block text-sm font-medium text-slate-200 mb-1.5">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClasses =
  "w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-[#4F39F6] focus:ring-2 focus:ring-[#4F39F6]/25 shadow-[0_0_80px_rgba(88,65,255,0.35)]";

const WEB3FORMS_ACCESS_KEY = "5d85778d-f01d-48e1-9659-afaf96df3b96";

export default function DemoRequestModal() {
  type Status = "idle" | "sending" | "ok" | "error";

  const [open, setOpen] = useState<boolean>(false);
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [industryOpen, setIndustryOpen] = useState<boolean>(false);
  const industryRef = useRef<HTMLDivElement | null>(null);

  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");

  const step = STEPS[stepIndex];

  async function submitToWeb3Forms(): Promise<void> {
    setStatus("sending");
    setMessage("");

    const formData = new FormData();
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("name", form.fullName);
    formData.append("contact", form.contact);
    formData.append("industry", form.industry);
    formData.append("team_setup", form.teamSetup);
    formData.append("help_needed", form.helpNeeded);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setStatus("ok");
        setSubmitted(true);
      } else {
        setStatus("error");
        setMessage(
          (data.message =
            "Sorry. It was not able to send your message due to a server error.")
        );
      }
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error
          ? err.message
          : "Sorry. It was not able to send your message due to a server error."
      );
    }
  }

  useEffect(() => {
    function handlePointerDown(e: MouseEvent) {
      if (
        industryRef.current &&
        !industryRef.current.contains(e.target as Node)
      ) {
        setIndustryOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIndustryOpen(false);
    }
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    setIndustryOpen(false);
  }, [stepIndex]);

  const update =
    (field: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  function validateStep(): boolean {
    const next: FormErrors = {};
    if (step.key === "info") {
      if (!form.fullName.trim()) next.fullName = "Enter your full name.";
      if (!form.contact.trim())
        next.contact = "Enter an email or phone number.";
    }
    if (step.key === "work") {
      if (!form.industry) next.industry = "Select your industry.";
      if (!form.teamSetup.trim())
        next.teamSetup = "Tell us a bit about your setup.";
    }
    if (step.key === "help") {
      if (!form.helpNeeded.trim())
        next.helpNeeded = "Let us know what you need help with.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleNext(): Promise<void> {
    if (!validateStep()) return;
    if (stepIndex < STEPS.length - 1) {
      setStepIndex((i) => i + 1);
      return;
    }
    await submitToWeb3Forms();
  }

  function handleBack(): void {
    setErrors({});
    setStepIndex((i) => Math.max(0, i - 1));
  }

  function closeAndReset(): void {
    setOpen(false);
    setStepIndex(0);
    setForm(initialForm);
    setErrors({});
    setSubmitted(false);
    setIndustryOpen(false);
    setStatus("idle");
    setMessage("");
  }

  // Keyboard shortcuts while the modal is open:
  // Enter -> next step, Backspace -> previous step, Escape -> close modal.
  useEffect(() => {
    if (!open) return;

    function handleModalKeyDown(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement | null)?.tagName;

      if (e.key === "Escape") {
        // If the industry dropdown is open, let its own Escape handler
        // close that first instead of closing the whole modal.
        if (industryOpen) return;
        e.preventDefault();
        closeAndReset();
        return;
      }

      if (submitted) return; // no steps to move through on the thank-you screen

      if (e.key === "Enter") {
        // Don't hijack Enter in a textarea (needs to insert newlines) or on
        // a button (native click behavior already handles it).
        if (tag === "TEXTAREA" || tag === "BUTTON") return;
        if (status === "sending") return;
        e.preventDefault();
        void handleNext();
        return;
      }

      if (e.key === "Backspace") {
        // Don't hijack Backspace while someone is editing text.
        if (tag === "INPUT" || tag === "TEXTAREA") return;
        if (stepIndex > 0) {
          e.preventDefault();
          handleBack();
        }
      }
    }

    document.addEventListener("keydown", handleModalKeyDown);
    return () => document.removeEventListener("keydown", handleModalKeyDown);
  }, [open, submitted, industryOpen, stepIndex, form, status]);

  return (
    <div className="flex items-center justify-center bg-[#060810] p-8">
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg bg-[#DAFA0B] px-5 py-2.5 text-sm font-semibold text-[#060810] shadow-sm transition hover:bg-[#B9D409] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DAFA0B]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060810]"
      >
        Request a Demo
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="demo-modal-title"
        >
          <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#12141F] p-8">
            <button
              onClick={closeAndReset}
              aria-label="Close"
              className="absolute right-5 top-5 text-slate-500 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F39F6]/50 rounded"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M5 5L15 15M15 5L5 15"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {!submitted ? (
              <>
                {/* Progress tabs */}
                <div className="mb-8 flex">
                  {STEPS.map((s, i) => (
                    <div key={s.key} className="mr-8 flex-1 last:mr-0">
                      <div className="mb-2 flex items-center gap-2 text-sm">
                        <span
                          className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                            i <= stepIndex
                              ? "border-[#4F39F6]"
                              : "border-white/20"
                          }`}
                        >
                          {i < stepIndex && (
                            <span className="h-2 w-2 rounded-full bg-[#4F39F6]" />
                          )}
                          {i === stepIndex && (
                            <span className="h-2 w-2 rounded-full bg-[#4F39F6]" />
                          )}
                        </span>
                        <span
                          className={
                            i <= stepIndex
                              ? "font-medium text-white"
                              : "text-slate-500"
                          }
                        >
                          {s.label}
                        </span>
                      </div>
                      <div
                        className={`h-0.5 w-full rounded-full ${
                          i <= stepIndex ? "bg-[#4F39F6]" : "bg-white/10"
                        }`}
                      />
                    </div>
                  ))}
                </div>

                {step.key === "info" && (
                  <>
                    <h2
                      id="demo-modal-title"
                      className="mb-1 text-2xl font-bold tracking-tight text-white"
                    >
                      Let's get you to the right place
                    </h2>
                    <p className="mb-6 text-sm text-[#94A3B8]">
                      We just need a few quick details.
                    </p>

                    <Field label="Full name">
                      <input
                        type="text"
                        placeholder="Jane Cooper"
                        value={form.fullName}
                        onChange={update("fullName")}
                        className={inputClasses}
                      />
                      {errors.fullName && (
                        <span className="mt-1 block text-xs text-red-400">
                          {errors.fullName}
                        </span>
                      )}
                    </Field>

                    <Field label="Email or contact number">
                      <input
                        type="text"
                        placeholder="jane@example.com"
                        value={form.contact}
                        onChange={update("contact")}
                        className={inputClasses}
                      />
                      {errors.contact && (
                        <span className="mt-1 block text-xs text-red-400">
                          {errors.contact}
                        </span>
                      )}
                    </Field>
                  </>
                )}

                {step.key === "work" && (
                  <>
                    <h2 className="mb-1 text-2xl font-bold tracking-tight text-white">
                      Tell us about your work
                    </h2>
                    <p className="mb-6 text-sm text-[#94A3B8]">
                      This helps us tailor the demo to you.
                    </p>

                    <Field label="Current industry">
                      <div className="relative" ref={industryRef}>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setIndustryOpen((v) => !v);
                          }}
                          aria-haspopup="listbox"
                          aria-expanded={industryOpen}
                          className={`${inputClasses} flex items-center justify-between text-left`}
                        >
                          <span
                            className={
                              form.industry ? "text-white" : "text-slate-500"
                            }
                          >
                            {form.industry || "Select an industry"}
                          </span>
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            className={`shrink-0 text-slate-400 transition-transform ${
                              industryOpen ? "rotate-180" : ""
                            }`}
                          >
                            <path
                              d="M3 5L7 9L11 5"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>

                        {industryOpen && (
                          <ul
                            role="listbox"
                            tabIndex={-1}
                            className="absolute z-10 mt-1.5 max-h-56 w-full overflow-auto rounded-lg border border-white/10 bg-[#181B29] py-1 shadow-lg shadow-black/40"
                          >
                            {INDUSTRIES.map((ind) => (
                              <li
                                key={ind}
                                role="option"
                                aria-selected={form.industry === ind}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setForm((prev) => ({
                                    ...prev,
                                    industry: ind,
                                  }));
                                  setIndustryOpen(false);
                                }}
                                className={`cursor-pointer px-3.5 py-2 text-sm transition ${
                                  form.industry === ind
                                    ? "bg-[#4F39F6]/20 text-white"
                                    : "text-slate-200 hover:bg-white/5"
                                }`}
                              >
                                {ind}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      {errors.industry && (
                        <span className="mt-1 block text-xs text-red-400">
                          {errors.industry}
                        </span>
                      )}
                    </Field>

                    <Field label="How do you operate as a team, business, or office?">
                      <textarea
                        rows={3}
                        placeholder="A 12-person team spread across two offices..."
                        value={form.teamSetup}
                        onChange={update("teamSetup")}
                        className={`${inputClasses} resize-none`}
                      />
                      {errors.teamSetup && (
                        <span className="mt-1 block text-xs text-red-400">
                          {errors.teamSetup}
                        </span>
                      )}
                    </Field>
                  </>
                )}

                {step.key === "help" && (
                  <>
                    <h2 className="mb-1 text-2xl font-bold tracking-tight text-white">
                      Let's talk
                    </h2>
                    <p className="mb-6 text-sm text-[#94A3B8]">
                      What can we help with?
                    </p>

                    <Field label="How can we help you, or what problem are you dealing with now?">
                      <textarea
                        rows={4}
                        placeholder="We're struggling to keep track of..."
                        value={form.helpNeeded}
                        onChange={update("helpNeeded")}
                        className={`${inputClasses} resize-none`}
                      />
                      {errors.helpNeeded && (
                        <span className="mt-1 block text-xs text-red-400">
                          {errors.helpNeeded}
                        </span>
                      )}
                    </Field>
                  </>
                )}

                <div className="mt-4 flex items-center justify-between">
                  {stepIndex > 0 ? (
                    <button
                      onClick={handleBack}
                      disabled={status === "sending"}
                      className="text-sm font-medium text-slate-400 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F39F6]/50 rounded disabled:opacity-50"
                    >
                      Back
                    </button>
                  ) : (
                    <span />
                  )}
                  <button
                    onClick={handleNext}
                    disabled={status === "sending"}
                    className="flex items-center gap-1.5 rounded-lg bg-[#DAFA0B] px-5 py-2.5 text-sm font-semibold text-[#060810] shadow-sm transition hover:bg-[#B9D409] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DAFA0B]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#12141F] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "sending"
                      ? "Sending..."
                      : stepIndex === STEPS.length - 1
                      ? "Submit"
                      : "Next"}
                    {status !== "sending" && (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M5 3L9 7L5 11"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                </div>

                {status === "error" && (
                  <p className="mt-3 text-right text-xs text-red-400">
                    {message}
                  </p>
                )}
              </>
            ) : (
              <div className="py-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#DAFA0B]">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path
                      d="M5 11.5L9 15.5L17 6.5"
                      stroke="#060810"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2 className="mb-1 text-2xl font-bold tracking-tight text-white">
                  Thanks, {form.fullName.split(" ")[0] || "there"}
                </h2>
                <p className="mb-6 text-sm text-[#94A3B8]">
                  We've got your details and someone from our team will reach
                  out shortly.
                </p>
                <button
                  onClick={closeAndReset}
                  className="rounded-lg border border-white/15 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F39F6]/50"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
