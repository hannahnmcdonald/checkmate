import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
    await knex('notifications').del();
    await knex('friendships').del();
    await knex('game_session_participants').del();
    await knex('game_sessions').del();
    await knex('user_stats').del();

    const users = await knex('users').select('id', 'username');
    const alice = users.find(u => u.username === 'alice');
    const bob = users.find(u => u.username === 'bob');
    const carol = users.find(u => u.username === 'carol');

    if (!alice || !bob || !carol) throw new Error('Missing seeded users');

    const now = new Date();

    // Friendships
    await knex('friendships').insert([
        { id: uuidv4(), user_id_1: alice.id, user_id_2: bob.id, status: 'accepted', created_at: now },
        { id: uuidv4(), user_id_1: alice.id, user_id_2: carol.id, status: 'accepted', created_at: now },
        { id: uuidv4(), user_id_1: bob.id, user_id_2: carol.id, status: 'pending', created_at: now },
    ]);

    // Game 1: Alice vs Bob — Alice wins
    const session1Id = uuidv4();
    const game1Id = '234190';

    await knex('game_sessions').insert({
        id: session1Id,
        game_id: game1Id,
        started_at: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 2),
        ended_at: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 2 + 3600000),
        status: 'completed',
    });

    await knex('game_session_participants').insert([
        {
            id: uuidv4(),
            game_session_id: session1Id,
            user_id: alice.id,
            is_external: false,
            result: 'win',
            approved: true,
            invited_by: alice.id,
            responded_at: now,
            created_at: now,
            updated_at: now,
        },
        {
            id: uuidv4(),
            game_session_id: session1Id,
            user_id: bob.id,
            is_external: false,
            result: 'loss',
            approved: true,
            invited_by: alice.id,
            responded_at: now,
            created_at: now,
            updated_at: now,
        },
    ]);

    // Game 2: Alice vs Bob vs Carol vs Guest — Carol wins
    const session2Id = uuidv4();
    const game2Id = '167791';

    await knex('game_sessions').insert({
        id: session2Id,
        game_id: game2Id,
        started_at: new Date(now.getTime() - 1000 * 60 * 60 * 24),
        ended_at: new Date(now.getTime() - 1000 * 60 * 60 * 24 + 5400000),
        status: 'completed',
    });

    await knex('game_session_participants').insert([
        {
            id: uuidv4(),
            game_session_id: session2Id,
            user_id: alice.id,
            is_external: false,
            result: 'loss',
            approved: true,
            invited_by: carol.id,
            responded_at: now,
            created_at: now,
            updated_at: now,
        },
        {
            id: uuidv4(),
            game_session_id: session2Id,
            user_id: bob.id,
            is_external: false,
            result: 'loss',
            approved: true,
            invited_by: carol.id,
            responded_at: now,
            created_at: now,
            updated_at: now,
        },
        {
            id: uuidv4(),
            game_session_id: session2Id,
            user_id: carol.id,
            is_external: false,
            result: 'win',
            approved: true,
            invited_by: carol.id,
            responded_at: now,
            created_at: now,
            updated_at: now,
        },
        {
            id: uuidv4(),
            game_session_id: session2Id,
            user_id: null,
            name: 'GuestPlayer1',
            is_external: true,
            result: 'loss',
            approved: null,
            invited_by: carol.id,
            created_at: now,
            updated_at: now,
        }
    ]);

    await knex('notifications').insert([
        {
            id: uuidv4(),
            recipient_id: bob.id,
            sender_id: alice.id,
            type: 'match_invite',
            reference_id: session1Id,
            message: 'You were invited to a match by Alice.',
            read: false,
            deleted_by_user: false,
            created_at: now,
        },
        {
            id: uuidv4(),
            recipient_id: bob.id,
            sender_id: carol.id,
            type: 'match_invite',
            reference_id: session2Id,
            message: 'Carol invited you to a Terraforming Mars match.',
            read: false,
            deleted_by_user: false,
            created_at: now,
        },
        {
            id: uuidv4(),
            recipient_id: alice.id,
            sender_id: carol.id,
            type: 'match_invite',
            reference_id: session2Id,
            message: 'Carol invited you to a Terraforming Mars match.',
            read: false,
            deleted_by_user: false,
            created_at: now,
        },
        {
            id: uuidv4(),
            recipient_id: carol.id,
            sender_id: bob.id,
            type: 'friend_request',
            reference_id: null,
            message: 'Bob sent you a friend request.',
            read: false,
            deleted_by_user: false,
            created_at: now,
        },
        {
            id: uuidv4(),
            recipient_id: carol.id,
            sender_id: alice.id,
            type: 'match_result',
            reference_id: session2Id,
            message: 'Results for your recent match are now available.',
            read: false,
            deleted_by_user: false,
            created_at: now,
        }
    ]);

    const statsMap: Record<string, { wins: number; losses: number; ties: number }> = {
        [alice.id]: { wins: 1, losses: 1, ties: 0 },
        [bob.id]: { wins: 0, losses: 2, ties: 0 },
        [carol.id]: { wins: 1, losses: 0, ties: 0 },
    };

    const statsInserts = Object.entries(statsMap).map(([user_id, { wins, losses, ties }]) => ({
        id: uuidv4(),
        user_id,
        wins,
        losses,
        ties,
        updated_at: now,
    }));

    await knex('user_stats').insert(statsInserts);
}
