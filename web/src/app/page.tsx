import { defineQuery, type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import MenuTabs from "./MenuTabs";
import Image from "next/image";

const CATEGORIES_QUERY = defineQuery(
  `*[_type == "category" && isActive == true] | order(sortOrder asc) {
    _id,
    name,
    description,
    image,
    "items": *[_type == "menuItem" && isActive == true && category._ref == ^._id] | order(name asc) {
      _id,
      name,
      extra,
      description,
      price
    }
  }`
);

export default async function Home() {
  const categories = await client.fetch<SanityDocument[]>(
    CATEGORIES_QUERY,
    {},
    { next: { revalidate: 300 } }
  );

  return (
    <div className="wrapper" id="top" style={{ paddingTop: 80 }}>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          zIndex: 1000,
          backgroundColor: "#1f1b0b",
          borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0 8px 22px rgba(0, 0, 0, 0.35)",
        }}
      >
        <div
          style={{
            maxWidth: 1140,
            margin: "0 auto",
            padding: "10px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <a href="#top" aria-label="Back to top">
            <Image src="/logo.png" alt="District 23 logo" width={54} height={54} priority />
          </a>
          <a
            href="#top"
            style={{
              color: "#d3a971",
              fontFamily: "'Yeseva One', serif",
              fontSize: 32,
              fontWeight: 400,
              lineHeight: 1,
              textDecoration: "none",
            }}
          >
            Menu List
          </a>
        </div>
      </nav>

      <section className="text-block">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-6 offset-lg-3">
              <div className="heading heading-layout1 text-center">
                <span className="heading__subtitle">Taste The Best</span>
                <h2 className="heading__title">Discover Our Menu</h2>
                <p className="heading__desc">
                  Nikmati berbagai pilihan minuman dan makanan khas District 23,
                  dibuat dengan bahan pilihan untuk menemani waktu santaimu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MenuTabs categories={categories as unknown as Parameters<typeof MenuTabs>[0]["categories"]} />

      <footer className="footer footer-layout1 text-center bg-dark" style={{ backgroundColor: "#1f1f1f" }}>
        <div className="footer-top" style={{ paddingTop: 36, paddingBottom: 28 }}>
          <div className="container" style={{ maxWidth: 520 }}>
            <a href="#top" aria-label="Back to top" style={{ display: "inline-block", marginBottom: 18 }}>
              <Image src="/logo.png" alt="District 23 logo" width={120} height={120} />
            </a>

            <h3
              style={{
                fontFamily: "'Yeseva One', serif",
                color: "#d3a971",
                fontWeight: 400,
                fontSize: 56,
                lineHeight: 1,
                marginBottom: 8,
              }}
            >
              District 23
            </h3>

            <p
              style={{
                color: "#d3a971",
                letterSpacing: 5,
                marginBottom: 18,
                fontSize: 13,
                textTransform: "uppercase",
              }}
            >
              Billiard &amp; Cafe
            </p>

            <div style={{ borderTop: "1px solid rgba(211, 169, 113, 0.45)", marginBottom: 10 }}></div>
            <div style={{ color: "#d3a971", marginBottom: 10 }}>&#9671;</div>
            <div style={{ borderTop: "1px solid rgba(211, 169, 113, 0.45)", marginBottom: 14 }}></div>

            <div style={{ textAlign: "left" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "10px 0 14px", borderBottom: "1px solid rgba(211, 169, 113, 0.28)" }}>
                <i className="fa fa-clock-o" style={{ color: "#d3a971", fontSize: 26, width: 30, textAlign: "center", marginTop: 2 }}></i>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: "#d3a971", fontSize: 13, letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 4 }}>Service Hour</div>
                  <div style={{ color: "#fff", fontSize: 16 }}>Mon - Sun: 10:00 - 00:00</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "10px 0 14px", borderBottom: "1px solid rgba(211, 169, 113, 0.28)" }}>
                <i className="fa fa-map-marker" style={{ color: "#d3a971", fontSize: 28, width: 30, textAlign: "center", marginTop: 2 }}></i>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: "#d3a971", fontSize: 13, letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 4 }}>Address</div>
                  <div style={{ color: "#fff", fontSize: 16, lineHeight: 1.45, overflowWrap: "anywhere" }}>JL. Siradj Salman, Kawasan Ruko Grand Mahakam, Blok B11, Air Hitam, Samarinda Ulu, Samarinda City, East Kalimantan 75243</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "10px 0 14px", borderBottom: "1px solid rgba(211, 169, 113, 0.28)" }}>
                <i className="fa fa-instagram" style={{ color: "#d3a971", fontSize: 28, width: 30, textAlign: "center", marginTop: 2 }}></i>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: "#d3a971", fontSize: 13, letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 4 }}>Instagram</div>
                  <a href="#" style={{ color: "#fff", textDecoration: "none", fontSize: 16 }}>@district23.billiard</a>
                </div>
              </div>
            </div>

            <div style={{ color: "#d3a971", marginTop: 10, marginBottom: 8 }}>&#9671;</div>
            <div style={{ borderTop: "1px solid rgba(211, 169, 113, 0.45)" }}></div>
          </div>
        </div>
        <div className="footer-bottom" style={{ backgroundColor: "#1b1b1b", paddingTop: 14, paddingBottom: 14 }}>
          <div className="container">
            <div className="footer__copyright">
              <div style={{ color: "#b3b3b3", fontSize: 16 }}>&copy; {new Date().getFullYear()} District 23</div>
              <div style={{ color: "#8b8b8b", fontSize: 14 }}>All Rights Reserved</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}