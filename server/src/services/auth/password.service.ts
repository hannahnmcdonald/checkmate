import { db } from '../../db/knex';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export async function updateProfile(first_name: string, last_name: string, username: string, avatar: string, userId: string) {
    return await db('users')
        .where({ id: userId })
        .update({
            first_name,
            last_name,
            username,
            avatar,
            updated_at: new Date()
        });
}

export async function changeUserPassword(userId: string, current_password: string, new_password: string) {
    const user = await db('users').where({ id: userId }).first();
    const valid = await bcrypt.compare(current_password, user.password);

    // 400 error
    if (!valid) {
        throw new Error('Incorrect Current Password!');
    }

    const hashed = await bcrypt.hash(new_password, 10);

    return await db('users')
        .where({ id: userId })
        .update({ password: hashed, updated_at: new Date() });

}

export async function forgotPassword(email: string) {
    const user = await db('users').where({ email }).first();

    if (!user) {
        throw new Error('If user exists, password reset email sent!')
    }

    const token = uuidv4();
    const expires_at = new Date(Date.now() + 1000 * 60 * 60); // 1 hr

    return await db('password_resets').insert({
        id: uuidv4(),
        user_id: user.id,
        token,
        expires_at,
        created_at: new Date()
    });
    // TODO: Send email with reset link containing token
};

export async function resetPassword(token: string, new_password: string) {
    const reset = await db('password_resets')
        .where({ token })
        .andWhere('expires_at', '>', new Date())
        .first();

    if (!reset) {
        throw new Error('Invalid or expired token')
    };

    const hashed = await bcrypt.hash(new_password, 10);

    await db('users')
        .where({ id: reset.user_id })
        .update({ password: hashed, updated_at: new Date() });

    await db('password_resets')
        .where({ user_id: reset.user_id })
        .del();

    return;
}