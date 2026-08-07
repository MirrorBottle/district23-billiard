"use client";

import { useState } from "react";
import { urlFor } from "@/sanity/image";

interface MenuItem {
  _id: string;
  name: string;
  extra?: string;
  description?: string;
  price: string;
}

interface Category {
  _id: string;
  name: string;
  description?: string;
  image?: object;
  items: MenuItem[];
}

export default function MenuTabs({ categories }: { categories: Category[] }) {
  const [activeId, setActiveId] = useState("semua");

  const active = activeId === "semua" ? null : (categories.find((c) => c._id === activeId) ?? null);

  const displayCategories = active ? [active] : categories;

  return (
    <>
      {/* Category Tabs — horizontal scroll with fade hint */}
      <section style={{ paddingTop: 40, paddingBottom: 40, borderBottom: "1px solid #eee", position: "relative" }}>
        {/* right-edge fade to signal scrollability */}
        <div style={{
          pointerEvents: "none",
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: 60,
          background: "linear-gradient(to right, transparent, #fff)",
          zIndex: 1,
        }} />
        <div style={{ overflowX: "auto", paddingBottom: 4 }}>
          <div style={{
            display: "flex",
            flexWrap: "nowrap",
            justifyContent: "flex-start",
            gap: "8px",
            paddingLeft: 16,
            paddingRight: 70,
            minWidth: "max-content",
            margin: "0 auto",
          }}>
            {/* Semua tab */}
            <button
              onClick={() => setActiveId("semua")}
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                padding: "8px 20px",
                border: "1px solid",
                borderRadius: 2,
                cursor: "pointer",
                transition: "all .2s",
                whiteSpace: "nowrap",
                borderColor: activeId === "semua" ? "#d3a971" : "#ddd",
                backgroundColor: activeId === "semua" ? "#d3a971" : "transparent",
                color: activeId === "semua" ? "#fff" : "#282828",
              }}
            >
              Semua
            </button>

            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => setActiveId(cat._id)}
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  padding: "8px 20px",
                  border: "1px solid",
                  borderRadius: 2,
                  cursor: "pointer",
                  transition: "all .2s",
                  whiteSpace: "nowrap",
                  borderColor: cat._id === activeId ? "#d3a971" : "#ddd",
                  backgroundColor: cat._id === activeId ? "#d3a971" : "transparent",
                  color: cat._id === activeId ? "#fff" : "#282828",
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Category banners + items */}
      {displayCategories.map((cat) => {
        const bgImage = cat.image
          ? urlFor(cat.image).width(1920).quality(75).format("webp").url()
          : null;
        const items = cat.items ?? [];
        const mid = Math.ceil(items.length / 2);
        const leftCol = items.slice(0, mid);
        const rightCol = items.slice(mid);

        return (
          <div key={cat._id}>
            <section
              className="text-banner text-banner-layout2 text-center bg-overlay bg-overlay-gradient bg-parallax"
              style={
                bgImage
                  ? {
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(${bgImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  : { background: "#222" }
              }
            >
              <div className="container">
                <div className="row">
                  <div className="col-sm-12 col-md-12 col-lg-12">
                    <span className="banner__subtitle">{cat.description ?? ""}</span>
                    <h2 className="banner__title">{cat.name}</h2>
                  </div>
                </div>
              </div>
            </section>

            <section className="menu-layout1 pb-80">
              <div className="container">
                <div className="row">
                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <div className="menu-wrapper">
                      {leftCol.map((item) => (
                        <div className="menu-item" key={item._id}>
                          <h4 className="menu__item-title">{item.name}</h4>
                          {item.extra && <span className="pricing__tag">{item.extra}</span>}
                          <span className="menu__item-price">{item.price}</span>
                          {item.description && <p className="menu__item-desc">{item.description}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <div className="menu-wrapper">
                      {rightCol.map((item) => (
                        <div className="menu-item" key={item._id}>
                          <h4 className="menu__item-title">{item.name}</h4>
                          {item.extra && <span className="pricing__tag">{item.extra}</span>}
                          <span className="menu__item-price">{item.price}</span>
                          {item.description && <p className="menu__item-desc">{item.description}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );
      })}
    </>
  );
}