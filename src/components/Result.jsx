import styled from "@emotion/styled";

//Styled Components
const Container = styled.div`
  color: #FFF;
  font-family: 'Lato', sans-serif;

  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 30px;
`

const Text = styled.p `
    font-size: 18px;
  span{
    font-weight: 700;
  }
`

const Price = styled.p`
  font-size: 24px;
  span{
    font-weight: 700;
  }
`

const Image = styled.img`
  display: block;
  width: 100px;
  height: 100px;
`

const Result = ({result}) => {
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE} = result

  return(
    <Container>
      <Image src={`https://cryptocompare.com/${IMAGEURL}`} alt="Image-crypto" />
      <div>
      <Price>The price is: <span>{PRICE}</span></Price>
      <Text>Highest price of the day: <span>{HIGHDAY}</span></Text>
      <p>Lowest price of the day: <span>{LOWDAY}</span></p>
      <p>Variation last 24 hours: <span>{CHANGEPCT24HOUR}</span></p>
      <p>Last update: <span>{LASTUPDATE}</span></p>
      </div>
    </Container>
  )
};

export default Result;
