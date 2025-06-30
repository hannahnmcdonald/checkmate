import React, { useEffect, useState } from 'react';
import GameCarousel from '../../../../components/GameCarousel';
import { PrimaryButton } from '../../../../components/Styled';
import { XStack } from 'tamagui';
import { ToggleTabs } from '../../../../components/Toggle';

type Game = {
    id: string;
    imageUrl: string;
    name: string;
    description: string;
    minPlayers: number;
    maxPlayers: number;
};

export const dummyGames: Game[] = [
    {
        id: '1',
        imageUrl: 'https://source.unsplash.com/random/400x300?boardgame1',
        name: 'Catan',
        description: 'Trade, build, and settle the island of Catan.',
        minPlayers: 3,
        maxPlayers: 4,
    },
    {
        id: '2',
        imageUrl: 'https://source.unsplash.com/random/400x300?boardgame2',
        name: 'Ticket to Ride',
        description: 'Collect train cards to claim railway routes across the country.',
        minPlayers: 2,
        maxPlayers: 5,
    },
    {
        id: '3',
        imageUrl: 'https://source.unsplash.com/random/400x300?boardgame3',
        name: 'Azul',
        description: 'Draft tiles to decorate your palace walls.',
        minPlayers: 2,
        maxPlayers: 4,
    },
    {
        id: '4',
        imageUrl: 'https://source.unsplash.com/random/400x300?boardgame4',
        name: 'Terraforming Mars',
        description: 'Lead a corporation to transform Mars into a habitable planet.',
        minPlayers: 1,
        maxPlayers: 5,
    },
    {
        id: '5',
        imageUrl: 'https://source.unsplash.com/random/400x300?boardgame5',
        name: 'Carcassonne',
        description: 'Build medieval landscapes with tiles and claim features with your followers.',
        minPlayers: 2,
        maxPlayers: 5,
    },
    {
        id: '6',
        imageUrl: 'https://source.unsplash.com/random/400x300?boardgame6',
        name: 'Wingspan',
        description: 'Attract birds to your wildlife preserves in this engine-building game.',
        minPlayers: 1,
        maxPlayers: 5,
    },
    {
        id: '7',
        imageUrl: 'https://source.unsplash.com/random/400x300?boardgame7',
        name: '7 Wonders',
        description: 'Develop your civilization and build wonders of the ancient world.',
        minPlayers: 3,
        maxPlayers: 7,
    },
    {
        id: '8',
        imageUrl: 'https://source.unsplash.com/random/400x300?boardgame8',
        name: 'Pandemic',
        description: 'Work together to stop the spread of deadly diseases.',
        minPlayers: 2,
        maxPlayers: 4,
    },
];


export default function ProfileGames() {
    const [activeTab, setActiveTab] = useState<'wishlist' | 'collection'>('collection');
    const [wishlist, setWishlist] = useState<Game[]>([]);
    const [collection, setCollection] = useState<Game[]>([]);

    // useEffect(() => {
    //     fetch('/api/user/wishlist')
    //         .then((res) => res.json())
    //         .then(setWishlist);

    //     fetch('/api/user/collection')
    //         .then((res) => res.json())
    //         .then(setCollection);
    // }, []);

    // const games = activeTab === 'wishlist' ? wishlist : collection;

    return (
        <GameCarousel
            games={dummyGames}
            header={
                <XStack gap="$2">
                    <ToggleTabs
                        options={[
                            { label: 'Collection', value: 'collection' },
                            { label: 'Wishlist', value: 'wishlist' },
                        ]}
                        value={activeTab}
                        onChange={setActiveTab}
                    />
                </XStack>
            }
        />
    );
}
