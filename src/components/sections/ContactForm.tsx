"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import type { ContactPage } from "@/content/types";
import { enquirySchema, type Enquiry, type EnquiryInput } from "@/lib/enquiry";
import { submitEnquiry } from "@/app/(site)/contact/actions";

const inputCls =
  "mt-2 block min-h-12 w-full border-0 border-b-2 border-line bg-transparent px-0 py-3 text-lg text-dust placeholder:text-dust/30 transition-colors focus:border-signal focus:outline-none focus:ring-0 aria-[invalid=true]:border-red-400";

export function ContactForm({ page }: { page: ContactPage }) {
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<EnquiryInput, unknown, Enquiry>({ resolver: zodResolver(enquirySchema), defaultValues: { services: [] } });

  const onSubmit = (data: Enquiry) =>
    startTransition(async () => {
      const res = await submitEnquiry(data);
      if (res.ok) {
        setStatus({ ok: true, message: page.successMessage });
        return;
      }
      Object.entries(res.fieldErrors ?? {}).forEach(([k, v]) =>
        setError(k as keyof EnquiryInput, { message: v?.[0] }),
      );
      setStatus({ ok: false, message: res.error });
    });

  if (status?.ok) {
    return (
      <motion.div
        role="status"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex min-h-96 flex-col justify-center border-l-4 border-signal bg-asphalt p-10"
      >
        <CheckCircle2 aria-hidden className="size-12 text-signal" />
        <p className="display mt-6 text-4xl md:text-5xl">{status.message}</p>
      </motion.div>
    );
  }

  const field = (name: keyof EnquiryInput, label: string, opts: { required?: boolean; type?: string; autoComplete?: string } = {}) => (
    <div>
      <label htmlFor={name} className="eyebrow">
        {label}
        {opts.required ? <span className="text-signal"> *</span> : <span className="normal-case tracking-normal"> (optional)</span>}
      </label>
      <input
        id={name}
        type={opts.type ?? "text"}
        autoComplete={opts.autoComplete}
        aria-invalid={errors[name] ? true : undefined}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
        className={inputCls}
        {...register(name)}
      />
      {errors[name]?.message ? (
        <p id={`${name}-error`} className="mt-2 text-sm text-red-300">
          {String(errors[name]?.message)}
        </p>
      ) : null}
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-8 md:grid-cols-2">
      {field("name", "Name", { required: true, autoComplete: "name" })}
      {field("company", "Company", { required: true, autoComplete: "organization" })}
      {field("phone", "Phone", { required: true, type: "tel", autoComplete: "tel" })}
      {field("email", "Email", { type: "email", autoComplete: "email" })}
      <div className="md:col-span-2">{field("location", "Project location", { required: true })}</div>

      <fieldset className="md:col-span-2">
        <legend className="eyebrow">Service needed</legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {page.services.map((s) => (
            <label key={s} className="cursor-pointer">
              <input type="checkbox" value={s} className="peer sr-only" {...register("services")} />
              <span className="inline-flex min-h-11 items-center border border-line px-4 font-display text-base font-semibold uppercase tracking-wide transition-colors peer-checked:border-signal peer-checked:bg-signal peer-checked:text-charcoal peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-signal hover:border-signal">
                {s}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="md:col-span-2">
        <label htmlFor="duration" className="eyebrow">
          Expected duration <span className="normal-case tracking-normal">(optional)</span>
        </label>
        <select id="duration" className={`${inputCls} cursor-pointer [&>option]:bg-charcoal`} {...register("duration")}>
          <option value="">Select a duration</option>
          {page.durations.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div className="md:col-span-2">
        <label htmlFor="message" className="eyebrow">
          Message <span className="normal-case tracking-normal">(optional)</span>
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder="Volumes, start date, anything else"
          className={`${inputCls} resize-y`}
          {...register("message")}
        />
      </div>

      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="flex flex-col gap-4 md:col-span-2 md:flex-row md:items-center md:justify-between">
        <AnimatePresence>
          {status && !status.ok ? (
            <motion.p role="alert" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-300">
              {status.message}
            </motion.p>
          ) : (
            <span />
          )}
        </AnimatePresence>
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex min-h-14 cursor-pointer items-center justify-center gap-3 bg-signal px-8 font-display text-xl font-bold uppercase tracking-wide text-charcoal transition-colors hover:bg-dust disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? <Loader2 aria-hidden className="size-5 animate-spin" /> : null}
          {page.submitLabel}
          {!pending ? <ArrowUpRight aria-hidden className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /> : null}
        </button>
      </div>
    </form>
  );
}
