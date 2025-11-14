"use client";

import {SWRConfig} from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function ProvedorPrincipal({children}) {
  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      {children}
    </SWRConfig>
  );
}