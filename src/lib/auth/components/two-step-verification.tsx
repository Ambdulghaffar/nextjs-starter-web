"use client";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import BackButton from "@/layout/BackButton";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import Link from "next/link";

export default function TwoStepVerification() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col lg:w-1/2">
      <BackButton link="/" text="Retour à l'acceuil" />
      <div
        className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center"
      >
        <div>
          <div className="mb-5 sm:mb-8">
            <h1
              className="text-md text-foreground mb-2 font-semibold sm:text-3xl"
            >
              Two Step Verification
            </h1>
            <p className="text-muted-foreground text-sm">
              A verification code has been sent to your mobile. Please enter it
              in the field below.
            </p>
          </div>
          <div>
            <form>
              <div className="space-y-6">
                <Field className="w-fit">
                  <FieldLabel htmlFor="round-sep">
                    Type your 6 digits security code
                  </FieldLabel>
                  <InputOTP
                    id="round-sep"
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS}
                  >
                    <div className="flex items-center gap-3">
                      <InputOTPGroup className="gap-2">
                        <InputOTPSlot
                          index={0}
                          className="h-12 w-12 rounded-full
                            [&>input]:rounded-full [&>input]:text-center"
                        />
                        <InputOTPSlot
                          index={1}
                          className="h-12 w-12 rounded-full
                            [&>input]:rounded-full [&>input]:text-center"
                        />
                        <InputOTPSlot
                          index={2}
                          className="h-12 w-12 rounded-full
                            [&>input]:rounded-full [&>input]:text-center"
                        />
                      </InputOTPGroup>
                      <span
                        className="text-muted-foreground/40 text-2xl font-bold"
                      >
                        —
                      </span>
                      <InputOTPGroup className="gap-2">
                        <InputOTPSlot
                          index={3}
                          className="h-12 w-12 rounded-full
                            [&>input]:rounded-full [&>input]:text-center"
                        />
                        <InputOTPSlot
                          index={4}
                          className="h-12 w-12 rounded-full
                            [&>input]:rounded-full [&>input]:text-center"
                        />
                        <InputOTPSlot
                          index={5}
                          className="h-12 w-12 rounded-full
                            [&>input]:rounded-full [&>input]:text-center"
                        />
                      </InputOTPGroup>
                    </div>
                  </InputOTP>
                </Field>
                {/* <!-- Button --> */}
                <div>
                  <button
                    className="shadow-theme-xs bg-primary
                      text-primary-foreground hover:bg-primary/90 flex w-full
                      items-center justify-center rounded-lg px-4 py-3 text-sm
                      font-medium transition"
                  >
                    Verify my account
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p
                className="text-muted-foreground text-center text-sm font-normal
                  sm:text-start"
              >
                Didn&apos;t get the code? {""}
                <Link
                  href="/two-step-verification"
                  className="text-brand-600 hover:text-brand-700
                    dark:text-brand-400"
                >
                  Resend
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
