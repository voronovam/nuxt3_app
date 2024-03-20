const searchValue = ref<string>('')

export const useSearchValue = () => {
  const handleSearchUpdate = (val: string) => {
    searchValue.value = val
  }

  return { searchValue, handleSearchUpdate }
}
