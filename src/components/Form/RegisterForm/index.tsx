import Input from '../Input';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import YupPassword from 'yup-password';
import { useUserContext } from '../../../hooks/useUserContext';
YupPassword(yup);

const formSchema = yup
  .object({
    name: yup.string().required('Campo obrigatório'),
    email: yup.string().required('Campo obrigatório').email('Email inválido'),
    password: yup
      .string()
      .required('Campo obrigatório')
      .password()
      .min(8, 'A senha deve conter pelo menos 8 caracteres')
      .minLowercase(1, 'A senha deve conter pelo menos um letra minúscula')
      .minUppercase(1, 'A senha deve conter pelo menos um letra maiúscula')
      .minSymbols(1, 'A senha deve conter pelo menos um símbolo'),
    confirm: yup
      .string()
      .required('Campo Obrigatório*')
      .oneOf([yup.ref('password'), null], 'A senhas devem ser iguais'),
  })
  .required();

export interface IRegisterFormData {
  name: string;
  email: string;
  password: string;
  confirm: string;
}

const RegisterForm = () => {
  const { onSubmitRegister } = useUserContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormData>({
    resolver: yupResolver(formSchema),
  });

  return (
    <StyledForm onSubmit={handleSubmit(onSubmitRegister)}>
      <Input
        register={register}
        type='name'
        label='Nome'
        error={errors.name?.message}
      />
      <Input
        register={register}
        type='email'
        label='E-mail'
        error={errors.email?.message}
      />
      <Input
        register={register}
        type='password'
        label='Senha'
        error={errors.password?.message}
      />
      <Input
        register={register}
        type='confirm'
        label='Confirme a senha'
        error={errors.confirm?.message}
      />
      <StyledButton $buttonSize='default' $buttonStyle='gray'>
        Cadastrar
      </StyledButton>
    </StyledForm>
  );
};

export default RegisterForm;
