import styles from './index.module.scss';

export function Header() {
    return (
        <div className='font-bold p-20px flex-c'>
            <div>super man</div>
            <header className={`${styles.header}`}>
                this is header
            </header >
            <button
                bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600"
                text="sm white"
                font="mono light"
                p="y-2 x-4"
                border="2 rounded blue-200"
            >
                Button
            </button>
        </div>
    )
}