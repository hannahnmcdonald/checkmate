import canView from './canView.util';

function withPrivacy<T>(
    data: T,
    privacyLevel: 'public' | 'friends' | 'private',
    targetId: string,
    isFriend: boolean
): { value: T | null, privacy: typeof privacyLevel } {
    return {
        value: canView(targetId, privacyLevel, isFriend) ? data : null,
        privacy: privacyLevel
    };
}

export default withPrivacy;
