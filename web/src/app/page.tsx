import { defineQuery, type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import MenuTabs from "./MenuTabs";

const CATEGORIES_QUERY = defineQuery(
  `*[_type == "category" && isActive == true] | order(sortOrder asc) {
    _id,
    name,
    description,
    image,
    "items": *[_type == "menuItem" && isActive == true && category._ref == ^._id] | order(name asc) {
      _id,
      name,
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
    <div className="wrapper">
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
        <div className="footer-top">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <h2 style={{ fontFamily: "'Yeseva One', serif", color: "#d3a971", fontWeight: 400, marginBottom: 10 }}>
                  District 23
                </h2>
                <p className="mx-2 mb-20">Restaurant &amp; Cafe - Foremose</p>
                <ul className="social__icons social__icons-white justify-content-center">
                  <li><a href="#"><i className="fa fa-instagram"></i></a></li>
                </ul>
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