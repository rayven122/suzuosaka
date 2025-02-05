import Image from "next/image";
import Link from "next/link";
import React from "react";

export const LogoLink = () => {
  return (
    <Link href="/" className="absolute z-10 mx-auto pl-4 pt-2 md:p-8">
      <Image
        src="/common/logo-vertical.svg"
        alt="川の家 おさか"
        width={200}
        height={60}
        className="w-[90px] md:w-[150px] lg:w-[200px]"
      />
    </Link>
  );
};
