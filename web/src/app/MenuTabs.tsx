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
  const tabItems = [{ _id: "semua", name: "Semua" }, ...categories.map((cat) => ({ _id: cat._id, name: cat.name }))];

  const getTabIcon = (name: string) => {
    const lower = name.toLowerCase();

    if (lower.includes("semua")) return "fa fa-th-large";
    if (lower.includes("coffee") || lower.includes("kopi")) return "fa fa-coffee";
    if (lower.includes("cemilan") || lower.includes("snack")) return "fa fa-birthday-cake";
    if (lower.includes("milk") || lower.includes("susu")) return "fa fa-glass";
    if (lower.includes("makanan") || lower.includes("food")) return "fa fa-cutlery";
    if (lower.includes("teh") || lower.includes("tea")) return "fa fa-lemon-o";
    if (lower.includes("yakult")) return "fa fa-flask";
    if (lower.includes("sparkling") || lower.includes("soda")) return "fa fa-tint";
    return "fa fa-circle-o";
  };

  const displayCategories = active ? [active] : categories;

  return (
    <>
      {/* Category tabs matching the segmented card style */}
      <section style={{ paddingTop: 34, paddingBottom: 36, borderBottom: "1px solid #eee", position: "relative" }}>
        <div
          style={{
            pointerEvents: "none",
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: 48,
            background: "linear-gradient(to right, transparent, #fff)",
            zIndex: 1,
          }}
        />

        <div className="tabs-scroll" style={{ overflowX: "auto", paddingBottom: 6 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "nowrap",
              alignItems: "center",
              gap: 0,
              minWidth: "max-content",
              margin: "0 16px",
              padding: "10px 12px",
              border: "1px solid #ece7df",
              borderRadius: 18,
              backgroundColor: "#fff",
              boxShadow: "0 10px 26px rgba(20, 20, 20, 0.08)",
            }}
          >
            {tabItems.map((tab, index) => {
              const isActive = activeId === tab._id;
              const isLast = index === tabItems.length - 1;

              return (
                <div key={tab._id} style={{ display: "flex", alignItems: "center" }}>
                  <button
                    onClick={() => setActiveId(tab._id)}
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: 13,
                      fontWeight: 600,
                      lineHeight: 1,
                      padding: "12px 18px",
                      border: "none",
                      borderRadius: 999,
                      cursor: "pointer",
                      transition: "none",
                      whiteSpace: "nowrap",
                      backgroundColor: isActive ? "#d3a971" : "transparent",
                      color: isActive ? "#fff" : "#2a2927",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 9,
                    }}
                  >
                    <i className={getTabIcon(tab.name)} style={{ fontSize: 14, opacity: isActive ? 1 : 0.75 }}></i>
                    <span>{tab.name}</span>
                  </button>

                  {!isLast && (
                    <span
                      aria-hidden="true"
                      style={{
                        width: 1,
                        height: 28,
                        backgroundColor: "#e6e1d9",
                        marginLeft: 6,
                        marginRight: 6,
                      }}
                    />
                  )}
                </div>
              );
            })}
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