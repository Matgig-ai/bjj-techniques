import Link from "next/link";
import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
    return (
        <header>
            <div>
                <MainNav items={siteConfig.mainNav} />
                <div className="flex gap-4">
                    <Link href={siteConfig.links.github}>
                        <a target="_blank" rel="noopener noreferrer">
                            GitHub
                        </a>
                    </Link>
                    <Link href={siteConfig.links.twitter}>
                        <a target="_blank" rel="noopener noreferrer">
                            Twitter
                        </a>
                    </Link>
                </div>
            </div>
        </header>
    );
}
