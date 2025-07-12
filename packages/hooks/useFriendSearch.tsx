import { useFriendsStore } from "@checkmate/store";
import { searchFriends } from "@checkmate/api";

export default function useFriendSearch() {
    const results = useFriendsStore((s) => s.searchResults);
    const loading = useFriendsStore((s) => s.searchLoading);
    const error = useFriendsStore((s) => s.searchError);

    const setResults = useFriendsStore((s) => s.setSearchResults);
    const setLoading = useFriendsStore((s) => s.setSearchLoading);
    const setError = useFriendsStore((s) => s.setSearchError);

    const search = async (query: string) => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const data = await searchFriends(query);
            setResults(data);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return { results, loading, error, search };
}
