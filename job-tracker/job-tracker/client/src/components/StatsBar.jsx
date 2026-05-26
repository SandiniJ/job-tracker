import styles from './StatsBar.module.css';

export default function StatsBar({ jobs }) {
  const counts = {
    total: jobs.length,
    Applied: 0, Interview: 0, Offer: 0, Rejected: 0,
  };
  jobs.forEach(j => { if (counts[j.status] !== undefined) counts[j.status]++; });

  const stats = [
    { label: 'Total', value: counts.total, color: 'accent' },
    { label: 'Applied', value: counts.Applied, color: 'blue' },
    { label: 'Interview', value: counts.Interview, color: 'yellow' },
    { label: 'Offer', value: counts.Offer, color: 'green' },
    { label: 'Rejected', value: counts.Rejected, color: 'red' },
  ];

  return (
    <div className={styles.bar}>
      {stats.map(s => (
        <div key={s.label} className={styles.stat}>
          <span className={`${styles.value} ${styles[s.color]}`}>{s.value}</span>
          <span className={styles.label}>{s.label}</span>
        </div>
      ))}
    </div>
  );
}
