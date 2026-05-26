import styles from './JobCard.module.css';

const STATUS_COLORS = {
  Applied: 'blue',
  Interview: 'yellow',
  Offer: 'green',
  Rejected: 'red',
  Ghosted: 'muted',
};

export default function JobCard({ job, onEdit, onDelete }) {
  const color = STATUS_COLORS[job.status] || 'muted';

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.position}>{job.position}</h3>
          <p className={styles.company}>{job.company}</p>
        </div>
        <span className={`${styles.badge} ${styles[color]}`}>{job.status}</span>
      </div>

      <div className={styles.meta}>
        {job.location && <span>📍 {job.location}</span>}
        {job.salary && <span>💰 {job.salary}</span>}
        {job.applied_date && (
          <span>📅 {new Date(job.applied_date).toLocaleDateString()}</span>
        )}
      </div>

      {job.notes && <p className={styles.notes}>{job.notes}</p>}

      {job.url && (
        <a href={job.url} target="_blank" rel="noreferrer" className={styles.link}>
          View Posting ↗
        </a>
      )}

      <div className={styles.actions}>
        <button className="btn btn-ghost" onClick={() => onEdit(job)}>Edit</button>
        <button className="btn btn-danger" onClick={() => onDelete(job.id)}>Delete</button>
      </div>
    </div>
  );
}
