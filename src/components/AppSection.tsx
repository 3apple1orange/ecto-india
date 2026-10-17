import Image from "next/image";
import { site } from "@/lib/site";

export default function AppSection() {
  return (
    <section className="app" id="app" aria-labelledby="app-title">
      <div className="wrap appgrid">
        <div>
          <p className="stage">
            <span className="pulse" aria-hidden="true" />
            Android app · on trial
          </p>
          <h2 id="app-title" className="display">Your next ride, in your pocket.</h2>
          <p className="applede">
            The ECTO Android app is currently on trial in our 11 cities. We will open it to the public
            once it is ready. Until then, riders can join as early riders and drivers can request
            early access.
          </p>

          {site.apkUrl ? (
            <a href={site.apkUrl} className="pill dark">Download the Android app</a>
          ) : (
            <div className="appbtns">
              <a href="#riders" className="pill dark">Ride early</a>
              <a href="#drive" className="pill ghost">Drive with ECTO</a>
            </div>
          )}
        </div>

        <div className="phonewrap">
          <div className="phone">
            <div className="cam" aria-hidden="true" />
            <div className="screen">
              <Image
                src="/images/app-1.png"
                alt="Screenshot of the ECTO India Android app"
                fill
                sizes="(max-width: 640px) 230px, 280px"
                style={{ objectFit: "cover", objectPosition: "top" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}