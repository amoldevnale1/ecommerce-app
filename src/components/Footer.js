import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Footer() {
  return (
    <Navbar bg="dark" className="navbar">
        <Container>
          <Navbar className='m-auto text-light text-size footer'>copyright by ecommerce @ 2023 </Navbar>
        </Container>
      </Navbar>
  );
}

export default Footer;