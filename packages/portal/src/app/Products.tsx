"use client";

import { useEmitter } from "@/components/EventEmitter";
import { getHomeShopProducts } from "backend/service/public";
import { useEffect } from "react";

export default function Products() {
  const emitter = useEmitter();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => emitter.on("foo", console.log), []);

  useEffect(() => {
    getHomeShopProducts()
      .then((res) => emitter.foo(res))
      .catch(console.error);
  }, [emitter]);

  return <div>Some Div</div>;
}
