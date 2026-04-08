import { Button, SectionContainer } from "@/app/_components/primitives";
import { CheckCircle } from "lucide-react";

export default function CheckoutSuccessPage() {
  return (
    <SectionContainer className="min-h-[80vh] flex items-center">
      <div className="mx-auto max-w-lg text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success-50">
          <CheckCircle size={32} className="text-success-500" />
        </div>

        <h1 className="mt-6 font-heading text-3xl font-bold text-foreground">
          Thank You for Your Purchase!
        </h1>

        <p className="mt-4 text-lg text-muted-foreground">
          Your order has been confirmed. We&apos;ll be in touch within 24 hours to kick off your
          AI video project.
        </p>

        <p className="mt-2 text-sm text-muted-foreground">
          A confirmation email has been sent to your inbox.
        </p>

        <div className="mt-10">
          <Button href="/" size="lg">
            Back to Home
          </Button>
        </div>
      </div>
    </SectionContainer>
  );
}
