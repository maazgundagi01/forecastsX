import forxlogo from '../media-library/forecasts-x-white.png';

export let Navigation = () => {
    return(
    <nav>
        <ul className='main-menu menu-1 flex-row'>
            <li>Home</li>
        </ul>
    </nav>
    )
}

export let Header = () => {
    return(
        <header className="head-main full-width ">
            <div className="flex-row full-width pd-1 full-in">
                <figure className='logo-fig'>
                    <img src={forxlogo} />
                </figure>
                <Navigation />
            </div>
        </header>
    )
}