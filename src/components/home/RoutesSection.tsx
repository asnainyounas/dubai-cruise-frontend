import Image from "next/image";
import { ROUTES } from "@/data/home";

export default function RoutesSection() {
  return (
    <section className="general-row dhowcruise-route">
      <div className="dcontainer">
        <div className="route-grid">
          <div
            className="dhowcruise-route-map aos-init"
            data-aos="zoom-in"
            style={{ transitionDuration: "2000ms" }}
          >
            <Image
              src="/img/map-img.jpg"
              alt="dhow cruise map"
              width={585}
              height={350}
            />
          </div>
          <div
            className="dhowcruise-route-block aos-init"
            data-aos="fade-left"
            style={{ transitionDuration: "3000ms" }}
          >
            {ROUTES.map((route) => (
              <div key={route.title}>
                <div className="main-title text-white">{route.title}</div>
                <a href={route.href} className="we-sub-btn we_background mb30">
                  <span className="Departure-block" />
                  Departure Location
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
