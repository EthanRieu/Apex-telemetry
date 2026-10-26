import styles from './SectorBadge.module.scss'

const LABELS = {
  record: 'Meilleur secteur',
  better: 'Plus rapide qu’au tour précédent',
  slower: 'Plus lent',
}

export default function SectorBadge({ status = 'slower', children }) {
  return (
    <span className={`${styles.badge} ${styles[status]}`} title={LABELS[status]}>
      <span className={styles.dot} aria-hidden="true" />
      {children}
      <span className="sr-only">, {LABELS[status]}</span>
    </span>
  )
}
