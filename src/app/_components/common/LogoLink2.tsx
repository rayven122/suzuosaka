import Image from "next/image";
import Link from "next/link";
import React from "react";

export const LogoLink2 = () => {
  return (
    <div className="z-10 mx-4 w-[90px] py-4 md:mx-8 md:w-[150px] md:py-8 lg:w-[200px]">
      <Link href="/">
        <Image
          src="/common/logo-vertical.svg"
          alt="川の家 おさか"
          width={200}
          height={60}
        />
      </Link>
    </div>
  );
};
