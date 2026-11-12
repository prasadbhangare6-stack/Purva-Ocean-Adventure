import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Accessible form primitives. Each field wires its label, hint and error
 * message together with aria-describedby / aria-invalid so screen readers
 * announce problems correctly.
 */

type BaseProps = {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
};

const inputBase =
  "w-full rounded-media border bg-abyss/60 px-4 py-3.5 text-foam placeholder:text-foam/35 transition-colors duration-300 focus:border-gold focus:outline-none";

function Wrapper({
  id,
  label,
  error,
  hint,
  required,
  className,
  children,
}: BaseProps & { id: string; children: ReactNode }) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="label-caps text-foam/70">
        {label}
        {required && <span className="ml-1 text-gold" aria-hidden="true">*</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-sm text-foam/50">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm text-[#f2a7a1]">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextField(props: BaseProps & InputHTMLAttributes<HTMLInputElement>) {
  const { label, error, hint, required, className, id: givenId, ...rest } = props;
  const autoId = useId();
  const id = givenId ?? autoId;
  return (
    <Wrapper id={id} label={label} error={error} hint={hint} required={required} className={className}>
      <input
        id={id}
        required={required}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={[error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(" ") || undefined}
        className={cn(inputBase, error ? "border-[#f2a7a1]/70" : "border-sky/25")}
        {...rest}
      />
    </Wrapper>
  );
}

export function TextAreaField(props: BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { label, error, hint, required, className, id: givenId, ...rest } = props;
  const autoId = useId();
  const id = givenId ?? autoId;
  return (
    <Wrapper id={id} label={label} error={error} hint={hint} required={required} className={className}>
      <textarea
        id={id}
        required={required}
        rows={5}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={[error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(" ") || undefined}
        className={cn(inputBase, "resize-y", error ? "border-[#f2a7a1]/70" : "border-sky/25")}
        {...rest}
      />
    </Wrapper>
  );
}

export function SelectField(
  props: BaseProps & SelectHTMLAttributes<HTMLSelectElement> & { options: { value: string; label: string }[] },
) {
  const { label, error, hint, required, className, options, id: givenId, ...rest } = props;
  const autoId = useId();
  const id = givenId ?? autoId;
  return (
    <Wrapper id={id} label={label} error={error} hint={hint} required={required} className={className}>
      <select
        id={id}
        required={required}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(inputBase, "appearance-none", error ? "border-[#f2a7a1]/70" : "border-sky/25")}
        {...rest}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-abyss">
            {o.label}
          </option>
        ))}
      </select>
    </Wrapper>
  );
}
