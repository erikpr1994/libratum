import { useEffect } from "react";
import Router from "next/router";

import Container from "../Layout/Container";
import Login from "../components/Login";

type Home = {};

export default function Home({}: Home) {
  return (
    <>
      <Container
        widthPercentage={95}
        heightPercentage={95}
        additionalCss={`min-height: 600px`}
      >
        <Login />
      </Container>
      <style jsx>{``}</style>
    </>
  );
}
