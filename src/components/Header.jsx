import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../images/stastiem-logo.webp";
function Header() {
  return (
    <header>
      <nav>
        <div className="logo">
          <Link href="https://www.stastiem.com/">
            <Image src={logo} alt="Logo" width={70} height={42} />
          </Link>
        </div>
        {/* Add other navigation links or elements here */}
      </nav>
    </header>
  );
}

export default Header;
