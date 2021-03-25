import { Col, Container, Row } from './layout'

const Footer = () => (
  <footer>
    <Container>
      <Row>
        <Col className="w-full">
          <ul className="flex items-center justify-between py-4 md:py-8 text-sm text-white">
            <li>
              Created by{' '}
              <a
                href="https://sambeevors.com"
                target="_blank"
                className="font-bold"
              >
                Sam Beevors
              </a>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  </footer>
)

export default Footer
