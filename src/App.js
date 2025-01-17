import Logo from 'images/196x196.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import RAM from 'random-access-memory'
import { Container, Row, Col } from 'reactstrap'
import { BlockPages, PrintCore, CustomInput } from 'components'
import { LookupProvider, useLookup } from 'hooks'
import { DHT, Swarm, Core, useCore, useReplicate } from 'use-hyper'

const LookupForm = () => {
  const { searchValue, setSearchValue, encryptionValue, setEncryptionValue } =
    useLookup()

  const onSearch = e => {
    setSearchValue(e.target.value)
  }

  const onEncryptionKey = e => {
    setEncryptionValue(e.target.value)
  }

  return (
    <>
      <Col xs={8}>
        <CustomInput
          type='text'
          placeholder='Find core by key'
          onChange={onSearch}
          value={searchValue}
        />
      </Col>

      <br />
      <br />

      <Col xs={8}>
        <CustomInput
          type='password'
          placeholder='Encryption key (optional)'
          onChange={onEncryptionKey}
          value={encryptionValue}
        />
      </Col>
    </>
  )
}

const LookupResult = () => {
  const { core } = useCore()
  const { lookup } = useLookup()

  useReplicate(core, !!lookup, [lookup])

  return (
    <Col xs={8} style={{ marginTop: '10px' }}>
      <PrintCore />
      <BlockPages />
    </Col>
  )
}

function App () {
  const { lookup, encryptionKey } = useLookup()

  return (
    <div className='custom-body body-dark'>
      <Container>

        <Row className='custom-row' style={{ justifyContent: 'center' }}>
          <Col xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={Logo} alt='Hypercore Explorer Logo' width={70} />
          </Col>

          <Col xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
            <h1
              style={{
                fontSize: '2em,',
                marginBottom: '20px',
                marginTop: '20px'
              }}
            >
              Hypercore Explorer
            </h1>
          </Col>
         
          <br />
          <br />

          <LookupForm />

          <br />
          <br />
          <br />

          {lookup && (
            <Core
              storage={RAM}
              publicKey={lookup}
              encryptionKey={encryptionKey}
            >
              <LookupResult />
            </Core>
          )}
        </Row>
      </Container>
    </div>
  )
}

export default () => {
  return (
    <DHT>
      <Swarm>
        <LookupProvider>
          <App />
        </LookupProvider>
      </Swarm>
    </DHT>
  )
}
