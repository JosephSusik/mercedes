import Link from "next/link";

export default function Navbar() {
    return(
        <nav>
            <div className="navbar">
                <Link href={"/"} >
                <img src="/logo.svg" alt="" />
                <p>Mercedes-Benz</p>
                </Link>
            </div>
        </nav>
    )
}