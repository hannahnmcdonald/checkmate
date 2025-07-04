import { useLocation } from "react-router-dom";
import { YStack, Text } from 'tamagui'
import React from 'react';
import { useGameSearch } from "@checkmate/hooks"
import {
    GameCarousel,
    GameSearchBar
} from "./components";

// export class ErrorBoundary extends React.Component {
//     state = { hasError: false, error: null };

//     static getDerivedStateFromError(error) {
//         return { hasError: true, error };
//     }

//     render() {
//         if (this.state.hasError) {
//             return <Text color="red">Error: {this.state.error?.message}</Text>;
//         }
//         return this.props.children;
//     }
// }

export default function GameSearchResultsPage() {
    console.log("GameSearchResults mounted!");

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const query = params.get("q") || "";

    const { results, loading } = useGameSearch(query);

    console.log(results, typeof results)

    return (
        <>
            <YStack gap="$4" px="$4" py="$4" >
                <GameSearchBar initialQuery={query} />

                {loading ? (
                    <Text>Loading...</Text>
                ) : results?.length === 0 ? (
                    <Text>No results found.</Text>
                ) : (
                    // TODO: swap to grid, add pagiation
                    // <Text>{results.length} results found.</Text>
                    // <GameGrid games={results} />
                    <GameCarousel games={results} header={<Text fontSize="$5" mt="$2">
                        Results for "{query}"
                    </Text>} />
                )}
            </YStack>
        </>
    );
}
