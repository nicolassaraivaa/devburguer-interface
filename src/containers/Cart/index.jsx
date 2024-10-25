import Logo from '../../assets/logo-login.svg'
import { CartItems, CartResume } from '../../components'
import { useNavigate } from 'react-router-dom'
import { 
    Container,
    Banner,
    Title,
    Content,
    DivBack,
    ButtonBack
} from './styles'

export function Cart (){
    const navigate = useNavigate()
    return(
        <Container>
            <Banner>
                <img src={Logo} alt='logo burger' />
            </Banner>
            <Title>Checkout - Pedido</Title>
            <Content>
            <CartItems/>
            <CartResume/>
            </Content>
            <DivBack >
                <ButtonBack onClick={() => navigate('/')}> 
                    &lt; Voltar
                </ButtonBack>
             </DivBack>
        </Container>
        
    )
}