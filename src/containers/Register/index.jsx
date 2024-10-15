import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { toast } from "react-toastify"

import { api } from '../../services/api'
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

export function Register() {
    const navigate = useNavigate()
    const schema = yup
        .object({
            name: yup
                .string()
                .required('O nome é obrigatório'),
            email: yup
                .string()
                .email('Digite um e-mail válido')
                .required('O e-mail é obrigatório'),

            password: yup
                .string()
                .min(6, 'A senha deve ter pelo menos 6 caracteres')
                .required('Digite uma senha'),

            confirmPassword: yup
                .string()
                .oneOf([yup.ref('password ')], 'As senhas devem ser iguais')
                .required('Confirme sua senha')
        }).required();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const onSubmit = async (data) => {

        try {
            const { status } = await api.post('/users', {
                name: data.name,
                email: data.email,
                password: data.password
            },
                {
                    validateStatus: () => true
                }
            )
            if(status === 200 || status === 201) {
                setTimeout(() => {
                    navigate('/login')
                },2000)
                 toast.success('Conta cria com sucesso, efetue seu Login!')
            }else if(status === 409){
                toast.error('Email já cadastrado! Faça o login para continuar')
            } else{
                throw new Error()
            }
        } catch (error) {
            toast.error('Falha no sistema! tente novamente.')
        }
        
    }

    return (
        <Container>
            <LeftContainer>
                <img src={Logo} alt="logo-decburguer" />
            </LeftContainer>
            <RightContainer>
                <Title>Criar Conta</Title>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputContainer>
                        <label htmlFor='name'>Nome</label>
                        <input type="text" id="name" {...register("name")} />
                        <p>{errors.name?.message}</p>
                    </InputContainer>

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

                    <InputContainer>
                        <label htmlFor='confirmPassword'>Confirmar Senha</label>
                        <input type="password" id="confirmPassword" {...register("confirmPassword")} />
                        <p>{errors.confirmPassword?.message}</p>
                    </InputContainer>

                    <Button type="submit">Criar Conta</Button>
                </Form>
                <p>
                    Já possui conta? <Link to="/login">Clique aqui.</Link>
                </p>
            </RightContainer>
        </Container>
    )
}

