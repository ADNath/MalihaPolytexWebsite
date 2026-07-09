import { useEffect } from "react";

const SITE_NAME = "Maliha Poly Tex Fiber Industry Ltd.";

export default function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title
      ? `${title} | ${SITE_NAME}`
      : SITE_NAME;
  }, [title]);
}