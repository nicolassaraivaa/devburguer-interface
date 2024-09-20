import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import Logo from '../../assets/logo-login.svg'
import {Button} from '../../components/Button'

import {
    Container,
    LeftContainer,
    RightContainer,
    Title,
    Form,
    InputContainer
} from './styles'

export function Login (){

    const schema = yup.object({
        email: yup.string().email().required(),
        password: yup.string().min(6).required(),
    }).required();

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      })
      
      const onSubmit = (data) => console.log(data)
    
    return(
        <Container>
            <LeftContainer>
                <img src={Logo} alt="logo-decburguer" />
            </LeftContainer>
            <RightContainer>
                <Title>
                Olá, seja bem vindo ao <span>Dev Burguer!</span>
                <br/>
                Acesse com seu <span>Login e senha.</span>
                </Title>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputContainer>
                        <label htmlFor='email'>Email</label>
                        <input type="email" id="email" {...register("email")} />
                    </InputContainer>
                    <InputContainer>
                        <label htmlFor='password'>Senha</label>
                        <input type="password" id="password" {...register("password")} />
                    </InputContainer>
                    <Button type="submit">Entrar</Button>
                </Form>
                <p>
                    Não possui conta? <a href="#">Clique aqui.</a>
                </p>
            </RightContainer>
        </Container>
    )
}

 