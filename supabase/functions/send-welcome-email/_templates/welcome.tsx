
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'

interface WelcomeEmailProps {
  firstName: string
  role: string
}

export const WelcomeEmail = ({
  firstName,
  role
}: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welkom bij InvestBotIQ</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Welkom bij InvestBotIQ, {firstName}!</Heading>
        <Text style={text}>
          Bedankt voor uw aanmelding als {role}. 
          We zijn blij dat u zich bij onze gemeenschap heeft aangesloten.
        </Text>
        <Text style={text}>
          Binnenkort ontvangt u meer informatie over hoe u kunt starten 
          met uw financiële reis met InvestBotIQ.
        </Text>
        <Link 
          href="https://www.investbotiq.com" 
          target="_blank" 
          style={link}
        >
          Bezoek onze website
        </Link>
        <Text style={footer}>
          © {new Date().getFullYear()} InvestBotIQ. Alle rechten voorbehouden.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default WelcomeEmail

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '580px',
  maxWidth: '100%'
}

const h1 = {
  color: '#1d1c1d',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0'
}

const link = {
  color: '#2754C5',
  textDecoration: 'underline',
  display: 'block',
  marginTop: '20px'
}

const text = {
  color: '#1d1c1d',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0'
}

const footer = {
  color: '#6a6a6a',
  fontSize: '12px',
  lineHeight: '22px',
  marginTop: '12px',
  marginBottom: '24px'
}
