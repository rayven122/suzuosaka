import Link from "next/link";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-primary to-[#07FFB3] px-4 py-8">
      <div className="container mx-auto">
        {/* ロゴ */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <Image
              src="/common/logo-horizontal.svg"
              alt="川の家 おさか"
              width={200}
              height={80}
              className="mx-auto"
            />
          </Link>
        </div>

        {/* ナビゲーションリンク */}
        <nav className="mb-8">
          <ul className="flex flex-wrap justify-center gap-8 text-gray-800">
            <li>
              <Link href="/about" className="hover:text-gray-600">
                ABOUT
              </Link>
            </li>
            <li>
              <Link href="/news" className="hover:text-gray-600">
                NEWS
              </Link>
            </li>
            <li>
              <Link href="/fishing" className="hover:text-gray-600">
                FISHING
              </Link>
            </li>
            <li>
              <Link href="/eatery" className="hover:text-gray-600">
                EATERY
              </Link>
            </li>
            <li>
              <Link href="/access" className="hover:text-gray-600">
                ACCESS
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-600">
                CONTACT
              </Link>
            </li>
          </ul>
        </nav>

        {/* SNSアイコン */}
        <div className="mb-8 flex justify-center gap-4">
          <Link
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-2xl" />
          </Link>
        </div>

        {/* プライバシーポリシー */}
        <div className="mb-4 text-center">
          <Link
            href="/privacy-policy"
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            PRIVAcy policy
          </Link>
        </div>

        {/* コピーライト */}
        <p className="text-center text-sm text-gray-600">
          © 2024. river house osaka
        </p>
      </div>
    </footer>
  );
}
