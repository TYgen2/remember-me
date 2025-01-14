import { useCallback, useState } from "react"
import useCredentialStore from "~/store/useCredentialStore"
import debounce from 'lodash/debounce';

const useSearch = () => {
    const [searchText, setSearchText] = useState('')
    const { setSearchQuery } = useCredentialStore()

    const debouncedSearch = useCallback(
        debounce((text: string) => {
            setSearchQuery(text)
        }, 300),
        []
    )

    const handleSearchInput = useCallback((text: string) => {
        setSearchText(text)
        debouncedSearch(text)
    }, [debouncedSearch])

    const clearSearch = useCallback(() => {
        setSearchText('');
        setSearchQuery('');
    }, [setSearchQuery]);

    return {
        searchText,
        handleSearchInput,
        clearSearch,
    };

}

export default useSearch