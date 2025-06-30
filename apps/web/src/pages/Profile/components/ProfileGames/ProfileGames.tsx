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
        imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.boardgamequest.com%2Fwp-content%2Fuploads%2F2013%2F04%2FSettlers-of-Catan.jpg&f=1&nofb=1&ipt=a1d1dbf777f1fdfa5a46ac3f0ba66d1b7c2f492c96417fa94c6045d0898a1831',
        name: 'Catan',
        description: 'Trade, build, and settle the island of Catan.',
        minPlayers: 3,
        maxPlayers: 4,
    },
    {
        id: '2',
        imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi5.walmartimages.com%2Fasr%2F3324315b-3c03-4b75-90a0-f710c937eec5_1.e4320c8caa0a631dbce2cbdedef06681.jpeg&f=1&nofb=1&ipt=9c8895433f8d618e5c0fe3b1eef57810ee1d2e329abdca2d7c531cc9b67a46a5',
        name: 'Ticket to Ride',
        description: 'Collect train cards to claim railway routes across the country.',
        minPlayers: 2,
        maxPlayers: 5,
    },
    {
        id: '3',
        imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FS%2Faplus-media-library-service-media%2Ff5ca8ec2-306c-4b3d-83a8-bc4432721a16.__CR0%2C0%2C970%2C300_PT0_SX970_V1___.png&f=1&nofb=1&ipt=c4d795670d07357a9ea9b2ac89a0524af36aa4bef3aab0701a67a96f5baff24b',
        name: 'Azul',
        description: 'Draft tiles to decorate your palace walls.',
        minPlayers: 2,
        maxPlayers: 4,
    },
    {
        id: '4',
        imageUrl: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fgesellschaftsspiele.spielen.de%2Fuploads%2Fimage%2F53237%2F57b082332a7a2.jpeg&f=1&nofb=1&ipt=75d90629ec1afa0d0d311420d740112ba3b6e9d073ca946b2b10cddaa9a0be31',
        name: 'Terraforming Mars',
        description: 'Lead a corporation to transform Mars into a habitable planet.',
        minPlayers: 1,
        maxPlayers: 5,
    },
    {
        id: '5',
        imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0704%2F5013%2Fproducts%2Fboard-games-carcassonne-game-1.jpg%3Fv%3D1514576271&f=1&nofb=1&ipt=8fa188ce549ba0dfaec3ea10f60f3de4f8fe6e58847af0b7c5654a7cf6488629',
        name: 'Carcassonne',
        description: 'Build medieval landscapes with tiles and claim features with your followers.',
        minPlayers: 2,
        maxPlayers: 5,
    },
    {
        id: '6',
        imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fassets.nintendo.com%2Fimage%2Fupload%2Fc_fill%2Cw_1200%2Fq_auto%3Abest%2Ff_auto%2Fdpr_2.0%2Fncom%2Fsoftware%2Fswitch%2F70010000028355%2Ffe9eca4506f8b405f535e38f873115a84a2ccd52405a5ba67d77bd48d7072c13&f=1&nofb=1&ipt=e5ed120f121a5e0cd514d407aa2f839241334610e61ee3bf6bc86e79f9164357',
        name: 'Wingspan',
        description: 'Attract birds to your wildlife preserves in this engine-building game.',
        minPlayers: 1,
        maxPlayers: 5,
    },
    {
        id: '7',
        imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.svc.asmodee.net%2Fproduction-rprod%2Fstorage%2Fgames%2F7-wonders%2Fsev-box-3d-1592411287XEcT9.png&f=1&nofb=1&ipt=b6f46d5a3d20b801acce9b08cc6f2c49077b8bd0ec3a15aab5b6aaaadf421e7c',
        name: '7 Wonders',
        description: 'Develop your civilization and build wonders of the ancient world.',
        minPlayers: 3,
        maxPlayers: 7,
    },
    {
        id: '8',
        imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.toysrus.ca%2Fdw%2Fimage%2Fv2%2FBDFX_PRD%2Fon%2Fdemandware.static%2F-%2FSites-toys-master-catalog%2Fdefault%2Fdwa13b47ea%2Fimages%2F214CDF1A_1.jpg%3Fsw%3D767%26sh%3D767%26sm%3Dfit&f=1&nofb=1&ipt=761671a0193060d0be8bb35b023fc3da8ca55ce77586193f5158fb540ac42cfe',
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
