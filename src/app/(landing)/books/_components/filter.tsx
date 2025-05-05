'use client'
import { Button } from '@/components/ui/button';
import { KY } from '@/lib/constants';
import { useFetch } from '@/lib/state/hooks/useQuery';
import { ICategory, Igenre } from '@/types/db';
import { Drawer, Radio, RadioChangeEvent, Select } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import qs, { StringifiableRecord } from "query-string";
import { useState } from 'react';
import { BiFilter } from 'react-icons/bi';

interface Filter {
  categoryId?: string | null,
  genres?: string | null,
  language?: string | null,
  page?: number,
}

const App = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeCatagory = searchParams?.get('categoryId')
  const activeLanguage = searchParams?.get('language')
  const activeGenre = searchParams?.get('genres')?.split(',')
  const [filter, setFilter] = useState({ categoryId: activeCatagory, language: activeLanguage, genres: activeGenre })


  const { isLoading: genreLoading, data: genreData, } = useFetch(
    [KY.genre],
      `${KY.genre}`,
  );
  const genData= genreData?.body||[]
  const { isLoading: catLoading, data: catData, } = useFetch(
    [KY.category],
      `${KY.category}`,
  );
  const ctgData= catData?.body||[]

  const handleClick = () => {
    const current = qs.parse(searchParams ? searchParams.toString() : '');
    const query: Filter = {
      ...current,
      categoryId: filter?.categoryId,
      language: filter?.language,
      genres: filter?.genres?.join(',')

    };


    const url = qs.stringifyUrl({
      url: `${window.location.href}`,
      query: query as StringifiableRecord,
    }, { skipNull: true, skipEmptyString: true });
    router.push(url)
    setOpen(false)
  }


  let categories = ctgData.map((cat: ICategory) => ({ label: cat.name, value: cat._id }))
  if (categories)
    categories = [{ label: 'All catagories', value: "" }, ...categories]

  let genres = genData?.map((genre: Igenre) => ({ label: genre.name, value: genre.name }));
  const language = [
    { value: "", label: "All languages" },
    { value: "Amharic", label: "Amharic" },
    { value: "AfanOromo", label: "AfanOromo" },
    { value: "English", label: "English" },
    { value: "Tigrna", label: "Tigrna" },

  ]

  return (
    <>
      <Button className='[background:linear-gradient(161.68deg,_#fa7c54,_#ec2c5a)] text-white' data-test="filter-button" onClick={showDrawer}>
        <BiFilter className='text-[20px] mr-2 ' />
        Filter
      </Button>
      <Drawer title="Filter books" placement="right" onClose={() => setOpen(false)} open={open}>
        <div className='flex flex-col gap-4 items-start justify-between'>
          <h3>
            Categories
          </h3>

          <Select
            data-test="category-dropdown"
            defaultValue={'Select Category'}
            style={{ width: '100%' }}
            onChange={(value) => setFilter(pre => ({ ...pre, categoryId: value }))}
            options={categories}
            value={filter.categoryId}
          />
          <h3>
            Genres
          </h3>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            onChange={(value) => setFilter(pre => ({ ...pre, genres: value }))}
            options={genres}
            value={filter.genres}
          />
          <h3>
            Language
          </h3>
          <Radio.Group className='flex flex-col gap-2' onChange={(e: RadioChangeEvent) => setFilter(pre => ({ ...pre, language: e.target.value }))} value={filter.language}>
            {
              language.map((val, i) => {
                return <Radio key={i} data-test='language-radio-button' value={val.value}>{val.label}</Radio>
              })
            }
          </Radio.Group>

          <Button data-test="search-button" onClick={handleClick} className='mt-auto text-white [background:linear-gradient(161.68deg,_#fa7c54,_#ec2c5a)]'>Search</Button>
        </div>
      </Drawer>
    </>
  );
};

export default App;