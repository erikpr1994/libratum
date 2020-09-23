import { ReactNode } from "react";
import { slide as Menu } from "react-burger-menu";

import Avatar from "../components/Avatar";
import Logo from "./Logo";
import Navigation from "./Navigation";

import { colors } from "../styles/theme.js";

type AppLayout = {
  children: ReactNode;
  logged: boolean;
};

export const AppLayout = ({ children, logged }: AppLayout) => {
  const nav = ["Dashboard", "Balancer"];
  return (
    <div>
      <nav>
        <Logo src={"logo/Original_Transparent.png"} alt="Libratum logo" />
        <Navigation navigation={nav} logged={logged} />
        {logged && (
          <Avatar
            alt="avatar"
            src="logo/Original.png"
            text="Erik Pastor"
            width={80}
            height={80}
          />
        )}
      </nav>
      <main>{children}</main>

      <style jsx>{`
        div {
          height: 100%;
          width: 100%;
        }

        nav {
          position: fixed;
          height: 100px;
          width: 100vw;
          background: ${colors.white};
          padding: 0 2em;
          display: grid;
          grid-template-columns: 1fr 2fr 1fr;
          grid-template-rows: 100px;
          color: ${colors.black};
          box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1);
          align-items: center;
          justify-content: center;
        }

        main {
          width: 100%;
          position: absolute;
          bottom: 0;
          height: calc(100vh - 100px);
          background: ${colors.Cultured};
          padding: 1em;
          display: flex;
          place-content: center;
          place-items: center;
          overflow: auto;
        }
      `}</style>
    </div>
  );
};

export default AppLayout;
