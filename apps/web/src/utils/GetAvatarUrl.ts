export default function getAvatarUrl(avatar?: string | null) {
    return avatar || '/images/default_avatar.png';
}
