"use client";

import { CheckCircle2, Headphones, Info } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

type RequiredField = "topic" | "priority" | "subject" | "description";
type FormErrors = Partial<Record<RequiredField | "email", string>>;

const fieldClassName =
  "h-10 w-full min-w-0 rounded-xl border border-border-strong bg-surface px-3 text-sm font-medium text-foreground shadow-[0_1px_2px_rgb(16_21_37/0.03)] outline-none transition-[border-color,box-shadow] hover:border-[#c7d0e2] focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/15";

function FieldError({
  id,
  message,
}: Readonly<{ id: string; message?: string }>) {
  return message ? (
    <p id={id} className="mt-1.5 text-xs font-medium text-error">
      {message}
    </p>
  ) : null;
}

export function SupportRequestPanel({
  open,
  onOpenChange,
  onSubmitted,
}: Readonly<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitted: (reference: string) => void;
}>) {
  const [topic, setTopic] = useState("");
  const [priority, setPriority] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [includeDiagnostics, setIncludeDiagnostics] = useState(true);
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState<string | null>(null);

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      setErrors({});
      setSuccess(null);
    }
    onOpenChange(nextOpen);
  }

  function submitRequest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: FormErrors = {};
    if (!topic) nextErrors.topic = "Choose a support topic.";
    if (!priority) nextErrors.priority = "Choose a priority.";
    if (!subject.trim()) nextErrors.subject = "Enter a short subject.";
    if (!description.trim()) nextErrors.description = "Describe the issue.";
    if (email && !email.includes("@"))
      nextErrors.email = "Enter a valid email address or leave this blank.";

    setErrors(nextErrors);
    setSuccess(null);
    if (Object.keys(nextErrors).length) return;

    const reference = "FR-2048";
    const message = `Support request ${reference} was created in this local preview.`;
    setSuccess(message);
    onSubmitted(reference);
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="right"
        closeLabel="Close support request"
        className="w-[calc(100vw-0.5rem)] max-w-none sm:w-[min(36rem,calc(100vw-2rem))]"
        data-testid="support-request-panel"
      >
        <SheetHeader className="pr-16">
          <span className="mb-1 grid size-10 place-items-center rounded-xl bg-[#edf4ff] text-primary">
            <Headphones className="size-5" aria-hidden="true" />
          </span>
          <SheetTitle>Contact support</SheetTitle>
          <SheetDescription>
            Describe an issue and include relevant workspace context.
          </SheetDescription>
        </SheetHeader>

        <form
          className="flex min-h-0 flex-1 flex-col"
          onSubmit={submitRequest}
          noValidate
        >
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="support-topic"
                  className="mb-1.5 block text-sm font-semibold text-[#526078]"
                >
                  Topic
                </label>
                <select
                  id="support-topic"
                  value={topic}
                  onChange={(event) => setTopic(event.target.value)}
                  aria-invalid={Boolean(errors.topic)}
                  aria-describedby={
                    errors.topic ? "support-topic-error" : undefined
                  }
                  className={cn(fieldClassName, errors.topic && "border-error")}
                >
                  <option value="">Select a topic</option>
                  <option value="integrations">Integrations</option>
                  <option value="ai-agents">AI agents</option>
                  <option value="bookings">Bookings and leads</option>
                  <option value="reports">Reports</option>
                  <option value="settings">Workspace settings</option>
                  <option value="other">Other</option>
                </select>
                <FieldError id="support-topic-error" message={errors.topic} />
              </div>
              <div>
                <label
                  htmlFor="support-priority"
                  className="mb-1.5 block text-sm font-semibold text-[#526078]"
                >
                  Priority
                </label>
                <select
                  id="support-priority"
                  value={priority}
                  onChange={(event) => setPriority(event.target.value)}
                  aria-invalid={Boolean(errors.priority)}
                  aria-describedby={
                    errors.priority ? "support-priority-error" : undefined
                  }
                  className={cn(
                    fieldClassName,
                    errors.priority && "border-error",
                  )}
                >
                  <option value="">Select priority</option>
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                </select>
                <FieldError
                  id="support-priority-error"
                  message={errors.priority}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="support-subject"
                className="mb-1.5 block text-sm font-semibold text-[#526078]"
              >
                Subject
              </label>
              <Input
                id="support-subject"
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={
                  errors.subject ? "support-subject-error" : undefined
                }
                className={cn(errors.subject && "border-error")}
                placeholder="Summarize the issue"
              />
              <FieldError id="support-subject-error" message={errors.subject} />
            </div>

            <div>
              <label
                htmlFor="support-description"
                className="mb-1.5 block text-sm font-semibold text-[#526078]"
              >
                Description
              </label>
              <textarea
                id="support-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                aria-invalid={Boolean(errors.description)}
                aria-describedby={
                  errors.description ? "support-description-error" : undefined
                }
                rows={5}
                className={cn(
                  "w-full min-w-0 resize-y rounded-xl border border-border-strong bg-surface px-3 py-2.5 text-sm leading-6 text-foreground shadow-[0_1px_2px_rgb(16_21_37/0.03)] outline-none placeholder:text-muted hover:border-[#c7d0e2] focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/15",
                  errors.description && "border-error",
                )}
                placeholder="Describe what you expected and what happened"
              />
              <FieldError
                id="support-description-error"
                message={errors.description}
              />
            </div>

            <div>
              <label
                htmlFor="support-email"
                className="mb-1.5 block text-sm font-semibold text-[#526078]"
              >
                Email <span className="font-normal text-muted">(optional)</span>
              </label>
              <Input
                id="support-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email ? "support-email-error" : undefined
                }
                className={cn(errors.email && "border-error")}
                placeholder="name@example.com"
              />
              <FieldError id="support-email-error" message={errors.email} />
            </div>

            <div className="grid grid-cols-[minmax(0,1fr)_2.75rem] items-center gap-4 rounded-2xl border border-border bg-[#fafbfe] p-4">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#344057]">
                  Include workspace diagnostics
                </p>
                <p className="mt-0.5 text-[13px] leading-5 text-secondary">
                  Include workspace health and configuration details.
                </p>
              </div>
              <Switch
                checked={includeDiagnostics}
                onCheckedChange={setIncludeDiagnostics}
                aria-label="Include workspace diagnostics"
              />
            </div>

            <div className="flex items-start gap-2.5 rounded-xl border border-[#d9e4fb] bg-[#f5f8ff] p-3 text-[13px] leading-5 text-[#52627d]">
              <Info
                className="mt-0.5 size-4 shrink-0 text-primary"
                aria-hidden="true"
              />
              Workspace diagnostics help support understand system health and
              configuration context.
            </div>
          </div>

          <footer className="shrink-0 border-t border-border bg-surface px-4 py-4 sm:px-6">
            {Object.keys(errors).length ? (
              <p className="mb-3 text-sm font-medium text-error" role="alert">
                Review the required fields before creating the request.
              </p>
            ) : null}
            {success ? (
              <p
                data-testid="support-request-feedback"
                className="mb-3 flex items-start gap-2 rounded-xl border border-[#cfe6dc] bg-[#effaf5] px-3 py-2.5 text-sm leading-5 font-medium text-[#237158]"
                role="status"
                aria-live="polite"
              >
                <CheckCircle2
                  className="mt-0.5 size-4 shrink-0"
                  aria-hidden="true"
                />
                {success}
              </p>
            ) : null}
            <div className="grid grid-cols-2 gap-2">
              <SheetClose asChild>
                <Button variant="secondary">Cancel</Button>
              </SheetClose>
              <Button
                type="submit"
                className="px-2 text-xs whitespace-nowrap sm:px-4 sm:text-sm"
              >
                Create request
              </Button>
            </div>
          </footer>
        </form>
      </SheetContent>
    </Sheet>
  );
}
