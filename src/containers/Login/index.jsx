import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { toast } from "react-toastify"
import { useUser } from "../../hooks/UserContext"

import {api} from '../../services/api'
import Logo from '../../assets/logo-login.svg'
import { Button } from '../../components/Button'
import { useNavigate } from "react-router-dom"

import {
    Container,
    LeftContainer,
    RightContainer,
    Title,
    Form,
    InputContainer,
    Link

} from './styles'

export function Login() {
    const navigate = useNavigate()
    const {putUserData} = useUser()

    const schema = yup
        .object({
            email: yup
                .string()
                .email('Digite um e-mail válido')
                .required('O e-mail é obrigatório'),

            password: yup
                .string()
                .min(6, 'A senha deve ter pelo menos 6 caracteres')
                .required('Digite uma senha'),
        }).required();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const onSubmit = async (data) => {
        const {data: userData} = await toast.promise(
            api.post('/session',{
                email: data.email,
                password: data.password
            }),
            {
                pending: 'Verificando seus dados' ,
                success:{
                    render(){
                        setTimeout(() => {
                            navigate('/')
                        },2000)
                        return 'Seja Bem-vindo(a)'
                    }
                },
                error: 'E-mail ou senha incorreto'
            }
        )
        putUserData(userData)
    }

        return (
        <Container>
            <LeftContainer>
                <img src={Logo} alt="logo-decburguer" />
            </LeftContainer>
            <RightContainer>
                <Title>
                    Olá, seja bem vindo ao <span>Dev Burguer!</span>
                    <br />
                    Acesse com seu <span>Login e senha.</span>
                </Title>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputContainer>
                        <label htmlFor='email'>Email</label>
                        <input type="email" id="email" {...register("email")} />
                        <p>{errors.email?.message}</p> {/*O operador ?. (optional chaining) verifica se a propriedade existe antes de acessá-la,
                        // evitando erros se for undefined ou null*/}
                    </InputContainer>

                    <InputContainer>
                        <label htmlFor='password'>Senha</label>
                        <input type="password" id="password" {...register("password")} />
                        <p>{errors.password?.message}</p>
                    </InputContainer>
                    <Button type="submit">Entrar</Button>
                </Form>
                <p>
                    Não possui conta? <Link to="/cadastro">Clique aqui.</Link>
                </p>
            </RightContainer>
        </Container>
    )
}

