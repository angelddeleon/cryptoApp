import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Form from './components/Form'
import Result from './components/Result'
import ImagenCripto from './img/imagen-criptos.png'
import Spinner from './components/Spinner'

//Styled Components
const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Image = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`

function App() {

  const [ currencys, setCurrencys] = useState({})
  const [ result, setResult] = useState({})
  const [ load, setLoad] = useState(false)

  useEffect(() => {
    if(Object.keys(currencys).length > 0){

      const quoteCrypto = async () => {
        setLoad(true)

        //Consulting the API
        const { currency, cryptocurrency} = currencys
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptocurrency}&tsyms=USD,${currency}`

        const response = await fetch(url)
        const result = await response.json()

        //Result of the API
        setResult(result.DISPLAY[cryptocurrency][currency])
        
        setLoad(false)
      }

      quoteCrypto()

    }
  }, [currencys])

  return (
    <Contenedor>
      <Image
        src={ImagenCripto}
        alt="images criptos"
      />
      <div>
      <Heading>Trade cryptocurrencies instantly</Heading>
      <Form 
      setCurrencys={setCurrencys}
      />

      {load && <Spinner/> }
      {result.PRICE && <Result result={result}/>}
      </div>
    </Contenedor>
  )
}

export default App
