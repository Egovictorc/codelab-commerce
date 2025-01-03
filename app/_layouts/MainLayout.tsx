import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

type Props = {
    children: ReactNode
}

const MainLayout: React.FC<Props> = ({children}) => {

    return (
        <div className=" min-h-screen flex flex-col gap-3 w-full items-center">
            <Header />
                <main className="grow w-full h-full ">
                {children}
                </main>
            <Footer />
        </div>
    )
}


export default MainLayout;