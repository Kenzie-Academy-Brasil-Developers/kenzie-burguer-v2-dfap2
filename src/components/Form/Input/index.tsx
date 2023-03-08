import { StyledTextField } from '../../../styles/form';
import { StyledParagraph } from '../../../styles/typography';

interface iInput {
  type: string;
  label: string;
  error: string | undefined;
  register: any;
}

const Input = ({ type, label, error, register }: iInput) => (
  <fieldset>
    <StyledTextField
      label={label}
      type={
        type == 'password' || type == 'email' || type == 'confirm'
          ? type == 'confirm'
            ? 'password'
            : type
          : 'text'
      }
      {...register(type)}
    />
    <StyledParagraph fontColor='red'>{error}</StyledParagraph>
  </fieldset>
);

export default Input;
