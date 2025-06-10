import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
    await knex('game_session_participants').del();
    await knex('game_sessions').del();
    await knex('user_stats').del();

    const users = await knex('users').select('id', 'username');
    const alice = users.find(u => u.username === 'alice');
    const bob = users.find(u => u.username === 'bob');
    const carol = users.find(u => u.username === 'carol');

    if (!alice || !bob || !carol) throw new Error('Missing seeded users');

    const now = new Date();

    // Game 1: Alice vs Bob — Alice wins
    const session1Id = uuidv4();
    const game1Id = '234190'; // Unstable Unicorns

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

    // Game 2: Alice vs Bob vs Carol — Carol wins
    const session2Id = uuidv4();
    const game2Id = '167791'; // Terraforming Mars

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
    ]);

    // Update user_stats
    const zeroStats = { wins: 0, losses: 0, ties: 0 };
    const statsMap: Record<string, typeof zeroStats> = {
        [alice.id]: { ...zeroStats },
        [bob.id]: { ...zeroStats },
        [carol.id]: { ...zeroStats },
    };

    // Tally results
    const allResults = [
        { user_id: alice.id, result: 'win' },
        { user_id: bob.id, result: 'loss' },
        { user_id: alice.id, result: 'loss' },
        { user_id: bob.id, result: 'loss' },
        { user_id: carol.id, result: 'win' },
    ];

    for (const { user_id, result } of allResults) {
        if (result === 'win') statsMap[user_id].wins++;
        else if (result === 'loss') statsMap[user_id].losses++;
        else if (result === 'tie') statsMap[user_id].ties++;
    }

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
