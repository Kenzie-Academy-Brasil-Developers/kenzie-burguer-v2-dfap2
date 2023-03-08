import { MdSearch } from 'react-icons/md';
import { StyledSearchForm } from './style';
import { StyledButton } from '../../../styles/button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useShopContext } from '../../../hooks/useShopContext';

const formSchema = yup.object({
  search: yup.string(),
});

interface ISearchForm {
  search: string;
}

const SearchForm = () => {
  const { products } = useShopContext();

  const onSubmitSearch = (search: ISearchForm) => {
    const array = products.filter(
      (prod) =>
        prod.category.toLowerCase() == search.search.toLowerCase() ||
        prod.name.toLowerCase() == search.search.toLowerCase()
    );

    console.log(array);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISearchForm>({
    resolver: yupResolver(formSchema),
  });

  return (
    <StyledSearchForm onChange={handleSubmit(onSubmitSearch)}>
      <input
        type='text'
        placeholder='Digitar pesquisa'
        {...register('search')}
      />
      <StyledButton type='submit' $buttonSize='medium' $buttonStyle='green'>
        <MdSearch />
      </StyledButton>
    </StyledSearchForm>
  );
};

export default SearchForm;
