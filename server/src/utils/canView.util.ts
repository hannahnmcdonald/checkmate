function canView(
    targetId: string,
    privacyLevel: 'public' | 'friends' | 'private',
    isFriend: boolean
): boolean {
    if (privacyLevel === 'public') return true;
    if (privacyLevel === 'friends') return isFriend;
    return false; // private
}

export default canView;
