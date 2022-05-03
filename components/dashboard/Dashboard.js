import Link from "next/link";
import React, { useState, useRef } from "react";
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import { Badge } from "primereact/badge";

const items = [
  {
    label: "Update ksdghdsjghjl dskllgkdlshgkldsg dskglhdsklhgdskg dkhslghkl",
    icon: "pi pi-refresh",
  },
  {
    label: "Delete",
    icon: "pi pi-times",
  },
  {
    label: "React Website",
    icon: "pi pi-external-link",
    command: () => {
      window.location.href = "https://reactjs.org/";
    },
  },
  {
    label: "Upload",
    icon: "pi pi-upload",
    command: () => {
      window.location.hash = "/fileupload";
    },
  },
];

const Dashboard = ({children}) => {
  const menu = useRef(null);
  const [asideNav, setAsideNav] = useState(false);
  const toggleAside = () => {
    setAsideNav((state) => (state = !state));
  };
  const navClicked = (e) => {
    const el = e.target;
    el.classList.add("activeClick");
    setTimeout(() => {
      el.classList.remove("activeClick");
    }, 500);
    el.classList.toggle("active");
  };
  React.useEffect(() => {
    const el = document.querySelector(".asinyo__dashboard__aside__nav");
    asideNav ? el.classList.remove("position") : el.classList.add("position");
  }, [asideNav]);
  return (
    <div className="asinyo__dashboard">
      <aside className={`asinyo__dashboard__aside ${asideNav && "active"}`}>
        <div className="asinyo__dashboard__aside__brand">asinyo</div>
        <nav className="asinyo__dashboard__aside__nav">
          <ul className="asinyo__dashboard__aside__nav__lists">
            <li
              className="asinyo__dashboard__aside__nav__lists__list"
              onClick={navClicked}
            >
              <Link href="/">
                <a className="link__wrapper">
                  <div className="label">
                    <div className="icon__mini">
                      <i className="pi pi-home"></i>
                    </div>
                    <span>Dashboard</span>
                  </div>
                </a>
              </Link>
            </li>
            <li
              className="asinyo__dashboard__aside__nav__lists__list"
              onClick={navClicked}
            >
              <Link href="/customers">
                <a className="link__wrapper">
                  <div className="label">
                    <div className="icon__mini">
                      <i className="pi pi-users"></i>
                    </div>
                    <span>Customers</span>
                  </div>
                </a>
              </Link>
            </li>
            <li
              className="asinyo__dashboard__aside__nav__lists__list"
              onClick={navClicked}
            >
              <Link href="/agents">
                <a className="link__wrapper">
                  <div className="label">
                    <div className="icon__mini">
                      <i className="pi pi-users"></i>
                    </div>
                    <span>Agents</span>
                  </div>
                </a>
              </Link>
            </li>
            <li className="asinyo__dashboard__aside__nav__lists__list">
              <div className="link__wrapper" onClick={navClicked}>
                <div className="label">
                  <div className="icon__mini">
                    <i className="pi pi-users"></i>
                  </div>
                  <span>Merchants</span>
                </div>
                <div className="icon__right"></div>
              </div>
              <div className="dropdown">
                <ul>
                  <li>
                    <Link href="/merchants/suppliers"><a >Supplier Merchants</a></Link>
                  </li>
                  <li>
                    <Link href="/merchants/retailers"><a >Retail Merchants</a></Link>
                  </li>
                </ul>
              </div>
            </li>
            
          </ul>
        </nav>
        <div
          className="asinyo__dashboard__aside__toggle__icon"
          role="button"
          onClick={toggleAside}
        >
          <i className="pi pi-chevron-left"></i>
        </div>
      </aside>
      <main className="asinyo__dashboard__main">
        <header className="asinyo__dashboard__main__header">
          <div className="asinyo__dashboard__main__header__left">
            Search...
          </div>
          <ul className="asinyo__dashboard__main__header__right">
            
            <li className="asinyo__dashboard__main__header__right__list">
              <div className="label">
                <i
                  className="pi pi-bell p-text-secondary p-overlay-badge"
                  style={{ fontSize: "2rem" }}
                >
                  <Badge value="2"></Badge>
                </i>
              </div>
              <div className="dropdown">
                Notification
              </div>
            </li>
            <li className="asinyo__dashboard__main__header__right__list">
              <div className="label">
              {/* <Avatar image="images/avatar/asiyajavayant.png" className="mr-2" size="large" shape="circle" /> */}
                <Avatar
                  icon="pi pi-user"
                  size="large"
                  style={{ color: "#ffffff" }}
                  shape="circle"
                />
                <span>Seyram</span>
              </div>
              <div className="dropdown">
                <ul>
                  <li>
                  <Link href="/profile">
                    <a >
                    <span><i className="pi pi-user"></i></span>
                    <span>Profile</span>
                    </a>
                    </Link>
                  </li>
                  <li>
                  <Link href="/preferences">
                    <a >
                    <span><i className="pi pi-cog"></i></span>
                    <span>Preferences</span>
                    </a>
                    </Link>
                  </li>
                  <div className="separator"></div>
                  <li className="profile">
                  <Link href="/sign-out">
                    <a >
                    <span><i className="pi pi-sign-out"></i></span>
                    <span>Sign Out</span>
                    </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <Menu model={items} popup ref={menu} id="popup_menu" />
        </header>
        <section className="asinyo__dashboard__main__content">
          {children}
        </section>

        <footer className="footer">
          <div className="asinyo__footer__copyright">
            <strong>
              &copy;{new Date().getUTCFullYear()} Asinyo. All Rights Reserved
            </strong>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;
