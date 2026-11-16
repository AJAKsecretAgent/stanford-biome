import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[80svh] flex-col items-start justify-center pt-24">
      <p className="eyebrow">404</p>
      <h1 className="display mt-6 text-[clamp(3rem,8vw,6rem)]">
        This page did not <em>survive selection.</em>
      </h1>
      <ButtonLink href="/" className="mt-10">
        Back to home
      </ButtonLink>
    </section>
  );
}
