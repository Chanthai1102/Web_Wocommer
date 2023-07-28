

function headerlayout(){
    return(
        <header className="w-full bg-black flex justify-between py-2 px-36 items-center">
            <div className="text-teal-50 flex font-robot text-3xl font-thin">
                Ecommerce
            </div>
            <div className="hidden lg:block md:block">
                <ul className="flex justify-between ">
                    <li className="text-teal-50 font-robot pr-3"><a href="/">Home</a></li>
                    <li className="text-teal-50 font-robot pr-3"><a href="/">All Product</a></li>
                    <li className="text-teal-50 font-robot pr-3"><a href="/">Categories</a></li>
                    <li className="text-teal-50 font-robot pr-3"><a href="/">Acccount</a></li>
                    <li className="text-teal-50 font-robot pr-3"><a href="/">Cart</a></li>
                </ul>
            </div>
            <div className="text-teal-50">
                search
            </div>
        </header>
    )
}

export default headerlayout;