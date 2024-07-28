"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

export default function Metrika() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    ym(process.env.YANDEX_METRIKA_ID, "hit", window.location.href);
  }, [pathname, searchParams]);
  return (
    <Script id="yandex-metrika">
      {`
    <!-- Yandex.Metrika counter -->
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(${process.env.YANDEX_METRIKA_ID}, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
   });
<!-- /Yandex.Metrika counter -->
`}
    </Script>
  );
}
