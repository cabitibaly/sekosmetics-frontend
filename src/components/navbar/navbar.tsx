import MobileNavbar from './mobileNavbar'
import NavbarDesktop from './navabrDesktop'

const Navbar = ({isSidebarVisible = true, inArticle = false}: {isSidebarVisible?: boolean, inArticle?: boolean}) => {
    return (
        <>
            <NavbarDesktop />
            <MobileNavbar isSidebarVisible={isSidebarVisible} inArticle={inArticle} />
        </>
    )
}

export default Navbar
