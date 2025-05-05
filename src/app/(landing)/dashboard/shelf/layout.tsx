import Navigate from "./_component/navigate";


export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <div className="">
            <div className="  mx-6 mt-6">
                <div className="flex text-3xl gap-2">
                    <div>Your</div>
                    <div className="text-tomato">shelf</div>
                </div>
                <Navigate />

            </div>

            {children}
        </div>
    );
}
