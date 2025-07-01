import { useLocation } from "react-router-dom";
import { YStack, Text, Separator } from 'tamagui'
import Footer from '../../../components/Footer';
import React from 'react';
import SearchBar from '../../../components/SearchBar/SearchBar';
import { useGameSearch } from '../../../hooks/useGameSearch'
// import { GameGrid } from '../../../components/GameGrid';
import GameCarousel from '../../../components/GameCarousel';

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

export default function GameSearchResults() {
    console.log("GameSearchResults mounted!");

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const query = params.get("q") || "";

    const { results, loading } = useGameSearch(query);

    console.log(results, typeof results)

    return (
        <>
            <YStack gap="$4" px="$4" py="$4">
                <SearchBar initialQuery={query} />

                <Text fontSize="$5" mt="$2">
                    Results for "{query}"
                </Text>

                {loading ? (
                    <Text>Loading...</Text>
                ) : results?.length === 0 ? (
                    <Text>No results found.</Text>
                ) : (
                    // TODO: swap to grid, add pagiation
                    // <Text>{results.length} results found.</Text>
                    // <GameGrid games={results} />
                    <GameCarousel games={results} />
                )}
            </YStack>
            <Footer />
        </>
    );
}
