"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "@/styles/nprogress.css"; // اگر فایل استایل شخصی‌سازی‌شده داری

export default function LoadingProgressBar() {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.configure({ showSpinner: false }); // ✅ اسپینر حذف شد
    NProgress.start();

    // یک تایمر کوتاه برای اینکه بعد از تغییر مسیر کامل بشه
    const timeout = setTimeout(() => {
      NProgress.done();
    }, 300); // می‌تونی بیشتر یا کمترش کنی

    return () => {
      clearTimeout(timeout);
    };
  }, [pathname]);

  return null;
}
