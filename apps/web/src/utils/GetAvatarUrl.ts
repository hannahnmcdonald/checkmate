export default function getAvatarUrl(avatar?: string | null) {
    console.log('avatar', avatar)
    return avatar || '/images/default_avatar.png';
}
