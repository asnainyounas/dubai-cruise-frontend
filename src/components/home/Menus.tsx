import { MENUS, MENU_BLOCKS } from "@/data/home";

export default function Menus() {
  return (
    <section className="general-row">
      <div className="dcontainer">
        <div className="text-center">
          <div className="main-title mb30">Best Prices with Offers + Our Menus</div>
        </div>
        <div className="menus-grid">
          <div
            className="menus-details aos-init"
            data-aos="fade-right"
            style={{ transitionDuration: "2000ms" }}
          >
            {MENUS.map((m, i) => (
              <div
                className="dhow-menu aos-init"
                data-aos="fade-right"
                style={{ transitionDuration: `${2000 + i * 1000}ms` }}
                key={m.heading}
              >
                <div className="heading">{m.heading}</div>
                <p>{m.departure}</p>
                <p>{m.duration}</p>
                <p>{m.price}</p>
              </div>
            ))}
          </div>
          <div
            className="menus-menucard aos-init"
            data-aos="fade-left"
            style={{ transitionDuration: "2000ms" }}
          >
            <div className="dhow-menu-block">
              {MENU_BLOCKS.map((block) => (
                <div className="menu-block" key={block.title}>
                  <div className="title">{block.title}</div>
                  <a href={block.pdf} className="we-sub-btn we_background">
                    <span className="menu-block-img" />
                    Download Menu
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
