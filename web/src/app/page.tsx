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

      <footer className="footer footer-layout1 text-center bg-dark">
        <div className="footer-top" style={{ paddingTop: 26, paddingBottom: 16 }}>
          <div className="container">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
              }}
            >
              <div style={{ flex: "0 0 auto", minWidth: 120, textAlign: "left" }}>
                <a href="#top" aria-label="Back to top">
                  <Image src="/logo.png" alt="District 23 logo" width={180} height={180} />
                </a>
              </div>
              <div style={{ flex: 1, textAlign: "left" }}>
                <h4
                  style={{
                    fontFamily: "'Yeseva One', serif",
                    color: "#d3a971",
                    fontWeight: 400,
                    marginBottom: 10,
                  }}
                >
                  Service Hour
                </h4>
                <p className="mb-10">Mon - Sun: 10:00 - 00:00</p>
                <p className="mb-10">Jl. Foremose Raya No. 23, Pontianak</p>
                <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                  <i className="fa fa-instagram" style={{ marginRight: 8 }}></i>@district23.billiard
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <div className="footer__copyright">
                  <span>&copy; {new Date().getFullYear()} District 23</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}