import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="wrap notfound">
      <p className="stage">404</p>
      <h1 className="display">Wrong turn.</h1>
      <p className="lede">We could not find that page. Let us get you back on the road.</p>
      <Link href="/" className="pill dark">Back to home</Link>
    </main>
  );
}