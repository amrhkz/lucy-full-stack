"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "@/styles/nprogress.css";
import SpinnerLoader from "./SpinnerLoader";

NProgress.configure({ showSpinner: false });

export default function LoadingProgressBar() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    NProgress.start();
    setIsLoading(true);
    const timeout = setTimeout(() => {
      NProgress.done();
      setIsLoading(false);
    }, 300);
    return () => {
      clearTimeout(timeout);
      NProgress.done();
      setIsLoading(false);
    };
  }, [pathname]);

  return <>{isLoading && <SpinnerLoader />}</>;
}
