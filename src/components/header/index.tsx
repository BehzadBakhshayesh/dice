import React from 'react'
import "./style.css";
import Link from '@/components/svg/link';
import Share from '@/components/svg/share';


const handleShare = async () => {
    const combinedText = `\n  link: https://behzadbakhshayesh.github.io/dice/\n\n${window.location.origin}`;

    const shareData = {
        title: "جفت تاس",
        text: combinedText,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        try {
            await navigator.share(shareData);
        } catch (error) {
            console.error('خطا:', error);
        }
    } else {
        await navigator.clipboard.writeText(combinedText);
    }
};

const Header: React.FC = () => {
    return (
        <div className='header-wrapper'>
            <a href='https://behzadbakhshayesh.github.io/dice/' target="_blank">
                <Link />
            </a>
            <div onClick={handleShare}>
                <Share />
            </div>
        </div>
    )
}

export default Header
