import { LayoutProps } from "../../.next/types/app/layout";

const Layout = ({children} : LayoutProps) => {
    return (
        <div>
            <main>{children}</main>
        </div>
    );
};

export default Layout;