import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import useSelectCurrencys from '../hooks/useSelectCurrencys';
import { currencys } from '../data/currencys';
import Error from './Error';

//Styled Components
const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #FFF;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color .3s ease ;
  margin-top: 30px;
  &:hover {
    background-color: #7A7DFE;
    cursor: pointer;
  }
`

const Form = ({setCurrencys}) => {

  const [cryptos, setCryptos] = useState([])
  const [error, setError] = useState(false)


  const [ currency ,SelectCurrencys ] = useSelectCurrencys('Elige tu moneda', currencys)
  const [ cryptocurrency ,SelectCryptocurrency ] = useSelectCurrencys('Choose your Cryptocurrency', cryptos)


  useEffect(() => {
    const consulteAPI = async () =>{
      const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"

      const response = await fetch(url)
      const result = await response.json()

      const arrayCryptos = result.Data.map( crypto =>{

        const object = {
          id: crypto.CoinInfo.Name,
          name: crypto.CoinInfo.FullName
        }

        return object
      })

      setCryptos(arrayCryptos)
    }
    consulteAPI()
  }, [])

  const handleSubmit = (e) =>{
    e.preventDefault();

    if([currency, cryptocurrency].includes('')){
      setError(true)
      return
    }

    setError(false)
    setCurrencys({
      currency,
      cryptocurrency
    })
  }

  return(
    
    <>
    {error && <Error>All fields are required</Error>}
    <form
      onSubmit={handleSubmit}
    >

      <SelectCurrencys />
      <SelectCryptocurrency />
      <InputSubmit
        type="submit"
        value="quote"
      />

    </form>
    </>
  )
};

export default Form;
