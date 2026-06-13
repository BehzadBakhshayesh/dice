/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRegisterSW } from 'virtual:pwa-register/react'

function ReloadPrompt() {
    const {
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegistered(r) { console.log('SW Registered') },
        onRegisterError(error) { console.log('SW Registration error', error) },
    })

    if (!needRefresh) return null;

    return (
        <div style={{ position: 'fixed', bottom: 20, right: 20, padding: 20, background: '#fff', border: '1px solid #ccc' }}>
            <span>نسخه جدیدی در دسترس است!</span>
            <button onClick={() => updateServiceWorker(true)}>آپدیت</button>
        </div>
    )
}

export default ReloadPrompt