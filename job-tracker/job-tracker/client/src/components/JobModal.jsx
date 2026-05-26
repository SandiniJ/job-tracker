import { useState, useEffect } from 'react';
import styles from './JobModal.module.css';

const STATUSES = ['Applied', 'Interview', 'Offer', 'Rejected', 'Ghosted'];

const empty = {
  company: '', position: '', status: 'Applied',
  location: '', salary: '', url: '', notes: '',
  applied_date: new Date().toISOString().split('T')[0],
};

export default function JobModal({ job, onClose, onSave }) {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (job) {
      setForm({
        ...job,
        applied_date: job.applied_date
          ? new Date(job.applied_date).toISOString().split('T')[0]
          : empty.applied_date,
      });
    }
  }, [job]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.company || !form.position) {
      setError('Company and position are required');
      return;
    }
    setLoading(true);
    try {
      await onSave(form);
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>{job ? 'Edit Application' : 'New Application'}</h2>
          <button className={styles.close} onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.grid}>
            <div className="form-group">
              <label>Company *</label>
              <input name="company" value={form.company} onChange={handleChange} placeholder="e.g. Google" />
            </div>
            <div className="form-group">
              <label>Position *</label>
              <input name="position" value={form.position} onChange={handleChange} placeholder="e.g. Frontend Developer" />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select name="status" value={form.status} onChange={handleChange}>
                {STATUSES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Applied Date</label>
              <input type="date" name="applied_date" value={form.applied_date} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input name="location" value={form.location} onChange={handleChange} placeholder="e.g. Remote, Colombo" />
            </div>
            <div className="form-group">
              <label>Salary</label>
              <input name="salary" value={form.salary} onChange={handleChange} placeholder="e.g. $80,000" />
            </div>
          </div>

          <div className="form-group">
            <label>Job URL</label>
            <input name="url" value={form.url} onChange={handleChange} placeholder="https://..." />
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} placeholder="Interview notes, contact info, etc." />
          </div>

          {error && <p className="error-msg">{error}</p>}

          <div className={styles.footer}>
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : job ? 'Update' : 'Add Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
