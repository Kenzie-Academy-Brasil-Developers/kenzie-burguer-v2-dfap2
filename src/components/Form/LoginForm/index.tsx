import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import Input from '../Input';
import { iLoginFormData } from '../../../providers/UserContext';
import { useUserContext } from '../../../hooks/useUserContext';

const formSchema = yup
  .object({
    email: yup
      .string()
      .required('Campo obrigatório')
      .email('Digite um e-mail válido'),
    password: yup.string().required('Campo obrigatório'),
  })
  .required();

const LoginForm = () => {
  const { onSubmitLogin } = useUserContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iLoginFormData>({
    resolver: yupResolver(formSchema),
  });

  return (
    <StyledForm onSubmit={handleSubmit(onSubmitLogin)}>
      <Input
        register={register}
        type='email'
        label='Email'
        error={errors.email?.message}
      />
      <Input
        register={register}
        type='password'
        label='Senha'
        error={errors.password?.message}
      />
      <StyledButton $buttonSize='default' $buttonStyle='green'>
        Entrar
      </StyledButton>
    </StyledForm>
  );
};

export default LoginForm;
