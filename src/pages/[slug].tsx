import LovePage from "@/components/LovePage";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/authContext";
import { useContext } from "react";

function Love() {
  const router = useRouter();
  const { slug } = router.query;
  const { checkLove, addLove } = useContext(AuthContext);

  useEffect(() => {
    if (typeof slug === "string") {
      const check = checkLove(slug);

      check.then((res) => {
        console.log(res);
        if (res) {
          router.push(`/${slug}`);
        } else {
          router.push(`/404`);
        }
      });
    }
  }, [slug]);

  return (
    <div>
      <LovePage />
    </div>
  );
}

export default Love;
