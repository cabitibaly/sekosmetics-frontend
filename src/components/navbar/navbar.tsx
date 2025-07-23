import MobileNavbar from './mobileNavbar'
import NavbarDesktop from './navabrDesktop'

const Navbar = ({isSidebarVisible = true}: {isSidebarVisible?: boolean}) => {
    return (
        <>
            <NavbarDesktop />
            <MobileNavbar {...{isSidebarVisible}} />
        </>
    )
}

export default Navbar
