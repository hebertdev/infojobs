import { useEffect } from "react";
import Head from "next/head";
import { About, Jobs, Analize } from "components/pages/Home";

export default function Home() {
  return (
    <>
      <Head>
        <title>CareerUp | Infojobs</title>
      </Head>
      <About />
      <Jobs />
      <Analize />
      <br />
      <br />
      <p style={{ textAlign: "center" }}>Infojobs hackathon | Hebertdev</p>
      <br />
    </>
  );
}
